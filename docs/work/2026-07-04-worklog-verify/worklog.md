# Worklog — Worklog deviation dogfood

| | |
|---|---|
| **Brief** | [brief.md](./brief.md) — plan of record |
| **Report** | [report.md](./report.md) — created after completion |

> Append-only log kept DURING implementation. One line per event, newest last.
> The brief is never edited after approval — deviations live here, and the
> report reconciles the two. Honest deviations are information, not failures.

## Log

| When | Type | Entry | Impact on brief |
|---|---|---|---|
| 2026-07-04 10:00 | step | Approach 1: Created worklog.md from plugin template | — |
| 2026-07-04 10:01 | deviation | Step 2: will use JSON in marker.txt instead of YAML line (fictional consumer break) | Approach §5 step 2; KR1; Key Decisions D1 |
| 2026-07-04 10:02 | step | Approach 2: Wrote marker.txt with ACTUAL_FORMAT=json (deviated from planned YAML) | KR1 affected — see verification |
| 2026-07-04 10:02 | step | KR1 verify: grep PLANNED_FORMAT=yaml marker.txt → exit 1 (no match) | KR1 not met (expected given deviation) |
| 2026-07-04 10:03 | step | KR2 verify: worklog has ≥1 deviation row and D1 in register | KR2 met |
| 2026-07-04 10:03 | step | Approach 3: Completion step row logged | — |

## Deviation register

_Filled from `deviation` rows above — the report's Plan-vs-Actual reads this._

| # | Planned (brief section) | Actual | Why |
|---|---|---|---|
| D1 | Approach step 2: single YAML line `PLANNED_FORMAT=yaml` (Key Decisions D1) | `marker.txt` contains `ACTUAL_FORMAT=json` plus JSON object line | Discovered YAML would break a fictional downstream consumer; JSON chosen instead |