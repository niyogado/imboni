ID: BUG-004             Date: 2026-11-22            Reported by: Doratha
Title: Jest emits validation warning for unknown option setupFilesAfterEach
Feature / AC ID: BACKEND-CONFIG      Branch / build / environment: feature/tests-initial-setup (commit 39afed2) / Windows Node 22.23.2
Severity: Low      Priority (Marlene):
Responsible owner: Gad     (why: owns backend/jest.config.js)
Preconditions / test data (fictional): Run npm test inside backend/.
Role/account used: N/A
Steps to reproduce:
 1. cd backend
 2. npm test
Expected result: Jest runs without unknown configuration option warnings.
Actual result: Jest prints Validation Warning: Unknown option "setupFilesAfterEach" with value [] was found.
Evidence: Jest startup warning in npm test output.
Security impact? no
Frequency: always
Workaround: Warning alone does not block Jest; Gad can fix jest.config.js.
Status: New
Fix branch / commit:
Verified by / date:
