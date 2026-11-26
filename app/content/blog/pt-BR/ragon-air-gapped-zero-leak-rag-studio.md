---
title: "RagOn: Estúdio RAG Air-Gapped Zero-Leak, Raio-X de 6 Estágios BM25+3-Gram e Kit Cross-Stack de 7 Arquivos"
slug: "ragon-air-gapped-zero-leak-rag-studio"
description: "Por dentro do RagOn (aldeon.app/rag-on): o 8º produto aberto e gratuito da Aldeon, entregando recuperação determinística BM25 + 3-gram abaixo de 2ms a custo $0 de LLM, guardrails no cliente com hash FNV-1a, auditoria de corpus client-side e um kit inicial cross-stack de 7 arquivos."
date: "2026-11-26"
tags: ["AI", "RAG", "Security", "Architecture", "Developer Tooling", "TypeScript"]
lang: "pt-BR"
author: "Célio Vieira"
---

## Por Que Construímos o RagOn: RAG Air-Gapped a $0 Sem Alucinações ou Vazamentos

A maioria dos assistentes de documentação em produção e widgets de perguntas e respostas de produtos sofre de quatro falhas cumulativas:
1. **Imposto Recorrente de Vector-DB em SaaS**: Subir bancos vetoriais externos, pipelines de embeddings e chamadas a LLMs de fronteira apenas para responder dúvidas verificadas de produto ou API adiciona custo recorrente e latência de cold-start.
2. **Alucinações Fora de Escopo**: Busca por similaridade top-K ingênua retorna o trecho mais próximo mesmo quando `score = 0.12`, fazendo o assistente inventar respostas em consultas sem relação.
3. **Listas de Bloqueio em Texto Claro Vazadas nos Bundles do Cliente**: Widgets com fallbacks offline frequentemente importam guardrails regex para os chunks do navegador — expondo identificadores internos de projeto, nomes de usuários admin ou prefixos secretos a qualquer pessoa que inspecione `dist/client/assets/*.js`.
4. **Inchaço de Bundle na Landing Page**: Importar estaticamente a UI do chat + payloads do corpus no layout raiz penaliza o First Contentful Paint (FCP) em todas as rotas de marketing.

