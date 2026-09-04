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
const prohibitedPublicClaims = [
  ["22", ".99억"].join(""),
  ["12", ".51억"].join(""),
  ["22", ".42억"].join(""),
  ["9", ".068억"].join(""),
  ["시공능력", "평가"].join(""),
];
for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/name="description" content="([^"]+)"/)?.[1];
  assert(title && !titles.has(title), `Missing/duplicate title: ${file}`);
  titles.add(title);
  assert(description && !descriptions.has(description), `Missing/duplicate description: ${file}`);
  descriptions.add(description);
  assert(!/(?:src|href)="http:\/\//.test(html), `Mixed content: ${file}`);
  for (const claim of prohibitedPublicClaims)
    assert(!html.includes(claim), `Prohibited public claim '${claim}': ${file}`);
  if (!file.endsWith("404.html")) {
    assert(/rel="alternate" hreflang="ko"/.test(html), `Missing Korean alternate: ${file}`);
    assert(/rel="alternate" hreflang="en"/.test(html), `Missing English alternate: ${file}`);
    assert(/rel="alternate" hreflang="x-default"/.test(html), `Missing x-default: ${file}`);
  }
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
const homeKo = fs.readFileSync("dist/index.html", "utf8");
const homeEn = fs.readFileSync("dist/en/index.html", "utf8");
for (const name of ["한전KPS", "수산인더스트리", "금화PSC", "OES"])
  assert(
    homeKo.split(name).length === 2,
    `Partner name missing or duplicated on Korean home: ${name}`,
  );
for (const name of ["KEPCO KPS", "Soosan Industries", "Geumhwa PSC", "OES"])
  assert(
    homeEn.split(name).length === 2,
    `Partner name missing or duplicated on English home: ${name}`,
  );
console.log(
  `PASS: ${pages.length} pages, ${links} local links/assets, unique metadata, sitemap and CNAME`,
);
