---
title: "Arquitetando o SwanGo: Data Warehouse Medallion em dbt-core e BigQuery a $0/mês para Finanças da B3"
slug: "architecting-swango-dbt-bigquery-medallion-b3-finance"
description: "Blueprint técnico do SwanGo: um data warehouse Medallion de 20 tabelas em dbt-core e Google BigQuery indexando mais de 1.076 ativos da B3, CVM, BCB, Cripto e SEC EDGAR com motores quantitativos determinísticos e workspaces compartilhados verificáveis por SHA-256."
date: "2026-11-20"
tags: ["Data Engineering", "dbt", "BigQuery", "FinTech", "Lakehouse", "Python", "Architecture"]
lang: "pt-BR"
author: "Célio Vieira"
---

## A Restrição de Engenharia FinTech: Zero Dados Simulados a $0,00/mês

A maioria dos rastreadores de investimentos para consumidores e plataformas de finanças pessoais falha ao longo de dois eixos estruturais:

1. **Protótipos Cheios de Mocks e Lógica Wrapper Opaca**: Plataformas entregam carteiras estáticas pré-populados ou estimativas não verificadas em vez de calcular métricas determinísticas a partir de extratos bancários reais (`OFX`, `CSV`, `XLSX`) e notas de corretagem oficiais (`SINACOR`).
2. **Custo Proibitivo de Dados de Mercado e Data Warehouse**: Assinar feeds comerciais EOD ou manter clusters de warehouse sempre ligados destrói a economia unitária antes que um produto independente ganhe escala.

O **SwanGo** (`aldeon.app/swango`) foi projetado sob o guarda-chuva da Aldeon para eliminar ambos os compromissos. Todo o seu warehouse de mercado, camada de transformação analítica e runtime REST operam a **$0,00/mês** em custo base de infraestrutura, enquanto impõem **100% de dados reais** e matemática determinística em **mais de 1.076 ativos rastreados**.

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Feeds Oficiais e Públicos 100% Gratuitos (Zero Licenças EOD Comerciais)    │
│ B3 COTAHIST • CVM Dados Abertos • BCB SGS • Tesouro • Cripto • SEC EDGAR   │
└──────────────────────────────────┬─────────────────────────────────────────┘
                                   │ Cloud Scheduler Noturno -> Cloud Run Job
                                   ▼
┌────────────────────────────────────────────────────────────────────────────┐
│          Google BigQuery Free Tier (Medallion `swango_market`)             │
│  Bronze (9 Tabelas Brutas) ──► Silver (6 Modelos Limpos) ──► Gold (5 Marts)│
│            Validado por 49/49 testes dbt e 9/9 SLAs de Freshness           │
└──────────────────────────────────┬─────────────────────────────────────────┘
                                   │ Sincronização Hot-Cache com Gate de Publicação
                                   ▼
┌────────────────────────────────────────────────────────────────────────────┐
│      Supabase PostgreSQL Dedicado (RLS) + GCP Cloud Run FastAPI            │
│ `b3_asset_cache` • `macro_benchmarks` • Workspaces RBAC • Trilhas SHA-256  │
└──────────────────────────────────┬─────────────────────────────────────────┘
                                   │ Edge APIs (`/api/swango/*`)
                                   ▼
┌────────────────────────────────────────────────────────────────────────────┐
│       Plataforma Web Aldeon (`aldeon.app/swango`) — React Router 7 SSR     │
│  Console • 5 Módulos Quant • Lab 6 Estágios (/simulator) • Academia (/learn)│
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. O Data Warehouse Medallion de 20 Tabelas em dbt-core e BigQuery

Em vez de manter scripts ETL ad-hoc em Python que escrevem linhas não validadas diretamente em tabelas de produção, o SwanGo separa ingestão de transformação usando **`dbt-core` (Apache 2.0)** apontando para o **Google BigQuery** (mantendo-se confortavelmente dentro da camada gratuita do BigQuery de `10 GiB` de armazenamento / `1 TiB` de consultas).

