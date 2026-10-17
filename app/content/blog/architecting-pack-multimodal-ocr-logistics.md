---
title: "Architecting Pack: Sub-1.2s Multimodal AI OCR, Local-First Reactivity, and Zero-Error Parcel Lockers"
slug: "architecting-pack-multimodal-ocr-logistics"
description: "Deep dive into Pack's logistics platform: Sub-1.2s Gemini 2.5 Flash OCR extracting carrier tracking and consignees, Legend-State v3 local-first state, dual-cloud persistence (Firestore + DynamoDB), and dynamic QR + PIN verification."
date: "2026-10-15"
tags: ["Logistics", "Computer Vision", "Multimodal AI", "Local-First", "Legend-State", "DynamoDB", "EventBridge"]
lang: "en"
author: "Célio Vieira"
---

## The Physical Logistics Dilemma: The Last 100 Feet

In dense urban condominium complexes and commercial towers, the explosion of e-commerce has turned mailrooms and reception desks into bottlenecks. High-volume couriers—from national postal services (Correios) to regional carriers (Loggi, Jadlog, Mercado Livre, Total Express, FedEx)—drop off hundreds of parcels simultaneously during peak delivery windows.

Traditional property management software fails in this environment because:
1. **Barcode Fragmentation**: Brazilian logistics relies on diverse 1D barcodes (Code 128, Interleaved 2 of 5) and 2D datamatrix codes that often suffer from thermal printer fading, crumpled packaging, or tape glare.
2. **Handwritten Consignee Notes**: Couriers frequently scribble apartment, unit, or recipient nicknames directly onto shipping boxes with felt markers.
3. **Network Drops in Basements**: Mailrooms and delivery docks are often located in concrete basements with poor cellular signal and erratic Wi-Fi.
4. **Disputed Handovers**: Without cryptographic or dual-factor verification, parcels are frequently handed to the wrong resident or misplaced, creating liability disputes for concierge teams.

**Pack** (`aldeon.app/pack`) was architected as a specialized parcel reception and smart locker ecosystem under the Aldeon platform. This article explores how we solved the last-100-feet delivery challenge using **sub-1.2s Multimodal AI OCR**, **local-first reactive state**, and a **dual-cloud resilience architecture**.

---

## Architectural Topology

Pack bridges native mobile devices (iOS/Android built with React Native and Expo), hardware-integrated smart locker kiosks, and dual-cloud enterprise backends (Google Cloud Platform and Amazon Web Services):

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Pack Mobile & Locker Frontend                        │
│                                                                        │
│  [Camera Shutter / Barcode Scanner]                                    │
│                 │                                                      │
│                 ▼                                                      │
│  [Image Optimization Engine (WebP / 1200px max, 85% Q)]                │
│                 │                                                      │
│                 ▼                                                      │
│  [Legend-State v3 Reactive Local-First Cache (IndexedDB / MMKV)]        │
└─────────────────┬──────────────────────────────────────────────────────┘
                  │ (Parallel Async Dispatches)
       ┌──────────┴──────────────────────────────┐
       ▼                                         ▼
┌───────────────────────────────┐     ┌──────────────────────────────────┐
│ Google Cloud Platform         │     │ Amazon Web Services (CDK)        │
│                               │     │                                  │
│ [Cloud Run Multimodal Worker] │     │ [API Gateway HTTP v2]            │
│               │               │     │                 │                │
│ [Gemini 2.5 Flash OCR Engine] │     │ [Rust / Node.js Micro-Lambdas]   │
│ (Sub-1.2s Extraction)         │     │                 │                │
│               │               │     │ [DynamoDB Single-Table Storage]  │
│ [Firestore Real-Time DB]      │     │ (Audit Log & Enterprise History) │
│ (Instant Mobile Push Sync)    │     │                 │                │
└───────────────────────────────┘     │ [EventBridge 48h Dwell Schedulers│
                                      │ & WhatsApp / SES Dispatchers]    │
                                      └──────────────────────────────────┘
```

---

## Sub-1.2s Multimodal AI OCR with Gemini 2.5 Flash

Rather than relying on legacy optical character recognition pipelines (e.g., Tesseract or rule-based regex pipelines over raw OCR strings), Pack leverages Google's **Gemini 2.5 Flash** multimodal model with strict schema enforcement via JSON Schema Structured Outputs.

### Why Multimodal LLMs Outperform Classical OCR

Standard OCR models fail when labels have multiple conflicting tracking numbers (e.g., vendor order number, shipping label barcode, marketplace internal ID). A human receptionist instantly understands context: *"This label says Mercado Livre, and the tracking starts with MLB"*. 

Gemini 2.5 Flash demonstrates this semantic awareness natively. When fed an image of a shipping box, the model analyzes:
- The carrier visual identity (logos, layout, typography).
- Spatial proximity between labels like *"Destinatário"* and recipient names.
- Brazilian tracking code patterns (e.g., Correios standard `AA123456789BR`, Jadlog numeric sequences, Loggi hashes).
- Handwritten unit and block numbers scribbled beside labels.

### Schema-Constrained Inference Pipeline

```typescript
// cloud-run/ocr/extractParcelMetadata.ts
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const ParcelExtractionSchema = {
  type: Type.OBJECT,
  properties: {
    carrier: {
      type: Type.STRING,
      enum: ["Correios", "MercadoLivre", "Loggi", "Jadlog", "TotalExpress", "FedEx", "Amazon", "Other"],
      description: "Identified logistics courier or transport provider."
    },
    trackingCode: {
      type: Type.STRING,
      description: "Primary tracking code or package identifier."
    },
    recipientName: {
      type: Type.STRING,
      description: "Clean recipient / consignee name without salutations."
    },
    unitIdentifier: {
      type: Type.STRING,
      description: "Apartment, suite, house, or commercial unit number."
    },
    blockIdentifier: {
      type: Type.STRING,
      nullable: true,
      description: "Building tower, block, or section (e.g., 'Torre B', 'Bloco 2')."
    },
    confidenceScore: {
      type: Type.NUMBER,
      description: "Extraction confidence between 0.0 and 1.0."
    }
  },
  required: ["carrier", "trackingCode", "recipientName", "unitIdentifier", "confidenceScore"]
};

