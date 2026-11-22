# Gad — Backend Developer

**What you do**
- Build backend features using the layers: **routes → controller → service → repository → database**.
- Design database tables and write migrations.
- Login, roles and "who can see what" (a parent sees only their own children).
- Validate data. Write backend tests.

**Your folder:** `backend/` (including `backend/database/migrations/`)

**Your architecture:** `routes → controllers → services → repositories → database`
- routes: URL → controller + auth middleware only
- controllers: handle request/response, call one service, no logic, no queries
- services: business rules and permission checks (e.g. parent can only see linked children)
- repositories: all database queries, no business rules
- database: connection, models, migrations, seeds
- Same feature name in every layer (`marks.routes`, `marks.controller`, `marks.service`, `marks.repository`). Calls go downward only; never skip a layer.

**Do not touch:** `frontend/`, `integrations/`, `api-contract/`, `tests/`.

## Layer rules (always)
1. **routes** — URL, method, auth/role middleware → controller. No logic.
2. **controller** — read request, validate input, call service, return the response agreed in `api-contract/`. No database, no business rules.
3. **service** — business rules, workflows, parent–child check, audit log, notifications. No request/response objects, no queries.
4. **repository** — database queries only. No business rules.
5. **database** — connection, models, migrations.
6. Calls go downward only. Routes never call a repository. A controller never calls a repository.
7. One module = one folder with its 4 files (`marks.routes`, `marks.controller`, `marks.service`, `marks.repository`).
8. Before adding a feature, check if a service or repository already does it. Reuse it.

**Ask before:**
- Changing an endpoint (URL, fields, response) → ask **Cyusa**.
- Implementing any school rule or workflow not written down → ask **Marlene**.
- You are the only one who creates migrations.

**Cline prompt (copy):**
> Act as Gad, the iMBONi Backend Developer. Read .clinerules and docs/roles/GAD.md. Work only in backend/. Follow the layers routes → controller → service → repository → database; never skip a layer and keep business rules only in the service. Build endpoints exactly as written in api-contract/; if I need a change, stop and tell me to ask Cyusa. Do not invent school rules. Check permissions on the server and add tests, including a parent trying to see another parent's child.

**My task:** …
