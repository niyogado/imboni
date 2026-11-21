# iMBONi — Proposed Project Structure

Idea: **one top-level folder per owner**, so developers rarely edit the same files.

```
imboni/
├── frontend/                  ← ARCADE
│   └── src/
│       ├── pages/             (screens: login, parent dashboard, marks, discipline, permissions)
│       ├── components/        (buttons, tables, forms, layouts)
│       ├── styles/
│       ├── state/             (app state, current user/role)
│       ├── routes/            (navigation + role-based menus)
│       └── api/               ← CYUSA (API client that calls the backend)
│
├── backend/                   ← GAD
│   ├── src/
│   │   ├── routes/            (URL → controller + middleware. Nothing else)
│   │   ├── controllers/       (read request, call a service, send response)
│   │   ├── services/          (business logic, rules, permission checks)
│   │   ├── repositories/      (all database queries live here)
│   │   ├── middleware/        (auth, role check, error handler)
│   │   └── validators/        (request validation)
│   ├── database/              (the store)
│   │   ├── connection         (DB connection/config)
│   │   ├── models/
│   │   ├── migrations/        (Gad only)
│   │   └── seeds/             (fictional test data only)
│   └── tests/                 (Gad's own backend tests)
│
├── integrations/              ← CYUSA
│   ├── sms/                   (SMS provider adapter)
│   └── whatsapp/              (WhatsApp provider adapter)
│
├── api-contract/              ← CYUSA
│   └── endpoints/             (one file per module: marks.md, discipline.md, ...)
│
├── tests/                     ← DORATHA
│   ├── test-plans/
│   ├── test-cases/
│   ├── api/ · e2e/ · security/ · regression/
│   └── reports/               (bug reports + test reports)
│
├── docs/                      ← MARLENE
│   ├── product/               (requirements, user stories, acceptance criteria)
│   ├── roles/                 (one short file per developer)
│   └── PROJECT_STRUCTURE.md
│
├── .clinerules                (simple Cline rules)
└── README.md
```

**Important:** if iMBONi already has a structure, do NOT move code. Keep what exists and just write down which existing folder belongs to which owner (table below). Only use this layout for new code.

## Backend layers (Gad)
Flow: `routes → controller → service → repository → database`. Calls go **downward only**; never skip a layer.

| Layer | Does | Must NOT |
|---|---|---|
| **routes** | URL + method, attach auth and role middleware, send to controller | contain logic |
| **controller** | read the request, validate input, call the service, return the response in the agreed contract shape | touch the database or hold business rules |
| **service** | business rules, workflows (draft → approved), "can this parent see this child?", audit, trigger notifications | know about request/response objects or write SQL |
| **repository** | database queries only (find, create, update); returns plain data | contain business rules or permission checks |
| **database (store)** | connection, models, migrations | contain logic |

(File extension `.js` is only an example; use your real language/framework.)

## Backend layers (Gad)
Flow of one request: `routes → controllers → services → repositories → database`

| Layer | Does | Must NOT |
|---|---|---|
| routes | Map URL + method to a controller; attach auth/role middleware | Contain logic |
| controllers | Read request, call ONE service, return response/status code | Query the database, hold business rules |
| services | Business rules, workflows (e.g., publish marks, approve permission), "can this user see this child?" | Handle HTTP objects, write raw queries |
| repositories | Queries: find, create, update; return plain data | Contain business rules or permission logic |
| database | Connection, models, migrations, seeds | — |

One file per feature in each layer, same name everywhere, e.g.
`routes/marks.routes` → `controllers/marks.controller` → `services/marks.service` → `repositories/marks.repository`.
Features: auth, students, parents (+ parent–child links), marks, discipline, permissions, notifications, audit.
Calls only go downward. A layer never skips one (a controller never calls a repository).

## Who owns what
| Folder | Owner | Others must |
|---|---|---|
| `frontend/` (except `src/api/`) | Arcade | ask Arcade |
| `frontend/src/api/` | Cyusa | ask Cyusa |
| `backend/` | Gad | ask Gad |
| `backend/database/migrations/` | Gad only | send Gad a request |
| `integrations/`, `api-contract/` | Cyusa | ask Cyusa |
| `tests/` | Doratha | ask Doratha |
| `docs/` | Marlene | ask Marlene |

Your actual folder names for existing code: _fill in after checking the repo_
| Existing folder | Owner |
|---|---|
| | |

## Shared files (ask first, one person at a time)
`package.json` + lockfiles · `.env` / config · `.gitignore` · route files · app entry files · CI config.
Owner: Arcade for frontend ones, Gad for backend ones. Tell the team before editing.

## Order of work for a feature
1. **Marlene** — says what it should do (story + acceptance criteria).
2. **Cyusa** — writes the endpoints in `api-contract/` (Gad and Arcade agree).
3. **Gad** builds the backend · **Arcade** builds the screens (in parallel, using the contract).
4. **Doratha** — tests it, reports bugs to the owner.
5. **Marlene** — accepts it.
