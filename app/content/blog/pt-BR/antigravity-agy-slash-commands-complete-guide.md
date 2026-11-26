---
title: "O Manual de Campo Completo dos Comandos Slash do Antigravity (agy): Cada Comando / Explicado"
slug: "antigravity-agy-slash-commands-complete-guide"
description: "Detalhamento completo de todos os 47 comandos slash oficiais do Google Antigravity (agy) — cobrindo planejamento (/plan, /grill-me, /goal), orquestração multiagente (/swarm, /teamwork, /boost), higiene de contexto (/compact, /fork, /rollback, /btw), segurança e ferramentas (/permissions, /hooks, /mcp, /learn), playbooks de encadeamento e criação de comandos / customizados via .agents/skills/."
date: "2026-11-26"
tags: ["AI", "Agents", "Antigravity", "Gemini", "Developer Tooling", "CLI", "Architecture"]
lang: "pt-BR"
author: "Célio Vieira"
---

## Por Que Comandos Slash São o Plano de Controle do Antigravity (agy)

Digitar linguagem natural em um prompt de terminal entrega autocompletar; digitar `/` dentro do Google Antigravity (`agy`) abre o plano de controle com typeahead que transforma um loop de chat aberto em transições explícitas de estado de engenharia.

Na **Parte 1** ([Stack Local de Programação com IA](/blog/local-ai-coding-stack-ollama-opencode-qwen3)) e na **Parte 2** ([Dominando Modelos Gemini no Antigravity](/blog/mastering-gemini-models-in-antigravity-agy)), cobrimos roteamento de hardware/modelo, Orchestrator Mode em duas fases, governança limitada `<20KB` com MemOn e execução em sandbox. Este **Manual de Campo Parte 3** detalha cada um dos **47 comandos slash oficiais integrados da TUI do `agy`**, agrupa-os por categoria operacional, documenta playbooks comprovados de encadeamento de comandos, destaca armadilhas comuns e mostra como criar seus próprios comandos `/` customizados usando pacotes modernos em `.agents/skills/`.

---

## Matriz Completa de Referência Rápida dos Comandos Slash do Antigravity (agy)

Digitar `/` abre uma paleta interativa filtrável dentro da UI de terminal do `agy` (e no canvas de chat do Antigravity 2.0). Aqui está a referência completa dos 47 comandos organizada entre planejamento, raciocínio, ciclo de vida da conversa, ferramental/governança, navegação no workspace, configuração de modelos e utilitários:

