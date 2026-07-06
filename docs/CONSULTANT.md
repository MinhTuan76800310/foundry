# doc-flow — Consultant role (optional, portable)

The plugin sometimes needs **how-to-think help**: what to ask, which OKR
dimensions to cover, which diagram reads clearest, what a completeness audit
looks like. That help comes from a **consultant role** — a *role*, not a fixed
tool — so the plugin stays portable across machines.

## Two firewalled roles — never blur them

| Role | Answers | Sources |
|------|---------|---------|
| **Consultant** (how to think) | Questions to ask, audit checklists, design/architecture patterns, report structure | MCP `llm_wiki` → other MCP → **Claude itself** |
| **Sources of truth** (what happened) | KR values, what changed, deviation reason, business impact, status | brief.html · worklog.md · git · **the user** |

> **The consultant does NOT know this project's status.** Never ask it for a
> KR number, what changed, why a deviation happened, or whether the task is
> done. Those are project facts — only the sources of truth answer them.
> The consultant only shapes the *questions* and the *thinking*.

## Fallback chain (degrade safely — external tool is never required)

```
Tier 1  llm_wiki MCP           (this user has it; best mental-model recall)
Tier 2  any other knowledge MCP (if the user configured an equivalent)
Tier 3  Claude's own reasoning  + docs/REACT-LOOP.md + docs/REPORT-INTAKE.md
```

- Try Tier 1; on absent/error, drop a tier. **Do not block** on a missing MCP.
- Tier 3 always exists — Claude Code already has an LLM, so the static
  checklists in this repo are a complete consultant on their own.
- State the tier once in chat, e.g. `consultant: static checklist (no llm_wiki)`.
  Do not make the run depend on Tier 1 being present.

## What you may ask the consultant (project-agnostic only)

- "Objective is of shape X — which measurable KR dimensions fit? What's a good
  verification method per dimension?"
- "Post-work report slots still empty: [list]. What should I ask the user vs
  infer from git? Prefer a question checklist, not prose."
- "Story A→B(B1,B2,B3)→C — which diagram/pattern reads clearest for a partner?"
- "Design a service that does X — which architecture trade-offs must a brief
  surface as risks?"
- "When is a sparse report with open questions acceptable?"

## What you must NOT ask the consultant

- ❌ "Did KR2 pass?" · "What changed in this repo?" · "Why did they deviate?"
- ❌ "Is this task done?" · "What's the business impact here?"
- These have no answer outside the project sources — asking invites fabrication.

## Prompt template (Tier 1/2)

```text
Role: mental-model consultant (you do NOT know my project's status).
Context: German engineering partner audience; pyramid; OKR + verification;
plan-vs-actual. Give me a QUESTION CHECKLIST / structural guidance only.
Gaps I'm facing: [list].
Do not invent project facts — I collect those from brief/worklog/git/user.
```

Used by `commands/report.md`, `commands/brief.md` via `docs/REACT-LOOP.md`.
