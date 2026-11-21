# iMBONi — Architecture & Product Decision Log
**Coordinator:** Marlene. Append-only. Format below. Cline must propose architectural changes here, never implement them unilaterally.

## Decision template
```
### D-<nnn>: <title>
Date: · Status: Proposed | Accepted | Rejected | Superseded
Proposed by: · Approved by:
Context:
Decision:
Alternatives:
Consequences / affected developers:
```

## Accepted decisions
### D-001: Collaboration framework
Status: Accepted (initial). Rules live in /docs; root `.clinerules` is a bridge so Cline auto-loads them. Ownership per docs/team/FILE_OWNERSHIP.md; Git per docs/cline/04-git-workflow.md.

## Open decisions (need an owner and an answer)
| ID | Question | Owner |
|---|---|---|
| O-01 | SMS/WhatsApp provider(s), pricing, sender registration | Marlene + Cyusa |
| O-02 | Consent/opt-in and legal requirements for messaging children's data | Marlene |
| O-03 | Official school rules, sanctions, conduct formula, grading scale | Marlene (with school) |
| O-04 | Reviewer/publisher roles for marks and incidents | Marlene |
| O-05 | Who can submit permission requests; cancellation rules | Marlene |
| O-06 | Teacher assignment model (class/subject) | Marlene + Gad |
| O-07 | Login identifier / OTP | Marlene + Gad |
| O-08 | Git: `develop` branch, rebase vs merge, required reviewers count | Team |
| O-09 | Fallback approval owner when a file owner is unavailable | Team |
| O-10 | Supported languages, timezone, hosting, backups | Marlene + Gad |
| O-11 | Fate of legacy CSMS modules outside iMBONi scope | Marlene |
