---
name: fullstack-event-delivery
description: Implement AAIF Dallas event-management work end to end as a narrow, tested vertical slice spanning frontend, backend, APIs, MCP tools, and agents.
disable-model-invocation: true
---

# Full-Stack Event Delivery

Implement the work described by an accepted spec or GitHub issue. State the
ticket title and acceptance criteria before starting.

## Vertical slice

Prefer one complete user capability over separate frontend and backend layers.
For every slice:

1. Define the actor, action, result, and failure modes.
2. Confirm the public seam to test with `/event-tdd`.
3. Model the domain rule once in a shared application service.
4. Expose it through typed API handlers.
5. Connect the frontend using the API, not a copied business rule.
6. Add an MCP tool or agent workflow only when the spec requires it; route both
   through the same service and authorization path.
7. Run targeted type-checking and tests, then the full suite.
8. Use `/event-review` against the spec and repository standards.

## Architecture boundaries

- Frontend components own presentation and interaction state, not lifecycle
  rules.
- HTTP handlers own transport parsing, authentication, and serialization.
- Application services own use cases and orchestration.
- Domain modules own invariants and transitions.
- Persistence adapters own queries and transactions, not product policy.
- MCP tools are thin, typed adapters with explicit authorization and bounded
  inputs.
- Agents plan and call approved tools; they do not mutate storage directly.

Do not create speculative infrastructure. Make the smallest production-quality
slice that demonstrates the capability.

## Completion

Work is complete only when:

- all acceptance criteria are implemented;
- contracts are documented and validated;
- failure paths are visible to callers;
- targeted and full checks pass;
- any migration and deployment steps are documented;
- a review found no unresolved blocker.
