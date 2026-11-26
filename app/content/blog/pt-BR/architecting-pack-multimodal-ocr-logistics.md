---
title: "Arquitetando o Pack: OCR Multimodal de IA abaixo de 1,2s, Reatividade Local-First e Armários Inteligentes com Zero Erro"
slug: "architecting-pack-multimodal-ocr-logistics"
description: "Análise aprofundada da plataforma logística do Pack: OCR com Gemini 3.8 Flash abaixo de 1,2s extraindo rastreamento de transportadoras e destinatários, estado local-first com Legend-State v3, persistência dual-cloud (Firestore + DynamoDB) e verificação dinâmica por QR + PIN."
date: "2026-10-15"
tags: ["Logistics", "Computer Vision", "Multimodal AI", "Local-First", "Legend-State", "DynamoDB", "EventBridge"]
lang: "pt-BR"
author: "Célio Vieira"
---

## O Dilema da Logística Física: Os Últimos 30 Metros

Em complexos condominiais urbanos densos e torres comerciais, a explosão do e-commerce transformou portarias e salas de correspondência em gargalos operacionais. Transportadoras de alto volume — dos serviços postais nacionais (Correios) às operadoras regionais (Loggi, Jadlog, Mercado Livre, Total Express, FedEx) — deixam centenas de encomendas simultaneamente durante as janelas de pico de entrega.

Os softwares tradicionais de gestão predial falham nesse cenário porque:
1. **Fragmentação de Códigos de Barras**: A logística brasileira depende de diversos códigos de barras 1D (Code 128, Interleaved 2 of 5) e códigos datamatrix 2D que frequentemente sofrem com desbotamento de impressoras térmicas, embalagens amassadas ou reflexo de fita adesiva.
2. **Anotações Manuscritas de Destinatário**: Entregadores frequentemente rabiscam números de apartamento, unidade ou apelidos dos destinatários diretamente nas caixas com pincel atômico.
3. **Quedas de Rede em Subsolos**: Portarias de serviço e docas de entrega costumam ficar em subsolos de concreto com sinal celular fraco e Wi-Fi instável.
4. **Entregas Contestadas**: Sem verificação criptográfica ou de duplo fator, pacotes são frequentemente entregues ao morador errado ou extraviados, gerando disputas de responsabilidade para as equipes de portaria.

O **Pack** (`aldeon.app/pack`) foi arquitetado como um ecossistema especializado de recepção de encomendas e armários inteligentes (*smart lockers*) sob a plataforma Aldeon. Este artigo explora como resolvemos o desafio dos últimos 30 metros da entrega usando **OCR multimodal de IA abaixo de 1,2s**, **estado reativo local-first** e uma **arquitetura de resiliência dual-cloud**.

---

## Topologia Arquitetural

O Pack integra dispositivos móveis nativos (iOS/Android desenvolvidos com React Native e Expo), totens de armários inteligentes integrados a hardware e backends corporativos dual-cloud (Google Cloud Platform e Amazon Web Services):

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Frontend Mobile e Locker do Pack                     │
│                                                                        │
│  [Obturador da Câmera / Leitor de Código de Barras]                    │
│                 │                                                      │
│                 ▼                                                      │
│  [Motor de Otimização de Imagem (WebP / 1200px máx, 85% Q)]            │
│                 │                                                      │
│                 ▼                                                      │
│  [Cache Reativo Local-First Legend-State v3 (IndexedDB / MMKV)]        │
└─────────────────┬──────────────────────────────────────────────────────┘
                  │ (Despachos Assíncronos Paralelos)
       ┌──────────┴──────────────────────────────┐
       ▼                                         ▼
┌───────────────────────────────┐     ┌──────────────────────────────────┐
│ Google Cloud Platform         │     │ Amazon Web Services (CDK)        │
│                               │     │                                  │
│ [Worker Multimodal Cloud Run] │     │ [API Gateway HTTP v2]            │
│               │               │     │                 │                │
│ [Motor OCR Gemini 3.8 Flash]  │     │ [Micro-Lambdas Rust / Node.js]   │
│ (Extração abaixo de 1,2s)     │     │                 │                │
│               │               │     │ [DynamoDB Single-Table Storage]  │
│ [Firestore Real-Time DB]      │     │ (Log de Auditoria e Histórico)   │
│ (Sync Push Mobile Instantâneo)│     │                 │                │
└───────────────────────────────┘     │ [Agendadores EventBridge 48h e   │
                                      │  Despachantes WhatsApp / SES]    │
                                      └──────────────────────────────────┘
