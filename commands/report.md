---
description: Create post-work report.html + index.html (canonical bundle) + viz-spec.json; hybrid dynamic + optional AI images
argument-hint: "[path to brief.html or task slug — omit to use the most recent brief]"
---

Create a POST-WORK REPORT. Target: **$ARGUMENTS**

**Canonical partner file:** `index.html` — same structure and style as
`docs/work/2026-07-04-worklog-verify/index.html` (Space Grotesk + Newsreader,
warm paper, full embed report/brief/worklog, **#viz dynamic**, optional **#viz-story** AI images).

Also write `report.html` (pyramid-only nav) and **`viz-spec.json`**.

## Steps

1. **Locate the brief** (`brief.html` preferred; legacy `brief.md` → suggest regen).
2. **Load:** `templates/bundle.html` (canonical = dogfood index layout),
   `templates/report.html`, `report-sections.md`, `doc-visuals` hybrid rules.
3. **Read worklog** + git evidence; score KRs with evidence.
4. **Viz plan** (required): per section tag `dynamic` | `mermaid` | `ai-image` | `table-only`.
   - **Always** `#viz` dynamic: flow-play, kr-bars, timeline, split-morph/verify-sim when relevant.
   - **ai-image** when: story A→B→C with nested detail (B1,B2,B3), partner metaphor, architecture too rich for Mermaid.
5. **Write `viz-spec.json` v2+** with `story`, `charts`, `imageRequests[]` (id, file, slot, promptHint with warm_dynamic palette).
6. **Write `index.html`** — full embed §1–8 + brief + worklog; **do not remove #viz JS**.
   - If `imageRequests` exist: add `#viz-story` section with `<img src="generated-images/...">` + figcaption (paths relative); note user runs `node scripts/generate-viz-images.mjs`.
7. **Write `report.html`** — pyramid sections; link to index for full bundle.
8. **Finish:** paths, KR table in chat, exec summary; remind optional image script.

**Do not** replace dynamic #viz with images only. Tables remain source of truth for KR.