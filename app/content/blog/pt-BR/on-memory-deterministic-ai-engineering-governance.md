---
title: "MemOn (antigo OnMemory): Memória Determinística para Engenharia de IA e Governança Zero-Leak"
slug: "on-memory-deterministic-ai-engineering-governance"
description: "Por dentro do MemOn (aldeon.app/mem-on): um protocolo de contexto de agentes de IA em 3 fases, registro de antipadrões em 5 campos, linter de memória client-side <20KB (economia de -83,6% em tokens) e bootstrapper CLI portátil sem dependências."
date: "2026-11-18"
tags: ["AI", "Agents", "Architecture", "DevOps", "Developer Tooling", "Security"]
lang: "pt-BR"
author: "Célio Vieira"
---

## O Gargalo da Engenharia de IA Multi-Repositório: Inchaço e Deriva de Contexto

Ao operar um ecossistema autônomo de ventures que abrange múltiplas superfícies web, clientes Expo React Native, stacks Terraform e backends serverless na AWS/GCP, agentes autônomos de código enfrentam dois modos de falha cumulativos:

1. **Deriva Arquitetural Entre Sessões**: Sem um registro compacto e canônico de decisões de stack travadas, um agente no dia 30 pode reintroduzir uma biblioteca obsoleta, quebrar regras de bundle SSR ou cruzar credenciais entre tenants de aplicações isoladas.
2. **Inchaço Ilimitado de Contexto**: Anexar toda nota de depuração em arquivos `MEMORY.md` ou `CLAUDE.md` massivos degrada a acurácia de recuperação, dispara truncamento de contexto no meio da sessão e desperdiça mais de **80% dos orçamentos de tokens de prompt** com histórico obsoleto.