| Comando | Alias | Categoria | Propósito Principal |
|---|---|---|---|
| `` `/plan <task>` `` | — | **Planejamento e Execução** | Explora a codebase, esclarece requisitos e redige um Plano de Implementação revisável antes das edições |
| `` `/grill-me <task>` `` | — | Planejamento e Execução | Entrevista o usuário uma pergunta por vez (com respostas recomendadas) para resolver ambiguidades |
| `` `/goal <task>` `` | — | Planejamento e Execução | Executa autonomamente sem pausas intermediárias até que o objetivo seja verificado como concluído |
| `/effort` | — | Raciocínio | Define ou inspeciona o nível de esforço de raciocínio do modelo ativo (`low` até `max` / `xhigh`) |
| `` `/boost <task>` `` | — | Raciocínio | Raciocínio profundo multiagente sob demanda para bugs complexos, condições de corrida e algoritmos (tiers pagos) |
| `` `/swarm <task>` `` | — | Orquestração Multiagente | Cria um coordenador + workers paralelos nomeados + `@verifier` em um quadro compartilhado |
| `/teamwork` | — | Orquestração Multiagente | Times autônomos de agentes guiados por blueprint para projetos multi-arquivo/multidias (Pro/Ultra) |
| `` `/compact [message]` `` | — | Conversas | Resume a conversa em um checkpoint e opcionalmente continua com `<message>` |
| `/clear` | `/new` | Conversas | Limpa o terminal e reinicia o contexto ativo da conversa |
| `/resume` | `/switch` | Conversas | Abre seletor interativo de threads para buscar e carregar sessões anteriores do workspace |
| `/fork` | `/branch` | Conversas | Clona o histórico da conversa ativa em uma sessão paralela independente |
| `/rollback` | — | Conversas | Retrocede o histórico da conversa até uma mensagem/turno anterior |
| `` `/rename <title>` `` | — | Conversas | Renomeia a thread da conversa ativa |
| `/title` | — | Conversas | Alterna ou atualiza o rastreamento do título da janela do terminal |
| `` `/btw <query>` `` | — | Contexto / Utilitários | Faz uma pergunta paralela em segundo plano sem poluir ou pausar a thread principal |
| `` `/copy [n|btw]` `` | — | Utilitários | Copia a última resposta, a *n*-ésima resposta mais recente ou a resposta mais recente de `/btw` |
| `/agents` | — | Ferramentas e Tarefas | Abre o Agent Manager para alternar agentes customizados e monitorar subagentes em background |
| `/tasks` | — | Ferramentas e Tarefas | Abre o Task Manager para monitorar processos de shell em background e logs |
| `` `/schedule <cron> <cmd>` `` | — | Ferramentas e Tarefas | Registra um timer único ou agendamento cron recorrente que desperta o agente |
| `` `/browser <task>` `` | — | Ferramentas e Tarefas | Delega automação de navegador, checagens de DOM e depuração de UI para o subagente de browser |
| `/artifact` | — | Ferramentas e Tarefas | Abre o painel interativo Artifact Review para planos, walkthroughs e relatórios |
| `/permissions` | — | Ferramentas e Segurança | Abre o painel interativo de permissões de ferramentas (`Deny > Ask > Allow`) |
| `/hooks` | — | Ferramentas e Segurança | Navega pelos hooks de ciclo de vida ativos (`PreToolUse`, `PostToolUse` e `Stop`) |
| `/mcp` | — | Ferramentas e Tarefas | Abre o gerenciador de servidores Model Context Protocol (MCP) |
| `/skills` | — | Ferramentas e Tarefas | Lista skills locais/globais; execute `/skills reload` para recarregar skills do disco a quente |
| `/plugins` | — | Ferramentas e Tarefas | Abre o Plugins Manager ou executa inline `install`, `uninstall`, `enable`, `disable`, `list` |
| `/learn` | — | Ferramentas e Memória | Captura correções da sessão como regras ou skills persistentes via proposta revisável |
| `` `/agy-customizations [req]` `` | — | Ferramentas e Tarefas | Carrega o guia de customização para construir, corrigir ou auditar regras, skills, plugins, hooks e MCP |
| `` `/add-dir <path>` `` | — | Workspace | Anexa um caminho de diretório adicional ao workspace ativo |
| `` `/codesearch <query>` `` | `/cs`, `/search` | Workspace | Abre painel interativo de Code Search em streaming por todo o workspace |
| `/diff` | — | Workspace / Revisão | Abre visualizador interativo Diff/Review para inspecionar turnos, diffs e commits linha a linha |
| `` `/open <path>` `` | — | Workspace | Abre o arquivo ou diretório alvo no editor padrão do sistema operacional |
| `/context` | — | Workspace / Contexto | Visualiza a alocação de tokens e saturação da janela de contexto em tempo real |
| `` `/model [model]` `` | — | Configuração | Alterna o modelo padrão persistente ou executa one-shot `` `/model <model> <prompt>` `` |
| `/config` | `/settings` | Configuração | Abre o overlay interativo do Settings Editor |
| `/keybindings` | — | Configuração | Abre o editor interativo de atalhos de teclado |
| `/statusline` | — | Configuração | Abre o overlay de customização do layout da barra de status |
| `/usage` | — | Conta | Exibe o uso atual de cota por modelo |
| `/credits` | — | Conta | Visualiza créditos de IA restantes e links de recarga |
| `/logout` | — | Conta | Desconecta a conta e limpa tokens de autenticação do keyring seguro |
| `/remote` | — | Utilitários | Alterna capacidades de Remote Control / sessão de agente remoto |
| `/voice` | — | Utilitários | Fala ao vivo (`/voice live`) ou dita prompts (`/voice dictate`) |
| `` `/antigravity-guide [q]` `` | — | Utilitários | Consulta a documentação integrada e o sitemap para ajuda de configuração do Antigravity |
| `/changelog` | — | Utilitários | Abre o visualizador de notas de lançamento (ou imprime mudanças da CLI em modo headless) |
| `/feedback` | — | Utilitários | Abre o painel de envio de feedback do produto |
| `/help` | — | Utilitários | Exibe o painel de ajuda com comandos e atalhos de teclado |
| `/exit` | `/quit` | Utilitários | Encerra a sessão da TUI do `agy` de forma limpa (equivalente a `Ctrl+D Ctrl+D`) |

---

## Categoria 1: Planejamento, Raciocínio e Orquestração Multiagente

