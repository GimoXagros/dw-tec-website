import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)],
    );
}
const files = walk("dist");
const pages = files.filter((file) => file.endsWith(".html"));
const titles = new Set();
const descriptions = new Set();
let links = 0;
for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/name="description" content="([^"]+)"/)?.[1];
  assert(title && !titles.has(title), `Missing/duplicate title: ${file}`);
  titles.add(title);
  assert(description && !descriptions.has(description), `Missing/duplicate description: ${file}`);
  descriptions.add(description);
  assert(!/(?:src|href)="http:\/\//.test(html), `Mixed content: ${file}`);
  for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (!raw.startsWith("/") || raw.startsWith("//")) continue;
    const pathname = decodeURIComponent(raw.split(/[?#]/)[0]);
    const target = path.join("dist", pathname, pathname.endsWith("/") ? "index.html" : "");
    assert(fs.existsSync(target), `Missing target ${raw} on ${file}`);
    links++;
  }
}
assert(fs.existsSync("dist/sitemap-index.xml"));
assert(fs.readFileSync("dist/CNAME", "utf8").trim() === "dw-tec.co.kr");
console.log(
  `PASS: ${pages.length} pages, ${links} local links/assets, unique metadata, sitemap and CNAME`,
);
