# Design: doc-flow HTML deliverables (v0.3)

| | |
|---|---|
| **Date** | 2026-07-04 |
| **Status** | Approved (brainstorming gate passed) |
| **Scope** | Plugin doc-flow — partner-facing outputs |
| **Decision** | **C + C3** (see below) |

## Problem

doc-flow v0.2 ends in Markdown (`brief.md`, `report.md`). That fits agents and git diff but underuses what partners need: **one reviewable artifact** with **visual and interactive** explanation (flows, KR evidence, timelines, plan-vs-actual). A recent dogfood bundle (`index.html` embedding full brief/worklog/report + SVG/canvas) proved HTML can carry the same facts with stronger communication — if the plugin **requires visualization thinking**, not post-hoc styling.

## Goals

1. **End deliverables for review are HTML**, not markdown, for brief and report paths.
2. Agents must run a **Viz plan** before writing HTML — leverage HTML strengths deliberately.
3. Preserve v0.2 discipline: frozen plan of record, append-only worklog, pyramid report, OKR evidence.
4. Keep **fast agent writes** for brainstorm and work (`*.md`).

## Non-goals (v0.3)

- Replacing `worklog.md` or `brainstorm.md` with HTML.
- Automated HTML generator script / build pipeline (agent-authored single files remain).
- Confluence export, doc index page (README roadmap “later”).
- Mandatory removal of all `*.md` brief/report templates from repo (they become section checklists only).

## User decisions (locked)

| Question | Answer |
|----------|--------|
| Markdown replacement scope | **C** — brief + report → HTML; brainstorm + worklog stay `.md` |
| When / how many HTML files | **C3** — `/brief` → `brief.html`; `/report` → `report.html` **and** `index.html` bundle |

## Architecture — task folder layout

```
docs/work/<YYYY-MM-DD>-<slug>/
  brainstorm.md      # optional — /doc-flow:brainstorm
  worklog.md         # /doc-flow:work — append-only
  brief.html         # /doc-flow:brief — plan of record (frozen after approval)
  report.html        # /doc-flow:report — layered pyramid §1–8
  index.html         # /doc-flow:report — single-file partner bundle
  <task artifacts>   # e.g. marker.txt — unchanged
```

### Plan-of-record discipline

- After approval, **`brief.html` is not edited**. Deviations go to `worklog.md`; reconciliation in `report.html` / `index.html`.
- `/doc-flow:work` must treat `brief.html` as read-only plan (same as former `brief.md`).

### `index.html` contract

- Embeds **full text** of brief sections, worklog (log + deviation register), and report §1–8 (not executive-only summary).
- Section **#viz** (or equivalent): interactive layer derived from the **same facts** (shared in-page data structures — e.g. one `LOG_ENTRIES` array feeding table + timeline).
- Opens correctly via `file://` (inline CSS/JS, Google Fonts allowed, no local asset deps).

### `report.html` vs `index.html`

- **`report.html`**: pyramid document for readers who want report-first nav; full engineering sections.
- **`index.html`**: superset for partners — report + embedded brief + worklog + consolidated interactive views.

## Approach chosen: HTML shell templates + viz skill (option 2)

Rejected:

- **Skill-only** — inconsistent quality and token cost.
- **Md + export** — contradicts “HTML is the deliverable.”

Implemented pattern:

1. Add `templates/brief.html`, `templates/report.html`, `templates/bundle.html` — shared warm_dynamic DNA (CSS tokens, typography, nav, `doc-card` layout), empty content slots.
2. Extend `skills/doc-visuals/SKILL.md` with **HTML deliverables**, **Viz plan** workflow, and **pattern catalog**.
3. Update `commands/brief.md` and `commands/report.md` to write HTML paths and enforce Viz plan + minimum interactivity rules.
4. Keep `templates/brief.md` / `templates/report.md` as **section outlines** (rename optional to `brief-sections.md` / `report-sections.md`) — checklist for required headings inside HTML, not written to task folder.

## §2 Visualization thinking (normative)

### Viz plan (before any HTML write)

Agent produces a short plan (chat or mental checklist): for each major section, which catalog patterns apply and why. No canvas “for decoration.”

### Per-block questions

