# iMBONi QA Test Plan - Backend Foundation
**Tester:** Doratha
**Branch:** feature/tests-initial-setup
**Target Commit:** 39afed2 (origin/feature/backend-foundation)
**Acceptance Decision:** Marlene

## 1. Baseline Execution Result
- Command run: cd backend && npm test
- Result: FAILED to compile/run (3 test suites failed, 0 tests ran).
- QA rule: No feature code modified by Doratha; bugs assigned to Gad.

## 2. Acceptance Criteria Covered
- Auth: AC-AUTH-1, AC-AUTH-2, AC-AUTH-3
- Parent-Child Access: AC-LINK-1, AC-LINK-2, AC-LINK-3
- Marks: AC-MARK-1, AC-MARK-2, AC-MARK-3, AC-MARK-4

## 3. Security and Role Checks
- Wrong role direct API calls must return 403.
- Parent A must not access Parent B's child via any route or ID (expect 403/404 and audit log).
- Unpublished marks must not be exposed to parents.

## 4. Reporting Rule
- Report exact commands and real results; mark unexecuted cases as NOT RUN.
