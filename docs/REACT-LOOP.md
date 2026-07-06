# doc-flow — ReAct loop (reason → act → observe → gate)

The plugin must **loop until it has enough**, not fill a template in one pass.
This file is the enforced procedure for `/doc-flow:brief` and
`/doc-flow:report`. The consultant (see `CONSULTANT.md`) shapes the *thinking*;
the sources of truth (brief/worklog/git/user) supply the *facts*.

## The loop

```
round = 0
THINK    → slot audit: list every slot as filled | gap | source; post the table
CONSULT? → if unsure WHAT to ask or HOW to structure → consultant (Tier 1→3)
           (never ask consultant for project facts)
ACT      → one or more: git log/diff/show · read file/code · run KR verify ·
           AskUserQuestion (facts) · consultant call (thinking)
OBSERVE  → re-post the slot table with the diff (what this round closed)
GATE     → any CRITICAL gap still open?
             yes → round++ ; if round < MAX go to THINK
                              else → tell user, ask: keep asking / sparse / stop
             no  → EXIT
EXIT     → every slot is evidence-backed OR an explicit "Open:" → NOW write HTML
```

- **OBSERVE is mandatory** — re-post the slot table each round. A round that
  doesn't update the table is a bug; the loop cannot "feel done" silently.
- **GATE is a hard stop.** Do **not** call `Write` for `report.html` /
  `index.html` / `brief.html` before EXIT. Writing early = the failure mode.
- **MAX** ≈ 3 investigate rounds + 3 user-question rounds. Hitting MAX does not
  authorize fabrication — it authorizes *asking the user how to proceed*
  (keep asking, write sparse with Open bullets, or stop).

## Critical vs non-critical gaps

| Critical (block HTML) | Non-critical (may ship as `Open:`) |
|-----------------------|-------------------------------------|
| Task folder unresolved | §7 learnings not yet articulated |
| KR has no Target/Actual/Score/Evidence and no `unverified` reason | §8 doc-maintenance detail |
| Status Done/Partial/Stopped unknown | §2 wording not yet business-polished |
| §1 apex claims something §3 can't back | §6 diagram cosmetic state |

User may say *"write sparse, list open questions"* — that downgrades all gaps
to non-critical and allows EXIT with `Open:` bullets instead of prose.

## intake-state.json (loop survives across turns)

Write `docs/work/<slug>/intake-state.json` after each OBSERVE so a later
`/doc-flow:report <slug>` **resumes the loop** instead of re-auditing from zero.

```json
{
  "slug": "2026-07-06-example",
  "command": "report",
  "round": 2,
  "max_rounds": 6,
  "consultant_tier": "static",
  "slots": [
    { "id": "status",  "status": "filled", "source": "user" },
    { "id": "kr1",     "status": "filled", "source": "cmd: npm test" },
    { "id": "kr2",     "status": "gap",    "source": "verify not run" },
    { "id": "s4_plan", "status": "open",   "source": "no worklog — git only" }
  ],
  "asked": ["status", "business-impact"],
  "exit": false
}
```

- `status` per slot: `filled` (has evidence) · `gap` (blocks, critical) ·
  `open` (explicit open question, non-critical) · `na` (Not relevant + reason).
- On resume: read state, re-post table, continue at THINK from `round`.
- `exit: true` is written only when the GATE passed — treat it as the write
  permit. Delete/ignore stale state if the folder's files changed since.

## Per-command entry

| Command | Slots audited | EXIT permits |
|---------|---------------|--------------|
| `brief` | Objective, each KR (+verify method), scope in/out, risks | write `brief.html` |
| `report` | Status, §1–§8 (see `REPORT-INTAKE.md`) | write `report.html` + `index.html` |

Both loops are identical in shape; only the slot list differs.
