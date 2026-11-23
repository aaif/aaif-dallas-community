import { z } from "zod";

const url = z.url();
const id = z.string().min(1).regex(/^[a-z0-9-]+$/);
const isoDateTime = z.iso.datetime({ offset: true });

export const eventSchema = z.object({
  id,
  name: z.string().min(1),
  tagline: z.string().min(1),
  edition: z.string().min(1),
  date: z.iso.date(),
  dateLabel: z.string().min(1),
  time: z.string().min(1),
  city: z.string().min(1),
  venue: z.string().min(1),
  registrationUrl: url,
  registrationEventId: z.string().regex(/^evt-[A-Za-z0-9]+$/),
  posterUrl: url.nullable(),
  overview: z.string().min(1),
  mission: z.string().min(1),
  notice: z.string().min(1),
  stats: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })).min(1),
});

export const sessionSchema = z.object({
  id,
  start: isoDateTime,
  end: isoDateTime,
  title: z.string().min(1),
  type: z.enum(["operations", "keynote", "technical", "lab", "community"]),
  track: z.string().min(1),
  room: z.string().min(1),
  summary: z.string().min(1),
  speakerIds: z.array(id),
  tags: z.array(z.string().min(1)),
}).refine(({ start, end }) => new Date(end) > new Date(start), {
  message: "Session end must be after its start",
});

export const speakerSchema = z.object({
  id,
  name: z.string().min(1),
  role: z.string().min(1),
  organization: z.string().min(1),
  headshot: z.string().nullable(),
  bio: z.string().min(1),
  sessionIds: z.array(id),
  topics: z.array(z.string().min(1)),
  featured: z.boolean(),
});

const partnerSchema = z.object({
  id,
  name: z.string().min(1),
  description: z.string().min(1),
  logo: z.string().nullable(),
});

export const partnersSchema = z.object({
  organizingCommunities: z.array(partnerSchema),
  communityPartners: z.array(partnerSchema),
  sponsors: z.array(partnerSchema.extend({
    tier: z.string().min(1),
    logo: z.string().nullable(),
    url: z.string(),
  })),
  sponsorPackages: z.array(z.object({
    id,
    name: z.string().min(1),
    audience: z.string().min(1),
    description: z.string().min(1),
    benefits: z.array(z.string().min(1)).min(1),
    collaboration: z.string().min(1),
  })),
});

export const organizerSchema = z.object({
  id,
  name: z.string().min(1),
  role: z.string().min(1),
  community: z.string().min(1),
  affiliations: z.array(z.string().min(1)).min(1).optional(),
  linkedinUrl: url.optional().nullable(),
  headshot: z.string().nullable(),
  bio: z.string().min(1),
  committee: z.string().min(1),
});

export const committeeSchema = z.object({
  id,
  name: z.string().min(1),
  shortName: z.string().min(1),
  description: z.string().min(1),
  responsibilities: z.array(z.string().min(1)).min(1),
  status: z.string().optional(),
});

export const resourceSchema = z.object({
  id,
  title: z.string().min(1),
  description: z.string().min(1),
  audience: z.string().min(1),
  url: url.optional(),
  available: z.boolean(),
});

export const newsSchema = z.object({
  id,
  date: z.iso.date(),
  title: z.string().min(1),
  summary: z.string().min(1),
  category: z.string().min(1),
});

export const contentSchemas = {
  event: eventSchema,
  schedule: z.array(sessionSchema),
  speakers: z.array(speakerSchema),
  partners: partnersSchema,
  organizers: z.array(organizerSchema),
  committees: z.array(committeeSchema),
  resources: z.array(resourceSchema),
  news: z.array(newsSchema),
};

export type EventContent = z.infer<typeof eventSchema>;
export type Session = z.infer<typeof sessionSchema>;
export type Speaker = z.infer<typeof speakerSchema>;
export type Partners = z.infer<typeof partnersSchema>;
export type Organizer = z.infer<typeof organizerSchema>;
export type Committee = z.infer<typeof committeeSchema>;
export type Resource = z.infer<typeof resourceSchema>;
export type NewsItem = z.infer<typeof newsSchema>;

export function validateCrossReferences(content: {
  schedule: Session[];
  speakers: Speaker[];
}) {
  const sessionIds = new Set(content.schedule.map((session) => session.id));
  const speakerIds = new Set(content.speakers.map((speaker) => speaker.id));
  const errors: string[] = [];

  for (const session of content.schedule) {
    for (const speakerId of session.speakerIds) {
      if (!speakerIds.has(speakerId)) {
        errors.push(`${session.id} references missing speaker ${speakerId}`);
      }
    }
  }

  for (const speaker of content.speakers) {
    for (const sessionId of speaker.sessionIds) {
      if (!sessionIds.has(sessionId)) {
        errors.push(`${speaker.id} references missing session ${sessionId}`);
      }
    }
  }

  return errors;
}
