# doc-flow

Claude Code plugin for a **brainstorm → brief → work → report** documentation
lifecycle:

- `/doc-flow:brainstorm [topic]` — think out loud before any plan exists:
  capture raw ideas, options, constraints and sketches into `brainstorm.md`.
- `/doc-flow:brief <task | note files>` — distill brainstorm/notes into a
  reviewable pre-work brief: Overview ("map of the forest"), OKR framing,
  ADR-lite Key Decisions, Mermaid visuals (architecture, layers, control
  flow, data flow). Once approved it is the **plan of record**.
- `/doc-flow:work [brief]` — execute the task following the brief step by
  step; every deviation, decision and blocker is appended to `worklog.md` —
  the brief itself stays untouched.
- `/doc-flow:report [brief]` — one layered post-work report, conclusion
  first: Executive Summary (CTO) → Business Impact → KR scoreboard →
  plan-vs-actual (fed by the worklog) → final diagrams. Each section lifts
  into slides unchanged.

Docs land in the project you run it from: `docs/work/<date>-<slug>/` — one
folder per task holding `brainstorm.md`, `brief.md`, `worklog.md` and
`report.md` side by side.

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
  brainstorm.md      # /doc-flow:brainstorm
  brief.md           # /doc-flow:brief
  work.md            # /doc-flow:work
  report.md          # /doc-flow:report
skills/
  doc-visuals/       # Mermaid + OKR + report-writing conventions
templates/
  brainstorm.md      # raw-thinking skeleton
  brief.md           # pre-work plan of record
  worklog.md         # append-only deviation log kept during work
  report.md          # layered post-work report
```

## Customizing

The document structure is expected to evolve — edit `templates/*.md` to
change sections, and `skills/doc-visuals/SKILL.md` to change diagram and
writing conventions. Commands only orchestrate; the templates are the
contract.

## Roadmap

- v0.1 — brief/report with OKR + 4 diagram types
- v0.2 — full lifecycle: brainstorm & work commands, worklog-backed
  plan-vs-actual, layered CTO/business/engineering report (current)
- later — doc index page, team-specific formats, export to Confluence?
