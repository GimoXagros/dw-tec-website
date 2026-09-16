import { z } from "astro/zod";
import { historicalProjectRecords } from "./historical-project-records.ts";
import { completedProjectRecords } from "./completed-project-records.ts";

// Public summaries only. Amounts are already rounded UP to whole KRW millions.
// Original documents, exact amounts, identifiers and private contacts are not shipped.
const recordSchema = z.object({
  titleKo: z.string().min(1),
  titleEn: z.string().min(1),
  clientKo: z.string().min(1),
  clientEn: z.string().min(1),
  period: z.string().min(1),
  million: z.number().int().positive(),
  reportYear: z.number().int().min(2022).max(2026).default(2025),
  basis: z.enum(["annual", "completion", "delivery", "contract"]).default("annual"),
});
type Record = z.infer<typeof recordSchema>;
const r = (
  titleKo: string,
  titleEn: string,
  clientKo: string,
  clientEn: string,
  period: string,
  million: number,
): Record => recordSchema.parse({ titleKo, titleEn, clientKo, clientEn, period, million });
const khnp = ["한국수력원자력", "KHNP"] as const;
const kps = ["한전KPS", "KEPCO KPS"] as const;
const ens = ["수산ENS", "Soosan ENS"] as const;
const hyundai = ["현대건설", "Hyundai E&C"] as const;

