---
name: event-api-contracts
description: Design and evolve AAIF Dallas HTTP APIs, MCP tools, and agent workflows as versioned, typed, authorized adapters over shared event services.
---

# Event API, MCP, and Agent Contracts

Use this skill whenever a contract crosses a transport or process boundary.

## Shared rules

- Derive request and response schemas from one canonical type definition.
- Use glossary terms consistently in endpoint paths, schemas, tool names, and
  agent instructions.
- Validate all untrusted input before invoking an application service.
- Return machine-stable error codes and human-readable messages.
- Enforce authorization in the server or service layer, never only in prompts or
  UI controls.
- Preserve idempotency for creates, retries, and agent tool calls.
- Avoid exposing persistence identifiers or internal errors unnecessarily.
- Update OpenAPI and MCP tool documentation in the same change as the contract.

## HTTP API checklist

For each endpoint, specify actor, authentication, authorization, request schema,
success response, domain errors, rate/abuse constraints, and idempotency.

## MCP checklist

Each MCP tool must:

- have a single clear operation and bounded JSON schema;
- state preconditions and side effects in its description;
- invoke a shared application service;
- reject unauthorized calls;
- return a stable structured result;
- be covered by a contract test and a failure-path test.

## Agent checklist

Agents use approved tools, not direct database access. Prompts may explain goals
and constraints but do not replace schema validation, authorization, or domain
invariants. Agent traces should be observable without recording secrets or
unnecessary attendee data.

When changing an existing contract, identify compatibility impact and provide
an additive migration or a documented version change.
