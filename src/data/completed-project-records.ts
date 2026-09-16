// Verified 2026 completion/settlement summaries, not annual association filings.
// Whole KRW millions only; original records and facility identifiers stay private.
const completed = (
  titleKo: string,
  titleEn: string,
  clientKo: string,
  clientEn: string,
  period: string,
  million: number,
) => ({
  titleKo,
  titleEn,
  clientKo,
  clientEn,
  period,
  million,
  reportYear: 2026,
  basis: "completion" as const,
});
const khnp = ["한국수력원자력", "KHNP"] as const;
const kps = ["한전KPS", "KEPCO KPS"] as const;

export const completedProjectRecords = {
  electrical: [
    completed(
      "누출감지설비 설치",
      "Leak-detection system installation",
      "우진엔텍",
      "Woojin NTEC",
      "2026.08.10 – 2026.08.14",
      6,
    ),
    completed(
      "전동기 분해점검 및 청소 지원",
      "Motor inspection and cleaning support",
      "금화피에스시",
      "Geumhwa PSC",
      "2026.05.27 – 2026.06.28",
      126,
    ),
    completed(
      "감시설비용 케이블 설치",
      "Monitoring-system cable installation",
      ...khnp,
      "2026.04.13 – 2026.06.26",
      21,
    ),
    completed(
      "보일러 열전대 개선공사",
      "Boiler thermocouple improvements",
      "한국남부발전",
      "Korea Southern Power",
      "2026.04.05 – 2026.06.16",
      64,
    ),
    completed(
      "UPS 철거 및 설치",
      "UPS removal and installation",
      "국제전기",
      "International Electric",
      "2026.06.15",
      6,
    ),
    completed(
      "전산기 및 서버 교체",
      "Computer and server replacement",
      "비케이비전",
      "BK Vision",
      "2026.05",
      10,
    ),
    completed(
      "옥외전기설비 외관점검",
      "Outdoor electrical equipment inspection",
      ...khnp,
      "2026.04.02 – 2026.05.28",
      17,
    ),
    completed(
      "설비용 케이블 포설",
      "Equipment cable installation",
      "수산인더스트리",
      "Soosan Industries",
      "2026.01.09 – 2026.02.13",
      22,
    ),
  ],
  mechanical: [
    completed(
      "계획예방정비 기계설비 정비공사",
      "Mechanical equipment servicing during planned maintenance",
      ...kps,
      "2026.05.25 – 2026.07.10",
      132,
    ),
  ],
  scaffolding: [
    completed(
      "감지기 교체 지원 비계 설치",
      "Scaffolding for detector replacement",
      "프라임이엔씨",
      "Prime E&C",
      "2026.07.20 – 2026.07.21",
      5,
    ),
    completed(
      "수영장 천장 철구조물 철거",
      "Swimming-pool ceiling steelwork removal",
      "퍼스트키퍼스",
      "First Keepers",
      "2026.06.30 – 2026.07.07",
      7,
    ),
    completed(
      "발전설비 정비용 비계 설치 및 해체",
      "Scaffolding installation and removal for plant maintenance",
      ...kps,
      "2026.03.06 – 2026.05.25",
      455,
    ),
    completed(
      "철근탐상 지원 강관비계 설치",
      "Tubular scaffolding for rebar inspection",
      ...khnp,
      "2026.01.12 – 2026.02.20",
      12,
    ),
  ],
  "fire-protection": [
    completed(
      "비상조명등 추가 설치",
      "Additional emergency lighting installation",
      ...khnp,
      "2026.07.06 – 2026.07.28",
      19,
    ),
  ],
  manufacturing: [
    {
      ...completed(
        "전선관용 커넥터·전기자재 납품",
        "Conduit connector and electrical material supply",
        ...kps,
        "2026.01.23",
        5,
      ),
      basis: "delivery" as const,
    },
    {
      ...completed(
        "전선관·부속자재 납품",
        "Conduit and electrical accessory supply",
        "수산인더스트리",
        "Soosan Industries",
        "2026.01.23",
        3,
      ),
      basis: "delivery" as const,
    },
  ],
};
