# iMBONi — Integration Contract (API Contract Workflow)
**Owner:** Cyusa. Implementation: Gad. Consumers: Arcade, Doratha (tests). Product approval: Marlene.
> No endpoints are listed yet because none have been verified against the repo. Cyusa inventories existing endpoints first (§5), then new ones are added through this workflow. **Do not invent endpoints or fields.**

## 1. Workflow
1. **Propose** — Cyusa (or any dev via Cyusa) drafts the endpoint spec (§3) with status `Draft`.
2. **Review** — Gad checks feasibility, data model, authorization; Arcade checks UI needs; Doratha adds test cases; Marlene confirms behavior.
3. **Agree** — status `Agreed` once Gad, Arcade and Cyusa sign off (Marlene if behavior-relevant). Record sign-offs.
4. **Implement** — Gad builds the endpoint exactly per spec; Arcade/Cyusa build clients against it (mock data allowed from the spec).
5. **Verify** — Cyusa integration tests + Doratha endpoint/authorization tests → status `Implemented`.
6. **Change** — any change returns to step 1 with a change note; breaking changes need explicit sign-off from all consumers.
Statuses: `Draft → Agreed → Implemented → Deprecated`.

## 2. Responsibilities
| Person | Does |
|---|---|
| Gad | Endpoint implementation, business logic, DB, authorization |
| Cyusa | Contract docs, consistency of requests/responses, integration coordination, external providers |
| Arcade | Frontend API consumption, UI integration, error handling |
| Doratha | Endpoint, authorization, integration tests |
| Marlene | Product behavior approval |

## 3. Endpoint specification template
```
### <Endpoint name>   [Status: Draft]  [Story: US-…]
Method & URL:
Purpose:
Authentication: required / public
Authorized roles:
Extra authorization rules (e.g., parent must be linked to student):
Request  — path params / query / headers / body (field, type, required, rules):
Validation rules:
Success response — status code + body (field, type, description):
Error responses — status, error code, when:
Side effects (DB writes, audit log, notifications):
Idempotency / rate limits:
Test cases (happy path, validation, authorization, edge):
Sign-offs: Gad ☐  Arcade ☐  Cyusa ☐  Marlene ☐(if needed)
Change log:
```

## 4. Standards
Follow docs/architecture/API_GUIDELINES.md (envelope, status codes, pagination, errors). Error codes are stable strings; the frontend maps them to messages.

## 5. Endpoint registry
### 5.1 Existing endpoints (inventory from repo — Cyusa to fill)
| Method | URL | Purpose | Roles | Status | Spec section |
|---|---|---|---|---|---|
| `[FILL]` | | | | | |

### 5.2 Planned endpoint groups (specs to be drafted — not agreed)
Auth · Users/roles · Students · Parents & parent–child links · Marks (create, submit, publish, correct, parent view) · Incidents (create, review/approve, correct, parent view) · Rules & sanctions config · Permission requests (create, approve/reject, cancel, list, teacher view) · Parent dashboard summary · Notifications (status, preferences/consent) · Audit logs (read).

## 6. External provider contracts (SMS / WhatsApp)
Provider `[TO CONFIRM: O-01]`. Adapter interface (Cyusa) should expose: send message, get delivery status/webhook, retry policy, error classification. Spec to include: payload minimization (see 03-security-rules.md), consent check, webhook signature verification, retry/backoff, fallback chain, and what happens on provider outage.
