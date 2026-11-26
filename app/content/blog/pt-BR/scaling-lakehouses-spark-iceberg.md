---
title: "Engenharia de Lakehouses Escaláveis com Apache Spark e Apache Iceberg"
slug: "scaling-lakehouses-spark-iceberg"
description: "Padrões arquiteturais para lakehouses em escala de petabytes, transações ACID, evolução de partições e armazenamento stream-table com eficiência de custos na AWS."
date: "2026-03-24"
tags: ["Data Engineering", "Apache Spark", "Iceberg", "AWS", "Big Data"]
lang: "pt-BR"
author: "Célio Vieira"
---

## A Transição de Data Lakes Tradicionais para Lakehouses

Padrões tradicionais de armazenamento em objetos baseados em Hive no Amazon S3 sofriam de limitações estruturais conhecidas:
- Consistência eventual e operações custosas de listagem de diretórios (`ListObjectsV2`).
- Ausência de transações ACID atômicas, levando a corrupções por escritas parciais.
- Incapacidade de realizar atualizações concorrentes ou evolução de schema com segurança sem reescrever partições inteiras.

O **Apache Iceberg** muda esse cenário organizando tabelas em torno de manifestos imutáveis de snapshots em vez de estruturas de pastas de diretórios.

```
┌────────────────────────────────────────────────────────┐
│                   Catálogo Iceberg                     │
│            (AWS Glue / DynamoDB / REST)                │
└──────────────────────────┬─────────────────────────────┘
                           │ Ponteiro de Metadados Atual
┌──────────────────────────▼─────────────────────────────┐
│             Arquivo de Metadados da Tabela             │
│           Schema • Partições • Snapshots               │
└──────────────────────────┬─────────────────────────────┘
                           │ Lista de Manifestos
┌──────────────────────────▼─────────────────────────────┐
│              Arquivos de Manifesto (.avro)             │
│    Ponteiros para arquivos de dados, estatísticas      │
└──────────────────────────┬─────────────────────────────┘
                           │ Arquivos de Dados
┌──────────────────────────▼─────────────────────────────┐
│           Arquivos de Dados Parquet no Amazon S3       │
└────────────────────────────────────────────────────────┘
```

## Principais Vantagens Arquiteturais

### 1. Particionamento Oculto e Evolução de Partições

Em data lakes legados, usuários precisavam conhecer a hierarquia exata de diretórios (ex.: `year=2026/month=03/day=24`) para evitar varreduras completas de tabela. Se os requisitos de negócio mudassem de particionamento diário para horário, os dados históricos precisavam ser completamente migrados.

Com o Iceberg:
- Transformações de particionamento (ex.: `days(event_timestamp)`) são armazenadas nos metadados.
- Consultas com `WHERE event_timestamp >= '2026-03-01'` descartam arquivos automaticamente sem exigir que usuários escrevam cláusulas de coluna de partição propensas a erros.
- O schema e o layout de partição podem evoluir ao longo do tempo sem reescrever arquivos Parquet históricos.

### 2. Ingestão em Streaming de Alta Vazão com Spark

Ingerir transações em streaming diretamente para o Iceberg usando Spark Structured Streaming oferece semântica exact-once com checkpointing automatizado:

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("IcebergStreamIngestion") \
    .config("spark.sql.extensions", "org.apache.iceberg.spark.extensions.IcebergSparkSessionExtensions") \
    .config("spark.sql.catalog.glue_catalog", "org.apache.iceberg.spark.SparkCatalog") \
    .getOrCreate()

# Stream em micro-batch anexando dados na tabela Iceberg
query = streaming_df.writeStream \
    .format("iceberg") \
    .outputMode("append") \
    .trigger(processingTime="1 minute") \
    .option("checkpointLocation", "s3://lakehouse-checkpoints/events_silver") \
    .toTable("glue_catalog.analytics.events_silver")
```

### 3. Compactação Automatizada e Limpeza de Arquivos Órfãos

Streaming de alta frequência cria numerosos arquivos pequenos que degradam a latência das consultas. Um lakehouse robusto exige rotinas automatizadas de manutenção:

1. **Compactação Bin-Packing**: Execute `rewrite_data_files` periodicamente para coalescer arquivos Parquet de micro-batch em blocos-alvo de 512MB–1GB.
2. **Expiração de Snapshots**: Expire snapshots históricos mais antigos que as políticas de retenção (ex.: 7 dias) para recuperar armazenamento no S3.
3. **Remoção de Arquivos Órfãos**: Limpe arquivos não referenciados deixados por tarefas interrompidas.

```sql
-- Manutenção do Iceberg via Spark SQL
CALL glue_catalog.system.rewrite_data_files(
  table => 'analytics.events_silver',
  strategy => 'binpack',
  options => map('target-file-size-bytes', '536870912')
);
```

## Resultados e Impacto

- **Redução de 90%+ na Latência de Listagem**: Consultas de metadados retornam instantaneamente via arquivos de manifesto.
- **Custo Previsível de Armazenamento no S3**: Compactação agendada e poda de snapshots eliminam a inflação silenciosa de dados.
- **Qualidade de Dados Confiável**: Consumidores analíticos a jusante consultam snapshots consistentes sem bloquear escritores.
