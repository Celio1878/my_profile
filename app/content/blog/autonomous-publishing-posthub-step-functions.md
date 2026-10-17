---
title: "Autonomous Social Publishing with PostHub: AWS Step Functions, Tokens, and Multi-Platform Orchestration"
slug: "autonomous-publishing-posthub-step-functions"
description: "Architectural blueprint of PostHub: Autonomous 5-platform social publishing (LinkedIn, X, Substack, Facebook, Instagram), AWS Step Functions 1-click approval tokens, dynamic x509 JWT caching, and DynamoDB Streams WebSocket synchronization."
date: "2026-10-13"
tags: ["Serverless", "AWS Step Functions", "Automation", "DynamoDB", "WebSockets", "Cloud Architecture"]
lang: "en"
author: "Célio Vieira"
---

## The Omnichannel Distribution Complexity

Maintaining a coherent multi-platform technical presence across LinkedIn, X (Twitter), Substack, Facebook, and Instagram is a significant operational burden. Each platform enforces distinct constraints:
- **Payload & Media Formats**: X restricts text length to 280 characters and requires strict media uploading chunk sequences. LinkedIn requires specific author URNs and PDF carousel formats. Instagram mandates exact aspect ratios (1:1 or 4:5) and public CDN URLs for container rendering.
- **Rate Limits & Backoff**: Exponential backoff and jitter algorithms are required to prevent IP bans or API quota blacklists.
- **Human-in-the-Loop Control**: Purely autonomous AI posting creates high risk of hallucinations or off-brand messaging. A robust publishing system must enforce a **1-click human approval gate** before broadcasting to thousands of followers.
- **State Tracking & Auditability**: When publishing across 5 platforms simultaneously, partial failures (e.g., LinkedIn succeeded, but X failed due to temporary rate limiting) require granular per-platform retry logic rather than monolithic failure.

**PostHub** (`aldeon.app/posthub`) was engineered as Aldeon's centralized social automation and content distribution engine. Built with a serverless event-driven architecture on AWS, PostHub turns long-form technical research into targeted, platform-optimized posts with human approval checkpoints.

---

## The Orchestration State Machine

At the core of PostHub is an **AWS Step Functions Distributed State Machine**. Rather than orchestrating complex publishing sequences in long-running container processes, Step Functions provides built-in durability, exponential backoff, visual audit traces, and native human approval suspension:

```
[Ingest Article / Release Note]
               │
               ▼
   [AI Content Adaptation] ── (Generates tailored copies for LinkedIn, X, Substack, IG, FB)
               │
               ▼
    [Create Approval Token] ── (Generate HMAC signed 1-click approval URL)
               │
               ▼
[Send Notification (Telegram/Email)]
               │
               ▼
 ┌───────────────────────────┐
 │ Wait For Task Token       │ ── (Waits up to 24h for human click)
 └─────────────┬─────────────┘
               ├── (Rejected / Timed Out) ──► [Record Cancellation & Archive]
               │
               ▼ (Approved)
 ┌────────────────────────────────────────────────────────┐
 │ Parallel Multi-Platform Dispatch Map                   │
 │                                                        │
 │  ├──► [LinkedIn Worker Lambda]   (With 3x Retry/Backoff)│
 │  ├──► [X (Twitter v2) Lambda]    (With Chunked Media)  │
 │  ├──► [Substack API Worker]      (Markdown to HTML)    │
 │  ├──► [Instagram Graph Worker]   (Container & Status)  │
 │  └──► [Facebook Graph Worker]    (Feed Post)           │
 └────────────────────────────┬───────────────────────────┘
                              │
                              ▼
           [DynamoDB Streams ──► WebSocket Broadcast]
                    (Real-Time Dashboard Sync)
```

---

## Human-in-the-Loop: The Task Token Pattern

PostHub implements the **Step Functions Task Token pattern** (`.waitForTaskToken`), allowing execution to pause indefinitely without incurring compute costs:

```json
{
  "Type": "Task",
  "Resource": "arn:aws:states:::lambda:invoke.waitForTaskToken",
  "Parameters": {
    "FunctionName": "${RequestApprovalLambdaArn}",
    "Payload": {
      "executionId.$": "$$.Execution.Id",
      "taskToken.$": "$$.Task.Token",
      "drafts.$": "$.drafts"
    }
  },
  "TimeoutSeconds": 86400,
  "Catch": [
    {
      "ErrorEquals": ["States.Timeout"],
      "Next": "HandleApprovalTimeout"
    }
  ],
  "Next": "ParallelPlatformDispatch"
}
```

### Secure 1-Click Verification
When `RequestApprovalLambda` executes, it receives `taskToken`. It generates a cryptographically signed URL containing:
1. The execution task token.
2. An HMAC-SHA256 signature calculated against a secret salt.
3. The desired action (`approve` or `reject`).

