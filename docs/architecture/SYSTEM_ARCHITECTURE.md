# iMBONi — System Architecture
**Owner:** Team, coordinated by Marlene. Technical content maintained by Gad (backend), Arcade (frontend), Cyusa (integration).
> The stack was unknown when this was written. Do NOT guess. Fill §2 from the repository, then keep it current.

## 1. Logical architecture
```
Parent / Staff browser (Frontend)  ──HTTPS──▶  API layer (REST)  ──▶  Business logic  ──▶  Database
                                                    │                       │
                                                    │                       └─▶ Audit log
                                                    └─▶ Integration adapters ─▶ SMS / WhatsApp providers
```
Layers & owners: Frontend (Arcade) · API client & contract docs (Cyusa) · Endpoints, services, DB (Gad) · Provider adapters (Cyusa).

## 2. Detected Stack (to be filled from the repo — Phase 1)
| Item | Detected value | Evidence (file/path) |
|---|---|---|
| Frontend framework | `[FILL]` | |
| Backend framework/language | `[FILL]` | |
| Database + ORM/migration tool | `[FILL]` | |
| Auth mechanism | `[FILL]` | |
| API style/prefix/versioning | `[FILL]` | |
| Test tools (unit/integration/e2e) | `[FILL]` | |
| CI/CD | `[FILL]` | |
| Package manager/lockfile | `[FILL]` | |
| Env config files | `[FILL]` | |
| Existing docs / Cline rules | `[FILL]` | |
| Default Git branch | `[FILL]` | |

## 3. Principles
- Preserve existing architecture; evolve through DECISIONS.md.
- Server is the source of truth for authorization and business rules.
- Single place per concern (no duplicate implementations).
- Contract-first for APIs (INTEGRATION_CONTRACT.md).
- Integrations isolated behind adapters so providers can be swapped.
- Notifications are asynchronous and must never block core actions.

## 4. Key flows (to detail once stack is known)
1. Parent login → dashboard → linked children → published marks/approved conduct.
2. Teacher records marks → review/publish → (notify minimal alert).
3. Staff records incident → review/approve → parent view → (notify).
4. Permission request → Headmaster decision → teacher visibility → (notify).

## 5. Cross-cutting
Audit logging, error handling, configuration/secrets, logging without sensitive data, timezones.

## 6. Legacy (CSMS)
Identify CSMS code/data reused in iMBONi `[FILL]`. Do not delete legacy functionality without Marlene's approval; flag out-of-scope ERP remnants rather than expanding them.
