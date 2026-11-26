---
title: "Publicação Social Autônoma com PostHub: AWS Step Functions, Tokens e Orquestração Multiplataforma"
slug: "autonomous-publishing-posthub-step-functions"
description: "Blueprint arquitetural do PostHub: publicação social autônoma em 5 plataformas (LinkedIn, X, Substack, Facebook, Instagram), tokens de aprovação de 1 clique no AWS Step Functions, cache dinâmico de JWT x509 e sincronização via DynamoDB Streams e WebSockets."
date: "2026-10-13"
tags: ["Serverless", "AWS Step Functions", "Automation", "DynamoDB", "WebSockets", "Cloud Architecture"]
lang: "pt-BR"
author: "Célio Vieira"
---

## A Complexidade da Distribuição Omnichannel

Manter uma presença técnica multiplataforma coerente no LinkedIn, X (Twitter), Substack, Facebook e Instagram é um fardo operacional significativo. Cada plataforma impõe restrições distintas:
- **Formatos de Payload e Mídia**: O X limita o texto a 280 caracteres e exige sequências estritas de upload de mídia em *chunks*. O LinkedIn requer URNs específicos de autor e formatos de carrossel em PDF. O Instagram exige proporções exatas (1:1 ou 4:5) e URLs públicas de CDN para renderização do contêiner.
- **Limites de Taxa e Backoff**: Algoritmos de *exponential backoff* e *jitter* são necessários para evitar bloqueios de IP ou inclusão em listas negras de cota de API.
- **Controle Human-in-the-Loop**: Postagens puramente autônomas por IA criam alto risco de alucinações ou mensagens fora da identidade da marca. Um sistema robusto de publicação deve impor um **portão de aprovação humana em 1 clique** antes de transmitir para milhares de seguidores.
- **Rastreamento de Estado e Auditabilidade**: Ao publicar em 5 plataformas simultaneamente, falhas parciais (por exemplo, o LinkedIn teve sucesso, mas o X falhou devido a limitação temporária de taxa) exigem lógica granular de retentativa por plataforma em vez de falha monolítica.

O **PostHub** (`aldeon.app/postshub`) foi projetado como o motor centralizado de automação social e distribuição de conteúdo da Aldeon. Construído com uma arquitetura *serverless* orientada a eventos na AWS, o PostHub transforma pesquisas técnicas longas em publicações direcionadas e otimizadas por plataforma, com curadoria de 8 tópicos, 3 ondas automatizadas diárias, controles de Publicar Agora em 1 clique e retentativa, selos ao vivo de saúde de expiração de credenciais e checkpoints de aprovação humana.

---

## A Máquina de Estados de Orquestração

No núcleo do PostHub está uma **Máquina de Estados Distribuída do AWS Step Functions**. Em vez de orquestrar sequências complexas de publicação em processos de contêineres de longa duração, o Step Functions oferece durabilidade integrada, *exponential backoff*, rastros visuais de auditoria e suspensão nativa para aprovação humana:

```
[Ingestão de Artigo / Nota de Lançamento]
               │
               ▼
 [Adaptação de Conteúdo por IA] ── (Gera textos sob medida para LinkedIn, X, Substack, IG, FB)
               │
               ▼
  [Criar Token de Aprovação] ── (Gera URL de aprovação em 1 clique assinada com HMAC)
               │
               ▼
[Enviar Notificação (Telegram/E-mail)]
               │
               ▼
 ┌───────────────────────────┐
 │ Aguardar Token da Tarefa  │ ── (Aguarda até 24h pelo clique humano)
 └─────────────┬─────────────┘
               ├── (Rejeitado / Expirado) ──► [Registrar Cancelamento e Arquivar]
               │
               ▼ (Aprovado)
 ┌────────────────────────────────────────────────────────┐
 │ Mapa de Despacho Paralelo Multiplataforma              │
 │                                                        │
 │  ├──► [Lambda Worker LinkedIn] (Com 3x Retry/Backoff)  │
 │  ├──► [Lambda X (Twitter v2)]  (Com Mídia em Chunks)   │
 │  ├──► [Worker API Substack]    (Markdown para HTML)    │
 │  ├──► [Worker Graph Instagram] (Contêiner e Status)    │
 │  └──► [Worker Graph Facebook]  (Postagem no Feed)      │
 └────────────────────────────┬───────────────────────────┘
                              │
                              ▼
          [DynamoDB Streams ──► Broadcast WebSocket]
             (Sincronização do Painel em Tempo Real)
```

---

## Human-in-the-Loop: O Padrão Task Token

O PostHub implementa o **padrão Task Token do Step Functions** (`.waitForTaskToken`), permitindo que a execução pause indefinidamente sem incorrer em custos de computação:

```json
{
  "Type": "Task",
  "Resource": "arn:aws:states:::lambda:invoke.waitForTaskToken",
  "Parameters": {
    "FunctionName": "${RequestApprovalLambdaArn}",
    "Payload": {
      "executionId.$": "$$.Execution.Id",
      "taskToken.$": "$$.Task.Token",
      "drafts.$": "$.drafts"
    }
  },
  "TimeoutSeconds": 86400,
  "Catch": [
    {
      "ErrorEquals": ["States.Timeout"],
      "Next": "HandleApprovalTimeout"
    }
  ],
  "Next": "ParallelPlatformDispatch"
}
```

### Verificação Segura em 1 Clique
Quando `RequestApprovalLambda` é executada, ela recebe `taskToken`. Ela gera uma URL assinada criptograficamente contendo:
1. O *task token* da execução.
2. Uma assinatura HMAC-SHA256 calculada com um *salt* secreto.
3. A ação desejada (`approve` ou `reject`).

