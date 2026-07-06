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

Docs land in the **project you run Claude from** (not inside the doc-flow repo):

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

## Using as a plugin (generate docs in another repo)

The plugin runs inside **Claude Code**; artifacts are written under **`docs/work/`**
in whatever repository is your **current working directory**.

### 1. Install once (per machine)

```
/plugin marketplace add /path/to/doc-flow
/plugin install doc-flow@doc-flow
```

Restart Claude Code. Confirm commands exist: `/help` → `doc-flow:brainstorm`,
`doc-flow:brief`, `doc-flow:work`, `doc-flow:report`.

### 2. Open the target repo (not doc-flow)

```bash
cd /path/to/your-application-repo
claude
```

Or open that folder in VS Code with Claude Code. All generated docs go here.

### 3. Run the lifecycle

| Step | Command | Output |
|------|---------|--------|
| (optional) | `/doc-flow:brainstorm <topic>` | `docs/work/<date>-<slug>/brainstorm.md` |
| 1 | `/doc-flow:brief <task title or paths to notes>` | `brief.html` — review → **Approved** |
| 2 | `/doc-flow:work` or `/doc-flow:work <slug>` | `worklog.md` (brief.html not edited) |
| 3 | `/doc-flow:report` | `report.html`, **`index.html`**, `viz-spec.json` (+ auto gen ảnh nếu có `.env`) |
| (optional) | `/doc-flow:generate-images` | `generated-images/*.png` |

**Primary deliverable for partners:** open `docs/work/.../index.html` in a browser
(`file://` or static host). Reference layout:
`docs/work/2026-07-04-worklog-verify/index.html` in this repo.

### 4. AI sketch images — chỉ cần `.env` ở root repo app (không copy script)

1. Trong **repo app** (không phải doc-flow), tạo `.env`:

```env
VILAO_API_KEY=sk-...
```

(Copy từ `.env.example` trong plugin repo.)

2. Sau `/doc-flow:report`, Claude **tự chạy** script trong plugin (nếu có
   `imageRequests` + `.env`) — anh approve Bash một lần.

Hoặc chủ động:

```text
/doc-flow:generate-images
```

Hoặc tay:

```bash
node "$CLAUDE_PLUGIN_ROOT/scripts/generate-viz-images.mjs" --cwd "$(pwd)" docs/work/<date>-<slug>
```

(`$CLAUDE_PLUGIN_ROOT` chỉ có trong Claude khi plugin loaded; lệnh slash dùng path đó giúp anh.)

PNG → `docs/work/.../generated-images/` → mở `index.html` **#viz-story**. **#viz** dynamic vẫn là số liệu chính xác.

### 5. Commit docs with the code

```bash
git add docs/work/
git commit -m "docs: <task> brief, worklog, report bundle"
```

### Develop the plugin vs use it

| Goal | Where you work |
|------|----------------|
| **Use plugin** | `cd <app-repo>` → slash commands → `docs/work/` under app-repo |
| **Change plugin** | Edit `doc-flow/commands`, `templates`, `skills` → commit doc-flow → restart Claude |

### Project already had docs? (accuracy vs pretty HTML)

Plugin behavior: **ask until report slots have evidence** (then write — sparse OK).
See **[docs/REPORT-INTAKE.md](docs/REPORT-INTAKE.md)** (what to know / what to ask),
**[docs/MENTAL-MODEL.md](docs/MENTAL-MODEL.md)** (incl. MCP `llm_wiki` as question consultant),
**[docs/DATA-CONTRACT.md](docs/DATA-CONTRACT.md)** (sources + git investigation).

Always pass task slug: `/doc-flow:report 2026-07-06-my-slug`.

### Troubleshooting

- Commands missing: re-run `/plugin install doc-flow@doc-flow`, restart session.
- Use full prefix: `/doc-flow:brief`, not `/brief`.
- Legacy tasks with only `brief.md`: `/work` and `/report` still work; regenerate
  `brief.html` with `/doc-flow:brief`.
- Report looks good but facts wrong: retro `worklog.md` + run KR verify commands; read DATA-CONTRACT.

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
scripts/
  generate-viz-images.mjs
  render-viz-from-spec.mjs
  verify-v03-checklist.sh
```

## Customizing

Edit `templates/brief.html` / `report.html` / `bundle.html` for layout;
`skills/doc-visuals/SKILL.md` for diagram, OKR, and HTML viz rules.
`brief-sections.md` / `report-sections.md` define required content headings.

Integration spec (index + dynamic + AI):
`docs/superpowers/specs/2026-07-06-doc-flow-index-ai-integration-report.md`.

## Roadmap

- v0.1 — brief/report markdown + Mermaid
- v0.2 — brainstorm, worklog, layered report
- v0.3 — HTML deliverables (brief.html, report.html, index.html), viz-first
- v0.4 — index.html canonical + viz-spec + hybrid dynamic + optional AI images (current direction)
- later — doc index, Confluence export