---
title: "Engineering Scalable Lakehouses with Apache Spark and Apache Iceberg"
slug: "scaling-lakehouses-spark-iceberg"
description: "Architectural patterns for petabyte-scale lakehouses, ACID transactions, partition evolution, and cost-efficient stream-table storage on AWS."
date: "2026-03-24"
tags: ["Data Engineering", "Apache Spark", "Iceberg", "AWS", "Big Data"]
lang: "en"
author: "Célio Vieira"
---

## The Shift from Traditional Data Lakes to Lakehouses

Traditional Hive-based object storage patterns on Amazon S3 suffered from known structural limitations:
- Eventual consistency and costly directory listing operations (`ListObjectsV2`).
- Lack of atomic ACID transactions leading to partial write corruptions.
- Inability to safely perform concurrent updates or schema evolution without rewriting entire partitions.

**Apache Iceberg** changes this by organizing tables around immutable snapshot manifests rather than directory folder structures.

```
┌────────────────────────────────────────────────────────┐
│                   Iceberg Catalog                      │
│            (AWS Glue / DynamoDB / REST)                │
└──────────────────────────┬─────────────────────────────┘
                           │ Current Metadata Pointer
┌──────────────────────────▼─────────────────────────────┐
│                 Table Metadata File                    │
│            Schema • Partitions • Snapshots             │
└──────────────────────────┬─────────────────────────────┘
                           │ Manifest List
┌──────────────────────────▼─────────────────────────────┐
│                 Manifest Files (.avro)                 │
│         Data file pointers, column statistics          │
└──────────────────────────┬─────────────────────────────┘
                           │ Data Files
┌──────────────────────────▼─────────────────────────────┐
│            Parquet Data Files on Amazon S3             │
└────────────────────────────────────────────────────────┘
```

## Core Architectural Advantages

### 1. Hidden Partitioning & Partition Evolution

In legacy data lakes, users must understand the exact directory hierarchy (e.g. `year=2026/month=03/day=24`) to avoid full table scans. If business requirements change from daily to hourly partitioning, past data had to be completely migrated.

With Iceberg:
- Partitioning transforms (e.g. `days(event_timestamp)`) are stored in metadata.
- Queries against `WHERE event_timestamp >= '2026-03-01'` automatically prune files without requiring users to write error-prone partition column clauses.
- Schema and partition layout can evolve over time without rewriting historical Parquet files.

### 2. High-Throughput Streaming Ingestion with Spark

Streaming transactions directly into Iceberg using Spark Structured Streaming provides exact-once semantics with automated checkpointing:

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("IcebergStreamIngestion") \
    .config("spark.sql.extensions", "org.apache.iceberg.spark.extensions.IcebergSparkSessionExtensions") \
    .config("spark.sql.catalog.glue_catalog", "org.apache.iceberg.spark.SparkCatalog") \
    .getOrCreate()

# Micro-batch stream appending into Iceberg table
query = streaming_df.writeStream \
    .format("iceberg") \
    .outputMode("append") \
    .trigger(processingTime="1 minute") \
    .option("checkpointLocation", "s3://lakehouse-checkpoints/events_silver") \
    .toTable("glue_catalog.analytics.events_silver")
```

### 3. Automated Compaction & Orphan Cleanup

High-frequency streaming creates numerous small files that degrade query latency. A robust lakehouse requires automated maintenance routines:

1. **Bin-Packing Compaction**: Run `rewrite_data_files` periodically to coalesce micro-batch Parquet files into target 512MB-1GB blocks.
2. **Snapshot Expiration**: Expire historical snapshots older than retention policies (e.g. 7 days) to reclaim S3 storage.
3. **Remove Orphan Files**: Clean up unreferenced files from interrupted tasks.

```sql
-- Iceberg maintenance via Spark SQL
CALL glue_catalog.system.rewrite_data_files(
  table => 'analytics.events_silver',
  strategy => 'binpack',
  options => map('target-file-size-bytes', '536870912')
);
```

## Results & Impact

- **90%+ Reduction in Listing Latency**: Metadata queries return instantly via manifest files.
- **Predictable S3 Storage Cost**: Scheduled compaction and snapshot pruning eliminate silent data inflation.
- **Reliable Data Quality**: Downstream analytical consumers query consistent snapshots without locking writers.
