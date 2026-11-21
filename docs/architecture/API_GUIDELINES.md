# iMBONi — API Guidelines
**Owners:** Cyusa (contract), Gad (implementation). Follow existing API conventions in the repo first; these fill gaps.

1. **Contract-first:** no endpoint is implemented, called, or changed until it is in docs/team/INTEGRATION_CONTRACT.md as `Agreed`.
2. Resource-oriented URLs, plural nouns, consistent prefix/versioning as already used `[FILL after inspection]`.
3. Methods: GET read, POST create/action, PUT/PATCH update, DELETE remove (or soft-delete).
4. Auth required by default; each endpoint lists authorized roles. Authorization is enforced server-side, including parent–child checks.
5. **Response envelope** — use the existing one; if none exists, propose via DECISIONS.md. Illustrative only:
   - Success: `{ "data": ..., "meta": {...} }`
   - Error: `{ "error": { "code": "STRING_CODE", "message": "safe message", "details": [ ... ] } }`
6. Status codes: 200, 201, 204, 400 (malformed), 401 (unauthenticated), 403 (forbidden), 404 (not found / hide existence of unauthorized records where appropriate), 409 (conflict/state), 422 (validation), 429 (rate limit), 500 (generic).
7. Validation errors identify the field, never leak internals.
8. Pagination, filtering, sorting standardised on list endpoints; never return unbounded lists.
9. Dates ISO-8601 UTC; IDs opaque; no internal/sensitive fields in DTOs.
10. Idempotency for notification-triggering and approval actions where retries are possible.
11. Backward compatibility: breaking changes require a version/migration plan and sign-off from Gad, Cyusa, Arcade.
12. Do not invent fields. If a field is needed, request it via the contract workflow.
13. Integration (SMS/WhatsApp) endpoints/webhooks: verify signatures, handle duplicates, record delivery status, timeouts and retries.
