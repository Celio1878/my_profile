---
title: "Dominando Modelos Gemini no Antigravity (agy): Arquitetura, Memória, Segurança e Limites Reais"
slug: "mastering-gemini-models-in-antigravity-agy"
description: "Guia de engenharia validado em campo para rodar os tiers do Gemini 4 (Hydrogen, Neon, Argon, Carbon) no Google Antigravity (agy) — cobrindo orquestração em duas fases, fluxos /plan + /grill-me, memória MemOn (<20KB), hooks, segurança de sandbox, armadilhas conhecidas e quando usar agy vs. Ollama + OpenCode local."
date: "2026-11-26"
tags: ["AI", "Agents", "Gemini", "Antigravity", "Security", "Architecture", "Developer Tooling"]
lang: "pt-BR"
author: "Célio Vieira"
---

## Por Que Modelos de Fronteira Ainda Sofrem Drift Sem Engenharia de Harness

Uma janela de contexto de 1 milhão de tokens não produz engenharia determinística automaticamente. Depois de colocar em produção os oito produtos do ecossistema **Aldeon** (`aldeon.app`) e manter o `celiovieira.com` com o **Google Antigravity** (`agy` CLI e Antigravity 2.0), os maiores saltos de produtividade nunca vieram de enviar um parágrafo vago para um modelo mais inteligente — eles vieram da engenharia do harness ao redor dele.

Sem estrutura, até um modelo de raciocínio de fronteira esquece a restrição de lint de ontem, tenta rodar cadeias de shell fora da sandbox que contornam fronteiras de aprovação, queima cota pensando demais em renomeações triviais de boilerplate e sofre drift ao longo de edições extensas em múltiplos arquivos. Quando você combina o tier certo do modelo **Gemini 4** com orquestração em duas fases, memória **MemOn** limitada (`<20KB`), lifecycle hooks determinísticos e higiene rigorosa de sandbox no SO, o mesmo workspace se transforma em um motor de entrega repetível.

Este blueprint documenta os padrões operacionais exatos, guardrails de segurança, camadas de memória, modos de falha reais e regras híbridas de roteamento nuvem vs. local nos quais confiamos em produção.

---

## Tiers dos Modelos Gemini 4 e Orquestração no Antigravity

Todo modelo da família **Gemini 4** compartilha uma **janela de contexto de 1M de tokens**, execução nativa de ferramentas, grounding com busca na web, computer use, saídas estruturadas e orçamentos de pensamento configuráveis (`low` → `medium` → `high` → `xhigh`). O que os separa na engenharia do dia a dia é latência, custo e profundidade de raciocínio por turno:

| Tier Gemini 4 | Identificador do Modelo | Thinking Budget | Perfil de Preço / Tier | Melhor Encaixe de Carga de Trabalho no Antigravity |
|---|---|---|---|---|
| **Gemini 4 Hydrogen** | `gemini-4-hydrogen` | `low`–`xhigh` | `$1.50 / 1M` entrada, `$7.50 / 1M` saída (tier gratuito de API disponível) | Fase de execução em alta velocidade, edições mecânicas em múltiplos arquivos, subagentes rápidos, loops de teste e correção, workers paralelos de `/swarm` |
| **Gemini 4 Neon** | `gemini-4-neon` | `low`–`xhigh` | Tier intermediário equilibrado entre Hydrogen e Carbon | Cavalo de batalha principal de agente de código: planejamento de funcionalidades, codebases analíticas, refatorações moderadas entre módulos |
| **Gemini 4 Argon** | `gemini-4-argon` | Raciocinador de lançamento inicial | Tier legado do Gemini 4 superado em código pelo Neon e pelo Hydrogen | Prosa estilística seletiva, redação editorial de formato longo e polimento de documentação onde a velocidade bruta de agente de código é secundária |
| **Gemini 4 Carbon** | `gemini-4-carbon` | `low`–`xhigh` | Flagship pesado de fronteira (tiers Pro / Ultra / Enterprise) | Arquitetura multiserviço de longo horizonte, depuração sutil de causa raiz distribuída e verificação anti-drift |

