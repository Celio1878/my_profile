---
title: "Construindo um Stack Local de Coding com IA usando Ollama, OpenCode, Qwen 3.5 e Qwen3-Coder"
slug: "local-ai-coding-stack-ollama-opencode-qwen3"
description: "Blueprint de produção para rodar coding agêntico privado e com custo zero de tokens localmente usando Ollama, OpenCode, Qwen 3.5 e Qwen3-Coder — construído diretamente a partir de uma workstation real com RTX 3070 8GB + Ryzen 7 3700X + 32GB DDR4-3600 + NVMe/HDD."
date: "2026-11-26"
tags: ["AI", "LLMs", "Ollama", "Agents", "Local AI", "OpenCode", "Architecture"]
lang: "pt-BR"
author: "Célio Vieira"
---

## Por que Construir um Stack Local de Coding Agêntico em Hardware Existente

A maioria dos engenheiros presume que rodar coding agêntico local exige comprar uma GPU de mais de US$ 2.000 ou uma workstation com memória unificada no máximo antes mesmo de escrever uma única linha de código. Na prática, você pode executar um **ciclo produtivo de coding agêntico com custo marginal zero por token** diretamente em um desktop intermediário que você já possui — desde que alinhe **roteamento de modelos entre 4 agentes**, **guardrails de VRAM/cache KV** e **camadas de armazenamento NVMe vs. HDD** com os limites reais de memória do seu hardware.

Executar o **OpenCode** como harness de agente no terminal apoiado pelo **Ollama** servindo **Qwen 3.5** e **Qwen3-Coder** entrega quatro vantagens concretas de engenharia:

- **Vazamento Zero de Dados e Soberania Total de PI**: Microsserviços proprietários, topologias de `.env`, schemas de banco de dados e logs de incidentes de clientes nunca saem de `127.0.0.1`.
- **Reaproveitamento sem CapEx**: Reutilizar uma workstation existente elimina a escalada de assinaturas sem esperar por aquisição de novo hardware.
- **Iteração Sem Estrangulamento**: Executar loops de teste-e-correção, exploração de repositórios e compactação de contexto aciona zero limites de taxa e zero ansiedade por custo de token.
- **Resiliência Offline e Air-Gapped**: Voos, Wi-Fi instável ou VPNs corporativas restritivas não interrompem mais seu fluxo agêntico.

---

## Workstation de Referência: A Base no Mundo Real

Cada arquivo de configuração, tamanho de peso de modelo e flag de ajuste neste blueprint vem de uma workstation de engenharia em operação ativa:

| Componente | Especificação Exata de Referência | Papel Arquitetural na IA Local |
|---|---|---|
| **GPU** | **NVIDIA RTX 3070 — 8 GB GDDR6 VRAM** (`448 GB/s`) | Motor principal de computação + cache KV `q8_0` + residência de 100% para `qwen3.5:9b` e `qwen3.5-fast:9b` |
| **CPU** | **AMD Ryzen 7 3700X — 8 Núcleos / 16 Threads** (Zen 2, AVX2) | Executa pesos Mixture-of-Experts (MoE) com offload (`qwen3-coder:30b`) e ferramentas do harness |
| **RAM do Sistema** | **32 GB DDR4-3600 MHz** (Dual-Channel, `1800 MHz` FCLK 1:1) | Mantém experts MoE em offload (`~13–15 GB`) enquanto preserva `~14–16 GB` para SO, IDE e Docker |
| **NVMe Primário** | **Dois SSDs NVMe de ~477 GB** | SO raiz, repositórios Git ativos, camadas Docker e caches de build |
| **Repositório Dedicado de LLMs** | **HDD SATA de ~300 GB (`OLLAMA_MODELS`, depósito GGUF de 24 GB)** | Libera espaço no NVMe armazenando `24 GB` de blobs de modelos, amortizado via residência `keep-alive` de `30m` |

