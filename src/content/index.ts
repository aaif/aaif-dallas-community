import committeesData from "./committees.json";
import eventData from "./event.json";
import newsData from "./news.json";
import organizersData from "./organizers.json";
import partnersData from "./partners.json";
import resourcesData from "./resources.json";
import scheduleData from "./schedule.json";
import speakersData from "./speakers.json";
import sponsorsData from "./sponsors.json";
import {
  committeeSchema,
  eventSchema,
  newsSchema,
  organizerSchema,
  partnersSchema,
  resourceSchema,
  sessionSchema,
  speakerSchema,
  sponsorsSchema,
  validateCrossReferences,
} from "./schema";
import { z } from "zod";

const event = eventSchema.parse(eventData);
const schedule = z.array(sessionSchema).parse(scheduleData);
const speakers = z.array(speakerSchema).parse(speakersData);
const partners = partnersSchema.parse(partnersData);
const sponsors = sponsorsSchema.parse(sponsorsData);
const organizers = z.array(organizerSchema).parse(organizersData);
const committees = z.array(committeeSchema).parse(committeesData);
const resources = z.array(resourceSchema).parse(resourcesData);
const news = z.array(newsSchema).parse(newsData);

const referenceErrors = validateCrossReferences({ schedule, speakers });
if (referenceErrors.length > 0) {
  throw new Error(`Invalid content references: ${referenceErrors.join("; ")}`);
}

export const content = {
  event,
  schedule,
  speakers,
  partners,
  sponsors,
  organizers,
  committees,
  resources,
  news,
};
