import fs from "node:fs";
const source = "node_modules/pretendard/dist/web/variable";
fs.mkdirSync("public/fonts/subsets", { recursive: true });
for (const filename of fs.readdirSync(`${source}/woff2-dynamic-subset`)) {
  fs.copyFileSync(`${source}/woff2-dynamic-subset/${filename}`, `public/fonts/subsets/${filename}`);
}
const css = fs
  .readFileSync(`${source}/pretendardvariable-dynamic-subset.css`, "utf8")
  .replaceAll("'Pretendard Variable'", "Pretendard")
  .replaceAll("./woff2-dynamic-subset/", "/fonts/subsets/");
fs.writeFileSync("src/styles/fonts.css", css);
console.log("Prepared unmodified, self-hosted Pretendard variable subsets.");
