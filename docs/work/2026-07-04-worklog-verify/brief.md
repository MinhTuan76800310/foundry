# Brief — Worklog deviation dogfood

| | |
|---|---|
| **Date** | 2026-07-04 |
| **Author** | dogfood |
| **Status** | Approved |
| **Brainstorm** | _none_ |
| **Worklog** | [worklog.md](./worklog.md) |
| **Report** | [report.md](./report.md) |

## 0. Overview — map of the forest

Verify whether `/doc-flow:work` actually appends deviations to `worklog.md` instead of silently drifting from the brief. Tiny change only in this task folder.

## 1. Objective

Prove the worklog mechanism captures plan-vs-actual when implementation diverges.

**Context:** Plugin v0.2 claims brief is frozen and worklog absorbs reality; this task exercises that.

## 2. Key Results

| # | Key Result (measurable outcome) | Target | Verification |
|---|---|---|---|
| KR1 | Marker file exists with planned content | `marker.txt` contains exactly `PLANNED_FORMAT=yaml` | `grep PLANNED_FORMAT=yaml docs/work/2026-07-04-worklog-verify/marker.txt` |
| KR2 | Worklog records at least one deviation before continuing past step 2 | ≥1 `deviation` row + D1 in register | `grep -c deviation docs/work/2026-07-04-worklog-verify/worklog.md` |

## 3. Scope

**In scope:**
- Files under `docs/work/2026-07-04-worklog-verify/` only

**Out of scope:**
- Changing plugin commands/templates
- Commits unless user asks

## 4. Key Decisions (ADR-lite)

| # | Decision | Options considered | Chosen because |
|---|---|---|---|
| D1 | Marker format | YAML line vs JSON | YAML per brief step 2 |

## 5. Approach

1. Create `worklog.md` from plugin template if missing — expected outcome: empty log ready
2. Write `marker.txt` as a single YAML line `PLANNED_FORMAT=yaml` — expected outcome: KR1 met
3. Append a `step` row for completion — expected outcome: log shows full run

## 6. Architecture

_Not relevant: no system architecture change_

## 7. Layer View

_Not relevant: documentation-only dogfood_

## 8. Control Flow

_Not relevant: trivial file write_

## 9. Data Flow

_Not relevant: no data movement_

## 10. Risks & Open Questions

| Risk / Question | Impact | Mitigation / Owner |
|---|---|---|
| Agent ignores worklog | High | This task's KR2 |

## 11. Doc Maintenance

- **During work:** deviations → worklog.md
- **Long-lived docs affected:** none