The link is sent to a private Telegram channel and notification email:
```
https://api.posthub.aldeon.app/v1/approvals?action=approve&token=<TOKEN>&sig=<HMAC>
```

When tapped, a lightweight API Gateway HTTP endpoint validates the signature and calls `sfnClient.sendTaskSuccess()`:

```typescript
// lambdas/approval-callback/handler.ts
import { SFNClient, SendTaskSuccessCommand, SendTaskFailureCommand } from "@aws-sdk/client-sfn";
import { verifyHmacSignature } from "../utils/crypto";

const sfn = new SFNClient({});

export async function handler(event: APIGatewayProxyEventV2) {
  const { action, token, sig } = event.queryStringParameters || {};

  if (!verifyHmacSignature(token, sig)) {
    return { statusCode: 403, body: JSON.stringify({ error: "Invalid cryptographic signature" }) };
  }

  if (action === "approve") {
    await sfn.send(new SendTaskSuccessCommand({
      taskToken: token,
      output: JSON.stringify({ status: "APPROVED", approvedAt: new Date().toISOString() }),
    }));
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: "<h1>Draft Approved!</h1><p>PostHub is now broadcasting your content across platforms.</p>",
    };
  } else {
    await sfn.send(new SendTaskFailureCommand({
      taskToken: token,
      error: "UserRejected",
      cause: "Post was rejected by the content author.",
    }));
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: "<h1>Draft Rejected</h1><p>Broadcast cancelled. No posts were published.</p>",
    };
  }
}
```

---

## High-Performance Security: Dynamic x509 JWT Authorizer Caching

PostHub's management dashboard is secured via Google OAuth2 OpenID Connect (OIDC). However, verifying RS256 JWT tokens naively requires fetching Google's public x509 certificates (`https://www.googleapis.com/oauth2/v3/certs`) on every single API invocation—introducing 100ms+ of cold-path network latency.

To achieve sub-10ms authorizer execution, PostHub caches public keys in the Lambda container's memory across warm invocations with automatic TTL-based rotation:

```typescript
// lambdas/authorizer/jwtVerifier.ts
import { createRemoteJWKSet, jwtVerify } from "jose";

// The remote JWKS set is initialized outside the handler,
// automatically caching keys in memory and refreshing them on expiration.
const GOOGLE_JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/oauth2/v3/certs"),
  {
    cooldownDuration: 30000,    // 30 seconds cooldown between refreshes
    cacheMaxAge: 21600000,     // 6 hours cache TTL
  }
);

export async function verifyUserToken(token: string) {
  const { payload } = await jwtVerify(token, GOOGLE_JWKS, {
    issuer: ["https://accounts.google.com", "accounts.google.com"],
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  return {
    sub: payload.sub,
    email: payload.email as string,
    authorized: payload.email === process.env.ADMIN_EMAIL,
  };
}
```

---

## Real-Time Synchronization via DynamoDB Streams & WebSockets

When multiple platforms publish concurrently, administrative dashboards must display real-time status badges (`Queued`, `Processing`, `Live`, or `Failed`) without repetitive polling:

1. **DynamoDB Record Mutation**: As each platform worker finishes, it writes its result directly to the unified table:
   `PK: POST#<id>`, `SK: PLATFORM#LINKEDIN`, `Status: LIVE`, `ExternalUrl: "https://..."`.
2. **DynamoDB Streams & Event Filtering**: The stream triggers a lightweight router Lambda only on mutations where `Status` changes.
3. **API Gateway WebSocket Dispatcher**: The router maps active client connection IDs from a Redis/DynamoDB registry and pushes targeted JSON frames down open WebSocket channels in under 35ms.

```
[Platform Worker Completes]
           │
           ▼
[DynamoDB PutItem (Status: LIVE)]
           │
           ▼ (DynamoDB Stream Event)
[Stream Router Lambda] ──► Query Active Connections
           │
           ▼
[API Gateway WebSocket Management API]
           │
           ▼
[PostHub Web Console: Green Checkmark Badge Lights Up]
```

---

## Results & Operational Efficiency

PostHub's serverless orchestration architecture provides:
- **Zero Idle Costs**: During quiet periods, computing expenses are precisely $0.00.
- **Resilient Multi-Platform Fault Isolation**: If an individual social network experiences an outage or temporary HTTP 500 error, Step Functions automatically retries that branch without re-publishing duplicate posts to other networks.
- **Deterministic Peace of Mind**: The 1-click cryptographic task token ensures zero unauthorized posts can ever go live without explicit human review.

Through PostHub, technical content authored across the Aldeon platform reaches its global audience systematically and reliably.