Para padronizar como agentes autônomos inicializam, depuram e mantêm todos os **8 produtos da Aldeon** — e tornar esse fluxo portátil para repositórios externos —, construímos o **MemOn (`mem-on`, antigo OnMemory)** em [`aldeon.app/mem-on`](https://aldeon.app/mem-on) (com redirecionamentos permanentes `308` preservados a partir de `/on-memory`).

```text
┌────────────────────────────────────────────────────────────────────────────┐
│                     Fase 1: Verificação Pré-Voo (Pre-Flight)               │
│  Ler `MEMORY.md` alvo (<20KB) ──► Carregar Decisões Travadas e Limites     │
└──────────────────────────────────┬─────────────────────────────────────────┘
                                   ▼
┌────────────────────────────────────────────────────────────────────────────┐
│               Fase 2: Execução e Guardrail de Erro em 5 Campos             │
│  Casar Assinatura de Erro ──► Aplicar Solução Verificada (Zero Tentativa)  │
└──────────────────────────────────┬─────────────────────────────────────────┘
                                   ▼
┌────────────────────────────────────────────────────────────────────────────┐
│               Fase 3: Compactação Pós-Tarefa e Gate de Segurança           │
│  Rotacionar Últimas 5 Execuções • Arquivar ADRs Antigos • Impor <20KB      │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. O Schema Padrão de 4 Seções e o Teto Estrito Abaixo de 20KB

Todo repositório governado por `on-memory` mantém um `MEMORY.md` rotativo restrito estritamente abaixo de **20.000 bytes** (~200–300 linhas), alcançando uma **redução média de 83,6% na sobrecarga de tokens** em comparação com logs de projeto não estruturados.

O arquivo segue quatro seções determinísticas:

1. **`## 1. Decisions Locked (Do Not Re-ask)`**: Registro tabular de restrições arquiteturais imutáveis (por exemplo, regra zero-backend do React Router SSR, versões nativas C++ de animação fixadas, isolamento de tenant).
2. **`## 2. Active Tech Stack & Architecture`**: Runtimes exatos, fronteiras de armazenamento, rotas e gates de validação.
3. **`## 3. Known Anti-Patterns & Pitfalls (5-Field Format)`**: Todo bug não trivial resolvido é codificado em um schema rígido de 5 campos para que futuros agentes o reconheçam e contornem imediatamente:
   - **Sintoma / Assinatura de Erro**
   - **Antipadrão (NÃO REPETIR)**
   - **Causa Raiz**
   - **Solução Verificada**
   - **Escopo / Tags**
4. **`## 4. Recent Executions (Last 5)`**: Uma janela rotativa com as 5 últimas execuções contendo data, escopo de commit convencional e métricas exatas de testes/builds aprovados. ADRs narrativos mais antigos rotacionam de forma limpa para `docs/ADR_ARCHIVE.md`.

---

## 2. Lei de Segurança Zero-Leak ("Segurança é a Lei")

Como arquivos de memória são rotineiramente ingeridos em janelas de contexto de LLMs e versionados em repositórios Git, o **`on-memory` impõe higiene de credenciais air-gapped**:

- **Zero Segredos Brutos**: Chaves de API, JWTs, segredos de cliente OAuth, números de conta na nuvem, IDs de comerciante e strings de conexão privadas são estritamente proibidos em `MEMORY.md` e em bundles web públicos.
- **Placeholders Sanitizados**: Templates reutilizáveis impõem placeholders como `<PROJECT_ID>`, `<API_KEY>` e `https://api.example.com`.
- **Gate Automatizado de CI (`on-memory-security.test.ts`)**: Antes que qualquer alteração no portal seja implantada em produção, suítes de testes automatizadas varrem os conjuntos de dados em tempo de compilação (`onMemoryData.ts`) e artefatos de documentação usando auditorias regex, falhando o build imediatamente se um padrão de segredo ou identificador sensível aparecer.

---

## 3. CLI Portátil Sem Dependências (init-mem-on.mjs)

Para remover o atrito de onboarding em novos projetos, o `mem-on` inclui um scaffolder e auditor CLI em arquivo único e sem dependências para Node/Bun:

```bash
# Inicializa um novo projeto com arquitetura travada e antipadrões de 5 campos
node .agents/skills/mem-on/scripts/init-mem-on.mjs \
  --target ./my-new-product \
  --name "MyProduct" \
  --preset mobile-cloud

# Audita um MEMORY.md existente quanto ao orçamento <20KB e conformidade Zero-Leak
node .agents/skills/mem-on/scripts/init-mem-on.mjs \
  --audit ./MEMORY.md
```

Quatro presets de arquitetura testados em batalha codificam lições de todo o ecossistema Aldeon:
- **`monorepo`**: Monorepo de Ecossistema Multi-Produto (Portal Web + Apps Mobile + Serviços em Nuvem)
- **`mobile-cloud`**: App Mobile Expo React Native + Backend Serverless em Nuvem + Assinaturas RevenueCat
- **`edge-web`**: Plataforma Web Edge React 19 / SSR de Alto Desempenho mirando Lighthouse 95+
- **`fullstack`**: Serviço Web e API Full-Stack Moderno com Criptografia Envelope via KMS

---

## 4. Compositor Interativo de Stack e Linter Client-Side (aldeon.app/mem-on)

Além da CLI, o **MemOn** funciona como uma superfície viva de governança para desenvolvedores no portal web da Aldeon (`aldeon.app/mem-on`):

- **Compositor Interativo de Stack**: Gera scaffolds personalizados de `AGENTS.md`, `MEMORY.md`, `SKILL.md` e testes de segurança de CI diretamente no navegador para combinações de stack selecionadas.
- **Linter `<20KB` de Memória 100% Client-Side**: Engenheiros podem colar qualquer arquivo `MEMORY.md` ou `CLAUDE.md` diretamente na ferramenta do navegador para auditar a pegada em bytes frente ao limite de 20KB, validar a estrutura de antipadrões em 5 campos e varrer chaves ou tokens vazados **sem nunca enviar o conteúdo do arquivo pela rede**.
- **Registro Pesquisável de Antipadrões Cross-Ecossistema**: Expõe resoluções de engenharia sanitizadas e testadas em produção cobrindo stripping de `*.client.*` no React Router SSR, empacotamento StoreKit para Apple Review, clipping 3D de CALayer no iOS, ajuste de OOM no Gradle e publicação ProseMirror no Substack.

---

## Resultados em Produção

- **-83,6% de Sobrecarga de Tokens de Contexto**: Substitui logs históricos extensos de milhares de linhas por um estado arquitetural compacto `<20KB` de alto sinal.
- **Gate de 0% de Vazamento de Segredos**: Imposto automaticamente por suítes regex de CI e pelo linter client-side sem tráfego de rede.
- **Consistência Cross-Ecossistema**: Governa todos os 8 produtos da Aldeon (`SwanGo`, `RagOn`, `MemOn`, `HandSpeak`, `Be Your Stories`, `Pack`, `TATU Design`, `PostHub`) e repositórios externos a partir de um único protocolo determinístico.

*Experimente o Compositor Interativo de Stack e o Linter Client-Side ao vivo em [aldeon.app/mem-on](https://aldeon.app/mem-on).*
