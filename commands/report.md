---
description: Create a post-work report against an existing brief (layered CTO/business/engineering views, KR scoreboard, plan-vs-actual, final diagrams)
argument-hint: "[path to brief.md or task slug — omit to use the most recent brief]"
---

Create a POST-WORK REPORT. Target: **$ARGUMENTS**

The report is ONE layered document, conclusion first (pyramid principle):
executive summary for CTO, business impact in domain language, then full
engineering depth. Each section must be liftable into slides unchanged.

## Steps

1. **Locate the brief**:
   - If the argument is a path, use it.
   - If it is a slug or keyword, match against `docs/work/*/brief.md`.
   - If empty, use the most recently modified `docs/work/*/brief.md`.
   - If no brief exists, say so and offer a standalone report (same template,
     with Key Results reconstructed together with the user — flag them as
     defined retroactively).
2. **Load the skeleton**: read `${CLAUDE_PLUGIN_ROOT}/templates/report.md` and
   the brief itself. Follow the `doc-visuals` skill for diagrams.
3. **Read the worklog** (`worklog.md` next to the brief) if it exists — its
   deviation register is the primary source for Plan vs. Actual. If there is
   no worklog, reconstruct from git history and conversation, and say so.
4. **Gather evidence** of what actually happened: `git log` / `git diff` since
   the brief date, changed files, test output, conversation context. Never
   invent results — if you cannot verify a claim, mark it `unverified`.
5. **Score every Key Result** from the brief: ✅ met / ⚠️ partial / ❌ missed,
   each with concrete evidence (command output, file reference, number).
6. **Write layered, conclusion first**:
   - Executive Summary — one paragraph + max 3 done / 3 next bullets +
     decision needed; only facts the scoreboard backs up.
   - Business Impact — domain language, no component names.
   - Then engineering depth (scoreboard, plan-vs-actual, changes, diagrams).
7. **Plan vs. Actual**: for each Approach step from the brief, state what
   actually happened and why it deviated. Deviations are information, not
   failures — report them honestly.
8. **Update diagrams**: start from the brief's diagrams, modify to the real
   final state, and mark changed nodes/edges per the skill conventions.
9. **Close the doc-maintenance loop**: check the brief's Doc Maintenance
   list — tick off each long-lived doc as updated (with ref) or justify why
   no update was needed.
10. **Write the file** to `report.md` next to the brief (same folder). English
    unless the user asks otherwise.
11. **Finish**: show the user the file path, the KR scoreboard as a short
    table in the chat, and the executive summary paragraph verbatim.
