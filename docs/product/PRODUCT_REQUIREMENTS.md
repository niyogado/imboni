# iMBONi — Product Requirements
**Owner:** Marlene (Product Lead). Changes require her approval. Status of each item: `Confirmed` / `[TO CONFIRM]`.

## 1. Purpose
Connect schools with parents/guardians so parents can monitor children's academic performance and conduct, with school-managed permissions and notifications. Evolved from CSMS. Not a full school ERP.

## 2. Objectives
1. Parents monitor children's academic marks.
2. Parents monitor children's discipline and conduct.
3. Authorized staff manage academic and discipline records.
4. Headmaster approves and manages student permissions.
5. Configurable school rules and disciplinary sanctions.
6. Parent notifications via SMS and WhatsApp.
7. Secure, role-based access to student information.

## 3. Modules and functional scope

### 3.1 Authentication & authorization
Login, logout, password reset, role-based access. Roles in USER_ROLES.md. `[TO CONFIRM: login identifier — phone/email/username; OTP use]`

### 3.2 User & role management
Create/deactivate users, assign roles, staff assignments (class/subject). `[TO CONFIRM: assignment model]`

### 3.3 Student & parent management
CRUD for students and parents/guardians; parent–child linking (a parent can have many children; a child can have many guardians); link changes are audited.

### 3.4 Academic marks
- Teachers record marks for assigned classes/subjects.
- Authorized staff review/publish marks (workflow: draft → submitted → published).
- Parents view **published** marks of **linked** children only.
- Corrections keep history (versioned). `[TO CONFIRM: grading scale, terms/periods, who may publish]`

### 3.5 Discipline & conduct
- Authorized staff record incidents: description, date, category, responsible staff.
- Workflow: recorded → reviewed → approved/rejected. `[TO CONFIRM: reviewer role(s)]`
- School rules and sanctions are **configurable** by authorized users; nothing hardcoded.
- Any numbers shown in examples (e.g., conduct deductions) are **illustrative only, not school policy**.
- Parents view **approved** conduct information for linked children only.
- Corrections retain historical records. Conduct score calculation rules `[TO CONFIRM: Marlene/school]`.

### 3.6 Student permissions
Request fields: student, reason, start date, expected return date, requester. Headmaster approves or rejects; request can be cancelled; status visible (e.g., pending/approved/rejected/cancelled). Teachers can see approved permissions **before recording attendance**. `[TO CONFIRM: who may request (parent/staff/both); attendance is limited to visibility only — no attendance module unless approved]`

### 3.7 Parent dashboard
Linked children; approved marks; approved discipline records; permission information; relevant notifications.

### 3.8 Notifications
Future SMS and WhatsApp. Provider and pricing **not decided** — do not assume. Must cover: delivery status, retries, failure handling, consent/opt-in, fallback (e.g., WhatsApp → SMS → in-app). Messages must be minimal (no detailed marks/discipline).

### 3.9 Audit logs
Who/what/when for sensitive actions (see 03-security-rules.md). View restricted to authorized roles.

## 4. Out of scope (without approval)
Fees/payments, timetables, full attendance management, payroll, library, inventory, transport, e-learning, and any other ERP modules.

## 5. Non-functional requirements
Security (03-security-rules.md), responsive UI (mobile-first likely, as parents use phones), accessibility basics, performance suitable for a school's data volume `[TO CONFIRM]`, availability/backup expectations `[TO CONFIRM]`, language(s) `[TO CONFIRM: e.g., Kinyarwanda/English/French]`.

## 6. User story format
`As a <role>, I want <capability>, so that <benefit>.` Each story has ID `US-<module>-<n>` and acceptance criteria in ACCEPTANCE_CRITERIA.md.

## 7. Open questions
Tracked in docs/architecture/DECISIONS.md → "Open decisions".