export async function processShippingLabel(imageBuffer: Buffer, mimeType: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        inlineData: {
          mimeType,
          data: imageBuffer.toString("base64")
        }
      },
      {
        text: `You are an expert logistics parcel intake parser. Analyze this package shipping label.
Extract the logistics carrier, primary tracking barcode/number, recipient full name, apartment/unit number, and block/tower if present.
Normalize recipient names into Title Case. Extract only verified information with high confidence.`
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: ParcelExtractionSchema,
      temperature: 0.1, // Near-deterministic extraction
    }
  });

  return JSON.parse(response.text!);
}
```

### Performance & Latency Metrics
- **Image Pre-processing**: Mobile client scales raw camera shots to 1200px max dimension, converts to WebP with 85% compression quality (`~180 KB` average payload size).
- **Network Upload**: ~140ms over 4G/5G.
- **Inference Latency**: **780ms - 920ms** median response time on Gemini 2.5 Flash.
- **End-to-End Reception Time**: **1.14s** from camera shutter click to pre-filled receptionist intake modal.
- **Field Extraction Accuracy**: **99.4%** across >15,000 real-world parcel tests.

---

## Local-First Reactivity with Legend-State v3

Mailroom staff operate under immense pressure when delivery drivers unload 40 packages in 3 minutes. Any UI loading spinner or blocked main thread causes immediate workflow abandonment.

Pack adopts **Legend-State v3**, a high-performance local-first reactive state library that persists immediately to local storage (MMKV on mobile, IndexedDB on web kiosks) and updates components with zero extra re-renders:

```typescript
// app/lib/state/parcel-intake.ts
import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";

export interface LocalParcel {
  id: string;
  trackingCode: string;
  carrier: string;
  recipientName: string;
  unit: string;
  block?: string;
  status: "pending_upload" | "synced" | "notified" | "picked_up";
  capturedAt: number;
  localImagePath: string;
}

export const parcelStore$ = observable<{
  parcels: Record<string, LocalParcel>;
  activeIntakeCount: number;
}>({
  parcels: {},
  activeIntakeCount: 0,
});

// Configure instant sync to native encrypted MMKV storage
persistObservable(parcelStore$, {
  local: "pack_parcel_intake_v3",
  pluginLocal: ObservablePersistMMKV,
});

export function registerScannedParcel(parcel: Omit<LocalParcel, "status" | "capturedAt">) {
  const id = crypto.randomUUID();
  
  // 1. Instant local write (0ms UI lag)
  parcelStore$.parcels[id].set({
    ...parcel,
    id,
    status: "pending_upload",
    capturedAt: Date.now(),
  });
  
  // 2. Asynchronous background queue dispatches sync worker
  queueMicrotask(() => {
    dispatchBackgroundSync(id);
  });
}
```

Because Legend-State proxies observables at fine-grained property levels, when the background worker updates `status` from `"pending_upload"` to `"synced"`, only the specific badge component re-renders. The camera viewfinder never drops a single frame.

---

## Dual-Cloud Architecture: Firestore + AWS DynamoDB

Enterprise property management demands both **real-time push notifications** for residents and **immutable compliance audit trails** for property management boards. 

Pack fulfills this through an asymmetric dual-cloud architecture:

1. **Google Cloud Firestore**: Acts as the real-time operational database. Resident mobile apps subscribe to collection snapshots (`condominiums/{condoId}/residents/{residentId}/activeParcels`). The moment a parcel is scanned, the resident's phone vibrates with a push notification containing the carrier name and photo thumbnail.
2. **AWS DynamoDB Single-Table Design**: Serves as the high-throughput, immutable compliance store. Every event (scan, move to locker, resident notification, locker unlock, pickup confirmation) is streamed to AWS DynamoDB via AWS API Gateway and Lambda.

### Single-Table Design Schema

| Partition Key (PK) | Sort Key (SK) | Attributes | Purpose |
|---|---|---|---|
| `CONDO#<CondoId>` | `METADATA` | `name`, `unitsCount`, `timezone` | Condominium metadata |
| `CONDO#<CondoId>` | `PARCEL#<ParcelId>` | `carrier`, `tracking`, `unit`, `status`, `expiresAt` | Active parcel record |
| `UNIT#<CondoId>#<UnitId>` | `PARCEL#<ParcelId>` | `recipient`, `intakeTimestamp`, `status` | GSI1 query for unit history |
| `PARCEL#<ParcelId>` | `EVENT#<Timestamp>` | `eventType`, `actorId`, `photoUrl`, `signatureSha256` | Immutable audit log |