Uma placa de **8 GB de VRAM** parece apertada no papel — e para modelos *densos* grandes, ela realmente é. O que torna essa workstation genuinamente eficaz é combinar **32 GB de DDR4-3600**, concorrência estrita de slot único (`OLLAMA_NUM_PARALLEL=1`), um **modelo derivado sem pensamento com zero disco extra (`qwen3.5-fast:9b`)** e **MoE esparso (`qwen3-coder:30b`)** para planejamento com contexto amplo.

---

## Como Funciona: Ollama, OpenCode, Qwen 3.5 e Qwen3-Coder

Em vez de rodar um único modelo superdimensionado para cada prompt, o OpenCode divide o coding agêntico entre **quatro papéis especializados de agente** conversando com o Ollama em `http://127.0.0.1:11434/v1`:

```text
┌────────────────────────────────────────────────────────────────────────────┐
│  Harness de Terminal OpenCode (auto compaction + prune habilitados)        │
│  • Lê contexto compacto MemOn <20KB + arquivos do repositório no NVMe       │
│  • Roteia cada turno de agente para o peso local e limite de contexto exatos│
└───────┬───────────────────────────────┬──────────────────────────────┬─────┘
        │ explore / compaction          │ build (padrão)               │ plan
        ▼                               ▼                              ▼
┌───────────────────────┐ ┌───────────────────────────┐ ┌───────────────────────────┐
│ qwen3.5-fast:9b       │ │ qwen3.5:9b                │ │ qwen3-coder:30b           │
│ 32K ctx • Sem Pensam. │ │ 32K ctx • Raciocínio Tot. │ │ 48K (49152) • MoE Esparso │
│ 100% VRAM RTX 3070    │ │ 100% VRAM RTX 3070        │ │ Atenção+KV na RTX 3070    │
│ 0 B blobs extra disco │ │ 5.3 GiB + 880 MiB mmproj  │ │ 18 GB (3.3B ativos) RAM   │
└───────────────────────┘ └───────────────────────────┘ └───────────────────────────┘
        └───────────────────────────────┬──────────────────────────────┘
                                        ▼
┌────────────────────────────────────────────────────────────────────────────┐
│  Serviço Systemd Ollama (CUDA, Flash Attention, KV q8_0, Keep-Alive 30m)   │
│  OLLAMA_VULKAN=0 • OLLAMA_NUM_PARALLEL=1 • OLLAMA_MAX_LOADED_MODELS=2      │
│  Apoiado por depósito GGUF de 24 GB em SATA HDD montado (RequiresMountsFor)│
└────────────────────────────────────────────────────────────────────────────┘
```

### Divisão de Trabalho dos Modelos: Qwen 3.5, qwen3.5-fast:9b e Qwen3-Coder

Este é o inventário exato de 3 modelos armazenado no diretório de blobs de **24 GB `OLLAMA_MODELS`** da workstation:

| Tag do Modelo | Arquitetura e Formato | Pegada de Blobs em Disco | Limite de Contexto no OpenCode | Perfil de Execução na RTX 3070 + 32 GB RAM | Papel do Agente no OpenCode |
|---|---|---|---|---|---|
| `qwen3.5:9b` | `qwen35` Híbrido Denso (`Q4_K_M`) + `mmproj.gguf` de Visão | `5.3 GiB` modelo + `880 MiB` projetor | `32,768` (`32K`) | **100% VRAM RTX 3070** (`448 GB/s`) | **`build` (padrão)**: edições em múltiplos passos, correções de testes e inspeção de UI |
| `qwen3.5-fast:9b` | Customizado `FROM qwen3.5:9b` (`Q4_K_M`, prompt No-Think, `temp 0.1`) | **`0 B` extras** (compartilha blobs do `qwen3.5:9b`) | `32,768` (`32K`) | **100% VRAM RTX 3070** (`448 GB/s`) | **`explore` e `compaction`**: varreduras rápidas de repositório e poda sem preâmbulo |
| `qwen3-coder:30b` | `qwen3moe` MoE Esparso (`30.5B` total / `3.3B` ativos, `Q4_K_M`) | `18 GB` (`17.3 GiB` GGUF) | `49,152` (`48K`) | **Híbrido**: Atenção + KV na RTX 3070, experts em 32 GB DDR4-3600 | **`plan`**: arquitetura profunda de repositório e planos de refatoração multiarquivo |

