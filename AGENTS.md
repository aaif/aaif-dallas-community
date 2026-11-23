# Agent Guide

## Agent skills

Use the narrowest applicable skill before making changes:

1. `/event-requirements` when a request is ambiguous or needs product decisions.
2. `/event-domain-modeling` when event terminology or lifecycle rules are changing.
3. `/fullstack-event-delivery` for implementation; the current static release
   must follow its vertical-slice discipline without introducing server code.
4. `/event-api-contracts` only when a future external API, MCP service, or agent
   interface is explicitly added.
5. `/event-tdd` for behavior with a stable public boundary.
6. `/event-review` before declaring work complete.

### Issue tracker

Product work is tracked in GitHub Issues for `aaif/aaif-dallas-community`.
See [docs/agents/issue-tracker.md](./docs/agents/issue-tracker.md).

### Domain docs

This is a single-context repository: one root glossary and system-wide ADRs.
See [docs/agents/domain.md](./docs/agents/domain.md).

## Project shape

The first release is an AWS-hosted static technical event site:

- React + TypeScript + Vite, compiled as static files;
- validated JSON content for events, sessions, speakers, partners, organizers,
  resources, and news;
- repository-managed optimized images served through CloudFront;
- an embedded Luma registration experience;
- GitHub pull-request review and deployment for content changes;
- optional local MCP tooling that validates content or prepares PRs.

Do not add a runtime backend, application database, authentication service,
attendee storage, or production mutation API without an accepted ADR. Luma is
the source of truth for registration, ticket selection, capacity, waitlists,
check-in, reminders, and participant email. Google Apps Script may consume an
organizer-exported Luma CSV for additional notifications, but participant data
must not be committed to this repository.
