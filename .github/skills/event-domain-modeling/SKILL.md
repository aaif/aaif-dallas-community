---
name: event-domain-modeling
description: Build and sharpen the AAIF Dallas technical event-management domain model, glossary, lifecycle rules, and architecture decisions.
---

# Event Domain Modeling

Use this skill when a feature introduces or changes event terminology, actor
capabilities, lifecycle transitions, registration rules, scheduling, capacity,
or data ownership.

## During design

1. Read `GLOSSARY.md` and relevant ADRs before discussing changes.
2. Challenge conflicting terms immediately. For example, do not let `member`,
   `user`, and `attendee` silently refer to different identities.
3. Convert vague requirements into concrete scenarios, especially:
   - publishing an incomplete event;
   - cancelling after registrations exist;
   - reaching capacity;
   - a presenter who is also an attendee;
   - overlapping sessions and venue conflicts;
   - retries from an MCP tool or agent.
4. Verify that existing code matches the proposed domain rule.
5. Update `GLOSSARY.md` when a term becomes canonical.
6. Offer an ADR only for a consequential, surprising trade-off.

The glossary describes the product language, not classes, tables, endpoints, or
implementation mechanisms.

## Event invariants

Until superseded by an accepted decision, enforce these starting invariants:

- only published events accept public registrations;
- one Attendee has at most one active Registration per Community Event;
- session timing stays within the Community Event time range;
- cancellations preserve auditability;
- organizer-only changes use explicit authorization checks;
- MCP and agent actions cannot bypass domain validation.
