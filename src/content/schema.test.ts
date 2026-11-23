import { validateCrossReferences } from "./schema";

it("reports sessions that reference an unknown speaker", () => {
  const errors = validateCrossReferences({
    schedule: [{
      id: "session",
      start: "2027-01-23T09:00:00-06:00",
      end: "2027-01-23T10:00:00-06:00",
      title: "Session",
      type: "technical",
      track: "Main",
      room: "Auditorium",
      summary: "Summary",
      speakerIds: ["missing-speaker"],
      tags: [],
    }],
    speakers: [],
  });

  expect(errors).toEqual(["session references missing speaker missing-speaker"]);
});