Estes sete comandos controlam **como** o Antigravity pensa, esclarece requisitos e distribui trabalho antes ou durante a execução:

- **`/plan`** `` `<task>` `` — Alterna o agente para o modo de exploração somente leitura para inspecionar arquivos, verificar schemas/símbolos no disco e escrever um Plano de Implementação revisável antes de modificar uma única linha de código. Em configurações de Orchestrator em duas fases, **Gemini 4 Neon** ou **Carbon** cuida do `/plan` antes de passar a execução para o **Hydrogen**.
- **`/grill-me`** `` `<task>` `` — Força o alinhamento interativo sequencial: o Gemini percorre cada ramificação da sua árvore de design fazendo uma pergunta clara por vez (pré-preenchida com uma resposta recomendada) até que toda ambiguidade seja resolvida. Encadear `/plan /grill-me <task>` é o padrão ouro para funcionalidades não triviais.
- **`/goal`** `` `<task>` `` — Remove pausas intermediárias de confirmação para que o agente avance autonomamente até que seus critérios explícitos de verificação passem (seguro apenas quando respaldado por testes automatizados reais ou gates de build).
- **`/effort`** — Ajusta ou inspeciona a profundidade de pensamento (`low`, `medium`, `high`, `max` / `xhigh`) por modelo. Reduzir `/effort` em refatorações diretas corta bruscamente a latência de relógio; aumentá-lo ajuda em casos sutis de concorrência ou compilador.
- **`/boost`** `` `<task>` `` — Dispara rodadas de raciocínio profundo multiagente sob medida para condições de corrida difíceis, bugs sutis de algoritmo ou máquinas de estado legadas emaranhadas (disponível em planos pagos qualificados).
- **`/swarm`** `` `<task>` `` — Converte sua sessão ativa em um coordenador criando workers nomeados (por exemplo `@worker-1`, `@api-tests`) mais um agente `@verifier` comunicando-se em um quadro compartilhado através de contextos isolados limpos (`inherit`, `share` ou `branch`).
- **`/teamwork`** — Lança times autônomos de agentes guiados por blueprint em tiers suportados (Google AI Pro/Ultra), onde papéis especialistas propõem, criticam e refinam refatorações de múltiplos dias ou migrações entre serviços.

### Escolhendo Entre /plan, /goal, /boost, /swarm e /teamwork

| Comando | Melhor Escopo | Pontos de Checagem Humanos | Topologia Multiagente | Consumo de Cota |
|---|---|---|---|---|
| **`/plan`** | Funcionalidade única, correção de bug ou migração escopada | Revisão e aprovação antes das edições | Planejador único → executor rápido | Baixo–Médio |
| **`/goal`** | Loops bem testados de build/correção com critérios objetivos de CI | Apenas gate final de conclusão | Loop autônomo único | Médio |
| **`/boost`** | Análise profunda de causa raiz em bugs difíceis ou algoritmos | Relatório interativo de achados | Loop multiagente de raciocínio profundo | Alto |
| **`/swarm`** | Mudanças paralelas entre arquivos/pacotes independentes | Plano do coordenador + diff do `@verifier` | Coordenador + *N* workers + `@verifier` | Médio–Alto |
| **`/teamwork`** | Construções greenfield de múltiplos dias ou migrações cross-repo | Revisões por marco | Time dinâmico de agentes autocrítico | Alto (Pro/Ultra) |

---

## Categoria 2: Ciclo de Vida da Conversa e do Contexto

Degradação de contexto e threads poluídas descarrilam sessões longas silenciosamente. Estes nove comandos oferecem controle cirúrgico sobre o estado da conversa:

