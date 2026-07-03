# doc-flow

Claude Code plugin for a **brief → work → report** documentation workflow:

- `/doc-flow:brief <task>` — before starting work: generates a pre-work brief
  with OKR framing (Objective + measurable Key Results) and Mermaid visuals
  (architecture, layer view, control flow, data flow).
- `/doc-flow:report [brief]` — after the work: scores every Key Result with
  evidence, documents plan-vs-actual deviations, and updates the diagrams to
  the real final state.

Docs land in the project you run it from: `docs/work/<date>-<slug>/brief.md`
and `report.md` side by side — one folder per task.

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
  plugin.json        # plugin manifest
  marketplace.json   # lets this repo double as its own marketplace
commands/
  brief.md           # /doc-flow:brief
  report.md          # /doc-flow:report
skills/
  doc-visuals/       # Mermaid + OKR conventions (auto-loaded when relevant)
templates/
  brief.md           # section skeleton for briefs
  report.md          # section skeleton for reports
```

## Customizing

The report/brief structure is expected to evolve — edit `templates/*.md` to
change sections, and `skills/doc-visuals/SKILL.md` to change diagram
conventions. Commands only orchestrate; the templates are the contract.

## Roadmap

- v0.1 — opinionated OKR + 4 diagram types (current)
- later — team-specific report formats, doc index page, export to Confluence?
