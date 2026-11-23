# Content Management

The public site reads typed JSON from `src/content/`. Never add attendee exports,
participant CSVs, private contact details, Luma API credentials, or organizer
secrets to this directory.

## Domains

- `event.json`: summit identity, dates, Luma links, and poster form;
- `schedule.json`: tracks, sessions, times, rooms, speakers, and tags;
- `speakers.json`: presenter profiles and session relationships;
- `partners.json`: organizing communities, community partners, and sponsors;
- `organizers.json`: core team and committee records;
- `committees.json`: operational workstreams and their responsibilities;
- `resources.json`: public lab preparation links;
- `news.json`: summit updates.

The `registrationUrl` and `registrationEventId` fields drive Luma's official
checkout button. The anchor remains a working fallback when the checkout script
is blocked. The `posterUrl` field is nullable until the external submission form
is published; a null value presents an accessible “opens soon” state.

## Review workflow

1. Open **Actions → Prepare content change**.
2. Choose a content domain and identify an existing record.
3. Enter the complete replacement JSON object, not just the changed property.
4. Submit the workflow. Invalid JSON or schema mismatches stop the job.
5. Review the generated pull request for links, language, accessibility text,
   and cross-references.
6. Merge after CI passes. Deployment happens from `main`.

Use `event` as the record ID for `event.json`. For `partners.json`, use
`<section>/<record-id>`, for example `organizingCommunities/aaif-dallas`.

## Local validation

```bash
npm run validate:content
```

Schemas live in `src/content/schema.ts`. They validate field shape and date
formats. Cross-reference validation ensures every speaker and session relation
exists.

## Images

Commit only optimized public images. Do not use attendee photos or private
documents. Prefer WebP or AVIF, explicit dimensions, descriptive alt text, and
files below 250 KB where practical.

Speaker and organizer records include a nullable `headshot` path. Add a local
optimized image using a type-specific folder:

- partner logos: `public/images/partners/`
- community logos: `public/images/communities/`
- sponsor logos: `public/images/sponsors/`
- speaker headshots: `public/images/speakers/`
- CORE team headshots: `public/images/core-team/`
- committee team headshots: `public/images/committee-team/`

Organizer records can include an optional `affiliations` array and nullable
`linkedinUrl`, for example:

```json
{
  "affiliations": ["AAIF Dallas", "IEEE Dallas"],
  "linkedinUrl": "https://www.linkedin.com/in/profile-name/"
}
```

When `affiliations` is omitted, the existing `community` value is displayed as
the organizer's affiliation. Use `null` for `linkedinUrl` when the profile is
not available.

Until a headshot is supplied, the site shows an initials fallback. Organizing
communities and community partners include nullable `logo` paths. Sponsor
records include a nullable `logo` path and a contact URL. Never put unlicensed
or attendee-owned images into the repository without permission.
