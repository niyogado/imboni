# iMBONi Backend — Gad

## Architecture
Routes → Controller → Service → Repository → Database. Never skip a layer. Business rules only in services.

## Stack
Node.js, Express, TypeScript, Prisma ORM, MySQL, JWT, bcryptjs, Jest + Supertest.

## Implemented
- Auth (register, login, profile)
- Users (list, get, update, deactivate)
- Students (create, get, list, update)
- Parents (create, get, list, update)
- Parent–Student Links (link, unlink, verify access — 403 IDOR)
- Marks (create, get, list for parent/teacher, submit, publish)
- Incidents (create, get, list for parent/staff, review/approve/reject)
- Permission Requests (create, get, list pending/all, approve/reject/cancel)
- Notifications (create, get, list, update status)
- Audit Logs (list)

## Security
- Parent–child verification mandatory on every endpoint
- RBAC middleware (authenticate + authorize role)
- Notification content minimization
- Versioned corrections (append-only)

## Run
npm install && npx prisma generate && npx prisma migrate deploy
npm test

## Tests
tests/parentStudentLink.test.ts — IDOR test
tests/auth.test.ts — auth register/login
tests/mark.test.ts — parent mark visibility