Por que o **MoE esparso** funciona nessa máquina enquanto um modelo *denso* de 30B falha?
- Um modelo denso de 30B precisa trafegar **todos os ~18 GB de pesos** pela RAM DDR4 para **cada token gerado**, gargalando o DDR4 dual-channel (`~45–55 GB/s`) para cerca de `~1–2 tokens/s`.
- O **Qwen3-Coder (`30.5B`, `qwen3moe`)** ativa apenas **~3.3B parâmetros por token**. Manter camadas de atenção e cache KV dentro dos **448 GB/s GDDR6 da RTX 3070** enquanto lê somente as fatias ativas de experts dos **32 GB DDR4-3600** mantém sessões de planejamento responsivas em hardware existente.

### Ajustando o Ollama via Systemd para 8 GB de VRAM e Aquecimento de Sessão

Por padrão, o Ollama inicia com janelas de contexto pequenas e alocações KV de múltiplos slots que truncam definições de ferramentas do OpenCode ou transbordam dos 8 GB de VRAM. Este drop-in exato do systemd (`/etc/systemd/system/ollama.service.d/override.conf`) mantém a inferência fixada em CUDA e evita recarregamentos frios do HDD no meio da sessão:

```ini
[Unit]
RequiresMountsFor=/mnt/files

[Service]
User=<user>
Group=<user>
Environment="OLLAMA_MODELS=/mnt/files/llms"
Environment="OLLAMA_VULKAN=0"
Environment="OLLAMA_FLASH_ATTENTION=1"
Environment="OLLAMA_KV_CACHE_TYPE=q8_0"
Environment="OLLAMA_CONTEXT_LENGTH=32768"
Environment="OLLAMA_KEEP_ALIVE=30m"
Environment="OLLAMA_MAX_LOADED_MODELS=2"
Environment="OLLAMA_NUM_PARALLEL=1"
```

Cada flag resolve um gargalo concreto nesse hardware:
- **`OLLAMA_VULKAN=0`**: Garante execução CUDA nativa na RTX 3070 em vez da sobrecarga do Vulkan.
- **`OLLAMA_NUM_PARALLEL=1`**: Crítico em 8 GB de VRAM — reserva **uma** alocação de cache KV em vez de dividir a VRAM entre slots paralelos.
- **`OLLAMA_FLASH_ATTENTION=1` + `OLLAMA_KV_CACHE_TYPE=q8_0`**: Comprime o cache KV em aproximadamente 2× para que o contexto de `32,768` caiba com folga ao lado de `qwen3.5:9b`.
- **`OLLAMA_KEEP_ALIVE=30m` + `OLLAMA_MAX_LOADED_MODELS=2`**: Mantém `qwen3.5:9b` e `qwen3-coder:30b` residentes durante pausas de 30 minutos para que alternar entre `plan` e `build` no OpenCode não releia `18 GB` do HDD SATA.
- **`RequiresMountsFor=/mnt/files`**: Impede que o `ollama.service` suba antes da montagem do disco secundário e crie um repositório vazio paralelo.

### O Modelfile qwen3.5-fast:9b com Zero Disco Extra

Modelos com raciocínio explícito (`thinking`) desperdiçam centenas de tokens de pensamento em tarefas mecânicas como exploração de diretórios e compactação de conversas. Criar um Modelfile derivado remove o preâmbulo de pensamento com **0 bytes de pesos de modelo duplicados**, porque o Ollama compartilha os blobs GGUF e `mmproj.gguf` subjacentes de `qwen3.5:9b`:

