ID: BUG-002             Date: 2026-11-22            Reported by: Doratha
Title: student.repository.ts fails TypeScript check on class.level null vs undefined in parentStudentLink.test.ts run
Feature / AC ID: PARENT-CHILD / AC-LINK-1, AC-LINK-2      Branch / build / environment: feature/tests-initial-setup (commit 39afed2) / Windows Node 22.23.2
Severity: High      Priority (Marlene):
Responsible owner: Gad     (why: owns backend/src/repositories/student.repository.ts and backend/tests/)
Preconditions / test data (fictional): Freshly merged backend foundation commit 39afed2 with npm install completed.
Role/account used: N/A (test compilation failure)
Steps to reproduce:
 1. cd backend
 2. npm test
Expected result: TypeScript compiles cleanly and runs tests/parentStudentLink.test.ts.