Casar o tier com a fase importa muito mais do que deixar tudo por padrão no flagship mais pesado. Rodar o **Carbon** com pensamento `xhigh` em ajustes de espaçamento CSS ou edições de JSON de i18n multiplica a latência de relógio e queima cota com ganho zero sobre o **Hydrogen**. Por outro lado, delegar um redesenho ambíguo de máquina de estados distribuída para um executor de baixo orçamento causa regressões silenciosas que custam três vezes mais turnos de recuperação.

### Orchestrator Mode em Duas Fases e Paralelismo com /swarm

O Antigravity resolve o trade-off entre custo e julgamento nativamente por meio do **Orchestrator Mode em duas fases** e do fan-out horizontal com **`/swarm`**:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                  TOPOLOGIA DE ORQUESTRAÇÃO DO ANTIGRAVITY (agy)             │
└─────────────────────────────────────────────────────────────────────────────┘

  [1. FASE DE PLANEJAMENTO — Planejador Read-Only: Gemini 4 Neon ou Carbon]
     ├─ Inspeciona codebase, MEMORY.md do MemOn (<20KB), AGENTS.md e schemas
     ├─ Executa /plan + /grill-me para resolver ambiguidades uma decisão por vez
     └─ Trava diffs exatos de arquivos + gate de verificação → entrega via exit_plan_mode
                                   │
                                   ▼
  [2. FASE DE EXECUÇÃO — Executor Rápido: Gemini 4 Hydrogen]
     ├─ Executa o plano aprovado com writes/edits paralelos em lote
     ├─ Executa gates lint → typecheck → testes unitários → build → smoke
     └─ Chama enter_plan_mode imediatamente se uma premissa quebrar duas vezes
                                   │
                                   ▼ (para trabalho independente multimódulo)
  [3. WORKERS HORIZONTAIS /swarm — Nós Paralelos Hydrogen / Especialistas]
     ├─ workspace: "inherit" → auditores read-only, verificadores, nós de pesquisa
     ├─ workspace: "share"   → autores concorrentes em git worktrees isoladas
     └─ workspace: "branch"  → sandboxes totalmente clonadas para experimentos arriscados
```

Manter o **Planejador** em modo somente leitura evita edições prematuras antes que casos de borda sejam resolvidos, enquanto deixar o **Hydrogen** executar um plano sem ambiguidades reduz drasticamente o consumo de tokens e o tempo de resposta. Quando uma tarefa se divide naturalmente entre pacotes ou locales independentes, `/swarm` cria workers paralelos com isolamento explícito de workspace (`inherit` para leitores, `share` ou `branch` para editores concorrentes) coordenados em um quadro compartilhado.

---

## Melhorando a Usabilidade e Boas Práticas Diárias de Engenharia

### 1. Alinhamento Spec-First com /plan e /grill-me

O hábito de maior alavancagem no Antigravity é invocar **`/plan` em par com `/grill-me`** antes de modificar um único arquivo em qualquer funcionalidade não trivial:

- `/plan` alterna a sessão para o modo de exploração somente leitura, obrigando o Gemini a verificar primeiro no disco os nomes exatos de símbolos, schemas e testes existentes.
- `/grill-me` percorre sequencialmente cada ramificação arquitetural em aberto em vez de despejar dez perguntas vagas de uma só vez — forçando trade-offs explícitos sobre roteamento, propriedade de estado, tratamento de falhas e critérios de verificação antes do início da geração de código.
- Uma vez aprovado, o modelo de execução recebe uma especificação concreta com gatilhos explícitos de **"Replanejar se"** em vez de improvisar decisões de design no meio da edição.

### 2. Divulgação Progressiva em Vez de Prompts Monolíticos

Despejar todo playbook de deploy, guia de design e schema de banco de dados em um prompt de sistema gigante na raiz infla cada turno e dilui a atenção. Estruture as instruções usando **divulgação progressiva**:

1. **Invariantes de raiz sempre ativos (`AGENTS.md` / `GEMINI.md`):** Mantenha apenas contratos não negociáveis do repositório (regras de gerenciador de pacotes, limites de segurança, gates de build/teste, requisitos de locale).
2. **Regras por diretório com escopo e menções `@`:** Coloque convenções específicas de subpastas próximas ao código que elas governam e referencie arquivos concretos via `@path` apenas quando relevante.
3. **Skills sob demanda (`.agents/skills/<name>/SKILL.md`):** O Antigravity injeta apenas o nome conciso e a descrição de cada skill na inicialização; o playbook completo em Markdown, scripts auxiliares e documentos de referência são carregados estritamente quando a tarefa corresponde ou o usuário os invoca. Regras com `trigger: model_decision` seguem a mesma disciplina de carregamento just-in-time, com deduplicação integrada evitando injeção dupla.

### 3. Comandos Compatíveis com Prefix Matching e Divisão Limpa de Cadeias

Ao aprovar comandos de terminal em sessões interativas de CLI, as regras de "Sempre Permitir" funcionam via **prefix matching de binário e subcomando** (por exemplo, aprovar `bun run build` generaliza de forma limpa). Padrões comuns de shell desabilitam silenciosamente o prefix matching e forçam novas solicitações por string exata a cada invocação — ou pior, arrastam etapas de build para fora da sandbox:

```bash
# ❌ RUIM: Expansão de subshell, variáveis, binários wrapper e escopo de sandbox misturado
TAG=$(git rev-parse --short HEAD) && env PORT=3100 bun run build && bun run smoke