Para compartilhar exatamente a arquitetura que alimenta o assistente da Aldeon como um **produto aberto 100% gratuito para desenvolvedores**, lançamos o **RagOn (`rag-on`)** em [`aldeon.app/rag-on`](https://aldeon.app/rag-on) — nosso **8º produto ativo**, combinando um **Playground Raio-X de 6 Estágios ao vivo**, um **Auditor de Corpus Zero-Leak Client-Side** e um **Kit de Replicação Cross-Stack de 7 Arquivos** (`init-rag-on.mjs`).

---

## A Arquitetura de 6 Fases de Recuperação e Fundamentação

O RagOn executa inteiramente em memória com **`0ms` de I/O em disco**, ranqueamento de todo o corpus abaixo de 2ms e recusa determinística sempre que a evidência fica abaixo do limiar:

```text
[Consulta do Usuário (<=360 caracteres)]
         │
         ▼  Fase 2: Normalização NFD + Guardrail Hash/Injeção (<0.1ms)
         ├── (Bloqueado: Injeção / Sonda de Segredo / 40 req/min RL) ──► Recusa Segura
         │
         ▼  Fase 3: Pontuação Bilíngue PT/EN e Expansão de Sinônimos (<0.2ms)
         │
         ▼  Fase 4: BM25 Ponderado por Campo + Cosseno 3-Gram de Caracteres (<1.2ms)
         │
         ▼  Fase 5: Gate Estrito de Fundamentação por Evidência
         │  (top.score >= 4.2 && strongAnchors >= 1)
         ├── (Falhou) ──► Recusa Determinística Fora de Escopo + Chips de Sugestão
         │
         ▼  Fase 6: Síntese Extrativa ($0) ou LLM Híbrido XML + Escudo de Saída
[Resposta Fundamentada + Citações /route Internas Verificadas + Cache-Control: private, no-store]
```

### Fase 1: Corpus Bilíngue Tipado e Air-Gapped
Em vez de fazer scraping de PDFs imprevisíveis em tempo de execução, o conhecimento reside em um array versionado e tipado em TypeScript/Python (`ragCorpus.ts` / `rag_corpus.py`) contendo títulos bilíngues EN/PT, fatos concisos, palavras-chave de domínio, citações exclusivamente internas (`route.startsWith("/")`) e chips curados de acompanhamento. Testes automatizados de CI varrem o corpus serializado contra 10 regras Zero-Leak antes de cada deploy.

### Fase 2: Normalização NFD e Guardrail Pré-Recuperação (abaixo de 0,1ms)
Consultas são limitadas a **360 caracteres**, decompostas via normalização Unicode NFD para remover marcas diacríticas (`[\u0300-\u036f]`) de modo que variações acentuadas como `"ignorar instruções"` não burlem padrões ASCII, e submetidas a rate limit de **40 requisições / 60s** por IP em janela deslizante.

### Fase 3: Pontuação Bilíngue PT/EN e Expansão de Sinônimos de Domínio (abaixo de 0,2ms)
Engenheiros bilíngues rotineiramente misturam substantivos de UI em inglês dentro de frases em português (ex.: *"Quais features e pricing o app tem?"*). O RagOn atribui peso maior a diacríticos do português (`+3.5`) e palavras funcionais (`+3.0`) do que a empréstimos técnicos em inglês (`+1.5`) para que consultas mistas permaneçam no idioma gramatical do usuário, expandindo em seguida os tokens por meio de uma tabela bilíngue curada de sinônimos (`preco -> pricing, price, cost, pro, free`).

### Fase 4: BM25 Ponderado por Campo + Cosseno de 3-Gramas de Caracteres (abaixo de 1,2ms)
Na inicialização do módulo, o RagOn pré-indexa os tokens do corpus e os trigramas de caracteres uma única vez. Cada consulta é pontuada por:

```text
Score = BM25(Title * 3.0 + Keywords * 2.4 + Body * 1.0, k1 = 1.4, b = 0.65)
      + 4.5 * Cosine3Gram(Title + Keywords)
      + 4.0 * Cosine3Gram(FullChunk)
      + ScopeAndCategoryBoosts
```

Combinar precisão lexical IDF com cosseno de 3-gramas de caracteres trata erros de digitação de um único caractere (`"precing"`, `"sincroniza"`) sem depender de modelos pesados de embeddings vetoriais.

### Fase 5: Gate Estrito de Fundamentação por Evidência
Em vez de retornar cegamente `rankedDocs[0]`, o RagOn aplica um gate determinístico de evidência:

```typescript
const passed =
  top.score >= 4.2 &&
  top.strongAnchors >= 1 &&
  (hasExplicitScope || (top.matchedConcepts >= 2 && top.score >= 5.5));
```

Se a evidência for insuficiente, o motor retorna uma resposta útil `out_of_scope` com prompts clicáveis sugeridos — atingindo **0% de alucinações fora de escopo**.

### Fase 6: Síntese Extrativa a $0 ou LLM Híbrido Protegido por XML
Por padrão, o RagOn sintetiza respostas deterministicamente a partir dos trechos vencedores a **$0 de custo de inferência**. Quando a formulação opcional por LLM é habilitada, apenas os trechos vencedores são encapsulados em tags XML `` `<grounded_context>` `` com a entrada do usuário escapada via `escapePromptXml()`, seguidos de um escudo de saída `redactChatOutput()` de 10 regras e cabeçalhos estritos `Cache-Control: private, no-store, max-age=0`.

---

## Guardrails Zero-Leak com Hash FNV-1a e Auditor de Corpus Client-Side

Uma vulnerabilidade sutil em assistentes RAG capazes de rodar no cliente é colocar identificadores internos restritos ou handles de desenvolvedores em regexes em texto claro dentro de arquivos de guardrail importados pelo cliente. O RagOn elimina literais em texto claro dos bundles JS públicos aplicando hashes **FNV-1a de 32 bits** aos tokens restritos:

```typescript
function fnv1a32Hex(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

// O bundle público carrega apenas digests unidirecionais de 32 bits — zero literais em texto claro
const RESTRICTED_HASHES = new Set(["1794d565", "bf959e2f"]);

export function isRestrictedToken(token: string): boolean {
  return RESTRICTED_HASHES.has(fnv1a32Hex(token.trim().toLowerCase()));
}
```

Em [`aldeon.app/rag-on`](https://aldeon.app/rag-on), engenheiros também podem colar qualquer corpus JSON serializado no **Auditor de Segurança de Corpus e Citações 100% Client-Side** para validar integridade de schema, sinalizar citações externas não relativas, detectar prefixos de chaves vazadas (`AIza`, `AKIA`, `sk_live`, `ghp_`, `eyJ`) e executar **Auto-Sanitize em 1 clique** sem enviar um único byte pela rede.

---

## Kit Inicial Cross-Stack de 7 Arquivos (init-rag-on.mjs)

O RagOn empacota toda a sua arquitetura em um **kit inicial portátil de 7 arquivos** gerado interativamente no navegador ou estruturado via `init-rag-on.mjs` em cinco runtimes:

- **React 19 + React Router 7 Edge SSR** (`TypeScript · Edge Action + Lazy Drawer`)
- **Next.js App Router** (`TypeScript · app/api/chat/route.ts + Client Drawer`)
- **Node / Bun / Cloudflare Worker (Hono)** (`TypeScript · Stateless JSON Microservice`)
- **Python 3.12 FastAPI + Pydantic v2** (`Matemática Pura em Stdlib + Router FastAPI`)
- **Expo SDK React Native** (`Fallback Offline + Modal Sheet`)

Todo bundle gerado entrega exatamente o contrato de 7 arquivos:
1. `ragCorpus.ts` / `rag_corpus.py` — Trechos de conhecimento tipados e air-gapped
2. `chatGuardrails.ts` / `rag_guardrails.py` — Normalização NFD, guardas com hash FNV-1a e escudo de saída
3. `ragEngine.ts` / `rag_engine.py` — BM25 ponderado por campo + cosseno 3-gram + gate de fundamentação
4. `api.chat.ts` / `route.ts` / `routers/chat.py` — Endpoint com rate limit (`Cache-Control: private, no-store`)
5. `RagChatDrawer.tsx` / `RagChatSheet.tsx` — Drawer com `React.lazy()` (`0 KB` de impacto na pintura inicial)
6. `rag-security.test.ts` / `test_rag_security.py` — Suíte automatizada de CI para zero-leak e fundamentação
7. `.agents/skills/rag-on/SKILL.md` — Instruções de skill para agentes compatíveis com o [`MemOn`](/blog/on-memory-deterministic-ai-engineering-governance)

---

## Registro de Antipadrões de Produção (AP-RAG-01 a AP-RAG-08)

O RagOn traz um **Registro Interativo de Antipadrões em 5 Campos** documentando modos reais de falha em produção encontrados em implantações Edge SSR, mobile e serverless:

| Código | Domínio | Antipadrão Eliminado | Solução Verificada |
|---|---|---|---|
| `AP-RAG-01` | Segurança | Literais de blocklist interna em texto claro no JS do cliente | Regexes estruturais + hashes FNV-1a de 32 bits para tokens |
| `AP-RAG-02` | Segurança | Unicode acentuado burlando guardrails ASCII | Decomposição NFD + remoção de diacríticos antes das checagens |
| `AP-RAG-03` | Recuperação | Correspondência exata pura falhando em erros de digitação | BM25 ponderado por campo + cosseno 3-gram de caracteres + sinônimos |
| `AP-RAG-04` | Fundamentação | Retornar `rankedDocs[0]` incondicionalmente | Gate estrito por limiar (`score >= 4.2`, `strongAnchors >= 1`) |
| `AP-RAG-05` | Edge SSR | Importar avidamente o corpus e o drawer de chat na raiz | Montar gatilho leve + drawer `React.lazy()` ao abrir |
| `AP-RAG-06` | Edge SSR | Cache público de CDN em `POST /api/chat` dinâmico | `Cache-Control: private, no-store, max-age=0` em todos os status |
| `AP-RAG-07` | Bilíngue | Empréstimos de UI em inglês invertendo respostas PT-BR | Pesos maiores para palavras funcionais e diacríticos em PT |
| `AP-RAG-08` | Segurança LLM | Consultas de usuário sem escape em prompts híbridos de LLM | Tags XML `` `<grounded_context>` `` + `escapePromptXml()` + escudo de saída |

---

## Resultados em Produção e Links do Ecossistema

- **Inferência Padrão `$0 / Gratuita`**: Síntese extrativa determinística resolve consultas de documentação e suporte com zero chamadas externas a APIs de LLM.
- **Recuperação Ponta a Ponta `abaixo de 2ms`**: Pontuação pré-indexada BM25 + 3-gram finaliza em menos de 2 milissegundos por requisição.
- **`0%` de Vazamento de Segredos no CI e `0 KB` de Taxa na Pintura Inicial**: Gates automatizados `rag-on-security.test.ts` combinados com montagem via `React.lazy()` mantêm landing pages rápidas e air-gapped.

Explore o Playground Raio-X ao vivo, o Auditor de Corpus e o Kit Inicial em [**aldeon.app/rag-on**](https://aldeon.app/rag-on), combine-o com o [**MemOn (governança de agentes abaixo de 20KB)**](/blog/on-memory-deterministic-ai-engineering-governance) ou siga o currículo prático na [**Trilha 1 da Academia: RagOn e MemOn**](/academy/private-rag-onmemory-agent-governance).