```dockerfile
# Modelfile.qwen35-fast
FROM qwen3.5:9b
SYSTEM "Follow output templates and formatting instructions strictly. Do not output thinking blocks, preamble, or conversational commentary."
PARAMETER num_ctx 32768
PARAMETER temperature 0.1
PARAMETER presence_penalty 1.5
PARAMETER top_k 20
PARAMETER top_p 0.95
```

```bash
ollama pull qwen3.5:9b
ollama pull qwen3-coder:30b
ollama create qwen3.5-fast:9b -f Modelfile.qwen35-fast
```

### Conectando o Harness de 4 Agentes do OpenCode (opencode.json)

Este é o `~/.config/opencode/opencode.json` exato conectando todos os quatro papéis de agente do OpenCode (`build`, `plan`, `explore`, `compaction`) com autocompactação e orçamentos explícitos de contexto/saída:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "ollama/qwen3.5:9b",
  "compaction": {
    "auto": true,
    "prune": true
  },
  "mcp": {},
  "agent": {
    "build": {
      "model": "ollama/qwen3.5:9b"
    },
    "plan": {
      "model": "ollama/qwen3-coder:30b"
    },
    "explore": {
      "model": "ollama/qwen3.5-fast:9b"
    },
    "compaction": {
      "model": "ollama/qwen3.5-fast:9b"
    }
  },
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama (local)",
      "options": {
        "baseURL": "http://127.0.0.1:11434/v1",
        "apiKey": "ollama"
      },
      "models": {
        "qwen3.5:9b": {
          "name": "Qwen 3.5 9B (GPU)",
          "limit": {
            "context": 32768,
            "output": 8192
          }
        },
        "qwen3.5-fast:9b": {
          "name": "Qwen 3.5 9B Fast / No-Think (GPU)",
          "limit": {
            "context": 32768,
            "output": 8192
          }
        },
        "qwen3-coder:30b": {
          "name": "Qwen 3 Coder 30B MoE (48K Hybrid)",
          "limit": {
            "context": 49152,
            "output": 8192
          }
        }
      }
    }
  }
}
```

Observe como `compaction.auto: true` + `prune: true` combinados com `qwen3.5-fast:9b` evitam que sessões longas de build estourem silenciosamente o limite de contexto GPU de `32,768` na RTX 3070.

---

## Resolução de Problemas no Mundo Real e Sinergia com o MemOn

Onde exatamente essa configuração de 4 agentes se destaca de forma consistente?

1. **Planejamento de Arquitetura Antes das Edições**: Rodar o agente `plan` do OpenCode no `qwen3-coder:30b` (contexto de `48K`) mapeia com precisão dependências cruzadas em TypeScript/Python antes de devolver a execução para o `build` (`qwen3.5:9b`).
2. **Exploração Rápida de Repositório e Compactação**: Rotear `explore` e `compaction` para `qwen3.5-fast:9b` (`temperature: 0.1`, sem blocos de pensamento) mantém a descoberta de arquivos e a poda de histórico ágeis dentro da VRAM da GPU.
3. **Ciclos de Verificação Orientados a Testes (TDD)**: Deixar o `build` executar `bun test`, `tsc` ou `pytest`, analisar falhas localmente e aplicar correções no código sem pagar por tentativa.
4. **Depuração Privada de Logs, Schemas e Configurações**: Inspecionar políticas IAM em cloud, consultas SQL e configurações de serviços locais diretamente em `127.0.0.1` com exposição zero de dados.

### Por que o MemOn (sub-20KB) Multiplica a Eficiência Local da GPU

Em uma API cloud de fronteira com 200K tokens, arquivos de instrução inchados de 150 KB apenas desperdiçam dinheiro. Em uma **RTX 3070 de 8 GB**, o excesso de contexto rouba VRAM diretamente do seu cache KV `q8_0`, empurra camadas de atenção pelo PCIe para a DDR4 e força compactações prematuras.

Combinar o OpenCode com o [protocolo determinístico de governança `MemOn` (`sub-20KB`, anteriormente OnMemory)](/blog/on-memory-deterministic-ai-engineering-governance) mantém regras do repositório, escolhas travadas de stack e antipadrões em 5 campos abaixo de **20.000 bytes (~5K tokens)** — preservando mais de **80% da sua janela de contexto de 32K–48K** para arquivos-fonte reais e diffs de ferramentas.

---

## Economia Financeira e Viabilidade Zero-CapEx

Comparar o **gasto mensal realista por desenvolvedor** torna o ROI inquestionável:

| Opção de Stack | CapEx Inicial de Hardware | Custo Mensal Recorrente | Privacidade e Limites de Taxa | Aderência Prática de Engenharia |
|---|---|---|---|---|
| **Assinatura Individual de Coding na Nuvem** | `$0` | `$20 / mês` (`$240/ano`) | Hospedado na nuvem; cotas mensais rígidas de rajada | Boa base, mas sofre throttling sob loops agênticos pesados |
| **Uso Pesado de IA Agêntica na Nuvem / Plano Max** | `$0` | `$100–$200+ / mês` (`$1.200–$2.400+/ano`) | Hospedado na nuvem; queima rápida de tokens em re-tentativas de teste | Melhor raciocínio de fronteira para trabalho greenfield ambíguo |
| **Máquina RTX 3070 Existente (Este Blueprint)** | **`$0`** (já adquirida) | **`~$3–$6 / mês`** em picos de eletricidade | **100% privada**, zero throttling de tokens | Resolve ~85% do coding diário, TDD e depuração privada |

Por que a conta de energia é tão baixa? Sua RTX 3070 (pico de `~220W`) e Ryzen 7 3700X (TDP de `~65W`) **não ficam operando a 100% de carga 24/7**. Durante um dia útil de 8 horas de coding agêntico em rajadas, a inferência ativa na GPU soma tipicamente **45–90 minutos** de computação real (`~0.25–0.45 kWh/dia`, ou cerca de `$3–$6/mês` dependendo da tarifa local de kWh).

> **A Regra Híbrida de FinOps 85/15**: Execute **85% do trabalho diário de engenharia** (exploração de repositório, refatorações, ciclos de testes, análise de logs, scaffolding) localmente a `$0` por token e reserve APIs de fronteira na nuvem estritamente para os **15% mais difíceis** (reescritas arquiteturais massivas de 40 arquivos ou condições de corrida distribuídas sutis). Essa divisão corta o gasto mensal com IA em **70–85%** sem sacrificar velocidade de entrega.

---

## Limitações Honestas e Modos de Falha

A IA local colapsa rapidamente se você fingir que uma workstation de 8 GB se comporta como um cluster de 8×H100. Mantenha estas seis restrições reais no centro da operação:

1. **O Penhasco dos 8 GB de VRAM**: Mesmo com `OLLAMA_FLASH_ATTENTION=1`, `OLLAMA_KV_CACHE_TYPE=q8_0` e `OLLAMA_NUM_PARALLEL=1`, `qwen3.5:9b` (`5.3 GiB` + projetor de visão de `880 MiB`) deixa pouca folga dentro de 8 GB de VRAM. Deixe `compaction.auto` + `prune` do OpenCode manterem as sessões abaixo de `32K`.
2. **Latência de Cold-Load no HDD SATA**: Armazenar o diretório `OLLAMA_MODELS` de **24 GB** em um HDD SATA mecânico (`~120–180 MB/s`) economiza capacidade valiosa no NVMe, **mas** o carregamento a frio de `qwen3-coder:30b` (`18 GB`) leva **~105–160 segundos** na primeira requisição do dia — exatamente por isso `OLLAMA_KEEP_ALIVE=30m` e `OLLAMA_MAX_LOADED_MODELS=2` são obrigatórios nessa configuração.
3. **Teto de 32 GB de RAM com `MAX_LOADED_MODELS=2`**: Manter tanto `qwen3.5:9b` quanto `qwen3-coder:30b` aquecidos funciona com folga em 32 GB de RAM durante programação, mas rodar stacks pesados de Docker Compose + emuladores Android simultaneamente pode pressionar a RAM; reduza para `OLLAMA_MAX_LOADED_MODELS=1` se também subir VMs pesadas.
4. **Deriva de Tool-Calling Abaixo de `Q4_K_M`**: Nunca rebaixe para `Q2_K` ou `Q3_K_S` apenas para encolher pesos. Quantização abaixo de 4 bits corrompe schemas JSON de tool-call dentro do OpenCode e dispara loops de repetição de edições.
5. **Teto de Raciocínio de Fronteira**: Em migrações multisserviço profundamente ambíguas envolvendo mais de 30 arquivos, modelos de fronteira na nuvem ainda fazem menos suposições erradas na primeira tentativa.
6. **Térmica e Acústica de Desktop**: Loops longos de testes agênticos mantêm uma RTX 3070 dual-fan em rotação constante. Impor um limite de potência limpo (por exemplo, `nvidia-smi -pl 190`) reduz ruído das ventoinhas e calor com impacto desprezível na velocidade.

---

## Pontos de Hardware: Máquina de Referência Dissecada e Matriz de Upgrade em 4 Estágios

### 1. A Largura de Banda de Memória Domina a Geração de Tokens

A decodificação de LLMs é esmagadoramente **limitada por largura de banda de memória**, não por poder de cálculo:
- **RTX 3070 GDDR6 (`448 GB/s`)**: Impulsiona turnos ágeis de `qwen3.5:9b` e `qwen3.5-fast:9b` quando as camadas cabem dentro dos 8 GB de VRAM.
- **DDR4-3600 Dual-Channel (`~45–55 GB/s` reais)**: Aproximadamente 8–10× mais lento que GDDR6, razão pela qual **apenas modelos MoE esparsos** (`3.3B` ativos por token no `qwen3-coder:30b`) permanecem práticos quando os experts residem na RAM do sistema.

### 2. Por que 32 GB DDR4-3600 Importam para o qwen3-coder:30b

Em uma workstation com 16 GB de RAM, carregar `qwen3-coder:30b` (`18 GB`) dispara imediatamente swap thrashing do SO em disco. **32 GB a 3600 MHz** atingem dois pontos ideais simultaneamente:
- Mantêm `~13–15 GB` de experts MoE em offload na RAM deixando memória intocada suficiente para Linux/Windows, sua IDE e servidores locais de desenvolvimento.
- Alinham-se ao Infinity Fabric do **Ryzen 7 3700X** (`1800 MHz` FCLK 1:1), evitando penalidades de latência entre clocks durante o roteamento MoE assistido pela CPU.

### 3. NVMe (SO/Repositórios) vs. SATA HDD (OLLAMA_MODELS): Escolhendo o Trade-Off

Armazenamento duplo (NVMe + HDD) impõe um trade-off prático de engenharia entre **espaço em disco** e **latência do primeiro carregamento**:

| Camada de Armazenamento | Leitura Sequencial | Carga Fria: `qwen3.5:9b` (`~6.2 GB` c/ `mmproj`) | Carga Fria: `qwen3-coder:30b` (`18 GB`) | Trade-Off e Mitigação |
|---|---|---|---|---|
| **HDD SATA (`OLLAMA_MODELS`)** | `~120–180 MB/s` | `~35–50 seg` | `~105–160 seg` | **Economiza 24+ GB no NVMe**; combine com `OLLAMA_KEEP_ALIVE=30m` e `MAX_LOADED_MODELS=2` para que a carga fria ocorra apenas uma vez por sessão |
| **SSD NVMe PCIe** | `~3.000–3.500 MB/s` | `~1.8–2.5 seg` | **`~5–7 seg`** | Ideal para repositórios Git ativos, camadas Docker e caches de build — e o upgrade #1 de qualidade de vida a custo zero se você liberar 25–40 GB no NVMe para modelos quentes |

### 4. Matriz de Progressão de Hardware em 4 Estágios

| Nível | Hardware Representativo | VRAM / Memória Unificada | Largura de Banda | O que Desbloqueia no OpenCode + Ollama |
|---|---|---|---|---|
| **Base (Esta Máquina)** | **RTX 3070 + Ryzen 7 3700X + 32 GB DDR4-3600 + NVMe/HDD** | `8 GB VRAM` + `32 GB RAM` | `448 GB/s` VRAM / `~50 GB/s` RAM | `qwen3.5:9b` + `qwen3.5-fast:9b` (`32K`) 100% na VRAM + MoE híbrido `qwen3-coder:30b` (`48K`) a `$0` de CapEx |
| **Nível 1: GPU de VRAM Intermediária** | RTX 4060 Ti 16 GB / 4070 Ti Super / 5070 Ti | `16 GB VRAM` | `288–896 GB/s` | `qwen3.5:9b` 100% na VRAM a `128K` de contexto + menos camadas MoE vazando para a RAM |
| **Nível 2: GPU Entusiasta** | RTX 3090 / RTX 4090 / RTX 5090 | `24–32 GB VRAM` | `936–1.792 GB/s` | **100% na VRAM** para `qwen3-coder:30b` e `qwen3.5:35b-a3b` + `qwen3.5:27b` denso em alto tok/s |
| **Nível 3: Máquina de Alta Memória** | Apple Silicon M3/M4 Max/Ultra ou Duas GPUs de 24 GB | `64–128 GB+` | `400–800+ GB/s` | Residência simultânea de múltiplos modelos na VRAM, pesos `Q6_K`/`Q8_0` e `qwen3.5:122b-a10b` |

---

## Quickstart de Produção e Trilha Complementar da Academy

Para replicar exatamente essa configuração no Linux em menos de dez minutos:

```bash
# 1. Inspecione GPU, RAM e ponto de montagem do disco de modelos
nvidia-smi && free -h && df -h /mnt/files

