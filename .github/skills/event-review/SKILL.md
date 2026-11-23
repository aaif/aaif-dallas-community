---
name: event-review
description: Review AAIF Dallas changes independently for documented engineering standards and exact compliance with the originating event-management spec.
disable-model-invocation: true
---

# Event Change Review

Review the supplied commit, branch, or merge-base. If no fixed point is supplied,
ask for one. Confirm the ref resolves and the diff is non-empty.

Keep the two review axes separate.

## Standards axis

Check documented repository guidance plus the following high-value risks:

- duplicated lifecycle logic across adapters;
- UI, API, MCP, or agent bypassing authorization or validation;
- secrets or sensitive attendee data in logs, prompts, traces, or responses;
- transport schemas drifting from domain behavior;
- implementation-coupled tests;
- migrations that lose registration or attendance history;
- avoidable complexity or speculative abstraction;
- missing observability, idempotency, or explicit failure handling.

Skip issues already enforced mechanically by the existing toolchain.

## Specification axis

Read the originating issue or spec and report:

- missing or partial requirements;
- implemented behavior not requested by the spec;
- behavior that appears implemented but is semantically wrong;
- acceptance criteria without meaningful coverage.

For every finding, cite the relevant file and line plus the violated standard or
spec text. Omit style-only feedback. If no specification exists, explicitly
report that the specification axis was skipped.

End with the finding count and the highest-severity finding for each axis.
