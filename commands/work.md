---
description: Execute work following approved brief.html as plan of record; log deviations to worklog.md
argument-hint: "[path to brief.html or task slug — omit to use the most recent brief]"
---

Execute IMPLEMENTATION guided by an approved brief. Target: **$ARGUMENTS**

The brief is the PLAN OF RECORD: follow its Approach steps, verify against its
Key Results, and log every deviation. The brief file itself is never edited
during implementation — the worklog absorbs reality, the report reconciles.

**v0.3:** plan of record is **`brief.html`** (read-only after approval).

## Steps

1. **Locate the brief** (same resolution as `/doc-flow:report`): path →
   slug/keyword match against `docs/work/*/brief.html` → most recently modified.
   **Legacy:** if only `brief.md` exists, use it but suggest `/doc-flow:brief`
   to produce `brief.html`. If none exists, stop and suggest `/doc-flow:brief` first.
2. **Load the plan**: read the brief fully (`brief.html`). Treat Approach as the
   step list, Key Results as acceptance criteria, Scope (out) as hard boundaries,
   and Key Decisions as constraints not to silently reverse.
3. **Confirm status**: if the brief's Status is not Approved, ask the user
   whether to proceed anyway (and note that in the worklog).
4. **Create the worklog** from `${CLAUDE_PLUGIN_ROOT}/templates/worklog.md`
   as `worklog.md` next to the brief, if it does not already exist.
5. **Work step by step**:
   - Announce each Approach step before starting it; append a `step` row to
     the worklog when done.
   - When reality forces a change, append a `deviation` row + deviation-register
     entry BEFORE continuing.
   - New significant decisions get a `decision` row.
   - Blocked? Append a `blocker` row and ask the user.
6. **Scope discipline**: work outside scope requires user confirmation and a
   deviation entry.
7. **Verify as you go**: run KR verification; record in worklog.
8. **Finish**: summarize worklog in chat; suggest `/doc-flow:report`. Do NOT
   write the report from this command.