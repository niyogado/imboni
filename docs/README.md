# iMBONi — Team Collaboration & Cline Instructions

Start here. Everything lives in `/docs`, plus one tiny bridge file at the repo root (`.clinerules`) so Cline auto-loads these rules.

## Quick start
1. Copy the `docs/` folder and `.clinerules` into the iMBONi repo root (do not overwrite existing files — merge).
2. Run **Phase 1** below once (with Cline or manually) to fill the `[FILL]` placeholders.
3. Each developer pastes their prompt (end of their role file) at the start of a Cline task.

## First run — Phase 1 prompt (any developer, once)
> Read docs/README.md and docs/cline/. Do NOT modify application source code. Inspect the repository: structure, frontend framework, backend framework, database and migration tool, authentication, existing API endpoints, models and migrations, tests, Git branches and working changes, existing documentation, shared files, and any existing Cline rules (merge with, don't overwrite, them). Then fill the `[FILL]` fields in docs/architecture/SYSTEM_ARCHITECTURE.md §2, docs/team/FILE_OWNERSHIP.md §2 and the endpoint inventory in docs/team/INTEGRATION_CONTRACT.md §5.1. Report potential ownership conflicts. Do not invent anything you cannot verify.

## Map
| File | Purpose |
|---|---|
| `.clinerules` (root) | Bridge: tells Cline to load docs/cline and the role file |
| cline/00-project-context.md | Scope, team, golden rules |
| cline/01-team-collaboration.md | Cline's mandatory behavior, stop-and-coordinate triggers |
| cline/02-code-quality.md | Quality standards |
| cline/03-security-rules.md | Child-data security & privacy |
| cline/04-git-workflow.md | Branches, commits, PRs, conflicts |
| product/PRODUCT_REQUIREMENTS.md | Functional scope |
| product/USER_ROLES.md | Application roles/permissions baseline |
| product/ACCEPTANCE_CRITERIA.md | Testable criteria with IDs |
| team/TEAM_WORKFLOW.md | Feature lifecycle, Definition of Done |
| team/FILE_OWNERSHIP.md | Ownership matrix, path map, shared files |
| team/CHANGE_PROTOCOL.md | Approval rules and request templates |
| team/INTEGRATION_CONTRACT.md | API contract workflow and registry |
| team/HANDOFF_TEMPLATE.md | Mandatory handoff format |
| team/roles/*.md | Per-developer Cline instructions + prompts |
| architecture/SYSTEM_ARCHITECTURE.md | Architecture + detected stack |
| architecture/DATABASE_GUIDELINES.md | Schema and migration rules |
| architecture/API_GUIDELINES.md | API standards |
| architecture/DECISIONS.md | Decision log + open decisions |
| qa/TEST_STRATEGY.md · BUG_REPORT_TEMPLATE.md · TEST_REPORT_TEMPLATE.md | Quality assurance |

## Who owns what (summary)
Marlene: requirements, stories, acceptance, final acceptance. Arcade: all frontend. Gad: backend, DB, migrations, authorization. Cyusa: API contracts, client layer, SMS/WhatsApp adapters, integration tests. Doratha: test plans, cases, reports, regression, defects (reports, never fixes feature code).

## Daily collaboration in 6 lines
1. `git fetch`, branch from base: `feature/<area>-<name>`.
2. Announce task + files; claim shared files.
3. Load role prompt in Cline; edit owned files only.
4. Need something you don't own? Coordination Request, wait for approval.
5. Test, fill the handoff, open PR; owners review.
6. Doratha verifies; Marlene accepts; merge; delete branch.
