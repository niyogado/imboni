# iMBONi — Acceptance Criteria
**Owner:** Marlene. Format: Given / When / Then. IDs are stable; Doratha maps tests to IDs. Items marked `[TO CONFIRM]` need Marlene before implementation.

## AUTH
- **AC-AUTH-1** Given valid credentials, when a user logs in, then they receive a session scoped to their role.
- **AC-AUTH-2** Given invalid credentials, then login fails with a generic message and the attempt is audited and rate-limited.
- **AC-AUTH-3** Given a role without permission, when it calls a protected endpoint directly, then it receives 403 regardless of UI.

## PARENT–CHILD
- **AC-LINK-1** Given parent A linked to child X, when A requests X's data, then access is allowed (subject to approved/published rules).
- **AC-LINK-2** Given parent A not linked to child Y, when A requests Y's data by any route/ID, then access is denied (403/404) and logged.
- **AC-LINK-3** Link create/remove is restricted to authorized roles and audited.

## MARKS
- **AC-MARK-1** A teacher can create/edit marks only for assigned classes/subjects.
- **AC-MARK-2** Marks are not visible to parents until published/approved.
- **AC-MARK-3** A published mark that is corrected keeps previous versions with who/when/why.
- **AC-MARK-4** A parent sees only published marks of linked children.

## DISCIPLINE
- **AC-DISC-1** An authorized staff member can record an incident with description, date, category and responsible staff.
- **AC-DISC-2** An incident is invisible to parents until approved.
- **AC-DISC-3** Approve/reject actions are limited to authorized roles and audited.
- **AC-DISC-4** Rules/sanctions are configurable; no hardcoded policy values exist in code.
- **AC-DISC-5** Corrections preserve the original record and history.
- **AC-DISC-6** Conduct calculation follows configured rules `[TO CONFIRM: formula]`.

## PERMISSIONS
- **AC-PERM-1** A permission request requires student, reason, start date, expected return date; end date must not precede start date.
- **AC-PERM-2** Only the Headmaster can approve/reject; decision is audited with timestamp.
- **AC-PERM-3** A request can be cancelled while allowed by status rules `[TO CONFIRM]`.
- **AC-PERM-4** Teachers see approved permissions for their students before recording attendance.
- **AC-PERM-5** Parents see permission status for linked children only.

## PARENT DASHBOARD
- **AC-DASH-1** Shows only linked children; switching child never leaks another child's data.
- **AC-DASH-2** Shows loading, empty, error and success states.
- **AC-DASH-3** Usable on small mobile screens.

## NOTIFICATIONS
- **AC-NOTIF-1** Notifications contain no detailed marks/discipline content.
- **AC-NOTIF-2** Delivery status is recorded (queued/sent/delivered/failed).
- **AC-NOTIF-3** Failed sends are retried per policy, then fall back `[TO CONFIRM: policy]`.
- **AC-NOTIF-4** Parents without consent/opt-in receive no messages.
- **AC-NOTIF-5** Provider outage does not break the primary action (e.g., approval still succeeds).

## Acceptance process
Developer completes + tests → Doratha verifies against these criteria → Marlene gives final acceptance (recorded in the PR/test report).
