# iMBONi — Change Protocol
Used whenever work touches something you don't own, a shared file, a schema, or a contract.

## 1. Decision table
| Change type | Requester | Approver(s) | Implementer |
|---|---|---|---|
| Product requirement / scope | Anyone | **Marlene** | Marlene (docs) |
| Database schema / migration | Any dev | **Gad** (+Cyusa if contract affected) | Gad |
| API contract (endpoint, field, status code) | Any dev | **Cyusa** + Gad + Arcade informed/agree; Marlene if behavior changes | Gad (server), Cyusa (docs/client), Arcade (UI) |
| Shared file | Any dev | Gatekeeper per FILE_OWNERSHIP §4 | Gatekeeper or delegate |
| Frontend file owned by Arcade | Others | **Arcade** | Arcade |
| Backend file owned by Gad | Others | **Gad** | Gad |
| Architecture change | Any dev | Team via DECISIONS.md, **Marlene** coordinates | Owner |
| New dependency | Any dev | Owner of the manifest + security check | Owner |
| Policy/rule value (sanctions, grading) | Anyone | **Marlene** | Config by Gad |

## 2. Steps
1. Stop work on the affected part.
2. Write a Coordination Request (§3) and send it to the approver(s).
3. Approver replies **Approved / Approved with changes / Rejected** in writing.
4. Only then implement; reference the approval in the PR.
5. Update docs (contract, decisions, handoff).
Silence is not approval. Fallback if the approver is unavailable: `[TO CONFIRM: O-09]`.

## 3. Coordination Request template
```
Requested by:            Date:
Task / story:            Branch:
Resource to change:      Owner:
Why it is necessary:
Proposed change (exact files/fields):
Affected developers:
Risk / alternatives considered:
Needed by:
Decision: Approved / Approved with changes / Rejected   By:   Date:
```

## 4. Schema Change Request (to Gad)
```
Requested by / story:
Entities & fields (name, type, nullable, default, unique, FK):
Reason and queries/use cases:
Data migration needed? Existing data impact:
API fields affected (tell Cyusa):
Privacy/sensitivity of new data:
```

## 5. API Contract Change Request (to Cyusa)
Fill the endpoint spec from INTEGRATION_CONTRACT.md §3 and mark what changed, whether it is breaking, and which consumers (Arcade, tests) are affected.

## 6. Cline behavior
When a task hits any row above that the current developer is not the approver for, Cline stops, outputs the Coordination Request, and waits. It never edits "just a little" first.
