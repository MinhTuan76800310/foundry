> **v0.3:** Section checklist for `report.html` / `index.html` — each heading is a **slot**.
> Agent: read `docs/REPORT-INTAKE.md` — **ask until slots have evidence or Open:** before writing.
> Sparse report OK; invented prose is not. Output: `report.html` + `index.html` (not `report.md`).

# Report — {Task Title}

| | |
|---|---|
| **Date** | {YYYY-MM-DD} |
| **Author** | {name} |
| **Brief** | [brief.html](./brief.html) |
| **Worklog** | [worklog.md](./worklog.md) — or _none kept_ |
| **Status** | Done / Partially done / Stopped |

> One layered document, conclusion first (pyramid): §1–§3 serve CTO and
> business readers standalone; §4+ adds engineering depth. Each section is
> modular — lift it into slides without rewriting.

## 1. Executive Summary — 30 seconds

**Audience: CTO / business.**

{One paragraph, conclusion first: did we achieve the Objective? Then exactly:}
- **Done:** {3 bullets max — outcomes, not activities}
- **Not done / next:** {3 bullets max}
- **Decision needed:** {— or the one thing leadership must decide}

> Only verifiable facts — nothing the scoreboard below cannot back up.

## 2. Business Impact

**Audience: business.**

{2–4 sentences: what changed for users/customers/cost/risk, in domain
language. No component names.}

## 3. Key Results — Scoreboard

| # | Key Result | Target | Actual | Score | Evidence |
|---|---|---|---|---|---|
| KR1 | {…} | {…} | {…} | ✅ / ⚠️ / ❌ | {output, file, number} |

> Score exactly the KRs from the brief. Unverifiable → `unverified`, never ✅.

## 4. Plan vs. Actual

**Audience: engineering (from here down).**

| Planned step (from brief) | What actually happened | Deviation reason |
|---|---|---|
| {…} | {…} | {— if none} |

_Source: worklog deviation register when available; otherwise git history +
conversation. Deviations are information, not failures._

## 5. What Changed

- {component / file}: {change} ({commit ref if available})

## 6. Final Architecture & Diagrams

_Brief's diagrams updated to the real final state; changed nodes marked._

```mermaid
flowchart TB
  %% classDef changed fill:#fff3bf,stroke:#e67700
```

## 7. Learnings & Follow-ups

- **Learning:** {…}
- **Follow-up:** {…} (owner, date)

## 8. Docs Updated

_Doc Maintenance list from the brief — prove the docs stayed alive:_

- [ ] {long-lived doc/diagram}: updated in {ref} / not needed because {reason}