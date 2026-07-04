---
description: Create a pre-work brief as brief.html (Overview + OKR + decisions + interactive visuals) — from scratch or from brainstorm/notes
argument-hint: "<task title, or path(s) to brainstorm/notes to consume>"
---

Create a PRE-WORK BRIEF for: **$ARGUMENTS**

This brief is written BEFORE implementation and will be reviewed by the team
(German engineering culture: OKR framing, explicit diagrams, plan-vs-actual
discipline). Once approved it becomes the plan of record for
`/doc-flow:work`. Write in English unless the user asks otherwise.

**v0.3 output:** `brief.html` (not `brief.md`). Viz-first HTML per `doc-visuals`.

## Steps

1. **Gather inputs**:
   - If the argument contains path(s) to files (markdown/HTML notes,
     brainstorm output), read them — they are the user's thinking to distill.
   - Otherwise check `docs/work/*/brainstorm.md` for a matching brainstorm
     (same topic/slug or most recent) and offer to consume it.
   - Distill, don't discard: options considered in the brainstorm become Key
     Decisions rows; its open questions land in Risks & Open Questions.
2. **Load the skeleton**: read `${CLAUDE_PLUGIN_ROOT}/templates/brief.html` and
   `${CLAUDE_PLUGIN_ROOT}/templates/brief-sections.md` for required sections.
   Follow `doc-visuals` **HTML deliverables** and **Viz plan**.
3. **Investigate before writing**: read the relevant code/docs in the current
   project so the Architecture and flow diagrams reflect reality. Never invent
   components that do not exist (planned NEW components are fine — mark them
   in SVG/HTML).
4. **Clarify**: if the Objective or measurable Key Results cannot be derived
   from the inputs and project context, ask the user at most 3 short
   questions before writing.
5. **Viz plan** (in chat, 3–8 lines): map each major section to HTML pattern
   IDs (`kr-bars`, `flow-play`, `verify-sim`, etc.). Confirm **≥2**
   interactive or animated elements in the final `brief.html`.
6. **Write the file** to `docs/work/<YYYY-MM-DD>-<slug>/brief.html` in the
   current project (kebab-case English slug; reuse the brainstorm's folder
   when consuming one; create directories as needed). Inline CSS from
   `templates/html-shared.css` + task-specific viz CSS/JS. Do **not** write
   `brief.md`.
7. **Required sections** — fill all headings from `brief-sections.md` inside
   the HTML (Overview, Objective, Key Results, Scope, Key Decisions, Approach,
   Architecture, Layer/Control/Data when relevant, Risks, Doc Maintenance).
   Omitted optional sections: keep the heading with _Not relevant: reason_.
8. **Stop after writing.** Show the user the file path plus a 3-line summary,
   then STOP. Do NOT start implementing — the brief must be reviewed and
   approved first (then: `/doc-flow:work`).