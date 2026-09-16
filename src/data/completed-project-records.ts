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
};
