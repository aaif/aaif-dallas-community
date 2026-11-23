---
name: event-requirements
description: Clarify an AAIF Dallas technical event-management request, stress-test its design, and capture the shared vocabulary and product decisions before implementation.
disable-model-invocation: true
---

# Event Requirements

Interview the user until the request has no hidden product assumptions. Work as
a design tree: identify decisions whose prerequisites are settled, ask the
whole frontier in one round, and wait for answers before opening the next round.

Always cover:

- primary actors: attendee, presenter, organizer, volunteer, or administrator;
- event lifecycle and transition permissions;
- required registration, capacity, waitlist, check-in, and cancellation rules;
- privacy, authentication, and authorization expectations;
- frontend experience and accessibility requirements;
- backend persistence and integration constraints;
- API, MCP, and agent workflows that are in scope;
- acceptance criteria, public test seams, and out-of-scope behavior.

Give a recommended answer for each question, so accepting the recommendation can
be brief. Find repository and environment facts yourself; ask only for decisions
the user must make.

Do not write implementation code until the frontier is empty and the user
confirms the shared understanding. During the interview:

1. Resolve fuzzy terms with `/event-domain-modeling`.
2. Record accepted terminology in `GLOSSARY.md`.
3. Record hard-to-reverse, surprising trade-offs as ADRs.
4. Turn the final synthesis into a GitHub issue using the conventions in
   `docs/agents/issue-tracker.md`.
