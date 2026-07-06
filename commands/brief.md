---
description: Create a pre-work brief as brief.html (Overview + OKR + decisions + interactive visuals) — from scratch or from brainstorm/notes
argument-hint: "<task title, or path(s) to brainstorm/notes to consume>"
---

Create a PRE-WORK BRIEF for: **$ARGUMENTS**

Plan of record for `/doc-flow:work` and later `/doc-flow:report`. **Clarify before you template** — measurable KRs and scope need answers, not guesses.

Read `${CLAUDE_PLUGIN_ROOT}/docs/MENTAL-MODEL.md`. For KR/scope audit framing, you may consult MCP **`llm_wiki_ask`** (question checklist only — not project facts).

**v0.3 output:** `brief.html` (not `brief.md`). Viz-first HTML per `doc-visuals`.

## Steps

1. **Gather inputs**:
   - Path(s) to notes/brainstorm → read and distill.
   - Else offer `docs/work/*/brainstorm.md` match.
2. **Load skeleton**: `templates/brief.html`, `templates/brief-sections.md`, `doc-visuals`.
3. **Investigate before writing**: read relevant code/docs in the project — diagrams reflect reality; mark planned NEW only.
4. **Ask until KRs are measurable** (1–2 questions per round if needed):
   - What is the **Objective** (one sentence why)?
   - Each **KR**: outcome + **exact verification command or check** (not a task name)?
   - **Scope in/out** — what must not change?
   If Objective/KRs cannot be derived from inputs + investigation, **stop and ask** — do not invent KRs that `/report` cannot verify later.
5. **Viz plan** (chat, 3–8 lines): pattern IDs; ≥2 interactive elements in `brief.html`.
6. **Write** `docs/work/<YYYY-MM-DD>-<slug>/brief.html` — inline `html-shared.css`; no `brief.md`.
7. **Required sections** per `brief-sections.md`; optional omitted → _Not relevant: reason_.
8. **Stop after writing.** Path + 3-line summary. No implementation — await **Approved**, then `/doc-flow:work`.