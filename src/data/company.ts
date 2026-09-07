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
  updated: "2026-09-07",
  address: "경상북도 울진군 북면 남산길 64, 2층",
  phone: "054-783-9170",
  fax: "054-783-9171",
  email: "dwtec@dw-tec.co.kr",
  url: "https://dw-tec.co.kr",
});

const businessSchema = z.object({
  slug: z.string().regex(/^[a-z-]+$/),
  number: z.string(),
  titleKo: z.string().min(1),
  titleEn: z.string().min(1),
  shortEn: z.string().min(1),
  summaryKo: z.string().min(1),
  summaryEn: z.string().min(1),
  descriptionKo: z.string().min(1),
  descriptionEn: z.string().min(1),
  servicesKo: z.array(z.string()).min(1),
  servicesEn: z.array(z.string()).min(1),
  checksKo: z.array(z.string()),
  checksEn: z.array(z.string()),
  evidenceKo: z.array(z.object({ title: z.string().min(1), text: z.string().min(1) })).default([]),
  evidenceEn: z.array(z.object({ title: z.string().min(1), text: z.string().min(1) })).default([]),
});

export const businesses = z.array(businessSchema).parse([
  {
    slug: "electrical",
    number: "01",
    titleKo: "전기공사",
    titleEn: "Electrical Construction",
    shortEn: "ELECTRICAL",
    summaryKo: "전원부터 계측까지, 설비의 안정적인 연결을 만듭니다.",
    summaryEn:
      "From power distribution to instrumentation, we build stable, reliable installation.",
    descriptionKo:
      "발전·산업 플랜트의 케이블, 전선관, 전기패널, 조명 및 제어설비 시공과 설비 개선을 수행합니다. 현장 조건과 기존 설비의 연결 관계를 검토하고 시공·검사 기록을 관리합니다.",
    descriptionEn:
      "We carry out electrical works for power, control panels, lighting, and instrumentation in industrial plants and support modernization where conditions require coordinated installation and test records.",
    servicesKo: [
      "전력·제어 케이블 및 전선관 설치",
      "전기패널·조명 설비 설치 및 정비",
      "계측·통신 설비 연계 작업",
      "절연·도통 등 시공 후 기능 확인",
    ],
    servicesEn: [
      "Power and control cable and conduit installation",
      "Installation and maintenance of electrical panels and lighting systems",
      "Instrumentation and communication system integration",
      "Post-construction checks for insulation and continuity",
    ],
    checksKo: [
      "기존 설비와 작업 범위 확인",
      "전원 차단·작업허가 조건 확인",
      "결선·시험·검사 기록 관리",
    ],
    checksEn: [
      "Scope review against existing plant systems",
      "Confirmation of power lockout and work-approval conditions",
      "Conduit, wiring, testing, and inspection record control",
    ],
  },
  {
    slug: "mechanical",
    number: "02",
    titleKo: "기계가스설비공사",
    titleEn: "Mechanical & Gas Facilities Construction",
    shortEn: "MECHANICAL",
    summaryKo: "배관·공조·기계장치를 현장의 조건에 맞게 시공합니다.",
    summaryEn:
      "We implement mechanical systems and piping based on real site operating conditions.",
    descriptionKo:
      "기계설비, 배관, 공조·환기 설비의 설치와 발전소 정비 지원을 수행합니다. 등록 공장을 기반으로 가공·제작부터 현장 설치까지 작업 흐름을 연결합니다.",
    descriptionEn:
      "We execute mechanical, piping, and HVAC works and support operation-level maintenance. We integrate fabrication and installation through a controlled workflow.",
    servicesKo: [
      "기계설비·배관 설치",
      "공조·환기 설비 시공",
      "특수목적 장치 제작 및 설치",
      "용접·가공 및 정비 지원",
    ],
    servicesEn: [
      "Mechanical and piping installation",
      "HVAC and ventilation installation",
      "Fabrication and erection of special-purpose equipment",
      "Welding, machining, and maintenance support",
    ],
    checksKo: [
      "치수·간섭·설치 조건 사전 검토",
      "제작·설치 공정의 품질 확인",
      "체결·누설·기능 등 요구 검사 수행",
    ],
    checksEn: [
      "Dimensional, interference, and installation-precondition review",
      "Quality confirmation across fabrication and installation stages",
      "Bolting, leakage, and function testing controls",
    ],
  },
  {
    slug: "scaffolding",
    number: "03",
    titleKo: "구조물해체·비계공사",
    titleEn: "Structural Demolition & Scaffolding",
    shortEn: "SCAFFOLDING",
    summaryKo: "안전한 접근과 작업 공간으로 정비 현장을 지원합니다.",
    summaryEn: "We secure safe access and workspace to support maintenance execution.",
    descriptionKo:
      "발전설비 계획예방정비와 현장 작업에 필요한 비계 설치·해체, 가설구조 및 구조물 철거·복구를 수행합니다. 공종 간 간섭과 작업 동선을 함께 관리합니다.",
    descriptionEn:
      "We perform scaffold erection/removal, temporary works, and structural work support for planned maintenance, while coordinating trade interfaces and work routes.",
    servicesKo: [
      "강관비계 설치 및 해체",
      "계획예방정비 작업 지원",
      "가설구조 및 작업 접근성 확보",
      "구조물 철거·복구",
    ],
    servicesEn: [
      "Pipe-and-cage scaffold erection and removal",
      "Support for planned preventive maintenance",
      "Temporary structures and safe access set-up",
      "Structural dismantling and restoration support",
    ],
    checksKo: [
      "작업구역·통행·동선 사전 검토",
      "설치 상태와 안전시설 확인",
      "해체 순서 및 인계 상태 관리",
    ],
    checksEn: [
      "Work-zone, access route, and traffic check",
      "Scaffold condition and life-safety control review",
      "Dismantling sequence and handover-state control",
    ],
  },
  {
    slug: "fire-protection",
    number: "04",
    titleKo: "전문소방시설공사",
    titleEn: "Specialized Fire Protection Facilities Construction",
    shortEn: "FIRE PROTECTION",
    summaryKo: "전기·기계 소방 역량으로 설비의 신뢰성을 높입니다.",
    summaryEn:
      "Our electrical and mechanical fire protection scope supports facility reliability and response readiness.",
    descriptionKo:
      "2026년 8월 26일 전문소방시설공사업 등록을 완료했습니다. 소방 전기·기계 특급 기술인력을 기반으로 감지·경보 설비와 화재방호 설비의 시공·검사·복원을 수행합니다.",
    descriptionEn:
      "We completed registration as a specialized fire facility constructor on 2026-08-26 and perform detector/alarm, panel, relay, and fire-protection work, including field restoration support.",
    servicesKo: [
      "감지·경보 설비 시공",
      "수신반·중계기 및 전선관·케이블 작업",
      "비상조명 설비 작업",
      "화재방호체 복원 및 동작 확인",
    ],
    servicesEn: [
      "Fire detection and alarm installation",
      "Fire receiver and repeater panel updates with conduit/cabling",
      "Emergency lighting works",
      "Fire protection restoration and functional checks",
    ],
    checksKo: [
      "기존 소방설비와 작업 조건 검토",
      "시공·결선·동작 확인",
      "변경사항 및 검사·복원 기록 관리",
    ],
    checksEn: [
      "Review of existing fire-system conditions",
      "Verification of installation, wiring, and operation",
      "Change-log and inspection-restoration records",
    ],
  },
  {
    slug: "manufacturing",
    number: "05",
    titleKo: "제조 및 납품",
    titleEn: "Manufacturing & Supply",
    shortEn: "MANUFACTURING",
    summaryKo: "공장 기반의 제작·조달·검사·납품 흐름을 일관되게 관리합니다.",
    summaryEn:
      "We consistently manage a factory-based workflow spanning fabrication, procurement, inspection, and delivery.",
    descriptionKo:
      "대원기술은 경상북도 울진군 북면 남산길 64 소재 자가 공장을 2023년 12월 21일 등록했습니다. 공장등록증상 기타 구조용 금속제품 제조업 외 28종의 등록 범위 안에서 금속 구조물과 설비 구성품의 가공·조립·검사·납품을 지원합니다.",
    descriptionEn:
      "DAEWON TECHNOLOGY registered its owner-occupied factory at 64 Namsan-gil, Buk-myeon, Uljin-gun on December 21, 2023. Within the registered scope of other structural metal product manufacturing and 28 additional business categories, the facility supports fabrication, assembly, inspection, and delivery of metal structures and equipment components.",
    servicesKo: [
      "등록 업종 범위 내 금속 구조물·설비 구성품 제작",
      "제작 전 도면·사양·치수 검토",
      "가공·조립·검사 및 출하 관리",
      "현장 설치 공종과 연계한 납품 지원",
    ],
    servicesEn: [
      "Fabrication of metal structures and equipment components within the registered scope",
      "Pre-fabrication review of drawings, specifications, and dimensions",
      "Processing, assembly, inspection, and shipment control",
      "Delivery support coordinated with field installation disciplines",
    ],
    checksKo: [
      "공장등록일 2023.12.21 · 자가 공장",
      "공장 부지 1,985㎡ · 제조시설 210㎡ · 부대시설 582.5㎡",
      "등록 업종: 기타 구조용 금속제품 제조업 외 28종",
    ],
    checksEn: [
      "Factory registered on 2023-12-21 · owner-occupied facility",
      "Site 1,985㎡ · manufacturing area 210㎡ · auxiliary facilities 582.5㎡",
      "Registered scope: other structural metal products and 28 additional categories",
    ],
    evidenceKo: [
      {
        title: "도면·사양 기반 제작 대응",
        text: "신축이음관·파이프 스풀·설비 보호 커버 등 도면과 사양이 지정된 품목의 제작 조건을 검토하고 공정을 계획합니다.",
      },
      {
        title: "전기·시험 품목 공급",
        text: "계전기 시험장비·부하저항기 등 전기·시험 품목의 요구 성능과 동등성 조건을 확인해 조달·납품합니다.",
      },
      {
        title: "기계·정비 자재 조달",
        text: "베어링 관련 표준시편·동력전달 체인·윤활 자재 등 정비 품목의 제작품·동등품·기성품 조건에 대응합니다.",
      },
      {
        title: "품질·인도 조건 관리",
        text: "품질등급, 구매시방서, 현장 인도, 인수검사와 하자보증 조건을 제작·조달 일정과 연계해 관리합니다.",
      },
    ],
    evidenceEn: [
      {
        title: "Drawing- and specification-based fabrication",
        text: "We review fabrication requirements and plan the workflow for specified items such as expansion joints, pipe spools, and equipment protection covers.",
      },
      {
        title: "Electrical and test equipment supply",
        text: "We verify performance and equivalency requirements for electrical and test items, including relay test equipment and load resistors, before procurement and delivery.",
      },
      {
        title: "Mechanical and maintenance materials",
        text: "We respond to made-to-order, equivalent, and off-the-shelf conditions for maintenance items such as bearing-related reference specimens, power-transmission chains, and lubricants.",
      },
      {
        title: "Quality and delivery controls",
        text: "Quality grades, purchase specifications, site delivery, acceptance inspection, and warranty conditions are coordinated with fabrication and procurement schedules.",
      },
    ],
  },
]);