# 2. Aplique o override do systemd (/etc/systemd/system/ollama.service.d/override.conf) e reinicie
sudo systemctl daemon-reload && sudo systemctl restart ollama

# 3. Baixe os modelos base e crie a variante No-Think com 0 byte de overhead
ollama pull qwen3.5:9b
ollama pull qwen3-coder:30b
ollama create qwen3.5-fast:9b -f Modelfile.qwen35-fast

# 4. Verifique a divisão carregada entre VRAM/RAM após iniciar o OpenCode
opencode
ollama ps
```

Quer acompanhar o passo a passo completo em vídeo — incluindo profiling ao vivo de VRAM/RAM via `ollama ps` na máquina **RTX 3070 + Ryzen 7 3700X + 32 GB DDR4-3600 + NVMe/HDD** e sessões de refatoração com 4 agentes no OpenCode?

- **Aula Complementar da Academy**: [Stack Local de Coding com IA usando Ollama, OpenCode e Qwen 3.5](/academy/local-ai-coding-ollama-opencode-qwen3)
- **Parte 2 (Orquestração Cloud de Fronteira)**: [Dominando Modelos Gemini no Antigravity (agy): Arquitetura, Memória, Segurança e Limites Honestos](/blog/mastering-gemini-models-in-antigravity-agy)
- **Parte 3 (Manual de Comandos `/` do Antigravity)**: [O Manual de Campo Completo dos Comandos do Antigravity (agy): Cada Comando / Explicado](/blog/antigravity-agy-commands-complete-guide)