O link é enviado para um canal privado no Telegram e para um e-mail de notificação:
```
https://api.posthub.aldeon.app/v1/approvals?action=approve&token=<TOKEN>&sig=<HMAC>
```

Ao ser clicado, um endpoint HTTP leve no API Gateway valida a assinatura e chama `sfnClient.sendTaskSuccess()`:

```typescript
// lambdas/approval-callback/handler.ts
import { SFNClient, SendTaskSuccessCommand, SendTaskFailureCommand } from "@aws-sdk/client-sfn";
import { verifyHmacSignature } from "../utils/crypto";

const sfn = new SFNClient({});

export async function handler(event: APIGatewayProxyEventV2) {
  const { action, token, sig } = event.queryStringParameters || {};

  if (!verifyHmacSignature(token, sig)) {
    return { statusCode: 403, body: JSON.stringify({ error: "Invalid cryptographic signature" }) };
  }

  if (action === "approve") {
    await sfn.send(new SendTaskSuccessCommand({
      taskToken: token,
      output: JSON.stringify({ status: "APPROVED", approvedAt: new Date().toISOString() }),
    }));
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: "<h1>Draft Approved!</h1><p>PostHub is now broadcasting your content across platforms.</p>",
    };
  } else {
    await sfn.send(new SendTaskFailureCommand({
      taskToken: token,
      error: "UserRejected",
      cause: "Post was rejected by the content author.",
    }));
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: "<h1>Draft Rejected</h1><p>Broadcast cancelled. No posts were published.</p>",
    };
  }
}
```

---

## Segurança de Alta Performance: Cache Dinâmico de JWT x509 no Autorizador

O painel de gerenciamento do PostHub é protegido via Google OAuth2 OpenID Connect (OIDC). No entanto, verificar tokens JWT RS256 de forma ingênua exige buscar os certificados x509 públicos do Google (`https://www.googleapis.com/oauth2/v3/certs`) em cada invocação da API — introduzindo mais de 100ms de latência de rede no caminho frio.

Para alcançar execução do autorizador abaixo de 10ms, o PostHub armazena as chaves públicas em cache na memória do contêiner Lambda entre invocações quentes com rotação automática baseada em TTL:

```typescript
// lambdas/authorizer/jwtVerifier.ts
import { createRemoteJWKSet, jwtVerify } from "jose";

// O conjunto JWKS remoto é inicializado fora do handler,
// armazenando chaves automaticamente em memória e atualizando-as ao expirar.
const GOOGLE_JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/oauth2/v3/certs"),
  {
    cooldownDuration: 30000,    // Intervalo de espera de 30 segundos entre atualizações
    cacheMaxAge: 21600000,     // TTL de cache de 6 horas
  }
);

export async function verifyUserToken(token: string) {
  const { payload } = await jwtVerify(token, GOOGLE_JWKS, {
    issuer: ["https://accounts.google.com", "accounts.google.com"],
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  return {
    sub: payload.sub,
    email: payload.email as string,
    authorized: payload.email === process.env.ADMIN_EMAIL,
  };
}
```

---

## Sincronização em Tempo Real via DynamoDB Streams e WebSockets

Quando múltiplas plataformas publicam simultaneamente, painéis administrativos precisam exibir selos de status em tempo real (`Queued`, `Processing`, `Live` ou `Failed`) sem *polling* repetitivo:

1. **Mutação de Registro no DynamoDB**: À medida que cada worker de plataforma termina, ele grava seu resultado diretamente na tabela unificada:
   `PK: POST#<id>`, `SK: PLATFORM#LINKEDIN`, `Status: LIVE`, `ExternalUrl: "https://..."`.
2. **DynamoDB Streams e Filtragem de Eventos**: O stream aciona uma Lambda roteadora leve apenas nas mutações em que `Status` muda.
3. **Despachante WebSocket no API Gateway**: O roteador mapeia IDs de conexão de clientes ativos a partir de um registro Redis/DynamoDB e envia quadros JSON direcionados pelos canais WebSocket abertos em menos de 35ms.

```
[Worker da Plataforma Conclui]
           │
           ▼
[DynamoDB PutItem (Status: LIVE)]
           │
           ▼ (Evento do DynamoDB Stream)
[Lambda Roteadora de Stream] ──► Consulta Conexões Ativas
           │
           ▼
[API Gateway WebSocket Management API]
           │
           ▼
[Console Web do PostHub: Selo de Confirmação Verde Acende]
```

---

## Resultados e Eficiência Operacional

A arquitetura *serverless* de orquestração do PostHub entrega:
- **Custo Ocioso Zero**: Durante períodos de inatividade, as despesas de computação são exatamente $0,00.
- **Isolamento Resiliente de Falhas Multiplataforma**: Se uma rede social específica sofrer uma interrupção ou erro HTTP 500 temporário, o Step Functions tenta novamente apenas aquele ramo automaticamente, sem republicar postagens duplicadas nas outras redes.
- **Tranquilidade Determinística**: O *task token* criptográfico de 1 clique garante que nenhuma postagem não autorizada vá ao ar sem revisão humana explícita.

Por meio do PostHub (em produção na [Web](https://aldeon.app/postshub), na [Apple App Store](https://apps.apple.com/us/app/postshub/id6813979346) e no [Beta Fechado no Google Play](https://play.google.com/apps/testing/com.aldeon.posthub)), conteúdos técnicos produzidos em toda a plataforma Aldeon alcançam sua audiência global de forma sistemática e confiável — incluindo formatação em AST ProseMirror e verificação step-up por OTP para publicação no Substack.
