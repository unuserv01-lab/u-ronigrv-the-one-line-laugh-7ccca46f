// The One-Line Laugh — make.fun bounty u-ronigrv-the-one-line-laugh-7ccca46f
//
// Prints exactly one funny line to stdout and writes the same text to the
// entry file the harness grades (/output/entry.txt, or $MAKEFUN_OUTPUT_DIR).
// The line is a single sentence: a relatable everyday truth (paying for a
// gym membership you never use) with the surprise saved for the very end —
// the charge itself is reframed as honesty, which still makes sense once
// it lands, and nothing in the sentence explains the joke.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry. One sentence, 80 characters, written fresh for this bounty.
// Revised in-session after a free-model review: the connective "which is
// the most" was scaffolding, so the punchline now lands after a dash
// instead of trailing a relative clause. (The reviewer's two-sentence
// variant was not used: the brief requires a single sentence.)
const LINE: string =
  "The gym billed me for a year of not going — the most honest subscription I have.";

// The gate: the graded text must be UTF-8 text of 1 to 200 characters,
// not only white space.
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

function codePointLength(text: string): number {
  return [...text].length;
}

function validateEntry(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  const length = codePointLength(text);
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(
      `entry must be ${MIN_LENGTH} to ${MAX_LENGTH} characters, got ${length}`,
    );
  }
}

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function main(): void {
  validateEntry(LINE);
  // Exactly one line on stdout: the line plus its line ending.
  process.stdout.write(LINE + "\n");
  // The graded artifact: the bare line, byte-identical to the stdout text
  // minus its line ending, so the file holds exactly the one line.
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), LINE, "utf8");
}

main();