# ✅ BOM Passo A (Em sandbox — compatível com prefix matching, auto-aprova de forma limpa):
bun run content:build && bun run lint && bun run typecheck && bun run test && bun run build

# ✅ BOM Passo B (Etapa mínima isolada de rede/bind de porta fora da sandbox):
bun run smoke
```

Evite substituições de comando `$(...)`, expansões `$VAR`, expansões de chaves (`{a,b}`), execução em background `&` no shell e wrappers `env` / `sudo` / `xargs` / `eval` sempre que existirem invocações literais diretas. Separar a compilação em sandbox da única etapa de bind de porta em localhost mantém tanto a UX de aprovação enxuta quanto o raio de impacto mínimo.

### 4. Agrupamento Paralelo de Ferramentas, Disciplina de /compact e Gates de Verificação

Cada turno conversacional reenvia o contexto, portanto turnos com uma única ferramenta desperdiçam latência e orçamento:

- **Agrupe operações independentes em paralelo:** Leia todos os módulos-alvo em um turno e depois aplique as edições independentes juntas.
- **Verifique em uma única cadeia determinística:** Execute `lint`, `typecheck`, `format:check`, testes unitários e `build` em um único comando encadeado após as edições finais, em vez de reexecutar checagens parcialmente após cada arquivo.
- **Use `/compact` proativamente:** Compacte threads exploratórias longas logo após a pesquisa estabilizar e antes de iniciar a implementação, preservando decisões fechadas enquanto recupera atenção limpa de trabalho.
- **Persista correções conquistadas com esforço usando `/learn`:** Sempre que corrigir um erro sutil de framework ou ferramental, execute `/learn` para que a lição seja promovida a regras ou skills duráveis em vez de desaparecer quando a sessão encerrar.

---

## Arquitetura de Memória: Impedindo o Gemini de Repetir os Mesmos Erros

A frustração número um relatada por engenheiros com agentes de código baseados em IA é corrigir exatamente a mesma peculiaridade duas vezes em sessões separadas. Resolver isso permanentemente exige compreender a **precedência de customização e os limites de tamanho** exatos do Antigravity.

O Antigravity resolve camadas de customização em ordem estrita de prioridade:

1. **Escopo de projeto do workspace** (`.agents/` e `AGENTS.md` / `GEMINI.md` hierárquicos subindo do CWD até a raiz do git) — maior precedência
2. **Manifestos declarados do projeto** (`skills.json`, `plugins.json`)
3. **Configuração global do usuário** (`~/.gemini/config/`)
4. **Padrões integrados e declarados globalmente**

Crucialmente, o Antigravity impõe **dois orçamentos rígidos sempre ativos**:
- **Limite por arquivo:** Máximo de **`24 KB` (`24.000` bytes)** por arquivo de regra *após* expandir inclusões `@[label](path)` (arquivos acima do limite são truncados nas quebras de linha).
- **Limite agregado de regras:** **`20.000` tokens** somando todas as regras sempre ativas (regras excedentes são silenciosamente rebaixadas de texto inline para meros ponteiros de caminho de arquivo).

Essa restrição arquitetural é a razão exata pela qual projetamos o **MemOn** (`aldeon.app/mem-on`, detalhado em [MemOn: Governança Determinística de Engenharia de IA Abaixo de 20KB](/blog/on-memory-deterministic-ai-engineering-governance)) com um teto rígido de **`<20KB` (`20.480` bytes)** no `MEMORY.md`. Permanecer abaixo de `20 KB` preserva margem garantida abaixo do limiar de truncamento de `24 KB` do Antigravity para que restrições críticas **nunca** sejam descartadas silenciosamente no meio do arquivo.

```markdown
# Contrato de Memória em Camadas do Antigravity (Sempre <20KB de Contexto Quente Total)

