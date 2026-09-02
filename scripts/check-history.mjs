import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
const objects = execFileSync("git", ["rev-list", "--objects", "--all"], { encoding: "utf8" })
  .trim()
  .split("\n")
  .filter(Boolean);
let checked = 0;
for (const line of objects) {
  const split = line.indexOf(" ");
  if (split < 0) continue;
  const sha = line.slice(0, split),
    file = line.slice(split + 1);
  assert(
    !/(?:^local-only\/|\.pptx?$|\.pdf$|\.xlsx?$|\.env$|서명|통장)/i.test(file),
    `Disallowed historical path: ${file}`,
  );
  if (!/\.(?:astro|ts|mjs|js|json|md|ya?ml|html|css|txt|xml)$/.test(file)) continue;
  const data = execFileSync("git", ["cat-file", "-p", sha], {
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });
  assert(
    !/(?:[0-9]{6}-[1-4][0-9]{6}|010[- ]\d{4}[- ]\d{4}|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)/.test(
      data,
    ),
    `Sensitive historical text: ${file}`,
  );
  checked++;
}
console.log(
  `PASS: ${checked} reachable historical text objects; prohibited files and secret patterns absent.`,
);