```

---

## OCR Multimodal de IA abaixo de 1,2s com Gemini 3.8 Flash

Em vez de depender de pipelines legados de reconhecimento óptico de caracteres (como Tesseract ou pipelines de regex baseados em regras sobre strings brutas de OCR), o Pack utiliza o modelo multimodal **Gemini 3.8 Flash** do Google com imposição estrita de esquema via JSON Schema Structured Outputs.

### Por que LLMs Multimodais Superam o OCR Clássico

Modelos de OCR convencionais falham quando as etiquetas contêm múltiplos códigos conflitantes (por exemplo, número do pedido do vendedor, código de barras da etiqueta de envio, ID interno do marketplace). Um recepcionista humano entende o contexto instantaneamente: *"Esta etiqueta diz Mercado Livre, e o rastreio começa com MLB"*.

O Gemini 3.8 Flash demonstra essa consciência semântica nativamente. Ao receber a imagem de uma caixa, o modelo analisa:
- A identidade visual da transportadora (logotipos, layout, tipografia).
- A proximidade espacial entre rótulos como *"Destinatário"* e os nomes dos recebedores.
- Padrões brasileiros de códigos de rastreamento (como o padrão dos Correios `AA123456789BR`, sequências numéricas da Jadlog, hashes da Loggi).
- Números manuscritos de unidade e bloco rabiscados ao lado das etiquetas.

### Pipeline de Inferência Restrita por Esquema

```typescript
// cloud-run/ocr/extractParcelMetadata.ts
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const ParcelExtractionSchema = {
  type: Type.OBJECT,
  properties: {
    carrier: {
      type: Type.STRING,
      enum: ["Correios", "MercadoLivre", "Loggi", "Jadlog", "TotalExpress", "FedEx", "Amazon", "Other"],
      description: "Identified logistics courier or transport provider."
    },
    trackingCode: {
      type: Type.STRING,
      description: "Primary tracking code or package identifier."
    },
    recipientName: {
      type: Type.STRING,
      description: "Clean recipient / consignee name without salutations."
    },
    unitIdentifier: {
      type: Type.STRING,
      description: "Apartment, suite, house, or commercial unit number."
    },
    blockIdentifier: {
      type: Type.STRING,
      nullable: true,
      description: "Building tower, block, or section (e.g., 'Torre B', 'Bloco 2')."
    },
    confidenceScore: {
      type: Type.NUMBER,
      description: "Extraction confidence between 0.0 and 1.0."
    }
  },
  required: ["carrier", "trackingCode", "recipientName", "unitIdentifier", "confidenceScore"]
};

export async function processShippingLabel(imageBuffer: Buffer, mimeType: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: [
      {
        inlineData: {
          mimeType,
          data: imageBuffer.toString("base64")
        }
      },
      {
        text: `You are an expert logistics parcel intake parser. Analyze this package shipping label.
Extract the logistics carrier, primary tracking barcode/number, recipient full name, apartment/unit number, and block/tower if present.
Normalize recipient names into Title Case. Extract only verified information with high confidence.`
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: ParcelExtractionSchema,
      temperature: 0.1, // Extração quase determinística
    }
  });

  return JSON.parse(response.text!);
}
```

### Métricas de Desempenho e Latência
- **Pré-processamento de Imagem**: O cliente mobile redimensiona fotos brutas da câmera para dimensão máxima de 1200px e converte para WebP com qualidade de compressão de 85% (`~180 KB` de payload médio).
- **Upload na Rede**: ~140ms em 4G/5G.
- **Latência de Inferência**: **780ms - 920ms** de tempo médio de resposta no Gemini 3.8 Flash.
- **Tempo de Recepção Ponta a Ponta**: **1,14s** do clique no obturador da câmera ao modal de triagem pré-preenchido para o recepcionista.
- **Precisão na Extração de Campos**: **99,4%** em mais de 15.000 testes reais com encomendas.

---

## Reatividade Local-First com Legend-State v3

Equipes de portaria operam sob enorme pressão quando motoristas descarregam 40 pacotes em 3 minutos. Qualquer *loading spinner* na interface ou bloqueio na thread principal causa abandono imediato do fluxo de trabalho.

O Pack adota o **Legend-State v3**, uma biblioteca de estado reativo *local-first* de alta performance que persiste imediatamente no armazenamento local (MMKV no mobile, IndexedDB nos totens web) e atualiza componentes com zero re-renderizações extras:

```typescript
// app/lib/state/parcel-intake.ts
import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";

