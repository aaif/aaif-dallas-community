# ADR 0001: Static-First Community Event Site

## Status

Accepted

## Context

AAIF Dallas needs a cost-effective public website for a multi-community Agentic
AI Summit. The summit includes multiple tracks, hands-on labs, speakers,
organizers, sponsors, workshop resources, news, and calls for student posters.

Registration is already handled by Luma. Luma owns ticket types, workshop
selection, capacity, waitlists, reminders, check-in, and attendee contact data.
Additional participant email may be sent outside the application with Luma
exports and Google Apps Script.

A backend would add identity, authorization, database, deployment, and privacy
operations without being needed for the public content use case. AWS-native
static hosting provides low idle cost, independent scaling, and familiar CDN
security controls.

## Decision

Build the first release as a statically generated React + TypeScript + Vite
application:

- content is stored in typed, validated domain JSON files;
- optimized public assets are stored in the repository;
- the site embeds the configured Luma registration component and provides an
  accessible direct fallback link;
- the site is deployed from a private S3 origin through CloudFront, with
  Route 53 DNS and ACM TLS;
- content changes enter through reviewed GitHub pull requests and are deployed
  only after validation;
- any local MCP tooling may validate JSON and prepare pull requests, but cannot
  mutate production directly.

The first release does not include a runtime API, backend service, application
database, organizer authentication, attendee accounts, payment processing,
participant data storage, or application email delivery.

## Consequences

The platform has low operational cost and a small attack surface. Organizers
receive changes through a review workflow rather than instant browser editing.
Large volumes of attendee data and registration logic remain outside this
repository.

A later ADR must be accepted before introducing authenticated administration,
live MCP API access, a database, or any attendee-data synchronization.

## Alternatives considered

- **Full-stack AWS application**: rejected for the first release because the
  current requirements are public-content delivery and reviewed JSON changes.
- **S3 Tables as application storage**: rejected because AWS positions S3 Tables
  for analytical Apache Iceberg workloads, not low-latency website content
  administration.
- **S3 JSON as a mutable runtime database**: rejected because Git review,
  reproducible builds, and rollback are stronger for this low-volume content
  workflow.
- **Vercel or another static host**: viable, but AWS S3 and CloudFront align
  with the accepted hosting requirement and keep infrastructure under one
  cloud provider.
