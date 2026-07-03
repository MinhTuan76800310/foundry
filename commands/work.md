---
description: Execute the work following an approved brief as plan of record, logging deviations to a worklog
argument-hint: "[path to brief.md or task slug — omit to use the most recent brief]"
---

Execute IMPLEMENTATION guided by an approved brief. Target: **$ARGUMENTS**

The brief is the PLAN OF RECORD: follow its Approach steps, verify against its
Key Results, and log every deviation. The brief file itself is never edited
during implementation — the worklog absorbs reality, the report reconciles.

## Steps

1. **Locate the brief** (same resolution as `/doc-flow:report`): path →
   slug/keyword match against `docs/work/*/brief.md` → most recently modified.
   If none exists, stop and suggest `/doc-flow:brief` first.
2. **Load the plan**: read the brief fully. Treat Approach as the step list,
   Key Results as acceptance criteria, Scope (out) as hard boundaries, and
   Key Decisions as constraints not to silently reverse.
3. **Confirm status**: if the brief's Status is not Approved, ask the user
   whether to proceed anyway (and note that in the worklog).
4. **Create the worklog** from `${CLAUDE_PLUGIN_ROOT}/templates/worklog.md`
   as `worklog.md` next to the brief, if it does not already exist.
5. **Work step by step**:
   - Announce each Approach step before starting it; append a `step` row to
     the worklog when done.
   - When reality forces a change (different approach, new dependency,
     descoped item), append a `deviation` row + deviation-register entry
     BEFORE continuing — deviations are information, not failures.
   - New significant decisions get a `decision` row.
   - Blocked? Append a `blocker` row and ask the user.
6. **Scope discipline**: work outside the brief's scope requires explicit
   user confirmation and a deviation entry — no silent scope creep.
7. **Verify as you go**: after each step, run the verification of any KR it
   affects; record the result in the worklog.
8. **Finish**: when all steps are done (or work stops), summarize worklog
   status in chat — steps completed, deviations, KR spot-check results — and
   suggest `/doc-flow:report` to close the loop. Do NOT write the report
   yourself from this command.