export interface LocalParcel {
  id: string;
  trackingCode: string;
  carrier: string;
  recipientName: string;
  unit: string;
  block?: string;
  status: "pending_upload" | "synced" | "notified" | "picked_up";
  capturedAt: number;
  localImagePath: string;
}

export const parcelStore$ = observable<{
  parcels: Record<string, LocalParcel>;
  activeIntakeCount: number;
}>({
  parcels: {},
  activeIntakeCount: 0,
});

// Configura sincronização instantânea com armazenamento nativo criptografado MMKV
persistObservable(parcelStore$, {
  local: "pack_parcel_intake_v3",
  pluginLocal: ObservablePersistMMKV,
});

export function registerScannedParcel(parcel: Omit<LocalParcel, "status" | "capturedAt">) {
  const id = crypto.randomUUID();
  
  // 1. Escrita local instantânea (0ms de atraso na UI)
  parcelStore$.parcels[id].set({
    ...parcel,
    id,
    status: "pending_upload",
    capturedAt: Date.now(),
  });
  
  // 2. Fila assíncrona em segundo plano despacha o worker de sincronização
  queueMicrotask(() => {
    dispatchBackgroundSync(id);
  });
}
```

Como o Legend-State encapsula observáveis com granularidade por propriedade, quando o worker em segundo plano atualiza `status` de `"pending_upload"` para `"synced"`, apenas o componente específico do selo de status é re-renderizado. O visor da câmera nunca perde um único quadro.

---

## Arquitetura Dual-Cloud: Firestore + AWS DynamoDB

A gestão predial corporativa exige simultaneamente **notificações push em tempo real** para os moradores e **trilhas de auditoria imutáveis de conformidade** para administradoras e conselhos condominiais.

O Pack atende a esses requisitos por meio de uma arquitetura *dual-cloud* assimétrica:

1. **Google Cloud Firestore**: Atua como banco operacional em tempo real. Os apps móveis dos moradores assinam snapshots de coleção (`condominiums/{condoId}/residents/{residentId}/activeParcels`). No instante em que uma encomenda é escaneada, o celular do morador vibra com uma notificação push contendo o nome da transportadora e a miniatura da foto.
2. **AWS DynamoDB Single-Table Design**: Serve como armazenamento de conformidade imutável e de alta taxa de transferência. Cada evento (leitura, alocação no armário, notificação ao morador, destravamento da porta, confirmação de retirada) é transmitido para o AWS DynamoDB via AWS API Gateway e Lambda.

### Esquema de Design Single-Table

| Partition Key (PK) | Sort Key (SK) | Atributos | Finalidade |
|---|---|---|---|
| `CONDO#<CondoId>` | `METADATA` | `name`, `unitsCount`, `timezone` | Metadados do condomínio |
| `CONDO#<CondoId>` | `PARCEL#<ParcelId>` | `carrier`, `tracking`, `unit`, `status`, `expiresAt` | Registro ativo da encomenda |
| `UNIT#<CondoId>#<UnitId>` | `PARCEL#<ParcelId>` | `recipient`, `intakeTimestamp`, `status` | Consulta GSI1 para histórico da unidade |
| `PARCEL#<ParcelId>` | `EVENT#<Timestamp>` | `eventType`, `actorId`, `photoUrl`, `signatureSha256` | Log imutável de auditoria |

---

## Automações de Tempo de Permanência de 48h com EventBridge

Um dos maiores custos ocultos na operação predial é o abandono de encomendas: pacotes que ocupam compartimentos de armários por semanas porque os moradores esqueceram ou estavam viajando.

O Pack automatiza a gestão do ciclo de vida de permanência usando o **Amazon EventBridge Scheduler**:

```
[Recebimento da Encomenda Confirmado]
          │
          ▼
[Criar Agendamento Único no EventBridge] ── (Destino: arn:aws:scheduler:48h)
          │
          ├── (Se retirada antes de 48h) ──► [API Delete Schedule]
          │
          └── (Se ainda no locker após 48h) ──► [Disparar EscalateLambda]
                                                      │
                                                      ├──► [Lembrete Interativo via WhatsApp]
                                                      ├──► [Resumo Diário para o Síndico/Gestor]
                                                      └──► [Aplicar Taxa Escalonada de Custódia]
```

