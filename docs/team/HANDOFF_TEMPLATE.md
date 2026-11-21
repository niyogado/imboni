# iMBONi — Handoff Template
Mandatory when work moves between team members and in every PR description. Copy, fill, never leave blank (write "None" if empty).

```
Feature:
Developer:
Role:
Branch:
Completed work:
Files modified:
API changes:            (endpoint / contract section, breaking?)
Database changes:       (migration file, entities/fields)
Tests executed:         (exact commands/suites)
Test results:           (pass/fail counts; "NOT RUN" + reason if not executed)
Known issues:
Dependencies:           (other branches/PRs/decisions/people)
Next developer:
Next required action:
```

## Rules
- Do not state tests passed unless executed.
- List every modified file; unrelated changes are not allowed.
- If API/DB changed, the contract/migration owner must already have approved it (link the approval).
- Save significant handoffs in the PR; optionally in `docs/team/handoffs/<date>-<feature>.md`.

## Example (illustrative)
```
Feature: Parent dashboard — approved marks list
Developer: Arcade        Role: Frontend      Branch: feature/frontend-parent-marks
Completed work: Marks list page with loading/empty/error states
Files modified: <paths>
API changes: None (uses Agreed endpoint in INTEGRATION_CONTRACT §x)
Database changes: None
Tests executed: <frontend test command>
Test results: <n> passed / <n> failed
Known issues: None
Dependencies: Gad's endpoint merged
Next developer: Doratha
Next required action: Verify AC-MARK-4, AC-LINK-2 on the dashboard
```
