# doc-flow

Claude Code plugin for a **brainstorm → brief → work → report** documentation
lifecycle:

- `/doc-flow:brainstorm [topic]` — capture raw thinking into `brainstorm.md`.
- `/doc-flow:brief <task | note files>` — pre-work plan of record as **`brief.html`**
  (Overview, OKR, ADR-lite, **viz-first** interactive diagrams). Once approved,
  the brief is frozen.
- `/doc-flow:work [brief]` — execute following the brief; deviations append to
  **`worklog.md`** only.
- `/doc-flow:report [brief]` — **`report.html`** (pyramid CTO/business/engineering)
  plus **`index.html`** (single-file partner bundle: full brief + worklog + report
  + interactive #viz).

Docs land in the project you run it from:

```
docs/work/<date>-<slug>/
  brainstorm.md
  worklog.md
  brief.html       # plan of record
  report.html
  index.html       # partner bundle (canonical — dynamic #viz + optional #viz-story AI)
  viz-spec.json    # charts, story, imageRequests → generate-viz-images.mjs
```

## Install

Local (for development):

```
/plugin marketplace add /home/minhtuan958/Documents/doc-flow
/plugin install doc-flow@doc-flow
```

From git (for the team, once pushed):

```
/plugin marketplace add <git-url>
/plugin install doc-flow@doc-flow
```

Restart Claude Code after installing.

## Structure

```
.claude-plugin/
  plugin.json
  marketplace.json
commands/
  brainstorm.md
  brief.md           # → brief.html
  work.md            # → worklog.md
  report.md          # → report.html + index.html
skills/
  doc-visuals/       # Mermaid + OKR + HTML viz catalog
templates/
  brainstorm.md
  brief-sections.md  # checklist (not written to disk)
  report-sections.md
  brief.html
  report.html
  bundle.html
  html-shared.css
  worklog.md
```

## Customizing

Edit `templates/brief.html` / `report.html` / `bundle.html` for layout;
`skills/doc-visuals/SKILL.md` for diagram, OKR, and HTML viz rules.
`brief-sections.md` / `report-sections.md` define required content headings.

## Roadmap

- v0.1 — brief/report markdown + Mermaid
- v0.2 — brainstorm, worklog, layered report
- **v0.3 — HTML deliverables (brief.html, report.html, index.html), viz-first**
- **v0.4 — index.html canonical + viz-spec + hybrid dynamic + optional AI images** (current direction)
- later — doc index, Confluence export