- **`/compact`** `` `[message]` `` — Resume a sessão ativa em um checkpoint denso carregando decisões consolidadas, caminhos de arquivos verificados e bloqueios em aberto enquanto recupera margem de contexto. Anexar um prompt opcional (por exemplo `/compact Implement Step 2 now using the verified schema`) retoma o trabalho em uma etapa sem perder ritmo.
- **`/clear`** (alias **`/new`**) — Limpa a janela da conversa ativa de forma enxuta ao pivotar para uma tarefa não relacionada, garantindo que zero contexto antigo vaze para o novo prompt.
- **`/resume`** (alias **`/switch`**) — Abre um seletor interativo com escopo no diretório do seu workspace para buscar e recarregar sessões anteriores; pressione `F2` diretamente dentro do seletor para renomear threads salvas.
- **`/fork`** (alias **`/branch`**) — Clona o histórico da conversa ativa até o turno atual exato em uma thread paralela independente. Sempre execute `/fork` *antes* de tentar uma refatoração especulativa para que sua linha de base limpa permaneça intacta.
- **`/rollback`** — Retrocede na thread atual para desfazer chamadas de ferramentas indesejadas ou caminhos errados sem jogar fora a pesquisa anterior.
- **`/rename`** `` `<title>` `` — Atribui um título legível para humanos para que você localize sessões críticas semanas depois dentro de `/resume`.
- **`/title`** — Alterna ou configura a sincronização ao vivo do título da aba/janela do terminal para gerenciar múltiplas abas do `agy`.
- **`/btw`** `` `<query>` `` — Executa uma pergunta paralela fora de banda sem pausar nem poluir o histórico de ferramentas da conversa principal — ideal para checar uma peculiaridade de sintaxe no meio de uma refatoração.
- **`/copy`** `` `[n|btw]` `` — Copia a resposta mais recente, o *n*-ésimo turno mais recente ou sua última resposta lateral de `/btw` diretamente para a área de transferência do sistema.

---

## Categoria 3: Ferramentas, Automação, Governança e Segurança

Doze comandos slash conectam capacidades externas, execução em background e controles determinísticos de segurança ao Antigravity:

- **`/agents`** — Abre o overlay Agent Manager para inspecionar subagentes em execução, IDs de conversa e definições de agentes customizados.
- **`/tasks`** — Monitora execuções de shell em background iniciadas de forma assíncrona (servidores dev, runners de teste, builds) e transmite seus logs ao vivo.
- **`/schedule`** `` `<cron> <cmd>` `` — Registra agendamentos cron recorrentes de 5 campos ou timers únicos com atraso que despertam o `agy` com um prompt de instrução.
- **`/browser`** `` `<task>` `` — Entrega navegação web, inspeção de DOM, verificações por screenshot e depuração de Core Web Vitals para um subagente dedicado de navegador.
- **`/artifact`** — Abre o visualizador Artifact Review para inspecionar planos de implementação estruturados, auditorias de arquitetura ou entregáveis `walkthrough.md`.
- **`/permissions`** — Editor interativo para regras `action(target)` avaliadas sob precedência estrita **`Deny > Ask > Allow`** além de presets da sandbox de terminal (`Default`, `Auto`, `Request Review`, `Turbo`).
- **`/hooks`** — Inspeciona hooks de ciclo de vida ativos definidos em `.agents/hooks.json` (`SessionStart`, `PreToolUse`, `PostToolUse`, `PreInvocation`, `PostInvocation`, `Stop`).
- **`/mcp`** — Gerencia servidores Model Context Protocol (MCP) configurados, status e ferramentas/recursos externos expostos.
- **`/skills`** — Lista Agent Skills locais e globais descobertas; execute **`/skills reload`** imediatamente após editar ou criar um `SKILL.md` para que o Antigravity o registre sem reiniciar a sessão.
- **`/plugins`** — Plugins Manager interativo com suporte a subcomandos inline (`install`, `uninstall`, `enable`, `disable`, `list`) para pacotes de skills, regras, hooks e presets MCP.
- **`/learn`** — Destila correções ou soluções alternativas verificadas da sua conversa atual em uma proposta revisável de regra ou skill — alimentando diretamente sua camada de governança **MemOn** `<20KB` para que o mesmo erro nunca aconteça duas vezes.
- **`/agy-customizations`** `` `[request]` `` — Injeta a especificação oficial de customização para que o agente possa criar ou depurar com segurança `.agents/rules/`, `skills/`, `plugins/`, `hooks.json` e configs MCP.

---

## Categoria 4: Navegação no Workspace, Busca de Código e Revisão

Cinco comandos de workspace eliminam a troca manual de contexto entre terminal, grep e ferramentas de diff da IDE:

- **`/add-dir`** `` `<path>` `` — Monta um diretório local adicional no escopo do workspace ativo para que o Antigravity faça referência cruzada a repositórios irmãos (por exemplo, lendo um monorepo principal de produto enquanto atualiza a documentação pública).
- **`/codesearch`** `` `<query>` `` (aliases **`/cs`**, **`/search`**) — Abre uma interface de busca de código em streaming ao vivo pelos diretórios montados sem gastar turnos conversacionais em chamadas manuais de `rg`.
- **`/diff`** — Abre um overlay interativo de revisão comparando modificações de turno linha a linha, edições em stage e commits diretamente dentro da CLI.
- **`/open`** `` `<path>` `` — Abre um arquivo ou diretório específico dentro do editor gráfico padrão do seu sistema operacional.
- **`/context`** — Renderiza uma decomposição visual da alocação ativa de tokens entre regras de sistema, metadados de skills, turnos de conversa e resultados de ferramentas para que você saiba *com antecedência* quando `/compact` é necessário.

