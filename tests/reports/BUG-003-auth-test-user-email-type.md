ID: BUG-003             Date: 2026-11-22            Reported by: Doratha
Title: backend/tests/auth.test.ts fails TypeScript check because property email is missing on UserWithRole
Feature / AC ID: AUTH / AC-AUTH-1, AC-AUTH-2      Branch / build / environment: feature/tests-initial-setup (commit 39afed2) / Windows Node 22.23.2
Severity: High      Priority (Marlene):
Responsible owner: Gad     (why: owns backend/ and backend/tests/)
Preconditions / test data (fictional): Freshly merged backend foundation commit 39afed2 with npm install completed.
Role/account used: N/A (test compilation failure)
Steps to reproduce:
 1. cd backend
 2. npm test
Expected result: TypeScript compiles tests/auth.test.ts and runs auth tests.
Actual result: TS2339 Property 'email' does not exist on type 'UserWithRole' on lines 65 and 109 of tests/auth.test.ts.
Evidence: Jest output from npm test showing FAIL tests/auth.test.ts (0 tests ran).
Security impact? no - blocks test compilation/execution.
Frequency: always
Workaround: None in QA; Gad must fix UserWithRole type or auth.test.ts usage.
Status: New
Fix branch / commit:
Verified by / date:
