# iMBONi — Database Guidelines
**Owner:** Gad. All schema changes go through Gad.

1. Use the project's existing ORM/migration tool and naming conventions; do not introduce another.
2. **Every schema change = a migration.** Never hand-edit a database or edit an already-merged migration; add a new one.
3. Migrations are reversible where the tool allows; test up and down on a copy of data.
4. **Migration conflict prevention:** only Gad creates migrations. Others submit a *Schema Change Request* (CHANGE_PROTOCOL.md §4). Gad serialises migrations (one in flight at a time, rebased before merge) to avoid ordering/number clashes.
5. Core entities (names to align with existing models): users, roles, students, parents/guardians, parent_student_links, classes/subjects/assignments, marks (+ versions), incidents (+ versions/reviews), rules and sanctions (configurable), permission_requests (+ decisions), notifications (+ delivery attempts), consents, audit_logs. `[CONFIRM against existing schema — don't duplicate existing tables]`
6. History: marks and incidents are versioned/append-only; "delete" = soft-delete or status change with audit trail.
7. Integrity: foreign keys, unique constraints (e.g., one active parent–student link), NOT NULL where required, check constraints for date ranges.
8. Index foreign keys and common filters (student, class, status, dates).
9. Personal data: store the minimum; phone numbers normalised; no secrets in plain text; consider encryption for sensitive fields `[TO CONFIRM]`.
10. Audit tables are append-only; application DB user must not be able to alter them.
11. Seed/test data is fictional; never copy real student data to dev/test.
12. Backups and restore tested `[TO CONFIRM: hosting]`.