export const principles = z
  .array(
    z.object({
      english: z.string().min(1),
      titleKo: z.string().min(1),
      titleEn: z.string().min(1),
      textKo: z.string().min(1),
      textEn: z.string().min(1),
    }),
  )
  .parse([
    {
      english: "SAFETY",
      titleKo: "안전을 먼저",
      titleEn: "Safety First",
      textKo: "작업 전에 위험요소와 현장 조건을 확인하고 안전 기준을 실행합니다.",
      textEn:
        "We check risks and field conditions before work and apply practical safety controls.",
    },
    {
      english: "QUALITY",
      titleKo: "품질은 기록으로",
      titleEn: "Quality by Records",
      textKo: "계획·시공·검사·인계의 기록을 연결해 결과를 확인합니다.",
      textEn: "We connect plan, execution, inspection, and handover records for traceable quality.",
    },
    {
      english: "TRUST",
      titleKo: "약속은 끝까지",
      titleEn: "Trust Through Completion",
      textKo: "공정과 변경사항을 투명하게 공유하고 맡은 범위를 책임 있게 마무리합니다.",
      textEn:
        "We communicate process and changes transparently and complete all assigned scope responsibly.",
    },
  ]);

export const history = z
  .array(
    z.object({
      year: z.string().regex(/^\d{4}$/),
      eventsKo: z.array(z.string().min(1)).min(1),
      eventsEn: z.array(z.string().min(1)).min(1),
    }),
  )
  .parse([
    {
      year: "2026",
      eventsKo: ["전문소방시설공사업 등록 완료 (8월 26일)", "ISO 9001·14001·45001 인증 갱신"],
      eventsEn: [
        "Registered as a specialized fire facility constructor (2026-08-26)",
        "ISO 9001, ISO 14001, and ISO 45001 certifications renewed",
      ],
    },
    {
      year: "2025",
      eventsKo: ["수처리용 교반기 특허결정", "발전설비 정비 분야 기술이전 계약 체결"],
      eventsEn: [
        "Patent decision finalized for industrial agitation device",
        "Technology transfer contract concluded for power-plant maintenance support",
      ],
    },
    {
      year: "2023",
      eventsKo: [
        "기계가스설비·구조물해체비계 공사업 등록",
        "ISO 9001·14001·45001 인증",
        "공장등록 완료 (12월 21일)",
      ],
      eventsEn: [
        "Registered in mechanical/gas facilities and structural demolition/scaffolding construction",
        "ISO 9001, ISO 14001, and ISO 45001 certifications obtained",
        "Registered workshop completed (2023-12-21)",
      ],
    },
    {
      year: "2022",
      eventsKo: ["주식회사 대원기술 설립 (6월 20일)", "전기공사업 기반 구축"],
      eventsEn: [
        "Established DaeWon Technology Co., Ltd. on 2022-06-20",
        "Established the electrical construction operating base",
      ],
    },
  ]);

