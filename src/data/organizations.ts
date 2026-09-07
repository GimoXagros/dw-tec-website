import { z } from "astro/zod";

const organizationSchema = z.object({
  id: z.string().min(1),
  nameKo: z.string().min(1),
  nameEn: z.string().min(1),
  website: z.url(),
  logoSrc: z.string().startsWith("/images/partners/"),
  logoTheme: z.enum(["light", "dark"]).default("light"),
  displayOrder: z.number().nonnegative().int(),
});

const organizationsSchema = z
  .array(organizationSchema)
  .refine(
    (items) => new Set(items.map((item) => item.id)).size === items.length,
    "중복된 조직 ID가 존재합니다.",
  )
  .refine(
    (items) =>
      new Set(items.map((item) => item.nameKo.replace(/\s/g, "").toLowerCase())).size ===
      items.length,
    "중복된 조직 상호가 존재합니다.",
  )
  .refine(
    (items) => new Set(items.map((item) => item.displayOrder)).size === items.length,
    "중복된 표시 순서가 존재합니다.",
  );

export const organizations = organizationsSchema.parse([
  {
    id: "khnp",
    nameKo: "한국수력원자력(주)",
    nameEn: "Korea Hydro & Nuclear Power",
    website: "https://www.khnp.co.kr/main/index.do",
    logoSrc: "/images/partners/khnp.png",
    displayOrder: 1,
  },
  {
    id: "kepco-kps",
    nameKo: "한전KPS(주)",
    nameEn: "KEPCO KPS",
    website: "https://www.kps.co.kr/web/index.do",
    logoSrc: "/images/partners/kepco-kps.svg",
    displayOrder: 2,
  },
  {
    id: "soosan-ens",
    nameKo: "수산ENS",
    nameEn: "Soosan ENS",
    website: "https://www.soosanens.co.kr/",
    logoSrc: "/images/partners/soosan-ens.png",
    displayOrder: 3,
  },
  {
    id: "soosan-industries",
    nameKo: "(주)수산인더스트리",
    nameEn: "Soosan Industries",
    website: "https://www.soosanind.co.kr/main/index.html",
    logoSrc: "/images/partners/soosan-industries.png",
    displayOrder: 4,
  },
  {
    id: "geumhwa-psc",
    nameKo: "(주)금화피에스시",
    nameEn: "Geumhwa PSC",
    website: "https://www.geumhwa.co.kr/main",
    logoSrc: "/images/partners/geumhwa-psc.png",
    displayOrder: 5,
  },
  {
    id: "gyeongbuk-education",
    nameKo: "경상북도교육청",
    nameEn: "Gyeongsangbuk-do Office of Education",
    website: "https://www.gbe.kr/main/main.do",
    logoSrc: "/images/partners/gyeongbuk-education.png",
    displayOrder: 6,
  },
  {
    id: "hyundai-ec",
    nameKo: "현대건설(주)",
    nameEn: "Hyundai Engineering & Construction",
    website: "https://www.hdec.kr/",
    logoSrc: "/images/partners/hyundai-ec.svg",
    displayOrder: 7,
  },
  {
    id: "oes",
    nameKo: "옵티멀에너지서비스(주)",
    nameEn: "Optimal Energy Service",
    website: "http://www.oes.kr/",
    logoSrc: "/images/partners/oes.png",
    displayOrder: 8,
  },
  {
    id: "e2s",
    nameKo: "(주)이투에스",
    nameEn: "E2S",
    website: "https://e2s.co.kr/",
    logoSrc: "/images/partners/e2s.png",
    displayOrder: 9,
  },
  {
    id: "international-electric",
    nameKo: "(주)국제전기",
    nameEn: "International Electric",
    website: "https://www.ieckr.com/",
    logoSrc: "/images/partners/international-electric.png",
    displayOrder: 10,
  },
  {
    id: "bk-vision",
    nameKo: "(주)비케이비전",
    nameEn: "BK Vision",
    website: "http://www.bkvision.co.kr/",
    logoSrc: "/images/partners/bk-vision.png",
    displayOrder: 11,
  },
  {
    id: "moojin-machinery",
    nameKo: "(주)무지기연",
    nameEn: "Moojin Machinery",
    website: "https://newmoojin.co.kr/",
    logoSrc: "/images/partners/moojin-machinery.png",
    displayOrder: 12,
  },
  {
    id: "realgain",
    nameKo: "리얼게인",
    nameEn: "Realgain",
    website: "http://www.realgain.co.kr/kor/main/",
    logoSrc: "/images/partners/realgain.png",
    displayOrder: 13,
  },
]);
