/**
 * Baixa bandeiras PNG em alta resolução (flagcdn.com) para public/flags/
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

/** w1280 — nítido em cards full-width; flagcdn também oferece w2560 se precisar */
const WIDTH = 1280;
const OUT_DIR = resolve(process.cwd(), "public/flags");
const SRC = readFileSync(resolve(process.cwd(), "src/lib/teamFlags.ts"), "utf8");
const codesFromMap = [
  ...new Set([...SRC.matchAll(/flag: "([^"]+)"/g)].map((m) => m[1])),
];
const codesFromDisk = readdirSync(OUT_DIR)
  .filter((f) => f.endsWith(".png"))
  .map((f) => f.replace(/\.png$/, ""));
const codes = [...new Set([...codesFromMap, ...codesFromDisk])].sort();

let ok = 0;
let fail = 0;

for (const code of codes) {
  const url = `https://flagcdn.com/w${WIDTH}/${code}.png`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`SKIP ${code}: HTTP ${res.status}`);
      fail += 1;
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(resolve(OUT_DIR, `${code}.png`), buf);
    console.log(`OK ${code} (${(buf.length / 1024).toFixed(1)} KB)`);
    ok += 1;
  } catch (err) {
    console.warn(`FAIL ${code}:`, err.message ?? err);
    fail += 1;
  }
}

console.log(`\nConcluído: ${ok} ok, ${fail} falhas (${codes.length} códigos).`);