---

## Categoria 5: Controle de Modelos, Configuração, Conta e Utilitários

Os quatorze comandos restantes gerenciam roteamento de modelos, configurações locais, transparência de faturamento, superfícies de voz/remotas e encerramento da sessão:

- **`/model`** `` `[model]` `` — Alterna seu modelo Gemini ativo de forma persistente entre sessões. Passar um prompt inline (`` `/model gemini-4-carbon Audit this authentication middleware for race conditions` ``) executa uma **sobrescrita one-shot de turno único** sem mudar seu modelo rápido padrão — essencial para economizar cota Pro/Ultra mantendo julgamento de fronteira a um comando de distância.
- **`/config`** (alias **`/settings`**) — Abre o painel interativo de configurações da TUI apoiado em `~/.gemini/antigravity-cli/settings.json` (lembre-se de que configurações da CLI vivem separadas das configurações do Antigravity 2.0 Desktop).
- **`/keybindings`** — Customiza atalhos de teclado interativos da TUI de forma limpa.
- **`/statusline`** — Configura widgets customizados da barra de status (tier do modelo, orçamento de tokens, branch git, indicadores ativos de custo/cota).
- **`/usage`** e **`/credits`** — `/usage` inspeciona a utilização de cota por modelo; `/credits` verifica créditos de IA restantes e links de saldo.
- **`/logout`** — Encerra a sessão e limpa credenciais de autenticação armazenadas no keyring do SO.
- **`/remote`** — Alterna a orquestração Remote Control / agente remoto para que jobs de longa duração sobrevivam à suspensão do notebook ou troca de superfície.
- **`/voice`** — Suporta interação por voz em tempo real (`/voice live`) e ditado rápido de fala para texto nos prompts (`/voice dictate`).
- **`/antigravity-guide`** `` `[question]` `` — Consulta diretamente o sitemap da documentação integrada do Antigravity em recursos da CLI, Desktop 2.0, IDE e Python SDK.
- **`/changelog`**, **`/feedback`**, **`/help`** — `/changelog` exibe notas recentes de lançamento; `/feedback` envia relatórios estruturados de bug; `/help` abre a folha de referência completa de comandos e atalhos.
- **`/exit`** (alias **`/quit`**) — Encerra a sessão interativa do `agy` graciosamente e devolve o controle ao shell do host (o mesmo que `Ctrl+D Ctrl+D`).

---

## Playbooks Comprovados de Encadeamento de Comandos e Erros Comuns

Comandos individuais são práticos; encadeá-los em loops repetíveis é onde a velocidade se multiplica:

```bash
# 1. Entrega de Funcionalidades com Zero Drift
/plan /grill-me Add bilingual RSS & sitemap entries for new engineering blueprints
# → responda uma pergunta por vez → aprove o plano → deixe o Hydrogen executar →
/diff
/learn Save the RSS & sitemap smoke check checklist to repository rules

# 2. Spike Arquitetural Sem Riscos
/context
/fork
/model gemini-4-carbon Evaluate replacing synchronous build hook with cached metadata index
# → se o experimento falhar, volte para a thread limpa de linha de base via /resume →

# 3. Loop Anti-Degradação em Sessões Longas
/btw Does Tailwind CSS v4 use bg-linear-to-br or bg-gradient-to-br?
/copy btw
/compact Continue migrating dashboard cards using verified Tailwind v4 syntax

# 4. Refatoração Paralela Multimódulo
/plan Migrate all 8 product routes to strict loader error boundaries
/swarm Shard route updates across independent modules with @verifier running bun run test

# 5. Autonomia com Gates e Verificações Agendadas de Saúde
/goal Refactor helper functions in app/lib/blog.ts until bun run lint && bun run test pass
/schedule "0 9 * * 1" Run bun run audit:content and report any broken links
```

### Cinco Erros Comuns com Comandos Slash para Evitar

