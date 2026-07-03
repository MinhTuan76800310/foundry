---
name: doc-visuals
description: Conventions for German-engineering-style documentation visuals in Mermaid — architecture diagrams, layer views, control flow, data flow — plus OKR writing rules. Use when writing briefs, reports, or any technical doc that needs diagrams or Key Results.
---

# doc-visuals — diagram & OKR conventions

## General rules (all diagrams)

- Every diagram starts with a one-line italic caption stating the **question it
  answers** (e.g. _Which component owns order state?_).
- Max ~15 nodes per diagram. More → split into overview + detail diagrams.
- Stable, kebab-case node IDs (`order-svc`, not `A`/`B`) so brief→report diffs
  stay readable.
- Only draw what exists or is explicitly planned. Planned/changed elements get
  the `changed` class:

```mermaid
flowchart TB
  a[Existing] --> b[New Component]
  classDef changed fill:#fff3bf,stroke:#e67700
  class b changed
```

## Architecture — `flowchart TB`

One subgraph per deployable/system boundary. Arrows = dependency/call
direction (`A --> B` means A calls/depends on B). No cycles — a cycle is a
finding, list it under Risks.

```mermaid
flowchart TB
  subgraph client[Client]
    ui[Web UI]
  end
  subgraph backend[Backend]
    api[REST API] --> order-svc[Order Service]
  end
  subgraph infra[Infrastructure]
    db[(PostgreSQL)]
    mq[[RabbitMQ]]
  end
  ui --> api
  order-svc --> db
  order-svc --> mq
```

## Layer View — `flowchart TB`

One subgraph per layer (typical: Presentation / Application / Domain /
Infrastructure). **Edges may only point downward.** An upward edge is a
violation: draw it red-dashed and list it under Risks.

```mermaid
flowchart TB
  subgraph l1[Presentation]
    ctrl[OrderController]
  end
  subgraph l2[Application]
    uc[PlaceOrderUseCase]
  end
  subgraph l3[Domain]
    order[Order Aggregate]
  end
  subgraph l4[Infrastructure]
    repo[OrderRepository]
  end
  ctrl --> uc --> order
  uc --> repo
```

## Control Flow — `flowchart TD` (or `sequenceDiagram`)

Diamonds for decisions, rounded nodes for start/end. Happy path first (left),
error paths branch right. Use `sequenceDiagram` instead when ≥3 components
interact over time.

```mermaid
flowchart TD
  s([Start]) --> v{Input valid?}
  v -- yes --> p[Process order]
  v -- no --> e[Return 400]
  p --> done([Done])
  e --> done
```

## Data Flow — `flowchart LR`

Edge labels **name the data**, not the action. Cylinders `[( )]` for stores.
Mark sensitive/PII data with 🔒.

```mermaid
flowchart LR
  u[User] -- "credentials 🔒" --> auth[Auth API]
  auth -- "user_id, token" --> sess[(Session Store)]
  auth -- "audit event" --> log[(Audit Log)]
```

## OKR writing rules

- **Objective**: qualitative, one sentence, answers *why this work matters*.
- **Key Results**: 2–4, each a measurable **outcome** (not a task), each with
  an explicit verification method (a command, a test, a review step).
  - Bad: "Refactor the parser" (task).
  - Good: "Parser handles all 14 fixture files without error — verified by
    `npm test parser`" (outcome + verification).
- In reports, score each KR ✅ met / ⚠️ partial / ❌ missed **with evidence**.
  Unverifiable claims are marked `unverified`, never rounded up to ✅.
