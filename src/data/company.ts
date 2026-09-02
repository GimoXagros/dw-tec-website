import { z } from "astro/zod";

const companySchema = z.object({
  name: z.string().min(1),
  englishName: z.string().min(1),
  brand: z.string(),
  representative: z.string(),
  founded: z.iso.date(),
  updated: z.iso.date(),
  address: z.string(),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/),
  fax: z.string().regex(/^\d{3}-\d{3}-\d{4}$/),
  email: z.email(),
  url: z.url(),
});

export const company = companySchema.parse({
  name: "주식회사 대원기술",
  englishName: "DAEWON TECHNOLOGY CO., LTD.",
  brand: "DW-TEC",
  representative: "김동현",
  founded: "2022-06-20",
  updated: "2026-09-02",
  address: "경상북도 울진군 북면 남산길 64, 2층",
  phone: "054-783-9170",
  fax: "054-783-9171",
  email: "dwtec@dw-tec.co.kr",
  url: "https://dw-tec.co.kr",
});

const businessSchema = z.object({
  slug: z.string().regex(/^[a-z-]+$/),
  number: z.string(),
  title: z.string(),
  english: z.string(),
  summary: z.string(),
  description: z.string(),
  services: z.array(z.string()).min(1),
  checks: z.array(z.string()),
  capacity: z.number().positive(),
  capacityLabel: z.string(),
});

export const businesses = z.array(businessSchema).parse([
  {
    slug: "electrical",
    number: "01",
    title: "전기공사",
    english: "ELECTRICAL",
    summary: "전원부터 계측까지, 설비의 안정적인 연결을 만듭니다.",
    description:
      "발전·산업 플랜트의 케이블, 전선관, 전기패널, 조명 및 제어설비 시공과 설비 개선을 수행합니다. 현장 조건과 기존 설비의 연결 관계를 검토하고 시공·검사 기록을 관리합니다.",
    services: [
      "전력·제어 케이블 및 전선관 설치",
      "전기패널·조명 설비 설치 및 정비",
      "계측·통신 설비 연계 작업",
      "절연·도통 등 시공 후 기능 확인",
    ],
    checks: [
      "기존 설비와 작업 범위 확인",
      "전원 차단·작업허가 조건 확인",
      "결선·시험·검사 기록 관리",
    ],
    capacity: 2299245000,
    capacityLabel: "22.99억 원",
  },
  {
    slug: "mechanical",
    number: "02",
    title: "기계가스설비공사",
    english: "MECHANICAL",
    summary: "배관·공조·기계장치를 현장의 조건에 맞게 시공합니다.",
    description:
      "기계설비, 배관, 공조·환기 설비의 설치와 발전소 정비 지원을 수행합니다. 등록 공장을 기반으로 가공·제작부터 현장 설치까지 작업 흐름을 연결합니다.",
    services: [
      "기계설비·배관 설치",
      "공조·환기 설비 시공",
      "특수목적 장치 제작 및 설치",
      "용접·가공 및 정비 지원",
    ],
    checks: [
      "치수·간섭·설치 조건 사전 검토",
      "제작·설치 공정의 품질 확인",
      "체결·누설·기능 등 요구 검사 수행",
    ],
    capacity: 1251003000,
    capacityLabel: "12.51억 원",
  },
  {
    slug: "scaffolding",
    number: "03",
    title: "구조물해체·비계공사",
    english: "SCAFFOLDING",
    summary: "안전한 접근과 작업 공간으로 정비 현장을 지원합니다.",
    description:
      "발전설비 계획예방정비와 현장 작업에 필요한 비계 설치·해체, 가설구조 및 구조물 철거·복구를 수행합니다. 공종 간 간섭과 작업 동선을 함께 관리합니다.",
    services: [
      "강관비계 설치 및 해체",
      "계획예방정비 작업 지원",
      "가설구조 및 작업 접근성 확보",
      "구조물 철거·복구",
    ],
    checks: [
      "작업구역·통행·동선 사전 검토",
      "설치 상태와 안전시설 확인",
      "해체 순서 및 인계 상태 관리",
    ],
    capacity: 2241645000,
    capacityLabel: "22.42억 원",
  },
  {
    slug: "fire-protection",
    number: "04",
    title: "전문소방시설공사",
    english: "FIRE PROTECTION",
    summary: "전기·기계 소방 역량으로 설비의 신뢰성을 높입니다.",
    description:
      "2026년 8월 26일 전문소방시설공사업 등록을 완료했습니다. 소방 전기·기계 특급 기술인력을 기반으로 감지·경보 설비와 화재방호 설비의 시공·검사·복원을 수행합니다.",
    services: [
      "감지·경보 설비 시공",
      "수신반·중계기 및 전선관·케이블 작업",
      "비상조명 설비 작업",
      "화재방호체 복원 및 동작 확인",
    ],
    checks: [
      "기존 소방설비와 작업 조건 검토",
      "시공·결선·동작 확인",
      "변경사항 및 검사·복원 기록 관리",
    ],
    capacity: 906800000,
    capacityLabel: "9.068억 원",
  },
]);

