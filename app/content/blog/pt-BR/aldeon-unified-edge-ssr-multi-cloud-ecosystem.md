---
title: "A Arquitetura Aldeon: Orquestrando um Ecossistema Multi-Cloud Autônomo de 8 Produtos"
slug: "aldeon-unified-edge-ssr-multi-cloud-ecosystem"
description: "Blueprint arquitetural da plataforma Aldeon: consolidando 8 aplicações autônomas sob React Router 7 Edge SSR fatiado por domínio (TypeScript 7 + Biome), isolamento de portal zero-backend, i18n verificado por AST e infraestrutura multi-cloud."
date: "2026-10-16"
tags: ["Architecture", "Vercel SSR", "Multi-Cloud", "DevOps", "Terraform", "FinOps"]
lang: "pt-BR"
author: "Célio Vieira"
---

## O Desafio de um Venture Studio: Sinergia Multi-Produto Sem Inchaço Monolítico

Como fundador e engenheiro operando múltiplos produtos de consumo, fintech, ferramentas para desenvolvedores e B2B — **SwanGo**, **RagOn**, **MemOn**, **HandSpeak**, **Be Your Stories**, **Pack**, **TATU Design** e **PostHub** —, escolhas tradicionais de arquitetura apresentam uma falsa dicotomia:

1. **Sites Independentes e Desconexos**: Construir 8 landing pages, domínios e rotas de conformidade legal distintos gera caos operacional, linguagens visuais divergentes e fragmentação de marca.
2. **Integração de Backend Monolítico**: Unificar bancos de dados, APIs de backend e autenticação em um único servidor central introduz acoplamento forte, raios de impacto catastróficos e enormes dores de cabeça de conformidade envolvendo Apple, Google, fluxos de dados financeiros e reguladores de privacidade (GDPR/LGPD).

Para superar esse dilema, projetamos a **Arquitetura do Ecossistema Aldeon** (`aldeon.app`). A Aldeon atua como a plataforma web central unificada e camada de orquestração, enquanto as aplicações filhas mantêm **autonomia absoluta e isolamento de dados** em seus respectivos clientes mobile e backends em nuvem.

```text
                     ┌──────────────────────────────────────────────────┐
                     │          Portal Web Aldeon (Vercel)              │
                     │          React Router 7 Edge SSR (gru1)          │
                     │    Fatiado por Domínio `src/shared/` + `features/`│
                     │  s-maxage=300, SWR=86400, Vary: Accept-Language  │
                     └───────┬──────────────────────────┬───────────────┘
                             │                          │
        ┌────────────────────┴──────────┐               │
        ▼                               ▼               ▼
[/swango & /learn]            [/mem-on & /rag-on]  [/handspeak & /learn]
[/bys Web Suite]              [/pack Showcase]     [/tatu & /postshub]
        │                               │               │
════════╪═══════════════════════════════╪═══════════════╪════ [Fronteira Zero Cross-Talk]
        │                               │               │
        ▼                               ▼               ▼
┌───────────────────────┐ ┌──────────────────────┐ ┌───────────────────────┐
│ Serviços SwanGo       │ │ Serviços BYS & Pack  │ │ TATU, Posts & HandSpk │
│ GCP Cloud Run FastAPI │ │ Supabase + Meilisrch │ │ GCP Cloud Run / AWS   │
│ BigQuery dbt Medallion│ │ AWS Lambda, DynamoDB │ │ Step Functions + KMS  │
│ Supabase RLS Dedicado │ │ EventBridge + Firebs │ │ Firestore + Storage   │
└───────────────────────┘ └──────────────────────┘ └───────────────────────┘
```

---

## 1. O Invariante Zero-Backend e o Portal Fatiado por Domínio

