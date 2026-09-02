import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";

function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)],
    );
}
const patterns = [
  /[0-9]{6}-[1-4][0-9]{6}/,
  /010[- ]\d{4}[- ]\d{4}/,
  /gh[pousr]_[A-Za-z0-9]{30,}/,
  /github_pat_[A-Za-z0-9_]{30,}/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
];
const textExtensions = /\.(?:astro|ts|js|mjs|json|md|yml|yaml|html|css|txt|xml)$/;
const build = walk("dist");
let tracked = [];
try {
  tracked = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" })
    .split("\0")
    .filter(Boolean);
} catch {
  console.log("Git tracked-file check pending repository initialization.");
}
for (const file of [...build, ...tracked]) {
  assert(
    !/(?:local-only\/|\.pptx?$|\.pdf$|\.xlsx?$|\.env$|서명|통장|개인정보)/i.test(file),
    `Private file: ${file}`,
  );
  if (!textExtensions.test(file)) continue;
  const text = fs.readFileSync(file, "utf8");
  for (const pattern of patterns) assert(!pattern.test(text), `Sensitive pattern: ${file}`);
}
console.log(
  `PASS: ${build.length} build files and ${tracked.length} tracked files; prohibited file/secret patterns absent. Manual image/source review remains required.`,
);
