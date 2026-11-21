# 01 — Team Collaboration Rules for Cline

## Mandatory start-of-task checklist
1. Read docs/cline/00–04 and this file.
2. Confirm which developer you are acting for. If unclear, ASK.
3. Read that developer's role file and docs/team/FILE_OWNERSHIP.md.
4. Run `git status`, `git branch --show-current`, `git log -5 --oneline`.
5. If there are uncommitted changes you did not make, DO NOT touch those files. Tell the developer.
6. State the plan and the exact list of files you intend to modify before editing.

## Mandatory behavior
1. Work only on the assigned task; no drive-by refactors, renames, or formatting sweeps.
2. Respect file ownership (FILE_OWNERSHIP.md). Editing a file you don't own requires coordination first.
3. Never overwrite another developer's uncommitted changes.
4. Never redesign architecture; propose it in docs/architecture/DECISIONS.md instead.
5. Search for an existing implementation before creating anything new. Never duplicate a feature.
6. No database schema change without Gad.
7. No API contract change without Cyusa (and Gad + Arcade informed).
8. No product requirement change without Marlene's approval.
9. Never claim tests passed unless you executed them and saw the output. If you could not run them, say "NOT RUN" and why.
10. Document significant changes (handoff, contract, decision log as relevant).
11. At the end of every task, report: files modified, API changes, DB changes, tests run + results, known issues.

## STOP-AND-COORDINATE triggers
Stop and ask the human to coordinate when the task requires:
- editing a file/module owned by another developer;
- editing any **shared file** (see FILE_OWNERSHIP.md §4);
- changing a database schema or migration;
- changing a request/response shape, status code, or endpoint;
- implementing a school policy not documented in docs/product;
- choosing an SMS/WhatsApp provider.

Output a **Coordination Request** (CHANGE_PROTOCOL.md §3) and wait for explicit approval. Do not proceed "temporarily".

## Handoffs
When work passes to another person, fill docs/team/HANDOFF_TEMPLATE.md completely.