Um invariante arquitetural fundamental aplicado em todo o `aldeon/app` é a **Regra de Pegada Zero-Backend**:
- A plataforma web hospedada na Vercel contém **zero** bancos de dados persistentes (nenhuma instância Postgres ou DynamoDB), **zero** ORMs (sem Prisma ou Drizzle) e **zero** conexões Redis com estado.
- Ela opera estritamente como uma superfície de apresentação, roteamento na edge, vitrine de marketing, simulador interativo e conformidade legal.
- Internamente, o portal segue uma **arquitetura modular fatiada por domínio** (`src/shared/` para primitivos de UI, `radix-ui` unificado, i18n e helpers de servidor Stripe/Resend + `src/features/<product>/` para domínios de produto isolados), com entrypoints de rota enxutos em `src/routes/` cobrindo `/swango`, `/rag-on`, `/mem-on`, `/bys`, `/pack`, `/tatu`, `/postshub`, `/handspeak` e `/support` via `@vercel/react-router/vite`.

Quando o portal precisa interagir com serviços (como despachar tickets de suporte, executar proxies de Edge API do SwanGo ou verificar solicitações de exclusão), ele executa ações serverless leves e isoladas que se comunicam via APIs REST seguras ou e-mail transacional pelo **Resend** (`noreply@aldeon.app`, `support@aldeon.app`).

---

## 2. Edge SSR Fixado em São Paulo (gru1) e Invariantes de Cache

Como nossa infraestrutura em nuvem reside principalmente na região América do Sul Leste (`sa-east-1` na AWS e `southamerica-east1` no Google Cloud), implantar funções Edge SSR em regiões padrão da América do Norte ou Europa causaria uma penalidade de ida e volta transatlântica de 140ms em cada requisição de página renderizada no servidor.

Para maximizar o desempenho, a Aldeon fixa a execução do Vercel Edge SSR em **`gru1` (São Paulo, Brasil)**, mantendo a computação próxima aos armazenamentos de dados em nuvem.

### Política de Cache na Edge
Rotas públicas de marketing e avisos legais aplicam um cabeçalho agressivo de cache `stale-while-revalidate`:

```http
Cache-Control: s-maxage=300, stale-while-revalidate=86400
Vary: Accept-Language
```

Isso garante entrega instantânea global via CDN na edge enquanto respeita a negociação de idioma sem poluir o cache com cookies de autorização.

---

## 3. Core Web Vitals, Paridade de i18n por AST e Gates de Segurança SSR

Alcançar pontuações Lighthouse 95+ e confiabilidade SSR sem regressões em 8 superfícies de produto distintas exige verificação automatizada rigorosa:

1. **Fontes Variáveis Auto-Hospedadas**: Toda a tipografia utiliza pacotes `@fontsource-variable` auto-hospedados, eliminando completamente handshakes de DNS bloqueadores de renderização com terceiros como Google Fonts.
2. **Entrada de Hero em CSS Puro (`.anim-rise`)**: O conteúdo inicial do hero evita `motion.div` com `initial={{ opacity: 0 }}`. O HTML renderizado estaticamente já inclui opacidade total do texto, permitindo que animações puras em CSS cuidem da elevação visual e garantindo Largest Contentful Paint (LCP) sub-segundo.
3. **LazyMotion e Dicionários de Idioma Escopados**: Importações pesadas do framework Framer Motion são consolidadas em `LazyMotion` (`domAnimation`), enquanto o `LanguageContext` raiz permanece apenas com estado (`createProductLanguageHook()` escopa payloads de locale por rota de produto, mantendo `HomePage` abaixo de `200 KB gz`).
4. **TypeScript 7, Biome e Paridade de i18n Bilíngue Zero-Hardcode via AST (`oxc-parser`)**: Suítes automatizadas `bun:test` (`0` `any` explícitos, lint Biome, varreduras AST com `oxc-parser`) proíbem textos hardcoded ou schemas de validação sem localização tanto em `EN` quanto em `PT-BR`.
5. **Segurança de Bundle SSR e Orçamentos Estritos por Rota (`verify:ssr` e `perf:budget:strict`)**: Todo build de produção executa `ssr-bundle-safety.test.ts` e `bun run verify:ssr` em todas as rotas de produto — verificando inicialização preguiçosa (lazy) segura para SSR no cliente e falhando o CI caso qualquer rota exceda os limites de JS/CSS gzippados.

