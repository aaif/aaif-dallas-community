---
name: event-tdd
description: Use a red-green-refactor loop to test AAIF Dallas event behavior through pre-agreed public frontend, API, MCP, and agent seams.
---

# Event Test-Driven Development

Before writing a test, list the public seams under test and confirm them with the
user. Prefer the highest seam that observes the requested behavior without
coupling tests to implementation details.

Suitable seams include:

- domain/application use cases with known event scenarios;
- HTTP API requests and typed responses;
- frontend user interactions against a controlled adapter;
- MCP tool invocation through a running tool server;
- agent evaluation on observable tool calls and final outcome;
- a production-like integration slice for migrations and transactions.

## Rules

1. Write one failing behavioral test.
2. Implement only enough production code to make it pass.
3. Repeat with the next independently valuable behavior.
4. Refactor after green checks, not while inventing the behavior.
5. Test expected values from an independent source of truth.
6. Never assert private calls, internal tables, or prompt wording when a public
   outcome can be observed.
7. Mock only external boundaries; do not mock the domain rule being tested.
8. Include authorization, validation, retry/idempotency, and user-visible
   failure paths for externally reachable operations.

Name tests with glossary language:

```text
an attendee can register for a published community event
a registration is idempotent when an agent retries the same command
an organizer can cancel an event with existing registrations
```

Run the smallest relevant test after each cycle and the complete suite before
review.
