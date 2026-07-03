# Brief — {Task Title}

| | |
|---|---|
| **Date** | {YYYY-MM-DD} |
| **Author** | {name} |
| **Status** | Draft |
| **Report** | [report.md](./report.md) — created after completion |

## 1. Objective

{One sentence: what this work achieves and why it matters.}

**Context:** {2–4 sentences: current situation, what triggers this work now.}

## 2. Key Results

| # | Key Result (measurable outcome) | Target | Verification |
|---|---|---|---|
| KR1 | {…} | {number / state} | {command, test, review step} |
| KR2 | {…} | {…} | {…} |

> KRs are outcomes, not tasks. 2–4 entries, each independently verifiable.

## 3. Scope

**In scope:**
- {…}

**Out of scope:**
- {…}

## 4. Approach

1. {Step} — expected outcome: {…}
2. {Step} — expected outcome: {…}

## 5. Architecture

_Target state. New/changed components are highlighted._

```mermaid
flowchart TB
  %% subgraph per system boundary, arrows = dependencies
```

## 6. Layer View

_Only if the task touches layering / module boundaries — otherwise: Not relevant: {reason}_

```mermaid
flowchart TB
  %% one subgraph per layer, edges point downward only
```

## 7. Control Flow

```mermaid
flowchart TD
  %% diamonds = decisions, rounded = start/end, happy path first
```

## 8. Data Flow

_Required if data crosses component boundaries or PII is involved — otherwise: Not relevant: {reason}_

```mermaid
flowchart LR
  %% edge labels name the data, cylinders = stores, 🔒 = sensitive
```

## 9. Risks & Open Questions

| Risk / Question | Impact | Mitigation / Owner |
|---|---|---|
| {…} | {…} | {…} |
