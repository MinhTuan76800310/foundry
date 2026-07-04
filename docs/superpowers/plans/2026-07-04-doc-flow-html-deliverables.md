# doc-flow HTML deliverables (v0.3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship doc-flow v0.3 where `/brief` writes `brief.html`, `/report` writes `report.html` + `index.html`, with mandatory viz-first HTML and warm_dynamic shells; brainstorm/worklog stay `.md`.

**Architecture:** Three HTML shell templates hold shared CSS/JS stubs; `doc-visuals` skill defines Viz plan + pattern catalog; commands orchestrate paths and gates. Section content from former `templates/brief.md` / `report.md` becomes in-HTML headings filled by the agent. Reference viz: `docs/work/2026-07-04-worklog-verify/index.html`.

**Tech stack:** Claude Code plugin (markdown commands + SKILL.md), self-contained HTML (inline CSS/JS, Google Fonts), no build tool.

**Spec:** `docs/superpowers/specs/2026-07-04-doc-flow-html-deliverables-design.md`

## Global Constraints

- User decision **C + C3**: brief + report → HTML; brainstorm + worklog → `.md`; `/report` outputs **both** `report.html` and `index.html`.
- Frozen plan of record: **`brief.html`** not edited after approval; deviations → `worklog.md`.
- Minimum interactivity: `brief.html` ≥2; `report.html` KR + plan-vs-actual viz; `index.html` full embed + #viz.
- Aesthetic: warm_dynamic DNA (paper `#F5EEDC`, ink `#0B2545`, orange `#D75C2A`, green `#2A7553`, Space Grotesk + Newsreader + JetBrains Mono).
- `file://` must work (no local asset files except optional links to sibling `.md`).
- Plugin version on release: **0.3.0**.
- Do not remove dogfood folder; optional update as reference.

---

## File map

| File | Responsibility |
|------|----------------|
| `templates/html-shared.css` | Shared CSS block included in each HTML template via HTML comment marker `/* SHARED:paste html-shared.css */` (agent copies into each file on generate — templates store full inline CSS duplicated once from this source file for DRY maintenance) |
| `templates/brief.html` | Shell for `/brief` output |
| `templates/report.html` | Shell for `/report` report-first output |
| `templates/bundle.html` | Shell for `index.html` partner bundle |
| `templates/brief-sections.md` | Renamed from `brief.md` — section checklist only |
| `templates/report-sections.md` | Renamed from `report.md` — section checklist only |
| `skills/doc-visuals/SKILL.md` | HTML + Viz plan + catalog |
| `commands/brief.md` | Write `brief.html` |
| `commands/report.md` | Write `report.html` + `index.html` |
| `commands/work.md` | Locate `brief.html` |
| `commands/brainstorm.md` | Link to `brief.html` in folder note (optional one-line) |
| `README.md` | C3 layout |
| `.claude-plugin/plugin.json` | 0.3.0 + description |
| `docs/superpowers/checklists/html-deliverables-verify.md` | Manual verify steps |

---

### Task 1: Section checklists (rename markdown templates)

**Files:**
- Rename: `templates/brief.md` → `templates/brief-sections.md`
- Rename: `templates/report.md` → `templates/report-sections.md`
- Modify: top of both files — add 5-line note that these are **not** written to task folders in v0.3

**Interfaces:**
- Produces: checklist paths referenced by commands as `brief-sections.md` / `report-sections.md`

- [ ] **Step 1:** Add to top of `templates/brief-sections.md`:

```markdown
> **v0.3:** This file is a **section checklist** for content inside `brief.html` only.
> Do not write `brief.md` to task folders. Output path: `docs/work/<date>-<slug>/brief.html`.
```

- [ ] **Step 2:** Replace link rows in checklist table (lines 8–10) to reference HTML:

```markdown
| **Worklog** | [worklog.md](./worklog.md) — during implementation |
| **Report** | [report.html](./report.html) — after completion |
```

- [ ] **Step 3:** Same header note for `templates/report-sections.md`; fix Brief link:

```markdown
| **Brief** | [brief.html](./brief.html) |
```

- [ ] **Step 4:** Grep plugin for `templates/brief.md` and `templates/report.md` — none should remain after Task 5–6 (note for later tasks).