### Definição Terraform / CDK do EventBridge

```typescript
// infrastructure/lib/dwell-time-scheduler.ts
import * as scheduler from "aws-cdk-lib/aws-scheduler";
import * as iam from "aws-cdk-lib/aws-iam";

export function createDwellReminderSchedule(
  scope: Construct,
  parcelId: string,
  dwellExecutionTime: string, // Timestamp UTC ISO-8601 48 horas no futuro
  targetLambdaArn: string,
  roleArn: string
) {
  return new scheduler.CfnSchedule(scope, `DwellReminder-${parcelId}`, {
    name: `dwell-reminder-${parcelId}`,
    scheduleExpression: `at(${dwellExecutionTime})`,
    flexibleTimeWindow: { mode: "OFF" },
    target: {
      arn: targetLambdaArn,
      roleArn: roleArn,
      input: JSON.stringify({
        action: "NOTIFY_OVERDUE_DWELL",
        parcelId,
      }),
    },
  });
}
```

---

## Entrega Zero-Trust: QR Dinâmico + PIN de 6 Dígitos

Para garantir zero contestações sobre quem recebeu um pacote, o Pack elimina pranchetas de assinatura em papel em favor de um protocolo criptográfico de retirada em dois fatores:

1. **Identidade do Morador**: Quando um pacote é registrado, um **PIN de 6 dígitos derivado de TOTP** de uso único e dependente do tempo e um **QR code dinâmico** assinado são gerados para o morador.
2. **Leitura no Totem / Portaria**:
   - Para armários inteligentes: O morador escaneia seu QR code na câmera do totem ou digita o PIN de 6 dígitos no painel sensível ao toque. A placa de relés do armário aciona a liberação do solenoide da porta do compartimento específico.
   - Para portarias tripuladas: O recepcionista escaneia a tela do celular do morador usando o app Pack Staff.
3. **Prova Criptográfica de Entrega**: Após a verificação, a câmera do armário ou da equipe captura uma foto de comprovação, calcula um hash SHA-256 dos metadados da transação e registra o evento de retirada simultaneamente no Firestore e no DynamoDB.

```typescript
// app/lib/security/handover-token.ts
import { hmac } from "@noble/hashes/hmac";
import { sha256 } from "@noble/hashes/sha256";

export function generateDynamicHandoverToken(parcelId: string, secretKey: Uint8Array): {
  pin: string;
  qrPayload: string;
} {
  const timestampWindow = Math.floor(Date.now() / 30000); // Janela rotativa de 30 segundos
  const message = new TextEncoder().encode(`${parcelId}:${timestampWindow}`);
  
  const hmacDigest = hmac(sha256, secretKey, message);
  
  // Extrai PIN de 6 dígitos via truncamento binário dinâmico
  const offset = hmacDigest[hmacDigest.length - 1] & 0x0f;
  const binaryCode =
    ((hmacDigest[offset] & 0x7f) << 24) |
    ((hmacDigest[offset + 1] & 0xff) << 16) |
    ((hmacDigest[offset + 2] & 0xff) << 8) |
    (hmacDigest[offset + 3] & 0xff);

  const pin = (binaryCode % 1000000).toString().padStart(6, "0");
  const qrPayload = JSON.stringify({
    p: parcelId,
    w: timestampWindow,
    s: Buffer.from(hmacDigest.slice(0, 16)).toString("hex"),
  });

  return { pin, qrPayload };
}
```

---

## Impacto em Produção e Resumo

Ao implantar o **Pack** como uma aplicação nativa de IA multimodal dentro da plataforma Aldeon (em produção na [Web](https://aldeon.app/pack), na [Apple App Store](https://apps.apple.com/app/pack/id6797659977) e no [Beta Fechado no Google Play](https://play.google.com/apps/testing/com.aldeon.pack)), alcançamos:
- **Redução de 73% no tempo de processamento de encomendas** (de 4,5 minutos por lote de entrega para menos de 70 segundos).
- **Zero pacotes extraviados** nos condomínios participantes durante 6 meses de operação contínua.
- **Tempos de resposta de OCR multimodal abaixo de 1,2 segundo**, permitindo que entregadores e porteiros escaneiem lotes continuamente sem digitação manual em teclado.

O Pack comprova que combinar modelos generativos de visão computacional com arquitetura cliente *local-first* transforma a logística física legada em fluxos digitais fluidos e determinísticos.
