import { readFileSync, readdirSync } from "node:fs";

const src = readFileSync("src/lib/teamFlags.ts", "utf8");
const codes = [
  ...new Set(
    [...src.matchAll(/flag: "([^"]*)"/g)]
      .map((m) => m[1])
      .filter(Boolean),
  ),
];
const existing = new Set(
  readdirSync("public/flags").map((f) => f.replace(/\.png$/, "")),
);
const missing = codes.filter((c) => !existing.has(c));
console.log(missing.length ? `missing: ${missing.join(", ")}` : "all flags present");