---

## 4. Isolamento Multi-Cloud por Tenant e Registro de Credenciais

Cada aplicação filha opera dentro de seu próprio projeto em nuvem dedicado:
- **SwanGo**: PostgreSQL dedicado no Supabase (RLS em `sa-east-1`), BigQuery `swango_market` (data warehouse Medallion de 20 tabelas em `dbt-core`) e microsserviços Python 3.12 FastAPI no GCP Cloud Run (`southamerica-east1`).
- **MemOn (`mem-on`, antigo OnMemory)**: Conjuntos de dados air-gapped em tempo de compilação (`onMemoryData.ts`) que alimentam o linter de memória client-side `<20KB` e o compositor interativo de stack, verificados por testes regex de zero vazamento em CI (`on-memory-security.test.ts`).
- **RagOn (`rag-on`)**: Estúdio RAG gratuito e air-gapped que alimenta o playground ao vivo de 6 estágios Raio-X BM25 + 3-gram, auditor de corpus client-side e kit inicial de 7 arquivos, protegido por guardrails no cliente com hash FNV-1a e `rag-on-security.test.ts`.
- **BYS**: Persistência relacional e Auth no Supabase, indexação full-text de livros no Meilisearch da Railway e narradores em Python Lambda na AWS S3.
- **Pack**: Arquitetura dual-cloud com Cloud Firestore para feeds mobile em tempo real e Amazon DynamoDB para trilhas de auditoria, orquestrados via AWS EventBridge.
- **TATU Design**: Infraestrutura Google Cloud e Firebase (`southamerica-east1`) com Firebase AI Logic e Cloud Storage seguro.
- **PostHub**: Microsserviços serverless em AWS Step Functions, repositórios single-table no DynamoDB, contexto de criptografia KMS (`user_id`) e despachantes cron no EventBridge.
- **HandSpeak**: Microsserviços FastAPI de alta vazão conteinerizados no GCP Cloud Run combinados com rastreamento de mãos local no cliente em WebAssembly e uma Academia Bilíngue de Libras com 5 trilhas.

### Garantias de Segurança
Nenhuma aplicação filha pode ler ou escrever no banco de dados de uma aplicação irmã. Chaves secretas (`AWS_SECRET_ACCESS_KEY`, credenciais de conta de serviço do Firebase, service roles do Supabase, chaves secretas da RevenueCat) são estritamente injetadas em tempo de execução via variáveis de ambiente e nunca embutidas em bundles web ou mobile.

---

## 5. CI/CD Mobile com Dual-Runner (eas-deploy.yml)

Com quatro clientes mobile ativos distribuídos via Expo Application Services (EAS), compartilhar os 15 builds gratuitos mensais na nuvem entre uma organização leva rapidamente ao esgotamento da cota.

Para eliminar gargalos de build mantendo os gastos em nuvem abaixo de $5,00/mês, implementamos uma **Estratégia de CI/CD Dual-Runner** em `.github/workflows/eas-deploy.yml`:
1. O pipeline tenta primeiro um EAS Cloud Build.
2. Se o limite de builds na nuvem for atingido, ele recorre de forma transparente a um runner `macos-latest` do GitHub Actions executando builds locais:
   ```bash
   eas build --platform ios --local
   eas submit --platform ios --profile production
   ```
3. Caches derivados do CocoaPods e do Gradle em armazenamento NVMe físico mantêm os tempos de build local abaixo de 12 minutos.

---

## Conclusão

Ao impor um perímetro web estritamente Zero-Backend, proximidade regional na edge em `gru1`, i18n verificado por AST e gates de CI para SSR, além de isolamento multi-cloud absoluto por tenant, a plataforma Aldeon demonstra como um venture studio ágil pode operar **8 produtos comerciais sofisticados** com sobrecarga mínima e rigor arquitetural sólido.

*Explore o ecossistema ao vivo em [aldeon.app](https://aldeon.app).*
