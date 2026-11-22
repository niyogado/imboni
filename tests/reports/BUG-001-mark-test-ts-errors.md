ID: BUG-001             Date: 2026-11-22            Reported by: Doratha
Title: backend/tests/mark.test.ts fails TypeScript compilation (missing module and status property)
Feature / AC ID: MARKS / AC-MARK-2, AC-MARK-4      Branch / build / environment: feature/tests-initial-setup (commit 39afed2) / Windows Node 22.23.2
Severity: High      Priority (Marlene):
Responsible owner: Gad     (why: owns backend/ and backend/tests/)
Preconditions / test data (fictional): Freshly merged backend foundation commit 39afed2 with npm install completed.
Role/account used: N/A (test compilation failure)
Steps to reproduce:
 1. cd backend
 2. npm test
Expected result: TypeScript compiles tests/mark.test.ts and Jest executes the mark service tests.
Actual result: TS2307 Cannot find module './parentStudentLink.service' on line 5; TS2339 Property 'status' does not exist on type 'MarkWithDetails' on lines 67 and 105.
Evidence: Jest output from npm test showing FAIL tests/mark.test.ts (0 tests ran).
Security impact? no - blocks test compilation/execution.
Frequency: always
Workaround: None in QA; Gad must fix imports/types in backend.
Status: New
Fix branch / commit:
Verified by / date:
