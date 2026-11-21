# iMBONi — File Ownership & Conflict Prevention

## 1. Ownership matrix (by resource)
| Resource | Owner | May request changes |
|---|---|---|
| Product requirements, user stories, acceptance criteria | Marlene | All |
| Project documentation (docs/product, docs/team) | Marlene | Cyusa for contract docs; Doratha for qa docs |
| Frontend pages, components, styles, state, navigation, frontend tests | Arcade | All via request |
| Backend services, business logic, repositories, middleware | Gad | All via request |
| Database models and migrations | Gad | Via Schema Change Request |
| Authentication & backend authorization | Gad | — |
| API contract documentation (INTEGRATION_CONTRACT.md, API_GUIDELINES.md) | Cyusa | Gad, Arcade propose |
| API client layer, integration mappings | Cyusa | Arcade |
| SMS/WhatsApp provider adapters | Cyusa | Marlene (provider choice) |
| Integration tests | Cyusa | Doratha |
| Test plans/cases/reports, regression suites, defect docs (docs/qa, QA test dirs) | Doratha | — |
| Architecture decisions (DECISIONS.md) | Team, coordinated by Marlene | All propose |
| DATABASE_GUIDELINES.md | Gad | — |
| SYSTEM_ARCHITECTURE.md | Team (technical sections by owner above) | — |

## 2. Path mapping — FILL FROM REPO (Phase 1, do not guess)
Cline must discover real paths and record them here, then get the team to confirm.
| Resource | Actual path(s) in repo | Owner |
|---|---|---|
| Frontend pages | `[FILL]` | Arcade |
| Frontend components | `[FILL]` | Arcade |
| Frontend styles | `[FILL]` | Arcade |
| Frontend state / navigation | `[FILL]` | Arcade |
| Frontend tests | `[FILL]` | Arcade |
| Backend services / logic | `[FILL]` | Gad |
| Repositories / models | `[FILL]` | Gad |
| Migrations | `[FILL]` | Gad |
| Backend middleware / auth | `[FILL]` | Gad |
| Backend tests | `[FILL]` | Gad |
| API client layer | `[FILL]` | Cyusa |
| Provider adapters | `[FILL]` | Cyusa |
| Integration tests | `[FILL]` | Cyusa |
| QA tests / suites | `[FILL]` | Doratha |
| Docs | `docs/` | by §1 |

## 3. Rules
1. Edit only files you own. Anything else → Coordination Request.
2. Unmapped file? Treat it as **shared** until the team assigns an owner.
3. Never reformat or "clean up" files you don't own.
4. Two people must not edit the same file at the same time. Claim it first (§5).
5. Doratha does not fix production feature code; she reports to the owner.
6. Marlene does not edit code/schemas; she edits product docs.

## 4. Shared files (need Change Protocol before ANY edit)
| Shared file/area | Gatekeeper (owner) | Must be informed |
|---|---|---|
| `package.json` / dependency manifests and lockfiles | Gad for backend deps; Arcade for frontend deps (if separate manifests); if a single manifest: Gad | All |
| Environment configuration (`.env.example`, config files) | Gad | All |
| Application entry points | Gad (backend), Arcade (frontend) | Cyusa |
| Shared route registries | Gad (API routes), Arcade (UI routes) | Cyusa |
| Authentication middleware | Gad | Cyusa, Arcade, Doratha |
| Shared types/schemas | Cyusa (contract types), Gad (domain models) | Arcade |
| Database migrations | Gad | All |
| API specifications | Cyusa | Gad, Arcade |
| CI/CD configuration | Gad `[TO CONFIRM]` | All |
| Global styles & design tokens | Arcade | Marlene (brand) |
| Lint/format/TS configs, `.gitignore`, `.clinerules`, docs/cline/* | Marlene (rules), Gad (tooling) | All |

Before changing a shared file Cline must: (1) identify the owner, (2) explain why, (3) list affected developers, (4) request coordination, (5) wait for approval.

## 5. Claim system
Keep a "Files in progress" list in the team channel (or docs/team/ if the team prefers a file): `file/area — developer — branch — date`. Remove when merged. A claimed shared file is locked for others until released.

## 6. Conflict hot-spots to watch
Migrations ordering (Gad serialises) · lockfile conflicts (single dependency PR at a time) · route registries · shared types · global CSS · entry points.
