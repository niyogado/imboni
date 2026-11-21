# 04 — Git Workflow (five developers)

## Branches
`main` = protected, always deployable. `develop` (if present/adopted) = integration branch `[TO CONFIRM: use develop? — team]`. Discover the existing default and keep it.

Naming (lowercase, hyphens):
- `feature/frontend-<name>`
- `feature/backend-<name>`
- `feature/api-<name>`
- `test/<name>`
- `docs/<name>`
- `fix/<name>`

## Starting work
1. `git fetch --all --prune`
2. `git checkout <base> && git pull --ff-only`
3. `git checkout -b <type>/<name>`
4. Check `git status` is clean before starting. Never start on `main`.

## Committing
- Small, logical commits. Conventional format: `type(scope): summary`
  - `feat(frontend): implement parent dashboard`
  - `feat(backend): implement marks management`
  - `feat(api): document student permission endpoints`
  - `test(qa): add parent authorization tests`
  - `fix(backend): correct permission approval validation`
- Stage explicitly (`git add <files>`); avoid `git add -A` without reviewing `git status`/`git diff --staged`.
- Never commit secrets, `.env`, build output, or unrelated files.

## Keeping up to date
- Sync at least daily: `git fetch` then rebase your **own unpublished** branch on base (`git rebase origin/<base>`), or merge base into it if already shared. Pick one approach and stay consistent `[TO CONFIRM: rebase vs merge — team]`.
- Never rewrite history of a branch others have pulled.

## Pull requests
- One feature/concern per PR; link story and acceptance criteria.
- PR description includes the Handoff fields (HANDOFF_TEMPLATE.md).
- Required reviewers: the **owner** of any file touched outside the author's ownership; Cyusa for contract changes; Gad for schema/migrations; Marlene for behavior changes.
- Tests must pass (state what was run) before requesting review. Doratha verifies before merge of feature work.
- Squash or merge per team convention; use the PR title as the conventional commit message.

## Merge conflicts
1. Stop. Don't auto-resolve with "ours/theirs" wholesale.
2. Read both sides; identify the file owner and the other author.
3. Resolve manually preserving both intents; if the other side's intent is unclear, ask them.
4. Re-run tests after resolving. Explain the resolution in the PR.
5. Conflicts in shared files or migrations → go through CHANGE_PROTOCOL.md.

## Prohibited
- `git push --force` to shared branches (`main`, `develop`, any branch others use). Use `--force-with-lease` only on your own private branch, after telling reviewers.
- Discarding others' changes (`git reset --hard`, `git checkout .`, `git clean -fd`) on a working tree with changes you didn't author.
- Direct commits to `main`.

## Cleanup
Delete merged branches (local and remote) promptly: `git branch -d <b>` / `git push origin --delete <b>`.
