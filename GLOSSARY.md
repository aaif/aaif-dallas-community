# Event Management Glossary

Keep implementation details out of this file. These terms define the shared
product language used in UI, API, MCP, agent prompts, tickets, and tests.

## Community Event

A technical gathering organized by AAIF Dallas with a title, description,
scheduled time range, venue, capacity, registration policy, and lifecycle state.

## Lifecycle State

The current stage of a Community Event. Canonical states are `draft`,
`published`, `cancelled`, and `completed`.

## Session

A scheduled presentation, workshop, panel, or other activity belonging to one
Community Event.

## Presenter

A person or organization delivering a Session. A Presenter is distinct from an
Attendee and can also register for the event as an Attendee.

## Attendee

A person associated with a Registration for a Community Event.

## Registration

The attendee and ticket record held by Luma. Registration is not stored or
managed by this website.

## Organizer

A community member responsible for reviewing public event content and operations.
In the static-first release, content authority is enforced through GitHub review
rather than an application login.

## Venue

The physical or virtual location in which a Community Event occurs.

## Community Edition

One scheduled instance of a recurring event brand, such as the Agentic AI
Summit. A Community Edition may have one lead organizing community and multiple
co-organizing communities, sponsors, and partners.

## Track

A parallel sequence of Sessions within a Community Edition. A Track has its own
name, venue, and schedule.

## Lab Session

A hands-on Session with prerequisites, limited capacity, and separate attendee
selection managed by Luma.

## Content Change

A proposed edit to public event JSON or repository-managed assets. A Content
Change becomes visible only after review, validation, and deployment.

## Luma Registration

The external registration record and ticket selection for a Community Edition.
Luma is the source of truth for attendees, capacity, waitlists, check-in, and
participant communication. This website stores no participant personal data.
