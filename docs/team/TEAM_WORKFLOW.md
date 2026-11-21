# iMBONi — Team Workflow
**Owner:** Marlene.

## Lifecycle of a feature
1. **Define (Marlene):** user story + acceptance criteria in docs/product; open decisions resolved.
2. **Contract (Cyusa with Gad & Arcade):** endpoints documented in INTEGRATION_CONTRACT.md → status `Agreed`.
3. **Schema (Gad):** schema change request if needed; migration created by Gad only.
4. **Build in parallel:** Gad (backend) · Arcade (frontend against the agreed contract/mock) · Cyusa (client layer/adapters). Each on their own branch, touching only owned files.
5. **Own tests:** each developer writes/updates tests for their part.
6. **Handoff:** HANDOFF_TEMPLATE.md filled, PR opened.
7. **Verify (Doratha):** test cases, role/security tests, regression; reports defects to owners via BUG_REPORT_TEMPLATE.
8. **Fix (owner):** defects fixed by the owner of the code, not by Doratha.
9. **Accept (Marlene):** final product acceptance.
10. **Merge & cleanup.**

## Cadence `[TO CONFIRM: team preference]`
Short daily sync (blockers, files being touched, shared-file requests); weekly planning/priority review (Marlene); regression run before each release (Doratha).

## Work-in-progress visibility
Before starting, post in the team channel: task, branch, files/modules to touch. If it includes a shared file → Change Protocol first.

## Escalation
Conflicting requirements → Marlene decides. Technical disagreement → owner of the area proposes; team records in DECISIONS.md; Marlene breaks ties on product impact. Fallback approvers when an owner is unavailable: `[TO CONFIRM: O-09]`.

## Definition of Done
Acceptance criteria met · tests written and run (results stated) · no unrelated changes · docs/contract updated · security rules respected · handoff filled · reviewed by file owners · verified by Doratha · accepted by Marlene.