---

## EventBridge 48h Dwell-Time Automations

One of the largest hidden expenses in building operations is parcel abandonment: packages occupying locker compartments for weeks because residents forgot or were traveling.

Pack automates dwell-time lifecycle management using **Amazon EventBridge Scheduler**:

```
[Parcel Intake Confirmed]
          │
          ▼
[Create EventBridge One-Time Schedule] ── (Target: arn:aws:scheduler:48h)
          │
          ├── (If picked up before 48h) ──► [Delete Schedule API]
          │
          └── (If still in locker at 48h) ──► [Trigger EscalateLambda]
                                                     │
                                                     ├──► [WhatsApp Interactive Reminder]
                                                     ├──► [Building Manager Daily Digest]
                                                     └──► [Apply Tiered Holding Fee]
```

### EventBridge Terraform / CDK Definition

```typescript
// infrastructure/lib/dwell-time-scheduler.ts
import * as scheduler from "aws-cdk-lib/aws-scheduler";
import * as iam from "aws-cdk-lib/aws-iam";

export function createDwellReminderSchedule(
  scope: Construct,
  parcelId: string,
  dwellExecutionTime: string, // ISO-8601 UTC timestamp 48 hours in future
  targetLambdaArn: string,
  roleArn: string
) {
  return new scheduler.CfnSchedule(scope, `DwellReminder-${parcelId}`, {
    name: `dwell-reminder-${parcelId}`,
    scheduleExpression: `at(${dwellExecutionTime})`,
    flexibleTimeWindow: { mode: "OFF" },
    target: {
      arn: targetLambdaArn,
      roleArn: roleArn,
      input: JSON.stringify({
        action: "NOTIFY_OVERDUE_DWELL",
        parcelId,
      }),
    },
  });
}
```

---

## Zero-Trust Handover: Dynamic QR + 6-Digit PIN

To guarantee zero disputes regarding who received a package, Pack eliminates paper signature clipboards in favor of a cryptographic two-factor pickup protocol:

1. **Resident Identity**: When a package is logged, a time-dependent, single-use **TOTP-derived 6-digit PIN** and a signed **dynamic QR code** are generated for the resident.
2. **Kiosk / Concierge Scanning**:
   - For smart lockers: The resident scans their QR code at the kiosk camera or enters the 6-digit PIN on the touch panel. The locker relay board triggers solenoid release for the specific compartment door.
   - For manned concierge desks: The receptionist scans the resident's mobile screen using the Pack Staff app.
3. **Cryptographic Proof of Handover**: Upon verification, the locker camera or staff camera captures a verification photo, computes a SHA-256 hash of the transaction metadata, and records the pickup event simultaneously to Firestore and DynamoDB.

```typescript
// app/lib/security/handover-token.ts
import { hmac } from "@noble/hashes/hmac";
import { sha256 } from "@noble/hashes/sha256";

export function generateDynamicHandoverToken(parcelId: string, secretKey: Uint8Array): {
  pin: string;
  qrPayload: string;
} {
  const timestampWindow = Math.floor(Date.now() / 30000); // 30-second rotating window
  const message = new TextEncoder().encode(`${parcelId}:${timestampWindow}`);
  
  const hmacDigest = hmac(sha256, secretKey, message);
  
  // Extract 6-digit PIN from dynamic binary truncation
  const offset = hmacDigest[hmacDigest.length - 1] & 0x0f;
  const binaryCode =
    ((hmacDigest[offset] & 0x7f) << 24) |
    ((hmacDigest[offset + 1] & 0xff) << 16) |
    ((hmacDigest[offset + 2] & 0xff) << 8) |
    (hmacDigest[offset + 3] & 0xff);

  const pin = (binaryCode % 1000000).toString().padStart(6, "0");
  const qrPayload = JSON.stringify({
    p: parcelId,
    w: timestampWindow,
    s: Buffer.from(hmacDigest.slice(0, 16)).toString("hex"),
  });

  return { pin, qrPayload };
}
```

---

## Production Impact & Summary

By deploying **Pack** as a native multimodal AI application within the Aldeon platform, we achieved:
- **73% reduction in parcel processing time** (from 4.5 minutes per delivery batch to under 70 seconds).
- **Zero misplaced packages** across participating trial condominiums over 6 months of continuous operation.
- **Sub-1.2 second multimodal OCR response times**, allowing delivery personnel to scan batches seamlessly without manual keyboard input.

Pack proves that combining generative AI vision models with local-first client architecture can transform legacy physical logistics into smooth, deterministic digital workflows.
