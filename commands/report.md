---
description: Create a post-work report against an existing brief (KR scoreboard, plan-vs-actual, final diagrams)
argument-hint: "[path to brief.md or task slug — omit to use the most recent brief]"
---

Create a POST-WORK REPORT. Target: **$ARGUMENTS**

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
3. **Gather evidence** of what actually happened: `git log` / `git diff` since
   the brief date, changed files, test output, conversation context. Never
   invent results — if you cannot verify a claim, mark it `unverified`.
4. **Score every Key Result** from the brief: ✅ met / ⚠️ partial / ❌ missed,
   each with concrete evidence (command output, file reference, number).
5. **Plan vs. Actual**: for each Approach step from the brief, state what
   actually happened and why it deviated. Deviations are information, not
   failures — report them honestly.
6. **Update diagrams**: start from the brief's diagrams, modify to the real
   final state, and mark changed nodes/edges per the skill conventions.
7. **Write the file** to `report.md` next to the brief (same folder). English
   unless the user asks otherwise.
8. **Finish**: show the user the file path and the KR scoreboard as a short
   table in the chat.
