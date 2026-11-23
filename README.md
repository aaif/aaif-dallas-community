# AAIF Dallas Community

This repository hosts the AAIF Dallas Agentic AI Summit website and reusable
community event assets.

## Agent workflows

The first release is a static React + TypeScript site backed by validated JSON
content. Luma owns registration and attendee operations; the site owns public
event content and organizer workflows.

The project uses composable Copilot skills modeled on Matt Pocock's engineering
workflow:

- `event-requirements`: clarify the product and write a shared glossary and ADRs
- `event-domain-modeling`: maintain the event-management ubiquitous language
- `fullstack-event-delivery`: implement a feature as a frontend-to-backend slice
- `event-api-contracts`: evolve REST, MCP, and agent-facing contracts safely
- `event-tdd`: drive work test-first at agreed public seams
- `event-review`: review a change for standards and specification compliance

See [AGENTS.md](./AGENTS.md) for invocation guidance and
[`docs/agents/domain.md`](./docs/agents/domain.md) for the domain-document
conventions.

## Local development

```bash
npm install
npm run validate:content
npm run dev
```

Run all release checks with:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Content workflow

Public event data is stored in `src/content/*.json` and validated against the
schemas in `src/content/schema.ts`. Organizers can use the **Prepare content
change** GitHub Actions workflow to replace one record; it validates the JSON and
opens a pull request rather than changing production directly. See
[`docs/content-management.md`](./docs/content-management.md).

AWS deployment and security configuration are documented in
[`docs/deployment.md`](./docs/deployment.md).
