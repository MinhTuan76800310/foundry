---
description: Post-work report — slot audit, ask until ready, then sparse quality HTML
argument-hint: "**Required:** path or slug to docs/work/<date>-<slug>"
---

Create a POST-WORK REPORT. Target: **$ARGUMENTS**

You are an **evidence clerk**, not a form painter. **Ask until slots are filled or explicitly open** — then write; quality beats length.

Read (in order):

1. `${CLAUDE_PLUGIN_ROOT}/docs/MENTAL-MODEL.md`
2. `${CLAUDE_PLUGIN_ROOT}/docs/REPORT-INTAKE.md` — slot → questions; **stop rule before HTML**
3. `${CLAUDE_PLUGIN_ROOT}/docs/DATA-CONTRACT.md` — investigation + sources
4. `${CLAUDE_PLUGIN_ROOT}/templates/report-sections.md` — headings only

**MCP llm_wiki (mental model consultant):** When the slot audit has gaps and you are unsure *what to ask*, call `llm_wiki_ask` with the gap list and ask for a **question checklist** (not report prose). Wiki does **not** supply project facts — brief, worklog, git, and the **user** do.

## Phase A — Resolve & investigate (no HTML)

1. Resolve `docs/work/<slug>/` — never silent `latest` if multiple folders.
2. **DATA-CONTRACT investigation:** recent git anchor, root README/docs context, scope-first `git log`/`diff`, expand paths when scope or commits reference outside.
3. Read `brief.html`, `worklog.md`, optional `brainstorm.md`.

## Phase B — Slot audit (chat, mandatory)

4. Build a **slot table** mapped to `report-sections.md` (Status, §1–§8): each row = `filled | gap | source (file/commit/user)`.
5. For **§3 KRs:** every KR needs Target, Actual, Score path, Evidence path — or mark `gap`.
6. Post the table. **Do not write HTML yet** if critical gaps exist (no brief + no user KR intent, no verify run, unknown Done/Partial) unless user said *sparse + open questions*.

## Phase C — Ask until ready

7. **Ask the user** for gaps git cannot close (business impact, deviation *reason*, KR intent met, status Done/Partial, leadership decision). Use **AskUserQuestion** for up to 4 mutually blocking choices, or 1–2 short questions in chat (same rhythm as `/doc-flow:brainstorm`).
8. Optional: `llm_wiki_ask` — "Given gaps: […], what should I ask vs infer from git?"
9. Run **each** KR verification command from brief §2; update slot table with output.
10. Re-check **stop rule** in REPORT-INTAKE. If still blocked, ask again — **do not fabricate**.

## Phase D — Write (sparse allowed)

11. **Viz plan:** `#viz` from scored KRs + worklog facts only.
12. `viz-spec.json`, `index.html`, `report.html` — **omit or shorten** sections with no evidence; use **Open:** bullets instead of filler.
13. §1 Executive only claims backed by §3 table.
14. AI images: if `.env` + `imageRequests`, run `generate-viz-images.mjs` with user-approved Bash.

15. **Finish:** final slot table, evidence gaps, exec summary. State if report is intentionally sparse.

**Failure mode:** Pretty HTML with invented §2/§4/✅ — treat as bug; say so in chat.