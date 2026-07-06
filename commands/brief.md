---
description: Create a pre-work brief as brief.html — ReAct loop (audit KRs → ask until measurable → gate) then viz-first HTML
argument-hint: "<task title, or path(s) to brainstorm/notes to consume>"
---

Create a PRE-WORK BRIEF for: **$ARGUMENTS**

Plan of record for `/doc-flow:work` and later `/doc-flow:report`. Run the same
**ReAct loop** as report: reason → act → observe → **gate**. **Clarify before
you template** — measurable KRs and scope need answers, not guesses.

Read first (in order):

1. `${CLAUDE_PLUGIN_ROOT}/docs/REACT-LOOP.md` — the loop, gate & `intake-state.json`
2. `${CLAUDE_PLUGIN_ROOT}/docs/CONSULTANT.md` — optional how-to-think help (Tier 1→3), never for project facts
3. `${CLAUDE_PLUGIN_ROOT}/docs/MENTAL-MODEL.md`
4. `${CLAUDE_PLUGIN_ROOT}/templates/brief.html` + `templates/brief-sections.md` + `doc-visuals`

**v0.3 output:** `brief.html` (not `brief.md`). Viz-first HTML per `doc-visuals`.

## Gather inputs

- Path(s) to notes/brainstorm → read and distill (options → Key Decisions;
  open questions → Risks).
- Else offer a `docs/work/*/brainstorm.md` match. Reuse its folder when consuming one.

## Run the loop (from REACT-LOOP.md)

**THINK** — Investigate relevant code/docs in the project so Architecture & flow
diagrams reflect reality (mark planned NEW only; never invent components). Build
the **slot table**: Objective, each KR (+ verification method), scope in/out,
risks — each `filled | gap | open | na` + source.

**CONSULT?** — If unsure which KR dimensions fit or how to frame verification,
call the consultant (Tier 1 `llm_wiki_ask` → Tier 2 → Tier 3). Question
checklist / structure only — never project facts.

**ACT** — read code · **AskUserQuestion** (1–2 per round) for what investigation
can't derive: the Objective (one sentence why), each **KR** as an outcome + an
**exact verification command or check** (not a task name), and **scope in/out**.

**OBSERVE** — re-post the slot table; write `intake-state.json` (`command: brief`).

**GATE** — any KR still not measurable, or Objective/scope undefined? yes →
`round++`, loop; at MAX ask the user how to proceed. **Do NOT write `brief.html`
before EXIT** — a KR that `/report` cannot verify later is the failure mode.

## After EXIT — write

1. **Viz plan** (chat, 3–8 lines): pattern IDs; ≥2 interactive elements.
2. **Write** `docs/work/<YYYY-MM-DD>-<slug>/brief.html` — inline `html-shared.css`;
   no `brief.md`. Fill all `brief-sections.md` headings; optional omitted →
   _Not relevant: reason_.
3. Set `intake-state.json` `exit: true`.
4. **Stop after writing.** Path + 3-line summary. No implementation — await
   **Approved**, then `/doc-flow:work`.