### Camada Bronze (9 Tabelas Brutas de Ingestão)
O Cloud Run Job conteinerizado `etl-dbt-runtime` coleta estritamente feeds oficiais gratuitos e comercialmente seguros:
- **B3 COTAHIST e Índices (`IBOV`, `IFIX`)**: Cotações oficiais de fechamento, volume e classificações de instrumentos em ações brasileiras, FIIs, ETFs e BDRs.
- **CVM Dados Abertos (`dados.cvm.gov.br`)**: Demonstrações financeiras anuais (`DFP`) e trimestrais (`ITR`), registro cadastral de companhias (`Cadastro`) e informes mensais de FIIs da Resolução 175.
- **BCB SGS e Tesouro Transparente**: Séries macroeconômicas incluindo `SELIC` (`432`), `CDI` (`4389`), `IPCA` (`433`), `PTAX` (`1`) e curvas de juros de títulos públicos.
- **Feeds Globais e Alternativos**: Séries públicas de OHLCV à vista para ativos digitais (`Binance data-api` / `Coinbase`) e registros **SEC EDGAR XBRL** dando suporte a BDRs e importações CSV de corretoras americanas.

### Resolvendo Peculiaridades de Produção no BigQuery e na CVM
Executar dados oficiais reais em produção revelou três casos extremos de engenharia não triviais que são resolvidos deterministicamente em nossa camada Silver (`6 modelos`):
1. **Deriva de Schema no BigQuery com `WRITE_TRUNCATE`**: `load_table_from_json` com `autodetect=True` muta identificadores `STRING` preenchidos com zeros à esquerda (`bdi_code`, `cvm_code`, `cik`) para `INT64`, quebrando joins de string a jusante. Nosso carregador (`bq_loader.py`) busca explicitamente o schema provisionado pelo Terraform (`autodetect=target_schema is None`), e os modelos SQL Silver fazem `CAST(... AS STRING)` defensivo com normalização via `LPAD`.
2. **Descontinuação de `/ultimos/{n}` do BCB SGS e Lacunas de PTAX**: O endpoint `/dados/ultimos/{n}` do BCB retorna HTTP 400 sob as regras atuais do gateway, e finais de semana/feriados introduzem taxas de câmbio nulas. O SwanGo consulta intervalos explícitos de 450 dias com `?dataInicial=&dataFinal=` e aplica preenchimento retroativo de PTAX com `FIRST_VALUE` em datas sem pregão.
3. **Duplicação de DRE 3M vs. 9M YTD na ITR da CVM**: Registros trimestrais da CVM publicam tanto linhas isoladas de 3 meses quanto acumuladas no ano na demonstração de resultados sob chaves `DT_REFER` idênticas, produzindo deltas negativos falsos no `LAG()`. A deduplicação Silver particiona pelo menor `DT_INI_EXERC` para isolar os fluxos de caixa trimestrais verdadeiramente isolados.

### Camada Gold (5 Marts Analíticos) e Sincronização com Supabase Protegida por Gate de Publicação
Os marts Gold agregam valuations, dividend yields, bases de preços multi-horizonte (comparações Base-100), benchmarks macro e metadados de saúde do pipeline. Crucialmente, o worker de sincronização impõe um **invariante de gate de publicação**: se qualquer uma das **49 asserções `dbt test`** ou dos **9 SLAs de freshness de origem** falhar, o pipeline aborta antes de tocar no hot cache `b3_asset_cache` em produção no Supabase.

Para suportar CI offline sem credenciais do GCP, modelos incrementais protegem chamadas de metadados com:
```sql
{% if execute and target.name != 'ci' and is_incremental() %}
```
Permitindo que `dbt compile --target ci` valide todos os 47/47 nós do grafo de forma totalmente offline.

---

## 2. Motores Quantitativos Determinísticos e "Posso Comprar?"

Dentro do backend FastAPI do SwanGo e do runtime web modular (`app/src/lib/swango/`), cada cálculo é 100% determinístico — zero saldos simulados, zero heurísticas opacas:

