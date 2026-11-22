Report ID: TR-001                Date: 2026-11-22               Prepared by: Doratha
Feature / release: Backend foundation (commit 39afed2)        Branch / build: feature/tests-initial-setup     Environment: Local Windows 11, Node.js 22.23.2
Scope (ACs covered): AC-AUTH-1..3, AC-LINK-1..2, AC-MARK-2, AC-MARK-4 (baseline build/test check)
Out of scope / not tested (and why): TC-BE-001 through TC-BE-006 are NOT RUN because backend/tests failed TypeScript compilation before any test cases could execute.

Summary: Total 6 QA test cases (plus 3 backend Jest suites) / Passed 0 / Failed 3 suites (compilation) / Blocked 6 QA test cases / NOT RUN 6 QA test cases
Commands/suites executed (exact):
- cd backend && npm install
- cd backend && npm test

Results by area:
| Area | Test IDs | Pass | Fail | Notes |
|---|---|---|---|---|
| Authentication | TC-BE-001, TC-BE-002, TC-BE-003 | 0 | 0 | NOT RUN; backend/tests/auth.test.ts failed TS compile (BUG-003) |
| Role permissions | TC-BE-003 | 0 | 0 | NOT RUN due to backend test compile failures (BUG-001..003) |
| Parent-child access | TC-BE-004, TC-BE-005 | 0 | 0 | NOT RUN; backend/tests/parentStudentLink.test.ts failed TS compile (BUG-002) |
| Marks | TC-BE-006 | 0 | 0 | NOT RUN; backend/tests/mark.test.ts failed TS compile (BUG-001) |
| Discipline/incidents | None yet | 0 | 0 | NOT RUN |
| Permissions | None yet | 0 | 0 | NOT RUN |
| Notifications/integrations | None yet | 0 | 0 | NOT RUN (backend foundation notes messaging not yet included) |
| Security | TC-BE-002, TC-BE-003, TC-BE-005 | 0 | 0 | NOT RUN due to backend test compile failures (BUG-001..003) |
| Regression | Backend Jest baseline (3 suites) | 0 | 3 | 3 suites failed TS compile; 0 tests executed (BUG-001..004) |

Defects: BUG-001 (High, Gad, New), BUG-002 (High, Gad, New), BUG-003 (High, Gad, New), BUG-004 (Low, Gad, New)
Risks / known issues: Backend test suite cannot execute until TypeScript errors in tests/mark.test.ts, tests/auth.test.ts, and src/repositories/student.repository.ts are resolved.
Recommendation: Reject
Product acceptance decision (Marlene): Rejected   Date:
