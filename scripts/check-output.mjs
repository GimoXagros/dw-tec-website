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
  ["계약", "번호"].join(""),
  ["계약", "금액"].join(""),
  "P230047010",
  "U230720010",
  "U230893010",
  "U231012010",
  "U231016010",
  "U231055010",
  "U250053010",
  "U250808010",
  "U260743010",
  "W250176010",
  "계약 실적이 증명하는",
];
for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/name="description" content="([^"]+)"/)?.[1];
  assert(title && !titles.has(title), `Missing/duplicate title: ${file}`);
  titles.add(title);
  assert(description && !descriptions.has(description), `Missing/duplicate description: ${file}`);
  descriptions.add(description);
  assert(!/src="http:\/\//.test(html), `Mixed content asset: ${file}`);
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
for (const name of [
  "한국수력원자력(주)",
  "한전KPS(주)",
  "수산ENS",
  "(주)수산인더스트리",
  "(주)금화피에스시",
  "경상북도교육청",
  "현대건설(주)",
  "옵티멀에너지서비스(주)",
  "(주)이투에스",
  "(주)국제전기",
  "(주)비케이비전",
  "(주)무지기연",
  "리얼게인",
])
  assert(homeKo.includes(name), `Organization name missing on Korean home: ${name}`);
for (const name of [
  "Korea Hydro &amp; Nuclear Power",
  "KEPCO KPS",
  "Soosan ENS",
  "Soosan Industries",
  "Geumhwa PSC",
  "Gyeongsangbuk-do Office of Education",
  "Hyundai Engineering &amp; Construction",
  "Optimal Energy Service",
  "E2S",
  "International Electric",
  "BK Vision",
  "Moojin Machinery",
  "Realgain",
])
  assert(homeEn.includes(name), `Organization name missing on English home: ${name}`);
for (const website of [
  "https://www.khnp.co.kr/main/index.do",
  "https://www.kps.co.kr/web/index.do",
  "https://www.soosanens.co.kr/",
  "https://www.soosanind.co.kr/main/index.html",
  "https://www.geumhwa.co.kr/main",
  "https://www.gbe.kr/main/main.do",
  "https://www.hdec.kr/",
  "http://www.oes.kr/",
  "https://e2s.co.kr/",
  "https://www.ieckr.com/",
  "http://www.bkvision.co.kr/",
  "https://newmoojin.co.kr/",
  "http://www.realgain.co.kr/kor/main/",
])
  assert(homeKo.includes(`href="${website}"`), `Official organization link missing: ${website}`);
for (const removedName of ["퍼스트키퍼스(주)", "(주)대원종합이엔지", "유림기술(주)"])
  assert(!homeKo.includes(removedName), `Removed organization still present: ${removedName}`);
assert(homeKo.includes("제조 및 납품"), "Manufacturing business missing on Korean home");
assert(
  homeEn.includes("Manufacturing &amp; Supply"),
  "Manufacturing business missing on English home",
);
const manufacturingKo = fs.readFileSync("dist/business/manufacturing/index.html", "utf8");
assert(
  manufacturingKo.includes("공장 기반의 제작·조달·검사·납품 흐름을 일관되게 관리합니다."),
  "Refined manufacturing introduction missing",
);
for (const capability of [
  "도면·사양 기반 기계·배관",
  "전기·시험 품목의 요구 성능",
  "기계·정비 자재의 제작품·동등품·기성품 공급",
  "가공·조립·검사·현장 인도",
])
  assert(manufacturingKo.includes(capability), `Manufacturing capability missing: ${capability}`);
console.log(
  `PASS: ${pages.length} pages, ${links} local links/assets, unique metadata, sitemap and CNAME`,
);
