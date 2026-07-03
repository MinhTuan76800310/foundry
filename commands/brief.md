---
description: Create a pre-work brief (Overview + OKR + decisions + Mermaid visuals) — from scratch or from brainstorm/notes
argument-hint: "<task title, or path(s) to brainstorm/notes to consume>"
---

Create a PRE-WORK BRIEF for: **$ARGUMENTS**

This brief is written BEFORE implementation and will be reviewed by the team
(German engineering culture: OKR framing, explicit diagrams, plan-vs-actual
discipline). Once approved it becomes the plan of record for
`/doc-flow:work`. Write in English unless the user asks otherwise.

## Steps

1. **Gather inputs**:
   - If the argument contains path(s) to files (markdown/HTML notes,
     brainstorm output), read them — they are the user's thinking to distill.
   - Otherwise check `docs/work/*/brainstorm.md` for a matching brainstorm
     (same topic/slug or most recent) and offer to consume it.
   - Distill, don't discard: options considered in the brainstorm become Key
     Decisions rows; its open questions land in Risks & Open Questions.
2. **Load the skeleton**: read `${CLAUDE_PLUGIN_ROOT}/templates/brief.md` and
   follow the `doc-visuals` skill conventions for every diagram.
3. **Investigate before writing**: read the relevant code/docs in the current
   project so the Architecture and flow diagrams reflect reality. Never invent
   components that do not exist (planned NEW components are fine — mark them
   as changed per the skill).
4. **Clarify**: if the Objective or measurable Key Results cannot be derived
   from the inputs and project context, ask the user at most 3 short
   questions before writing.
5. **Write the file** to `docs/work/<YYYY-MM-DD>-<slug>/brief.md` in the
   current project (kebab-case English slug from the task title; reuse the
   brainstorm's folder when consuming one; create directories as needed).
6. **Required sections** — fill all of them, following the template:
   - Overview — 3–5 lines, map of the forest, readable with zero context
   - Objective — one sentence, the why
   - Key Results — 2–4 measurable outcomes, each with a verification method
   - Scope — in / out
   - Key Decisions — ADR-lite table: decision, options considered, why
   - Approach — numbered steps with expected outcome each
   - Architecture (Mermaid, always required) — current vs. target state,
     new parts marked
   - Layer View (only if the task touches layering / module boundaries)
   - Control Flow (required for any logic change)
   - Data Flow (required if data crosses component boundaries or PII involved)
   - Risks & Open Questions
   - Doc Maintenance — which long-lived docs must be updated when this ships
   Omitted optional sections: keep the heading with `_Not relevant: <reason>_`.
7. **Stop after writing.** Show the user the file path plus a 3-line summary,
   then STOP. Do NOT start implementing — the brief must be reviewed and
   approved first (then: `/doc-flow:work`).
