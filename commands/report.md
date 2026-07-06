---
description: Post-work report — ReAct loop (slot audit → ask until ready → gate) then sparse quality HTML
argument-hint: "**Required:** path or slug to docs/work/<date>-<slug>"
---

Create a POST-WORK REPORT. Target: **$ARGUMENTS**

You are an **evidence clerk running a ReAct loop**, not a form painter. Reason →
act → observe → **gate** → repeat until every slot is evidence-backed or an
explicit `Open:` — only then write HTML. Quality beats length.

Read first (in order):

1. `${CLAUDE_PLUGIN_ROOT}/docs/REACT-LOOP.md` — the enforced loop, gate & `intake-state.json`
2. `${CLAUDE_PLUGIN_ROOT}/docs/CONSULTANT.md` — optional how-to-think help (Tier 1→3), never for project facts
3. `${CLAUDE_PLUGIN_ROOT}/docs/REPORT-INTAKE.md` — slot → questions
4. `${CLAUDE_PLUGIN_ROOT}/docs/DATA-CONTRACT.md` — investigation + sources
5. `${CLAUDE_PLUGIN_ROOT}/templates/report-sections.md` — headings only

## Resume or start

- Resolve `docs/work/<slug>/` — never silent `latest` if multiple folders.
- If `docs/work/<slug>/intake-state.json` exists and the folder files are
  unchanged since it was written: **resume the loop** from its `round` — re-post
  the slot table, continue at THINK. Otherwise start `round = 0`.

## Run the loop (from REACT-LOOP.md)

**THINK** — Investigate per DATA-CONTRACT (recent git anchor, root README/docs
context, scope-first `git log`/`diff`, expand paths when scope or commits point
outside). Read `brief.html`, `worklog.md`, optional `brainstorm.md`. Build the
**slot table** for Status + §1–§8, each row `filled | gap | open | na` + source.

**CONSULT?** — If unsure *what to ask* or *how to structure*, call the consultant
(Tier 1 `llm_wiki_ask` → Tier 2 other MCP → Tier 3 Claude + these docs). State
the tier once. **Never** ask the consultant for KR values, what changed, or
deviation reasons.

**ACT** — git log/diff/show · read code · run **each** KR verify command from
brief §2 · **AskUserQuestion** for facts git can't close (business impact,
deviation *reason*, KR intent met, Done/Partial/Stopped, leadership decision).

**OBSERVE** — re-post the slot table with what this round closed; write
`intake-state.json`.

**GATE** — any CRITICAL gap open (see REACT-LOOP table)? yes → `round++`, loop
again; at MAX ask the user (keep asking / sparse+Open / stop). **Do NOT call
Write for `report.html` / `index.html` before EXIT.**

## After EXIT — write (sparse allowed)

1. **Viz plan:** `#viz` from scored KRs + worklog facts only.
2. `viz-spec.json`, `index.html`, `report.html` — **omit or shorten** sections
   with no evidence; use **Open:** bullets instead of filler.
3. §1 Executive only claims what the §3 table backs.
4. AI images: if `.env` + `imageRequests`, run `generate-viz-images.mjs` (user-approved Bash).
5. Set `intake-state.json` `exit: true`.
6. **Finish:** final slot table, evidence gaps, exec summary. Say if intentionally sparse.

**Failure mode:** Pretty HTML with invented §2/§4/✅, or writing before GATE
passes — treat as a bug and say so in chat.
