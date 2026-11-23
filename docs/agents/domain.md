# Domain Documentation

Read these files before changing event behavior:

1. [GLOSSARY.md](../../GLOSSARY.md) for canonical terminology.
2. Relevant files in `docs/adr/` for accepted architectural decisions.

Use glossary terms in requirements, issue titles, code names, agent prompts, API
schemas, and tests. If a necessary concept is missing, use
`/event-domain-modeling` to resolve and document it.

Surface an ADR conflict instead of silently overriding it. Add an ADR only when
a decision is difficult to reverse, would be surprising without context, and
represents a real trade-off.

The repository uses a single domain context. Store system-wide decisions in
`docs/adr/` with monotonically increasing numeric prefixes.