export const capabilities = z
  .object({
    certifications: z.array(
      z.object({
        code: z.string().min(1),
        titleKo: z.string().min(1),
        titleEn: z.string().min(1),
        textKo: z.string().min(1),
        textEn: z.string().min(1),
      }),
    ),
    equipmentKo: z.array(z.string().min(1)),
    equipmentEn: z.array(z.string().min(1)),
  })
  .parse({
    certifications: [
      {
        code: "ISO 9001",
        titleKo: "품질경영시스템",
        titleEn: "Quality Management System",
        textKo: "시공 품질과 업무 절차의 일관성 관리",
        textEn: "Consistent execution of construction quality and operating procedures",
      },
      {
        code: "ISO 14001",
        titleKo: "환경경영시스템",
        titleEn: "Environmental Management System",
        textKo: "현장 환경영향과 자원 사용 관리",
        textEn: "Management of field environmental impact and resource use",
      },
      {
        code: "ISO 45001",
        titleKo: "안전보건경영시스템",
        titleEn: "Occupational Health and Safety Management",
        textKo: "위험요소 파악과 안전보건 관리",
        textEn: "Hazard identification and safety-health process control",
      },
    ],
    equipmentKo: ["케이블·배관 가공", "전기 시험·계측", "용접·절단·가공", "양중·운반", "안전·검사"],
    equipmentEn: [
      "Cable and piping preparation",
      "Electrical testing and measurement",
      "Welding, cutting, and fabrication",
      "Hoisting and transportation",
      "Safety inspection support",
    ],
  });