export const principles = z
  .array(
    z.object({ english: z.string().min(1), title: z.string().min(1), text: z.string().min(1) }),
  )
  .parse([
    {
      english: "SAFETY",
      title: "안전을 먼저",
      text: "작업 전에 위험요소와 현장 조건을 확인하고 안전 기준을 실행합니다.",
    },
    {
      english: "QUALITY",
      title: "품질은 기록으로",
      text: "계획·시공·검사·인계의 기록을 연결해 결과를 확인합니다.",
    },
    {
      english: "TRUST",
      title: "약속은 끝까지",
      text: "공정과 변경사항을 투명하게 공유하고 맡은 범위를 책임 있게 마무리합니다.",
    },
  ]);

export const history = z
  .array(z.object({ year: z.string().regex(/^\d{4}$/), events: z.array(z.string().min(1)).min(1) }))
  .parse([
    {
      year: "2026",
      events: ["전문소방시설공사업 등록 완료 (8월 26일)", "ISO 9001·14001·45001 인증 갱신"],
    },
    { year: "2025", events: ["수처리용 교반기 특허결정", "발전설비 정비 분야 기술이전 계약 체결"] },
    {
      year: "2023",
      events: [
        "기계가스설비·구조물해체비계 공사업 등록",
        "ISO 9001·14001·45001 인증",
        "공장등록 완료 (12월 21일)",
      ],
    },
    { year: "2022", events: ["주식회사 대원기술 설립 (6월 20일)", "전기공사업 기반 구축"] },
  ]);

export const capabilities = z
  .object({
    certifications: z.array(
      z.object({ code: z.string().min(1), title: z.string().min(1), text: z.string().min(1) }),
    ),
    equipment: z.array(z.string().min(1)),
  })
  .parse({
    certifications: [
      { code: "ISO 9001", title: "품질경영시스템", text: "시공 품질과 업무 절차의 일관성 관리" },
      { code: "ISO 14001", title: "환경경영시스템", text: "현장 환경영향과 자원 사용 관리" },
      { code: "ISO 45001", title: "안전보건경영시스템", text: "위험요소 파악과 안전보건 관리" },
    ],
    equipment: ["케이블·배관 가공", "전기 시험·계측", "용접·절단·가공", "양중·운반", "안전·검사"],
  });

export const portfolio = z
  .array(
    z.object({ category: z.string().min(1), title: z.string().min(1), text: z.string().min(1) }),
  )
  .parse([
    {
      category: "전기",
      title: "발전설비 전기·계측 시공",
      text: "케이블·패널·조명 설비의 설치와 정비 보조 등 발전설비 운영을 지원하는 전기공사를 수행했습니다.",
    },
    {
      category: "기계",
      title: "기계설비·배관 개선",
      text: "기계설비와 배관, 가설시설 및 리모델링 공사에서 현장 조건에 맞춘 설치 작업을 수행했습니다.",
    },
    {
      category: "비계",
      title: "계획예방정비 비계 지원",
      text: "정비 작업의 접근성과 작업 공간 확보를 위한 비계 설치·해체를 수행했습니다.",
    },
    {
      category: "소방",
      title: "화재감지·방호 설비 작업",
      text: "자동화재탐지설비, 감지기 설치, 수신반·중계기 교체와 화재방호재 복원 관련 수행기록을 보유하고 있습니다.",
    },
  ]);