1. **Chamar `/goal` sem testes automatizados de verificação:** Loops autônomos otimizam para o que conseguem medir. Sem asserções que falhem, checagens de TypeScript ou testes de smoke SSR, `/goal` pode declarar silenciosamente uma saída quebrada como concluída.
2. **Esperar `/context` atingir 85%+ antes de rodar `/compact`:** A recordação do modelo enfraquece muito antes do limite rígido da janela. Cheque `/context` após o término da exploração e rode `/compact` de forma limpa logo antes de escrever código.
3. **Queimar `/boost`, `/swarm` ou `/teamwork` em tarefas sequenciais de um único arquivo:** O overhead de coordenação multiagente desacelera edições lineares de três passos. Reserve `/swarm` e `/teamwork` para trabalho genuinamente paralelizável.
4. **Fazer perguntas de sintaxe não relacionadas na thread principal:** Cada tangente polui a memória de trabalho. Isole consultas paralelas dentro de `/btw` (e capture respostas com `/copy btw`).
5. **Escrever arquivos obsoletos `.agents/workflows/*.md` para comandos customizados:** Workflows legados não possuem divulgação progressiva, invocação semântica nem scripts auxiliares. Sempre crie skills em vez disso.

---

## Criando Comandos Slash Customizados via .agents/skills/

Workflows legados (`.agents/workflows/*.md` e `_agents/workflows/*.md`) estão obsoletos. No Antigravity moderno, toda **Skill** customizada dentro de `.agents/skills/<name>/SKILL.md` (escopo de workspace, versionada) ou `~/.gemini/config/skills/<name>/SKILL.md` (escopo global de máquina) torna-se automaticamente **ambos**:

1. Um **comando slash explícito** (digitando `/<name>` diretamente na barra de prompt ou no menu `/`), e
2. Uma **capacidade semanticamente descobrível** carregada sob demanda via divulgação progressiva (de modo que apenas `name` e `description` consomem tokens na inicialização).

Se você tiver arquivos de workflow legados em um repositório mais antigo, invoque o fluxo de migração integrado do Antigravity uma vez para convertê-los de forma idempotente em skills (preservando backups `.md.bak`).

Aqui está um template mínimo e pronto para produção criando um comando slash customizado `/release-check` dentro de qualquer repositório:

```markdown
---
name: release-check
description: >-
  Run full pre-release verification gates (content compilation, formatting,
  ESLint, TypeScript, unit tests, production bundle build, and SSR smoke check).
  Use when preparing a release or invoking /release-check.
---

# Runbook de Verificação Pré-Release

Execute o gate de release do repositório estritamente em ordem antes de criar tag ou fazer merge:

1. Compile o conteúdo, verifique a formatação do código, execute lint com zero avisos, faça typecheck, rode os testes unitários e gere o build:
   `bun run content:build && bun run format:check && bun run lint && bun run typecheck && bun run test && bun run build`
2. Execute a suíte de smoke SSR de produção contra localhost em sua própria etapa:
   `bun run smoke`
3. Relate o status exato de saída dos comandos, contagens de testes e eventuais regressões de forma concisa antes de prosseguir.
```

Salve esse arquivo em `.agents/skills/release-check/SKILL.md`, execute **`/skills reload`** dentro do `agy` e `/release-check` estará imediatamente ativo entre as superfícies de CLI e IDE sem reiniciar seu terminal.

---

## Continue a Série sobre Harness de Engenharia de IA

- **Parte 1 (Execução Local com Zero Tokens):** [Construindo uma Stack Local de Programação com IA Usando Ollama, OpenCode, Qwen 3.5 e Qwen3-Coder](/blog/local-ai-coding-stack-ollama-opencode-qwen3)
- **Parte 2 (Tiers do Gemini 4, Memória e Segurança):** [Dominando Modelos Gemini no Antigravity (agy): Arquitetura, Memória, Segurança e Limites Reais](/blog/mastering-gemini-models-in-antigravity-agy)
- **Governança Determinística de Memória (`<20KB`):** [MemOn: Governança Determinística de Engenharia de IA Abaixo de 20KB](/blog/on-memory-deterministic-ai-engineering-governance)
- **Arquitetura de Recuperação Air-Gapped:** [RagOn: Estúdio RAG Air-Gapped com Zero Vazamento](/blog/ragon-air-gapped-zero-leak-rag-studio)
- **Lição Complementar na Academy:** [RagOn e MemOn: Estúdio RAG Air-Gapped com Zero Vazamento e Governança de Agentes Abaixo de 20KB](/academy/private-rag-onmemory-agent-governance)