const recentProjectRecords = {
  electrical: [
    r(
      "발전시설 지원실 전기설비 개선",
      "Electrical upgrades to plant support facilities",
      "유림기술",
      "Yurim Technology",
      "2024.11.15 – 2025.06.12",
      15,
    ),
    r(
      "발전시설 가로등 케이블 복구",
      "Street-light cable restoration",
      ...khnp,
      "2025.01.02 – 2025.01.13",
      21,
    ),
    r(
      "버스승강장 발열의자 계량기 설치",
      "Meter installation for heated bus-stop seats",
      "울진군청",
      "Uljin County",
      "2024.12.24 – 2025.01.22",
      33,
    ),
    r(
      "소화수펌프 전원공급 전기공사",
      "Power-supply work for fire-water pumps",
      ...khnp,
      "2024.08.12 – 2025.02.27",
      351,
    ),
    r(
      "발전설비 전원케이블 설치",
      "Plant power-cable installation",
      ...khnp,
      "2025.03.24 – 2025.04.18",
      13,
    ),
    r(
      "옥외전기설비 외관점검",
      "Outdoor electrical equipment inspection",
      ...khnp,
      "2025.04.14 – 2025.06.12",
      19,
    ),
    r(
      "시험장비 이설에 따른 전원 신설",
      "Power installation for relocated test equipment",
      ...khnp,
      "2025.04.14 – 2025.06.13",
      123,
    ),
    r(
      "출입설비 전선관 설치",
      "Conduit installation for access equipment",
      ...khnp,
      "2025.03.31 – 2025.04.04",
      19,
    ),
    r(
      "전기분야 경상정비 보조",
      "Routine electrical maintenance support",
      ...kps,
      "2025.07.01 – 2026.06.30",
      260,
    ),
    r(
      "발전시설 전원공급 전기공사",
      "Electrical power-supply installation",
      ...khnp,
      "2025.11.17 – 2025.12.12",
      22,
    ),
    r(
      "임시전원 케이블 마감",
      "Temporary power-cable finishing",
      ...khnp,
      "2025.11.24 – 2025.12.12",
      16,
    ),
    r(
      "계획예방정비 설비개선",
      "Equipment upgrades during planned maintenance",
      ...ens,
      "2025.05.20 – 2025.06.30",
      61,
    ),
    r(
      "펌프 전동기 점검 보조",
      "Pump motor inspection support",
      "금화PSC",
      "Geumhwa PSC",
      "2025.05.29 – 2025.07.03",
      36,
    ),
    r(
      "발전설비 개선 작업 · 7건",
      "Plant equipment improvements · 7 work items",
      ...ens,
      "2025.09.10 – 2025.11.06",
      75,
    ),
    r(
      "발전설비 개선 작업 · 2건",
      "Plant equipment improvements · 2 work items",
      ...ens,
      "2025.08.27 – 2025.11.06",
      43,
    ),
    r(
      "충전기 교체",
      "Charger replacement",
      "국제전기",
      "International Electric",
      "2025.08.27 – 2025.10.17",
      40,
    ),
    r(
      "서버랙·통신케이블 설치",
      "Server rack and network-cable installation",
      "비케이비전",
      "BK Vision",
      "2025.09.29 – 2025.10.22",
      15,
    ),
  ],
  mechanical: [
    r(
      "저장랙 교체·설치",
      "Storage-rack replacement and installation",
      ...khnp,
      "2025.01.06 – 2025.01.31",
      20,
    ),
    r(
      "정비시설 위생설비 개선",
      "Sanitary facility upgrades",
      ...khnp,
      "2025.03.06 – 2025.03.16",
      12,
    ),
    r(
      "교육시설 기계설비공사",
      "Mechanical work for training facilities",
      "공공기관",
      "Public-sector client",
      "2025.06.26 – 2026.03.31",
      1,
    ),
    r(
      "자재보관·제작용 가설 SHOP 설치",
      "Temporary storage and fabrication shop installation",
      ...hyundai,
      "2025.06.20 – 2025.08.31",
      181,
    ),
    r(
      "학교 화장실 기계설비 개선",
      "School sanitary mechanical-system upgrades",
      "경상북도영주교육지원청",
      "Yeongju Office of Education",
      "2025.07.03 – 2025.09.15",
      194,
    ),
    r(
      "출입시설 리모델링 기계공사",
      "Mechanical work for facility refurbishment",
      ...hyundai,
      "2025.07.01 – 2025.11.30",
      44,
    ),
    r(
      "복지시설 온수탱크 배관",
      "Hot-water tank piping for welfare facilities",
      "퍼스트키퍼스",
      "Firstkeepers",
      "2025.11.03 – 2025.11.10",
      4,
    ),
  ],
  scaffolding: [
    r(
      "화재감지·경보설비 개선공사 비계 지원",
      "Scaffolding support for fire-alarm upgrades",
      "대원종합이엔지",
      "Daewon General ENG",
      "2025",
      214,
    ),
    r(
      "계획예방정비 비계·보온 설치 및 해체",
      "Scaffolding and insulation for planned maintenance",
      ...kps,
      "2025.03.03 – 2025.06.27",
      948,
    ),
    r(
      "계획예방정비 비계·보온 보조",
      "Scaffolding and insulation maintenance support",
      ...kps,
      "2025.09.26 – 2025.11.28",
      183,
    ),
    r(
      "전원공급공사 지원 비계 설치",
      "Scaffolding for electrical installation",
      ...khnp,
      "2025.11.17 – 2025.12.12",
      14,
    ),
  ],
  "fire-protection": [
    r(
      "화재방호재 복원 · 4건",
      "Fire-protection material restoration · 4 work items",
      ...ens,
      "2025.07.01 – 2025.08.31",
      76,
    ),
  ],
  manufacturing: [
    r(
      "파이프 스풀 제작·공급",
      "Pipe spool manufacturing and supply",
      ...khnp,
      "2026.09.01 – 2026.10.16",
      32,
    ),
    r(
      "전선관·설비 정비자재 공급",
      "Conduit and equipment maintenance material supply",
      ...kps,
      "2025.12.30 – 2026.01.22",
      15,
    ),
    r(
      "전선관용 커넥터·전기자재 공급",
      "Conduit connector and electrical material supply",
      ...kps,
      "2025.08.13 – 2025.08.30",
      7,
    ),
    r(
      "전기용 모의부하 시험기 제작·공급",
      "Electrical load test equipment manufacturing and supply",
      ...khnp,
      "2025.08.07 – 2025.10.13",
      84,
    ),
    r(
      "동력전달용 체인 등 제작·공급",
      "Power-transmission chains and related supply",
      ...khnp,
      "2025.05.14 – 2025.08.13",
      464,
    ),
    r(
      "베어링 관련 표준시편 제작·공급",
      "Bearing-related reference specimen manufacturing and supply",
      ...khnp,
      "2025.02.28 – 2025.05.30",
      74,
    ),
    r(
      "설비 보호커버 제작",
      "Equipment protective-cover manufacturing",
      ...khnp,
      "2023.12.21 – 2024.02.19",
      136,
    ),
    r(
      "승하강식 보안등주 공급",
      "Lowering-type outdoor lighting pole supply",
      ...khnp,
      "2023.12.15 – 2024.01.16",
      41,
    ),
    r(
      "신축이음관 등 제작·공급",
      "Expansion-joint manufacturing and supply",
      ...khnp,
      "2023.12.04 – 2024.04.05",
      10,
    ),
    r(
      "정비지원용 메모리 공급",
      "Maintenance-support memory supply",
      ...khnp,
      "2023.11.13 – 2023.12.15",
      2,
    ),
    r(
      "윤활·정비 자재 공급",
      "Lubrication and maintenance material supply",
      ...khnp,
      "2023.09.15 – 2023.10.16",
      13,
    ),
    r(
      "계전기 시험장비 공급",
      "Relay test equipment supply",
      ...khnp,
      "2023.06.29 – 2023.09.04",
      49,
    ),
  ],
} satisfies { [key: string]: Record[] };

export const projectRecords = {
  ...recentProjectRecords,
  electrical: [
    ...completedProjectRecords.electrical.map((record) => recordSchema.parse(record)),
    ...recentProjectRecords.electrical,
    ...historicalProjectRecords.electrical.map((record) => recordSchema.parse(record)),
  ],
  mechanical: [
    ...completedProjectRecords.mechanical.map((record) => recordSchema.parse(record)),
    ...recentProjectRecords.mechanical,
    ...historicalProjectRecords.mechanical.map((record) => recordSchema.parse(record)),
  ],
  scaffolding: [
    ...completedProjectRecords.scaffolding.map((record) => recordSchema.parse(record)),
    ...recentProjectRecords.scaffolding,
    ...historicalProjectRecords.scaffolding.map((record) => recordSchema.parse(record)),
  ],
  "fire-protection": [
    ...completedProjectRecords["fire-protection"].map((record) => recordSchema.parse(record)),
    ...recentProjectRecords["fire-protection"],
  ],
  manufacturing: [
    ...completedProjectRecords.manufacturing.map((record) => recordSchema.parse(record)),
    ...recentProjectRecords.manufacturing.map((record) =>
      recordSchema.parse({ ...record, basis: "contract" }),
    ),
  ],
};

export type ProjectField = keyof typeof projectRecords;