export const portfolio = z
  .array(
    z.object({
      categoryKo: z.string().min(1),
      categoryEn: z.string().min(1),
      titleKo: z.string().min(1),
      titleEn: z.string().min(1),
      textKo: z.string().min(1),
      textEn: z.string().min(1),
    }),
  )
  .parse([
    {
      categoryKo: "전기",
      categoryEn: "Electrical",
      titleKo: "발전설비 전기·계측 시공",
      titleEn: "Electrical and Instrumentation Installation for Power Plants",
      textKo:
        "케이블·패널·조명 설비의 설치와 정비 보조 등 발전설비 운영을 지원하는 전기공사를 수행했습니다.",
      textEn:
        "Electrical work supporting operations, including cable, panel, and lighting work for power and industrial facilities.",
    },
    {
      categoryKo: "기계",
      categoryEn: "Mechanical",
      titleKo: "기계설비·배관 개선",
      titleEn: "Mechanical Systems and Piping Support",
      textKo:
        "기계설비와 배관, 가설시설 및 리모델링 공사에서 현장 조건에 맞춘 설치 작업을 수행했습니다.",
      textEn:
        "Field-adapted installation support for mechanical systems, piping, temporary structures, and refurbishment works.",
    },
    {
      categoryKo: "비계",
      categoryEn: "Scaffolding",
      titleKo: "계획예방정비 비계 지원",
      titleEn: "Preventive-Maintenance Scaffolding Support",
      textKo: "정비 작업의 접근성과 작업 공간 확보를 위한 비계 설치·해체를 수행했습니다.",
      textEn:
        "Scaffold erection and dismantling to secure safe access and working space for maintenance tasks.",
    },
    {
      categoryKo: "소방",
      categoryEn: "Fire",
      titleKo: "화재감지·방호 설비 작업",
      titleEn: "Fire Detection and Protection Works",
      textKo:
        "자동화재탐지설비, 감지기 설치, 수신반·중계기 교체와 화재방호재 복원 관련 수행기록을 보유하고 있습니다.",
      textEn:
        "Fire alarm and protection system work, including detector deployment and panel, repeater, and protective restoration tasks.",
    },
  ]);