- **Motor Universal de Decisão *"Posso Comprar?"***: Avalia uma compra pretendida frente ao superávit de fluxo de caixa em tempo real, reserva de emergência e custo de oportunidade, calculando **desconto à vista vs. Valor Presente Líquido (VPL) de parcelamento `1x–24x`** descontado pelo rendimento vivo do **CDI**.
- **5 Módulos Quantitativos de Operações**:
  1. **Simulador Pré-Operação de Imposto e DARF 6015 Mensal**: Deriva o preço médio ponderado de aquisição a partir dos livros-razão de transações, aplica o limite mensal de isenção de R$ 20.000 para swing trade em ações brasileiras, rastreia prejuízos acumulados a compensar e calcula exatamente o imposto devido na DARF 6015.
  2. **Matriz de Correlação de Carteira**: Quantifica a covariância par-a-par entre ações, FIIs, renda fixa e BDRs para expor riscos ocultos de concentração.
  3. **Teste de Estresse Multi-Cenário e Planejador de DCA**: Modela quedas de mercado de `-20%` a `-40%` e deslocamentos nas taxas de juros em conjunto com trajetórias de recuperação via aportes recorrentes (dollar-cost averaging).
  4. **Comparador Base-100 de B3 e Benchmarks Macro**: Normaliza qualquer combinação dos **mais de 1.076 ativos indexados** contra `CDI`, `IPCA`, `IBOV` e `IFIX`.
  5. **Razão de Alpha das Decisões**: Registra o racional da tese e o desfecho realizado pós-operação ao longo das decisões históricas para que usuários meçam a acurácia de revisores e estratégias ao longo do tempo.

---

## 3. Workspaces Colaborativos e Snapshots Verificáveis por SHA-256

Decisões financeiras raramente acontecem de forma isolada. O SwanGo suporta **Workspaces Compartilhados Híbridos Local-First + Cloud Sync** sustentados por Row-Level Security (RLS) do PostgreSQL no Supabase em 4 papéis estritos (`owner`, `editor`, `viewer`, `reviewer`):

- **Cartões de Proposta de Operação**: Colaboradores submetem propostas estruturadas de compra/venda/rebalanceamento e registram votos em tabelas append-only `trade_proposal_votes`.
- **Snapshots Verificáveis com Mascaramento de Privacidade (`/swango/share/:token`)**: Usuários podem publicar pacotes de snapshot interativos usando os modos `percentage_masked` ou `scores_only` — permitindo que revisores externos verifiquem alocações de ativos, índices de saúde e trilhas de auditoria **sem nunca expor patrimônio líquido bruto em `R$` ou saldos bancários**.
- **Cadeia de Auditoria Imutável**: Cada evento de verificação anexa um digest de payload `SHA-256` encadeado via `signature_hash` para que relatórios compartilhados permaneçam à prova de adulteração.

---

## 4. O Simulador Interativo de 6 Estágios e a Academia Financeira de 4 Trilhas

Para permitir que qualquer pessoa teste todos os motores antes de enviar extratos pessoais — sem violar o invariante zero-mock em workspaces de produção —, o SwanGo oferece duas superfícies públicas dedicadas:

- **Laboratório Interativo de 6 Estágios (`/swango/simulator`)**: Um sandbox isolado guiando usuários passo a passo pela ingestão de extratos, comparação de mercado Base-100, modelagem de VPL no CDI de *"Posso Comprar?"*, cálculo de DARF 6015, teste de estresse e verificação de snapshot.
- **Hub Bilíngue de Educação Financeira e Investimentos (`/swango/learn`)**: Um currículo gratuito de 4 trilhas em inglês e português cobrindo:
  1. **Trilha 1**: Divisor de Salário e Contas `50/30/20`
  2. **Trilha 2**: Simulador de Empilhamento de Parcelas e Crédito Rotativo
  3. **Trilha 3**: Construtor de Reserva de Emergência + Auditoria de 10 Pontos Antigolpe e Segurança de Conta
  4. **Trilha 4**: Rendimento Real Composto Acima do `IPCA` + Matriz de Ativos da B3 e Verificador de Regras da `DARF 6015`

---

## Resultados em Produção

- **$0,00/mês** de custo base de warehouse e feeds de mercado no BigQuery Free Tier + Supabase + GCP Cloud Run (`southamerica-east1`).
- **Mais de 1.076 ativos de mercado ao vivo** e séries macro servidos com **49/49 testes `dbt` aprovados** e **9/9 SLAs de freshness de origem**.
- **Data warehouse Medallion de 20 tabelas** conectando dados oficiais brasileiros (`B3`, `CVM`, `BCB`, `Tesouro`) e internacionais (`SEC EDGAR`, `Crypto`) sob engenharia determinística estrita **zero-mock**.

*Explore o SwanGo ao vivo em [aldeon.app/swango](https://aldeon.app/swango), teste o [Simulador de 6 Estágios](https://aldeon.app/swango/simulator) ou estude na [Academia Financeira](https://aldeon.app/swango/learn).*