1. AGENTS.md / GEMINI.md   → Invariantes imutáveis do repo, matriz de stack e gates de verificação
2. MEMORY.md (MemOn <20KB) → Quatro tabelas operacionais limitadas:
   - Decisões Travadas     (escolhas arquiteturais já consolidadas)
   - Stack Ativa           (versões exatas: React Router 8, Tailwind v4, Bun 1.3+)
   - Anti-Padrões          (entradas de 5 campos: ID, Sintoma, Causa Raiz, Regra de Prevenção, Escopo)
   - Últimas 5 Execuções   (último estado verificado para sessões retomarem sem redescoberta)
3. .agents/skills/*/       → Runbooks profundos de tarefas carregados estritamente sob demanda
```

### Bugs Reais Eliminados Permanentemente na Aldeon e em celiovieira.com

Registrar **entradas concretas de anti-padrões em 5 campos** no `MEMORY.md` impediu o Gemini de reintroduzir exatamente estes bugs de produção ao longo de dezenas de sessões subsequentes:

- **Hidratação SSR no React Router e Isolamento `*.client.*`:** Globais exclusivos do navegador (`window`, `document`, `localStorage`, `navigator.share`) causavam incompatibilidades de hidratação SSR até serem travados atrás de guardas explícitas `typeof window !== "undefined"` e effects pós-montagem.
- **ESLint 9 `react-hooks/set-state-in-effect`:** Chamadas síncronas a `setMenuOpen(false)` dentro de hooks `useEffect` de mudança de rota disparavam falhas de lint por renderização em cascata até serem padronizadas com `queueMicrotask(() => setMenuOpen(false))`.
- **Tipografia e Mudanças de Sintaxe do Tailwind CSS v4:** A ausência de `@plugin "@tailwindcss/typography"` deixava listas e tabelas de artigos `.prose` completamente sem estilização, e passos de espaçamento inválidos (`py-0.2` em vez de múltiplos de `0.25`) geravam zero CSS — ambos prevenidos permanentemente por entradas explícitas no `MEMORY.md`.
- **Bug de Parsing de Tokens Inline do `marked` v18:** Renderizadores customizados de parágrafo/cabeçalho lendo `token.text` bruto vazavam strings literais `**bold**` pelos artigos até serem trocados para `this.parser.parseInline(tokens)` dentro de um pipeline em tempo de build.
- **Disciplina de Deploy:** Misturar bypasses manuais com `vercel --prod` e merges de produção via Git causava drift entre preview e branch — bloqueado permanentemente com uma regra explícita restringindo deploys a pushes Git verificados.

---

## Segurança, Isolamento de Sandbox e Lifecycle Hooks

### Motor de Permissões e Sandbox de Terminal do SO

O Antigravity governa invocações de ferramentas usando regras de permissão `action(target)` com escopo de recurso avaliadas com precedência estrita:

**`Deny` > `Ask` > `Allow`**

Nenhuma regra permissiva pode jamais sobrescrever uma regra explícita `Deny`. Junto com as permissões, a **Sandbox de Terminal** do Antigravity impõe isolamento em nível de SO por padrão — concedendo acesso de leitura/escrita dentro do workspace ativo e `/tmp`, enquanto bloqueia chamadas de rede de saída e caminhos arbitrários do sistema de arquivos do host entre presets (`Default`, `Auto`, `Request Review` e `Turbo`).

Mantenha quatro regras de segurança do mundo real como não negociáveis:

1. **Nunca combine `--dangerously-skip-permissions` casualmente com caminhos de escape da sandbox:** Flags automatizadas em modo headless podem auto-aprovar requisições `bypassSandbox: true` e anular a contenção do SO em repositórios não confiáveis.
2. **Lembre-se da separação de config entre CLI e Desktop:** A CLI de terminal (`~/.gemini/antigravity-cli/settings.json`) e o Antigravity 2.0 Desktop mantêm armazenamentos de permissões e configurações **separados**. Uma regra `Deny` salva na UI Desktop não protege automaticamente invocações isoladas da CLI `agy` — espelhe regras críticas de segurança em hooks em nível de projeto ou em ambas as configurações.
3. **Minimize a execução fora da sandbox:** Isole apenas o comando exato que genuinamente precisa de bind de porta em localhost ou acesso autenticado em nuvem (como `bun run smoke` ou `gh`). Nunca execute `bun install`, builds ou suítes de testes fora da sandbox apenas para economizar a divisão de uma linha de shell.
4. **Higiene Zero-Leak nos arquivos de memória do repo:** Nunca cole chaves de API, cookies de sessão, segredos de `.env` ou nomes de usuário locais do host em `AGENTS.md`, `MEMORY.md` ou skills rastreadas por commit — combine cada repositório com varreduras automatizadas de segredos por regex no CI.

### Guardrails Determinísticos com .agents/hooks.json

Quando regras de prompt são apenas consultivas, **lifecycle hooks** em `.agents/hooks.json` são gates de execução determinística. O Antigravity expõe hooks `SessionStart`, `PreToolUse`, `PostToolUse`, `PreInvocation`, `PostInvocation` e `Stop` comunicando-se via JSON em camelCase sobre stdin/stdout:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "run_command",
        "hooks": [
          {
            "type": "command",
            "command": "node -e 'const d=JSON.parse(require(\"fs\").readFileSync(0,\"utf8\"));const c=d.toolInput?.CommandLine||\"\";if(/rm\\s+-rf\\s+\\/|curl.*(\\.env|TOKEN)/.test(c)){console.log(JSON.stringify({decision:\"deny\",reason:\"Blocked destructive or secret-exfiltrating command\"}));}else if(/vercel\\s+--prod|git\\s+push\\s+--force/.test(c)){console.log(JSON.stringify({decision:\"ask\",reason:\"Confirm production deploy or force push\"}));}'",
            "timeout": 3000
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "write_file|edit_file",
        "hooks": [
          {
            "type": "command",
            "command": "node -e 'const d=JSON.parse(require(\"fs\").readFileSync(0,\"utf8\"));const p=d.toolInput?.Path||\"\";if(/\\.(ts|tsx|md)$/.test(p)){require(\"child_process\").execFileSync(\"bunx\",[\"prettier\",\"--check\",p],{stdio:\"inherit\"});}'",
            "timeout": 10000
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node -e 'const d=JSON.parse(require(\"fs\").readFileSync(0,\"utf8\"));if(d.continuationActive)process.exit(0);try{require(\"child_process\").execFileSync(\"bun\",[\"run\",\"typecheck\"],{stdio:\"pipe\"});}catch{console.log(JSON.stringify({decision:\"continue\",reason:\"TypeScript validation failed. Fix typecheck errors before finishing.\"}));}'",
            "timeout": 25000
          }
        ]
      }
    ]
  }
}
```

Vale conhecer três restrições práticas de hooks logo de início: os hooks do Antigravity atualmente suportam **apenas `type: "command"`** (sem endpoints HTTP ou avaliadores de prompt), executam **de forma síncrona e bloqueante** (portanto `PreToolUse` e `PostToolUse` precisam permanecer rápidos para evitar travar cada edição) e **devem inspecionar `continuationActive`** dentro de hooks `Stop` para que uma verificação com falha dispare um turno limitado de recuperação em vez de um loop infinito.

---

## Problemas Reais, Pontos de Atrito e Modos de Falha

Mesmo configurações bem ajustadas do Antigravity encontram arestas cortantes na engenharia do dia a dia:

1. **Degradação de contexto muito antes de 1M de tokens:** A recordação do modelo degrada visivelmente assim que saídas ruidosas de ferramentas e stack traces se acumulam acima de ~150K–250K tokens. Pular `/compact` entre a pesquisa e a implementação leva a restrições esquecidas mesmo estando teoricamente bem dentro do teto de 1M.
2. **Bloqueios de localhost e bind de porta na sandbox (`403`):** Rodar suítes de smoke SSR de produção (`smoke-ssr.ts` subindo `http://localhost:3100`) dentro da sandbox de terminal padrão falha imediatamente com erros de socket/HTTP `403`. Até que você separe a verificação de build da única etapa de smoke fora da sandbox, os agentes travam ou "corrigem" erroneamente código de servidor que está funcionando.
3. **Divergência entre configurações de CLI e Desktop:** Editar presets de sandbox ou allowlists dentro do Antigravity Desktop e se perguntar por que comandos `agy` no terminal ainda pedem confirmação — ou vice-versa — decorre diretamente de armazenamentos de configuração separados.
4. **Hooks síncronos lentos gargalando loops:** Colocar uma suíte de testes completa de 30 segundos dentro de `PostToolUse` adiciona 30 segundos após *cada única edição de arquivo*. Mantenha hooks por ferramenta abaixo de um segundo (checagens rápidas de sintaxe/regex/formatação) e reserve typechecks completos e builds para comandos explícitos de verificação ou `Stop`.
5. **Desperdício de cota por over-tiering:** Deixar sessões fixadas no **Gemini 4 Carbon** com pensamento `xhigh` para atualizações diretas de documentação ou refatorações mecânicas desacelera a iteração em 3–5× sem ganho de qualidade sobre o **Hydrogen**.
6. **Regressões silenciosas quando não existem testes:** O Gemini escreve TypeScript plausível rapidamente — o que significa que um caso de borda em um tagger de regex, chave de dicionário i18n ou rota RSS pode ir para o ar normalmente se seu comando de verificação checar apenas compilação em vez de testes semânticos (`tests/academy.test.ts`, `audit:content`, `smoke-ssr.ts`).

---

## Para Que Funciona vs. Para Que NÃO Funciona

| Funciona Excepcionalmente Bem Para | NÃO Funciona Bem Para (Ou Exige Gates Rígidos) |
|---|---|
| **Migrações full-stack em múltiplos arquivos** (upgrades do React Router, transições para Tailwind v4, pipelines de markdown em tempo de build) | **Repositórios sob NDA estritos air-gapped com zero egress** onde a política proíbe bytes de código-fonte saindo de `127.0.0.1` |
| **Engenharia greenfield guiada por especificação** usando `/plan` + `/grill-me` + Orchestrator Mode em duas fases | **Mutações desprotegidas em banco de produção, IAM, DNS ou faturamento** sem gates explícitos `Deny` / `Ask` |
| **Auditorias em todo o repositório e remediação de qualidade** cobrindo segurança, acessibilidade, paridade SSR e chaves i18n | **Loops autônomos de múltiplas horas sem testes** — agentes otimizam para aquilo que conseguem medir |
| **Refatorações paralelas com `/swarm`** com worktrees isoladas `share` / `branch` e workers verificadores | **Aprovação pixel-accurate de UI/UX** sem inspeção em navegador ao vivo, screenshots ou revisão visual |
| **Pontes estruturadas entre pesquisa e implementação** aproveitando grounding web e síntese cross-repo de 1M de tokens | **Boilerplate trivial de alta frequência** em grande volume de tokens onde inferência local a `$0` termina mais rápido |

---

## Matriz de Decisão: Antigravity (Gemini) vs. IA Local (Ollama + OpenCode)

Em vez de tratar agentes de fronteira na nuvem e modelos locais open-weight como religiões concorrentes, nossa engenharia em produção divide as cargas de trabalho deliberadamente entre o **Antigravity (`agy` + Gemini 4)** e nossa **Stack Local de IA (`Ollama` + `OpenCode` + `Qwen 3.5` / `Qwen3-Coder`)** rodando em uma workstation RTX 3070 de 8 GB:

| Dimensão | Antigravity (`agy` + Gemini 4) | IA Local (`Ollama` + `OpenCode` + `Qwen3`) | Divisão Híbrida Vencedora |
|---|---|---|---|
| **Privacidade de Dados / Air-Gap** | Inferência via API em nuvem (execução em host com sandbox) | **100% local `127.0.0.1`** — zero bytes saem do disco | **IA Local** para schemas sob NDA, topologias `.env` e logs de incidentes de clientes |
| **Janela de Contexto e Síntese** | **1M de tokens** em todos os tiers do Gemini 4 | Orçamento prático local de `16K–48K` (cache KV `q8_0` em 8 GB VRAM + 32 GB RAM) | **Antigravity** para auditorias completas de repo e planejamento cross-service |
| **Arquitetura Multi-Arquivo e Pesquisa** | **Neon / Carbon** + `/plan` + `/grill-me` + `/swarm` + busca web | Bom planejamento estruturado (`qwen3-coder:30b` MoE) em repositórios únicos | **Antigravity (20–30%)** para spikes complexos de design e upgrades de framework |
| **Edições Iterativas Diárias e Loops de Teste** | Rápido no **Hydrogen**, limitado por cota e latência de API | **Loops ilimitados com zero tokens pagos** (`qwen3.5-fast:9b` a ~60–80 tok/s) | **IA Local (70–80%)** para ciclos diários de TDD, utilitários e trabalho offline em viagem |
| **Memória Compartilhada de Engenharia** | `AGENTS.md` + **MemOn (`<20KB`)** (ciente do limite de `24KB`) | Lê exatamente o mesmo contrato `AGENTS.md` + `MEMORY.md` | **Única Fonte de Verdade MemOn** compartilhada perfeitamente entre ambos os harnesses |

Quando ambos os harnesses leem **exatamente o mesmo contrato `<20KB` de `AGENTS.md` e `MEMORY.md`**, alternar de uma sessão de planejamento na nuvem com **Gemini 4 Neon/Carbon** no Antigravity para um sprint offline de execução com **OpenCode + Qwen 3.5** exige zero onboarding duplicado. Cada decisão arquitetural travada, peculiaridade do Tailwind e regra de segurança permanece portável entre modelos, hardware e orçamentos.

---

### Continue a Série de Engenharia

- **Parte 1 (Execução Local com Zero Tokens):** [Construindo uma Stack Local de Programação com IA Usando Ollama, OpenCode, Qwen 3.5 e Qwen3-Coder](/blog/local-ai-coding-stack-ollama-opencode-qwen3)
- **Parte 3 (Manual de Comandos Slash `/` do Antigravity):** [O Manual de Campo Completo dos Comandos Slash do Antigravity (agy): Cada Comando / Explicado](/blog/antigravity-agy-slash-commands-complete-guide)
- **Governança Determinística de Memória (`<20KB`):** [MemOn: Governança Determinística de Engenharia de IA Abaixo de 20KB](/blog/on-memory-deterministic-ai-engineering-governance)
- **Arquitetura de Recuperação Air-Gapped:** [RagOn: Estúdio RAG Air-Gapped com Zero Vazamento](/blog/ragon-air-gapped-zero-leak-rag-studio)
- **Lição Complementar na Academy:** [RagOn e MemOn: Estúdio RAG Air-Gapped com Zero Vazamento e Governança de Agentes Abaixo de 20KB](/academy/private-rag-onmemory-agent-governance)
