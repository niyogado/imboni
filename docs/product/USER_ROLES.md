# iMBONi — User Roles (application users)
**Owner:** Marlene. Not to be confused with the *team* roles (Marlene, Arcade, Gad, Cyusa, Doratha).
Final role list and permissions are `[TO CONFIRM: Marlene]`; below is the working baseline derived from the product scope. Use the roles that already exist in the codebase where they overlap.

| App role | Purpose | Can view | Can create/modify | Cannot |
|---|---|---|---|---|
| Parent/Guardian | Monitor children | Linked children's published marks, approved conduct, permissions, own notifications | Own profile; (maybe) submit permission request `[TO CONFIRM]` | See unlinked children; see drafts/unapproved records |
| Teacher | Record academic/discipline data | Data for assigned classes/subjects; approved permissions before attendance | Marks (assigned), incident reports | Publish/approve own records unless authorized; access unassigned classes |
| Discipline/Academic staff (reviewer) `[TO CONFIRM]` | Review/publish | Records awaiting review | Approve/reject/publish | Change school policy config unless authorized |
| Headmaster | Oversight | School-wide records `[TO CONFIRM scope]` | Approve/reject permissions; approve incidents; configure rules/sanctions `[TO CONFIRM]` | — |
| Administrator `[TO CONFIRM if exists]` | System/user management | Users, links, audit logs | Users, roles, parent–child links | Edit audit logs |

## Rules
1. Permissions enforced server-side; frontend visibility is cosmetic.
2. Least privilege by default; any new permission needs Marlene's approval and Gad's implementation.
3. Every role/permission change is audited.
4. A permission matrix (role × action) must be maintained by Marlene and Gad in this file once confirmed, and is the source for Doratha's role-based tests.