- [ ] **Step 5:** Commit

```bash
git add templates/brief-sections.md templates/report-sections.md
git rm templates/brief.md templates/report.md 2>/dev/null || true
git commit -m "refactor(doc-flow): rename md templates to section checklists for v0.3"
```

---

### Task 2: Shared CSS source file

**Files:**
- Create: `templates/html-shared.css`

**Interfaces:**
- Produces: CSS copied inline into `brief.html`, `report.html`, `bundle.html` `<style>` blocks

- [ ] **Step 1:** Create `templates/html-shared.css` with tokens + layout (extract from dogfood `index.html` lines 11–140, omit viz-only rules like `.flow-edge` — those go in bundle/report tasks). Minimum content:

```css
:root {
  --paper: #F5EEDC; --paper-warm: #EDE3C9; --paper-white: #FCF9EF;
  --ink: #0B2545; --ink-2: #1A3A5C; --ink-soft: rgba(11,37,69,0.65);
  --ink-faint: rgba(11,37,69,0.35); --ink-trace: rgba(11,37,69,0.12);
  --orange: #D75C2A; --orange-soft: rgba(215,92,42,0.16); --orange-deep: #A8421A;
  --green: #2A7553; --green-soft: rgba(42,117,83,0.16);
  --grid-minor: rgba(11,37,69,0.075);
}
/* + body grid, .top-nav, .container, .section, .doc-card, .data-table,
   .meta-table, blockquote.doc-note, .lane-tag, .btn, .canvas-frame,
   .hint-bar, footer — copy complete rules from dogfood index.html */
```

- [ ] **Step 2:** Open dogfood `docs/work/2026-07-04-worklog-verify/index.html` and copy matching rules into `html-shared.css` until file is self-contained (no `@import`).

- [ ] **Step 3:** Commit `templates/html-shared.css`

---

### Task 3: `templates/brief.html` shell

**Files:**
- Create: `templates/brief.html`

**Interfaces:**
- Consumes: `html-shared.css` inlined in `<style>`
- Produces: skeleton with `<!-- SLOT:... -->` comments for agent fill

- [ ] **Step 1:** Create file with structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Brief — <!-- SLOT:title --></title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>/* paste templates/html-shared.css */</style>
</head>
<body>
<header class="top-nav">...</header>
<main>
  <section id="overview" class="section hero">...</section>
  <section id="objective" class="section">...</section>
  <section id="key-results" class="section"><!-- SLOT:kr-table + kr-bars canvas --></section>
  <section id="scope" class="section">...</section>
  <section id="decisions" class="section">...</section>
  <section id="approach" class="section">...</section>
  <section id="architecture" class="section"><!-- SLOT:interactive-svg or static --></section>
  <section id="layer-view" class="section">...</section>
  <section id="control-flow" class="section">...</section>
  <section id="data-flow" class="section">...</section>
  <section id="risks" class="section">...</section>
  <section id="doc-maintenance" class="section">...</section>
</main>
<footer>Plan of record — Status: <!-- SLOT:status --></footer>
<script>/* SLOT:brief-interactive — min 2 widgets */</script>
</body>
</html>
```

- [ ] **Step 2:** Nav links must match section ids (Overview, Objective, KR, Scope, Decisions, Approach, Architecture, Risks, Doc maintenance). Omit nav entries for sections marked N/A in output (agent removes in filled file).

- [ ] **Step 3:** Inline full `html-shared.css` in `<style>`.

- [ ] **Step 4:** Commit `templates/brief.html`

---

### Task 4: `templates/report.html` shell

**Files:**
- Create: `templates/report.html`

- [ ] **Step 1:** Pyramid nav §1–§8 matching `report-sections.md` headings.

- [ ] **Step 2:** Slots: `<!-- SLOT:exec -->`, `<!-- SLOT:business -->`, `<!-- SLOT:scoreboard -->` + `#kr-canvas`, `<!-- SLOT:plan-vs-actual -->` + timeline or highlighted table, `<!-- SLOT:changes -->`, `<!-- SLOT:diagrams -->`, `<!-- SLOT:learnings -->`, `<!-- SLOT:docs-updated -->`.

