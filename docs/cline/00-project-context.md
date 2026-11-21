# 00 — iMBONi Project Context (read first)

## What iMBONi is
iMBONi evolved from the CSMS (School Management System). It connects schools with parents/guardians so parents can monitor their children's **academic marks** and **discipline/conduct**, while the school manages **student permissions** and **notifications**.

## Scope (do NOT expand without Marlene's written approval)
1. Authentication and authorization
2. User and role management
3. Student management
4. Parent/guardian management
5. Parent–child linking
6. Academic marks management
7. Discipline and conduct management
8. Configurable school rules and sanctions
9. Student permission management
10. Parent dashboard
11. Notifications (SMS, WhatsApp)
12. Audit logs and activity history

iMBONi is **not** a full school ERP. No timetables, fees, payroll, library, inventory, etc. unless Marlene approves.

## Team (exactly five)
| Developer | Role | Role file |
|---|---|---|
| Marlene | Product Lead | docs/team/roles/ROLE_PRODUCT_LEAD_MARLENE.md |
| Arcade | Frontend Developer | docs/team/roles/ROLE_FRONTEND_ARCADE.md |
| Gad | Backend Developer | docs/team/roles/ROLE_BACKEND_GAD.md |
| Cyusa | API / Integration Developer | docs/team/roles/ROLE_API_INTEGRATION_CYUSA.md |
| Doratha | Tester / QA | docs/team/roles/ROLE_TESTER_DORATHA.md |

## Golden rules
- **Inspect before you change.** Never assume framework, database, folder names or conventions — discover them from the repo.
- **Extend existing conventions**; do not introduce conflicting ones.
- **Do not invent school policies** (rules, sanctions, deduction values, grading scales). Mark them `[TO CONFIRM: Marlene]`.
- **Do not invent endpoints or response fields.** Contracts live in docs/team/INTEGRATION_CONTRACT.md.
- Children's data is sensitive. Security rules in 03-security-rules.md are mandatory.

## Stack discovery record
The stack was NOT known when these docs were written. The first developer to run Cline must have it fill in docs/architecture/SYSTEM_ARCHITECTURE.md §2 (Detected Stack) and the path mapping in docs/team/FILE_OWNERSHIP.md §2. Until filled, Cline must discover paths itself and report them.

## Open decisions
See docs/architecture/DECISIONS.md (section "Open decisions").
