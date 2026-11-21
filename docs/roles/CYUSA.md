# Cyusa — API / Integration Developer

**What you do**
- Write each endpoint in `api-contract/` BEFORE it is built: URL, method, who can use it, request, response, errors.
- Make sure frontend and backend match the contract.
- Build the API client (`frontend/src/api/`).
- Build SMS and WhatsApp adapters (`integrations/`).
- Write integration tests.

**Your folders:** `api-contract/`, `integrations/`, `frontend/src/api/`

**Do not touch:** backend logic and database (Gad), pages and components (Arcade), `tests/` QA files (Doratha).

**Ask before:**
- Changing what the backend must do → ask **Gad**.
- Changing what the frontend must do → ask **Arcade**.
- Choosing an SMS/WhatsApp provider, or message rules → ask **Marlene**.

**Notification rule:** messages must be short and never contain marks or discipline details.

**Cline prompt (copy):**
> Act as Cyusa, the iMBONi API and Integration Developer. Read .clinerules and docs/roles/CYUSA.md. Work only in api-contract/, integrations/ and frontend/src/api/. Look at the existing code before documenting endpoints; do not invent endpoints or fields. Do not change backend logic, database or screens; tell me who to ask instead.

**My task:** …
