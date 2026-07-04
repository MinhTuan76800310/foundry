> **v0.3:** This file is a **section checklist** for content inside `brief.html` only.
> Do not write `brief.md` to task folders. Output path: `docs/work/<date>-<slug>/brief.html`.

# Brief — {Task Title}

| | |
|---|---|
| **Date** | {YYYY-MM-DD} |
| **Author** | {name} |
| **Status** | Draft → Approved (plan of record once approved) |
| **Brainstorm** | [brainstorm.md](./brainstorm.md) — or _none_ |
| **Worklog** | [worklog.md](./worklog.md) — kept during implementation |
| **Report** | [report.html](./report.html) — created after completion |

## 0. Overview — map of the forest

{3–5 lines, no jargon: the problem/opportunity, the expected result in one
sentence, and where this sits in the bigger system. A reader with zero context
must understand WHY this exists before any tree/bark/leaf detail.}

## 1. Objective

{One sentence: what this work achieves and why it matters.}

**Context:** {2–4 sentences: current situation, what triggers this work now.}

## 2. Key Results

| # | Key Result (measurable outcome) | Target | Verification |
|---|---|---|---|
| KR1 | {…} | {number / state} | {command, test, review step} |
| KR2 | {…} | {…} | {…} |

> KRs are outcomes, not tasks. 2–4 entries, each independently verifiable.
> The report scores exactly these — nothing else.

## 3. Scope

**In scope:**
- {…}

**Out of scope:**
- {…}

## 4. Key Decisions (ADR-lite)

| # | Decision | Options considered | Chosen because |
|---|---|---|---|
| D1 | {…} | {A, B} | {…} |

## 5. Approach

1. {Step} — expected outcome: {…}
2. {Step} — expected outcome: {…}

> Once approved, this is the plan of record: implementation follows these
> steps and logs any deviation in the worklog — the brief itself is not
> edited afterwards.

## 6. Architecture

_Current state vs. target state. New/changed components highlighted (descriptive → prescriptive)._

```mermaid
flowchart TB
  %% subgraph per system boundary, arrows = dependencies
```

## 7. Layer View

_Only if the task touches layering / module boundaries — otherwise: Not relevant: {reason}_

```mermaid
flowchart TB
  %% one subgraph per layer, edges point downward only
```

## 8. Control Flow

```mermaid
flowchart TD
  %% diamonds = decisions, rounded = start/end, happy path first
```

## 9. Data Flow

_Required if data crosses component boundaries or PII is involved — otherwise: Not relevant: {reason}_

```mermaid
flowchart LR
  %% edge labels name the data, cylinders = stores, 🔒 = sensitive
```

## 10. Risks & Open Questions

| Risk / Question | Impact | Mitigation / Owner |
|---|---|---|
| {…} | {…} | {…} |

## 11. Doc Maintenance

- **During work:** deviations → [worklog.md](./worklog.md) (append-only).
- **After work:** report scores KRs; diagrams updated to real final state.
- **Long-lived docs affected:** {list project docs/diagrams that must be
  updated when this ships, and who updates them — or "none"}.