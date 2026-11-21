# 02 — Code Quality Rules

- Follow the conventions already present in the repo (naming, folder layout, lint/format config). Run the project's existing linter/formatter if one exists; do not add or change lint config without approval (shared file).
- Small, focused changes; one concern per commit/PR.
- No dead code, commented-out blocks, or leftover debug logging.
- No hardcoded secrets, URLs, phone numbers, school names, or policy values. Use configuration.
- **Configurable policy:** school rules, sanctions, grading scales and deduction values must come from configuration/data, never constants. Example values in docs are illustrative only.
- Validate all inputs; handle errors explicitly; return consistent error shapes (API_GUIDELINES.md).
- Every behavior change needs a test (unit and/or integration) written or updated by the author; Doratha verifies the whole feature.
- Prefer reuse: search for existing components, services, utilities, types before writing new ones.
- Accessibility and responsiveness are required for UI work (Arcade).
- Document non-obvious decisions in code comments and significant ones in DECISIONS.md.
- Dates/times: store UTC, display in school local timezone `[TO CONFIRM: timezone]`.
- Corrections to marks/incidents must be **append-only/versioned** — keep history; never destructively overwrite.
