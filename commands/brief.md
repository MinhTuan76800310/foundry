---
description: Create a pre-work brief (OKR + Mermaid visuals) before starting a task
argument-hint: <task title or short description>
---

Create a PRE-WORK BRIEF for the following task: **$ARGUMENTS**

This brief is written BEFORE implementation and will be reviewed by the team
(German engineering culture: OKR framing, explicit diagrams, plan-vs-actual
discipline). Write it in English unless the user asks otherwise.

## Steps

1. **Load the skeleton**: read `${CLAUDE_PLUGIN_ROOT}/templates/brief.md` and
   follow the `doc-visuals` skill conventions for every diagram.
2. **Investigate before writing**: read the relevant code/docs in the current
   project so the Architecture and flow diagrams reflect reality. Never invent
   components that do not exist (planned NEW components are fine — mark them
   as changed per the skill).
3. **Clarify**: if the Objective or measurable Key Results cannot be derived
   from the task description and project context, ask the user at most 3 short
   questions before writing.
4. **Write the file** to `docs/work/<YYYY-MM-DD>-<slug>/brief.md` in the
   current project (kebab-case English slug from the task title; create
   directories as needed).
5. **Required sections** — fill all of them, following the template:
   - Objective — one sentence, the why
   - Key Results — 2–4 measurable outcomes, each with a verification method
   - Scope — in / out
   - Approach — numbered steps with expected outcome each
   - Architecture (Mermaid, always required) — target state, new parts marked
   - Layer View (only if the task touches layering / module boundaries)
   - Control Flow (required for any logic change)
   - Data Flow (required if data crosses component boundaries or PII involved)
   - Risks & Open Questions
   Omitted optional sections: keep the heading with `_Not relevant: <reason>_`.
6. **Stop after writing.** Show the user the file path plus a 3-line summary,
   then STOP. Do NOT start implementing — the brief must be reviewed first.
