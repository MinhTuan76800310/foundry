# Verify doc-flow v0.3 HTML deliverables

1. Run `/doc-flow:brief` on a tiny task → `brief.html` exists; open `file://`; ≥2 interactive elements.
2. Set Status Approved in brief; run `/doc-flow:work` with intentional deviation → only `worklog.md` changes; `brief.html` untouched.
3. Run `/doc-flow:report` → `report.html` and `index.html`; index embeds full brief/worklog/report text (not summary-only).
4. Grep task folder: no new `brief.md` or `report.md` unless legacy task.
5. `plugin.json` version is `0.3.0`.
6. Commands reference `brief.html`, `brief-sections.md`, `bundle.html`.