- [ ] **Step 3:** Footer link to `brief.html`, `worklog.md`.

- [ ] **Step 4:** Commit `templates/report.html`

---

### Task 5: `templates/bundle.html` shell

**Files:**
- Create: `templates/bundle.html`

- [ ] **Step 1:** Nav: Report, Brief, Worklog, Artifact (optional), Viz — mirror dogfood `index.html` structure.

- [ ] **Step 2:** Sections `#report`, `#brief`, `#worklog`, `#artifact`, `#viz` with `<!-- SLOT:embed-* -->` placeholders.

- [ ] **Step 3:** Include viz CSS (flow-edge, timeline canvas, format-compare, grep-out) from dogfood in addition to shared CSS.

- [ ] **Step 4:** Stub `<script>` with `LOG_ENTRIES`, `NODE_META`, `drawKR`, `drawTimeline`, flow play — copy from dogfood `index.html` script as **template stubs** (empty arrays, comment "agent fills from worklog").

- [ ] **Step 5:** Commit `templates/bundle.html`

---

### Task 6: Extend `skills/doc-visuals/SKILL.md`

**Files:**
- Modify: `skills/doc-visuals/SKILL.md`

- [ ] **Step 1:** Append new top-level section `## HTML deliverables (v0.3)` after line 131 with:

```markdown
## HTML deliverables (v0.3)

### Output paths (C3)
| Command | Writes |
|---------|--------|
| brainstorm | `brainstorm.md` |
| brief | `brief.html` |
| work | `worklog.md` |
| report | `report.html` + `index.html` |

### Viz plan (required before HTML)
List 3–8 lines: section → pattern ID(s) → why HTML beats markdown for that section.

### Pattern catalog
(lane-nav, kr-bars, flow-play, timeline, split-morph, verify-sim, adr-table, pyramid-exec, embed-worklog) — copy table from design spec §2.

### Minimum interactivity
Copy rules from design spec for brief.html, report.html, index.html.

### Frozen brief
`brief.html` is not edited after Approved; worklog + report reconcile.

### Templates
Load `${CLAUDE_PLUGIN_ROOT}/templates/brief.html` | `report.html` | `bundle.html`.
Section checklist: `brief-sections.md`, `report-sections.md`.
Aesthetic: warm_dynamic; reference `docs/work/2026-07-04-worklog-verify/index.html` for bundle/viz patterns only.
```

- [ ] **Step 2:** Add note under General rules: "Mermaid in brief reasoning; prefer SVG/canvas in HTML when interaction or highlight adds clarity."

- [ ] **Step 3:** Commit skill

---

### Task 7: Update `commands/brief.md`

**Files:**
- Modify: `commands/brief.md`

- [ ] **Step 1:** Replace step 2 skeleton path:

```markdown
2. **Load the skeleton**: read `${CLAUDE_PLUGIN_ROOT}/templates/brief.html` and
   `${CLAUDE_PLUGIN_ROOT}/templates/brief-sections.md` for required sections.
   Follow `doc-visuals` HTML deliverables + Viz plan.
```

- [ ] **Step 2:** Replace step 5 output:

```markdown
5. **Viz plan** (in chat): map sections to HTML patterns; confirm ≥2 interactive elements.
6. **Write the file** to `docs/work/<YYYY-MM-DD>-<slug>/brief.html` (not brief.md).
```

- [ ] **Step 3:** Renumber following steps; step 7 stop-after-write unchanged.

- [ ] **Step 4:** Commit

---

### Task 8: Update `commands/report.md`

**Files:**
- Modify: `commands/report.md`

- [ ] **Step 1:** Locate brief: `docs/work/*/brief.html` (fallback `brief.md` only if legacy folder — one sentence).

- [ ] **Step 2:** Load `templates/report.html`, `templates/bundle.html`, `report-sections.md`.

- [ ] **Step 3:** Replace write step:

```markdown
10. **Viz plan** for report.html and index.html (#viz must share data with embedded tables).
11. **Write** `report.html` and `index.html` next to the brief (same folder). Do not write report.md.
12. **Finish**: path to both files, KR table in chat, exec paragraph verbatim.
```

