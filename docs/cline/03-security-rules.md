# 03 — Security & Data Protection (mandatory)

iMBONi processes children's academic and disciplinary data. Treat every change as security-relevant.

## Access control
1. Role-based access control (RBAC) enforced **server-side** on every endpoint. The frontend is never the enforcement layer; it only hides UI.
2. **Parent–child verification:** a parent may only access students linked to them via an active parent–child link. Verify the link on every request, not just at login.
3. A parent must NEVER access another parent's child's records (marks, conduct, permissions, notifications). Test this explicitly (IDOR checks).
4. Teachers access only data for their assigned classes/subjects/responsibilities `[TO CONFIRM: Marlene — assignment model]`.
5. Parents see only **approved/published** marks and **approved** incidents.
6. Headmaster-only actions (permission approval, etc.) are checked server-side by role.

## Authentication & secrets
- Hash passwords with an established algorithm (argon2id, bcrypt or scrypt); never roll your own crypto.
- Secure sessions/tokens: expiry, rotation/revocation, secure cookie flags if cookies are used.
- Rate-limit login and OTP/reset flows; lockout or throttling on brute force.
- Secrets only in environment variables / secret manager. Never commit `.env`, keys, tokens, provider credentials. Cline must never print secrets.

## Input & output
- Validate and sanitize all input server-side (type, length, format, allow-lists).
- Use parameterized queries/ORM; no string-built SQL.
- Protect against XSS, CSRF, SQL injection, mass assignment, IDOR, open redirects, SSRF, insecure file upload.
- Safe error responses: no stack traces, SQL, or internal IDs/paths to clients. Generic message to client, detail to server logs.
- Do not log sensitive content (passwords, tokens, full marks/incident text, full phone numbers).

## Data minimization & privacy
- Collect and return only fields needed. Use explicit response DTOs; never return raw DB rows.
- **Notifications (SMS/WhatsApp) must not expose detailed marks or disciplinary content.** Send a minimal alert ("A new update is available in iMBONi") and require login to view details.
- Record parent **consent/opt-in** for messaging; honor opt-out. `[TO CONFIRM: legal/consent requirements — Marlene]`
- Comply with applicable data-protection law `[TO CONFIRM: jurisdiction & requirements]`.

## Audit logging
- Log who/what/when for: logins, failed logins, record create/update/approve/reject, permission decisions, parent–child link changes, role changes, notification sends.
- Audit logs are append-only and not editable via the application.

## Database
- Least-privilege DB credentials; separate per environment. Encrypt in transit; consider encryption at rest and backups `[TO CONFIRM: hosting]`.
