import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { contentSchemas, validateCrossReferences } from "../src/content/schema.js";
import type { Session, Speaker } from "../src/content/schema.js";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const contentDirectory = resolve(root, "src/content");
const files = (await readdir(contentDirectory)).filter((file) => file.endsWith(".json"));
const parsed: Record<string, unknown> = {};

for (const file of files) {
  const key = file.replace(".json", "") as keyof typeof contentSchemas;
  const schema = contentSchemas[key];
  if (!schema) {
    throw new Error(`No schema registered for ${file}`);
  }

  const value = JSON.parse(await readFile(resolve(contentDirectory, file), "utf8"));
  const result = schema.safeParse(value);
  if (!result.success) {
    console.error(`Invalid ${file}:`);
    console.error(zodErrorLines(result.error.issues));
    process.exitCode = 1;
  } else {
    parsed[key] = result.data;
    console.log(`✓ ${file}`);
  }
}

if (!process.exitCode) {
  const referenceErrors = validateCrossReferences({
    schedule: parsed.schedule as Session[],
    speakers: parsed.speakers as Speaker[],
  });
  if (referenceErrors.length > 0) {
    console.error(`Invalid content references:\n${referenceErrors.map((error) => `- ${error}`).join("\n")}`);
    process.exitCode = 1;
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("Content validation passed.");

function zodErrorLines(issues: Array<{ path: PropertyKey[]; message: string }>) {
  return issues.map((issue) => `- ${issue.path.join(".") || "root"}: ${issue.message}`).join("\n");
}