1. Need **order / relationships**? → `flow-play`, architecture SVG  
2. Need **KR / pass-fail**? → `kr-bars`, `verify-sim`  
3. Need **plan vs actual / time**? → `timeline`, deviation styling  
4. Need **system structure**? → architecture / layer / control / data (SVG when ≤15 nodes and interaction helps)  
5. **Text + tables only**? → `doc-card` + tables; skip fake charts  

### Pattern catalog

| ID | Use when | Capability |
|----|----------|------------|
| `lane-nav` | All partner HTML | Fixed nav, § anchors, pyramid order |
| `kr-bars` | Brief §2 KR, report §3 | Canvas bars + evidence table |
| `flow-play` | Brief §6–9, report §6 | SVG paths, play particle, dashed deviation edges |
| `timeline` | Bundle worklog | Canvas + slider from log rows |
| `split-morph` | Format / plan drift | Two-pane + blend slider |
| `verify-sim` | KR verification | Button shows command + result |
| `adr-table` | Key decisions | Table + optional term popover |
| `pyramid-exec` | Report §1–3 | Exec + scoreboard cards |
| `embed-worklog` | `index.html` only | Full tables + link to #viz |

### Minimum interactivity

| File | Rule |
|------|------|
| `brief.html` | ≥2 interactive/animated elements; if §6 or §8 relevant, ≥1 interactive diagram |
| `report.html` | KR viz + plan-vs-actual viz (timeline or highlighted table) |
| `index.html` | Full embed + #viz with ≥2 interactive views sharing same data as tables |

### Aesthetic

- **warm_dynamic** DNA: paper/navy palette, Space Grotesk + Newsreader + JetBrains Mono, graph grid background.
- Reference implementation: `docs/work/2026-07-04-worklog-verify/index.html` (structure/viz only — do not copy dogfood content).

Mermaid in skill remains for **agent reasoning** during `/brief`; HTML output prefers SVG/canvas when the diagram benefits from play or highlight.

## §3 Component changes

| Component | Change |
|-----------|--------|
| `commands/brief.md` | Output `brief.html`; load `templates/brief.html`; Viz plan step; stop after write |
| `commands/report.md` | Output `report.html` + `index.html`; load report + bundle templates; read `worklog.md`, `brief.html`; no `report.md` |
| `commands/work.md` | Still `worklog.md`; reference frozen `brief.html` |
| `commands/brainstorm.md` | Unchanged (`brainstorm.md`) |
| `templates/brief.html` | New shell |
| `templates/report.html` | New shell |
| `templates/bundle.html` | New shell |
| `templates/brief.md`, `templates/report.md` | Section checklist only (deprecate as disk output) |
| `skills/doc-visuals/SKILL.md` | HTML + Viz plan + catalog + C3 rules |
| `README.md` | Document C3 folder layout; v0.3 |
| `.claude-plugin/plugin.json` | Version **0.3.0** on release |

## Data flow

```text
brainstorm.md ──► /brief ──► brief.html (approved, frozen)
brief.html + codebase ──► /work ──► worklog.md
brief.html + worklog.md + git/evidence ──► /report ──► report.html + index.html
```

## Error handling

| Condition | Behavior |
|-----------|----------|
| No `brief.html` for `/report` | Offer standalone `report.html` + `index.html`; flag retroactive KRs |
| No `worklog.md` | Report states source = git/chat; plan-vs-actual best-effort |
| No diagram-relevant scope | Viz plan documents “tables-first”; still meet minimum interactivity (e.g. KR bars + nav-linked highlights) |

## Verification

1. Re-run dogfood-style task (skewed plan); produce `brief.html`, `report.html`, `index.html`.
2. Open all three via `file://`; confirm bundle embeds full brief/worklog/report text.
3. Plugin checklist: interactivity minimums; frozen brief rule in `/work` command text.

## Risks

| Risk | Mitigation |
|------|------------|
| HTML drift vs facts | Single source arrays in `index.html`; report/brief generated in same session from same evidence |
| Token cost | Shell templates reduce CSS reinvention; catalog limits over-building |
| Git diff readability | Accept tradeoff for partner UX; optional future: keep md in git via CI (out of v0.3 scope) |

## Implementation next step

Invoke **writing-plans** skill to produce a step-by-step implementation plan (templates, command edits, skill expansion, README, version bump, dogfood refresh). No code changes until plan is approved.