import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { contentSchemas } from "../src/content/schema.js";

type ContentKey = keyof typeof contentSchemas;

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const key = process.env.CONTENT_KEY as ContentKey;
const recordId = process.env.CONTENT_RECORD_ID;
const replacementJson = process.env.CONTENT_VALUE;

if (!key || !(key in contentSchemas)) {
  throw new Error(`CONTENT_KEY must be one of: ${Object.keys(contentSchemas).join(", ")}`);
}
if (!recordId || !replacementJson) {
  throw new Error("CONTENT_RECORD_ID and CONTENT_VALUE are required.");
}

const file = resolve(root, `src/content/${key}.json`);
const existing = JSON.parse(await readFile(file, "utf8")) as unknown;
const replacement = JSON.parse(replacementJson) as unknown;
let updated: unknown;

if (Array.isArray(existing)) {
  const index = existing.findIndex((item) => isRecord(item) && item.id === recordId);
  if (index < 0) {
    throw new Error(`No ${key} record has id "${recordId}".`);
  }
  const next = [...existing];
  next[index] = replacement;
  updated = next;
} else if (key === "event" && recordId === "event") {
  updated = replacement;
} else if (isObjectWithRecords(existing)) {
  const [section, id] = recordId.split("/", 2);
  const records = existing[section];
  if (!Array.isArray(records) || !id) {
    throw new Error(`Record ID must be "<section>/<id>" for grouped content in ${key}.`);
  }
  const index = records.findIndex((item) => isRecord(item) && item.id === id);
  if (index < 0) {
    throw new Error(`No ${key}.${section} record has id "${id}".`);
  }
  const nextRecords = [...records];
  nextRecords[index] = replacement;
  updated = { ...existing, [section]: nextRecords };
} else {
  throw new Error(`${key} does not support record replacement.`);
}

const result = contentSchemas[key].safeParse(updated);
if (!result.success) {
  throw new Error(`Proposed content is invalid: ${result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ")}`);
}

await writeFile(file, `${JSON.stringify(result.data, null, 2)}\n`, "utf8");
console.log(`Updated ${file}`);

function isRecord(value: unknown): value is { id: string } {
  return typeof value === "object" && value !== null && "id" in value && typeof value.id === "string";
}

function isObjectWithRecords(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
