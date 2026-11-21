# iMBONi — Test Strategy
**Owner:** Doratha. Acceptance decision: Marlene.

## 1. Principles
Every developer writes/updates tests for their changes. Doratha verifies the complete feature across layers, then recommends acceptance. Tests map to acceptance-criteria IDs. Fictional data only. Use the project's existing test tools `[FILL after inspection]`.

## 2. Levels
Unit (devs) · Integration (Cyusa/Gad) · API/endpoint (Doratha, Gad) · UI/component (Arcade) · End-to-end/system (Doratha) · Security (Doratha) · Regression (Doratha) · User acceptance (Marlene).

## 3. Coverage matrix
| Area | Key checks | AC IDs |
|---|---|---|
| Authentication | valid/invalid login, session expiry, rate limit, reset | AC-AUTH-1..3 |
| Role permissions | each role × action; direct API calls bypassing UI → 403 | AC-AUTH-3 |
| Parent–child access | linked allowed; unlinked denied by every route/ID; link changes audited | AC-LINK-1..3 |
| Marks creation & viewing | assigned-only entry; unpublished hidden; corrections keep history | AC-MARK-1..4 |
| Incident creation | required fields, categories, responsible staff | AC-DISC-1 |
| Incident approval | role limits, hidden until approved, audit | AC-DISC-2,3,5 |
| Conduct calculations | follows configured rules; no hardcoded policy | AC-DISC-4,6 |
| Permission requests | field validation, date logic | AC-PERM-1 |
| Permission approvals | Headmaster only, reject/cancel, audit | AC-PERM-2,3 |
| Attendance-related visibility | teacher sees approved permissions; parents see own | AC-PERM-4,5 |
| API validation | bad types/lengths/missing fields → 400/422 safe errors | contract specs |
| Notification delivery | status tracking, retries, consent, minimal content, fallback | AC-NOTIF-1..5 |
| Integration failures | provider timeout/outage, duplicates, webhook failures | AC-NOTIF-3,5 |
| Security | IDOR, injection, XSS, CSRF, brute force, error leakage, secrets, audit logs | 03-security-rules.md |
| Regression | full suite before each release + after each fix | all |
| Usability/responsive | mobile viewports, loading/error states | AC-DASH-2,3 |

## 4. Entry / exit criteria
Entry: feature merged to test branch, handoff filled, contract `Implemented`, devs' tests passing.
Exit: all ACs verified, no open critical/high defects, regression passes, report delivered; Marlene accepts.

## 5. Defect severity
Critical (data leak, auth bypass, data loss) · High (core flow broken) · Medium (workaround exists) · Low (cosmetic). Any cross-parent data exposure is Critical.

## 6. Environments & data
Dedicated test environment `[TO CONFIRM]`; seed data fictional; provider sandboxes/mocks only; no real phone numbers.

## 7. Reporting honesty
Report exactly what ran. "NOT RUN" is valid; false passes are not.
