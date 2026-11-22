# Test Cases: Backend Auth, Parent-Child Links, and Marks
**Owner:** Doratha

## TC-BE-001: Valid Role-Scoped Login (AC-AUTH-1)
- **Test Data:** Fictional parent/staff test account
- **Steps:** Authenticate with valid credentials and inspect returned role/session scope.
- **Expected:** Session/token succeeds and reflects the user's assigned role.
- **Status:** NOT RUN

## TC-BE-002: Invalid Credentials Audit and Rate Limit (AC-AUTH-2)
- **Test Data:** Fictional test account with wrong password
- **Steps:** Attempt login with invalid credentials multiple times.
- **Expected:** Generic failure message returned; failed attempts audited and rate-limited.
- **Status:** NOT RUN

## TC-BE-003: Wrong Role Direct Endpoint Call Denied (AC-AUTH-3, AC-MARK-1)
- **Test Data:** Fictional user token with non-permitted role
- **Steps:** Call restricted endpoint directly without using UI.
- **Expected:** Rejected with 403 Forbidden.
- **Status:** NOT RUN

## TC-BE-004: Linked Parent Accesses Linked Child (AC-LINK-1)
- **Test Data:** Fictional Parent A linked to Child X
- **Steps:** Request Child X records as Parent A.
- **Expected:** Access allowed subject to published/approved rules.
- **Status:** NOT RUN

## TC-BE-005: Parent Accessing Unlinked Child Denied (AC-LINK-2)
- **Test Data:** Fictional Parent A not linked to Child Y
- **Steps:** Request Child Y data by route/ID as Parent A.
- **Expected:** Denied (403/404) and access attempt logged; Child Y data never leaked.
- **Status:** NOT RUN

## TC-BE-006: Unpublished Marks Hidden from Parents (AC-MARK-2, AC-MARK-4)
- **Test Data:** Fictional Parent A linked to Child X with draft/unpublished mark
- **Steps:** Fetch marks for Child X as Parent A before publish/approval.
- **Expected:** Unpublished marks are not returned to Parent A.
- **Status:** NOT RUN
