// The Tired Dark Lord: a 100-word villain monologue.
// The dark lord signs the tribute ledger at night, keeps a goat's
// "please" note, and plans to lose to the hero on purpose.
// Tiredness lives in the rhythm (Sign. Sign. Sign.), the small
// deflections (a day off for the dead, a yawn for the hero),
// never in a plain statement that he is weary.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "Sign. Sign. Sign. The ledger never ends. Seventeen villages owe me grain, and one sent a goat with a note on its horn. The note says please. I keep it. My scribes sleep. My ravens sleep. Only the candles stay up with me, paid in wax. Tomorrow I raise the dead. I raised them twice this year, and both times they asked for a day off. I gave them one. The hero comes at dawn with his sword and his speech. I will yawn. I will lose on purpose. Losing takes less time than winning. The bed is already made.";

const words = TEXT.trim().split(/\s+/);
if (words.length !== 100) {
  throw new Error(`expected exactly 100 words, got ${words.length}`);
}
if (TEXT.length < 1 || TEXT.length > 600) {
  throw new Error(`expected 1-600 characters, got ${TEXT.length}`);
}
if (TEXT !== TEXT.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TEXT, "utf8");
const back = readFileSync(outPath, "utf8");
if (back !== TEXT) {
  throw new Error("read-back check failed: entry.txt does not match the monologue");
}
console.log(`Wrote ${TEXT.length} characters, ${words.length} words to ${outPath}`);