- [ ] **Step 4:** Commit

---

### Task 9: Update `commands/work.md` + `brainstorm.md`

**Files:**
- Modify: `commands/work.md`, `commands/brainstorm.md`

- [ ] **Step 1:** `work.md` — replace all `brief.md` resolution with `brief.html`:

```markdown
slug/keyword match against `docs/work/*/brief.html` → most recently modified.
Legacy: if only `brief.md` exists, use it but suggest regenerating `brief.html`.
```

- [ ] **Step 2:** `work.md` argument-hint: `brief.html`

- [ ] **Step 3:** `brainstorm.md` — if it mentions report/brief paths, note future `brief.html` (read file; one-line fix if present).

- [ ] **Step 4:** Commit

---

### Task 10: README + plugin manifest

**Files:**
- Modify: `README.md`, `.claude-plugin/plugin.json`

- [ ] **Step 1:** README folder layout:

```markdown
docs/work/<date>-<slug>/
  brainstorm.md
  worklog.md
  brief.html      # plan of record
  report.html
  index.html      # full partner bundle
```

- [ ] **Step 2:** Structure tree add `templates/brief.html`, `report.html`, `bundle.html`, `brief-sections.md`, `report-sections.md`.

- [ ] **Step 3:** Roadmap: v0.3 current (HTML deliverables), v0.2 bullet archived.

- [ ] **Step 4:** `plugin.json`:

```json
"version": "0.3.0",
"description": "Brainstorm → brief (HTML) → work (worklog) → report (HTML + bundle): viz-first partner deliverables, OKR, plan-vs-actual.",
"keywords": ["documentation", "okr", "html", "brainstorm", "brief", "worklog", "report"]
```

- [ ] **Step 5:** Commit

---

### Task 11: Verification checklist

**Files:**
- Create: `docs/superpowers/checklists/html-deliverables-verify.md`

- [ ] **Step 1:** Create checklist with steps:

```markdown
# Verify doc-flow v0.3 HTML deliverables

1. Run `/doc-flow:brief` on a tiny task → `brief.html` exists; open file:// ; ≥2 interactive elements.
2. Approve status in HTML meta/footer; run `/doc-flow:work` with intentional deviation → worklog.md only changes.
3. Run `/doc-flow:report` → `report.html` + `index.html`; index embeds full brief/worklog/report text.
4. Grep task folder: no new `brief.md` or `report.md` unless legacy.
5. Plugin version 0.3.0 in plugin.json.
```

- [ ] **Step 2:** Commit

---

### Task 12: Optional — refresh dogfood folder as v0.3 reference

**Files:**
- Create: `docs/work/2026-07-04-worklog-verify/brief.html` (from embedded content in index)
- Modify: `index.html` intro line to say v0.3 reference bundle

**Interfaces:**
- Consumes: existing md sources in same folder

- [ ] **Step 1:** Generate `brief.html` from existing `brief.md` content + min interactive diagram (flow-play).

- [ ] **Step 2:** Split current `index.html`: ensure it matches bundle template contract; add `report.html` with pyramid-only content from `report.md`.

- [ ] **Step 3:** Commit dogfood trio

```bash
git add docs/work/2026-07-04-worklog-verify/
git commit -m "docs: dogfood folder as v0.3 HTML reference (brief, report, index)"
```

---

## Spec coverage self-review

| Spec requirement | Task |
|------------------|------|
| C + C3 file layout | 7, 8, 10 |
| Viz plan + catalog | 6, 7, 8 |
| Shell templates | 2–5 |
| Frozen brief.html | 6, 8, 9 |
| worklog.md unchanged | 9 |
| Minimum interactivity | 6, 11 |
| index full embed | 5, 8, 11 |
| Error handling (no brief/worklog) | 8 command text |
| plugin 0.3.0 | 10 |
| warm_dynamic | 2, 6 |

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-04-doc-flow-html-deliverables.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — implement in this session with executing-plans checkpoints  

**Which approach do you want?**

Also: spec is at `docs/superpowers/specs/2026-07-04-doc-flow-html-deliverables-design.md` (committed). Plan file should be committed when you start implementation.