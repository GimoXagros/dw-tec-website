# 주식회사 대원기술 회사 홈페이지

회사 제공 자료를 바탕으로 만든 한국어·영어 정적 기업 홈페이지입니다. 전기공사, 기계가스설비공사, 구조물해체·비계공사, 전문소방시설공사를 소개합니다.

**실서비스 목표 주소: https://dw-tec.co.kr**. 배포 여부는 [최종 보고서](FINAL_REPORT.md)의 상태를 확인하세요. 주소가 설정되어 있다는 이유만으로 실제 배포 완료를 의미하지 않습니다.

## 실행과 검증

Node.js 24 LTS와 npm을 사용합니다. 재현성을 위해 `.nvmrc`와 `package-lock.json`을 함께 관리합니다.

```sh
npm ci
npx playwright install chromium
npm run dev
```

```sh
npm run format:check
npm run lint
npm run check
npm run build
npm run test:links
npm run test:privacy
npm run test:history
npm run test:smoke
npm audit
```

`npm run validate`는 포맷부터 브라우저 테스트까지 순서대로 실행합니다. Linux CI에서는 `npx playwright install --with-deps chromium`으로 브라우저 실행에 필요한 시스템 패키지를 준비합니다. 개발 중 Astro 사용 통계를 원하지 않으면 `ASTRO_TELEMETRY_DISABLED=1` 환경변수를 사용합니다. 홈페이지 방문자 추적과는 별개입니다.

## 기술 구성

- Astro 7 정적 출력, TypeScript strict, npm lockfile
- Pretendard 로컬 분할 글꼴, AVIF/WebP 이미지, 최소 브라우저 스크립트
- CSS·IntersectionObserver 기반 1회 모션, reduced-motion 및 JavaScript 비활성 지원
- 회사가 공개용으로 승인한 플랜트 비주얼과 실제 자사 사옥 사진
- Playwright + axe 접근성 검사, 내부 경로 검사, 공개 파일 안전성 검사
- GitHub Actions 품질 검사 후 GitHub Pages 배포
- 서버·데이터베이스·API 키·문의 폼·방문자 분석 도구 없음

## 폴더

| 경로                              | 내용                                     |
| --------------------------------- | ---------------------------------------- |
| `src/data/company.ts`             | 회사·연혁·4개 사업·인증·실적 데이터      |
| `src/data/organizations.ts`       | 공개 가능한 주요 발주처·협력사 데이터    |
| `src/i18n/`                       | 한·영 문구와 대응 경로                   |
| `src/pages/`                      | 페이지 구성                              |
| `src/layouts/`, `src/components/` | 공통 헤더·하단·페이지 구성               |
| `src/styles/`                     | 브랜드 색상·반응형·글꼴                  |
| `public/images/`, `public/og/`    | 공개 회사 사진·로고·공유 이미지          |
| `tests/`, `scripts/`              | 자동 검증                                |
| `docs/`                           | 담당자 편집·배포·DNS 안내                |
| `local-only/`                     | 출처 감사·DNS 백업·검증 보고서. Git 제외 |

[콘텐츠 수정 안내](docs/content-guide.md) · [배포 안내](docs/deployment.md) · [DNS와 메일 보호](docs/dns-and-mail-safety.md)

[디자인 진단](docs/design-audit.md) · [모션 시스템](docs/motion-system.md) · [개편 QA](docs/corporate-refresh-qa.md) · [이미지 출처](docs/visual-assets.md)

## 보안과 이용 조건

회사 자료·로고·사진·브랜드의 무단 사용을 금지합니다. 이 프로젝트에는 오픈소스 사용권을 부여하지 않습니다. 코드 사용도 회사의 별도 허가가 필요합니다. 의존 라이브러리와 Pretendard는 각 원저작자의 라이선스를 따릅니다. Pretendard의 SIL OFL은 `public/fonts/OFL.txt`에 포함되어 있습니다.

원본 지명원·증명서·인감·서명·계좌·직원 개인정보·비공개 계약 자료를 넣지 마세요. 자동 문자열 검사는 법률 검토나 사진의 공개 승인까지 대체하지 않습니다. 새 자료는 회사 담당자가 권리·고객 기밀·시설 보안과 공개 범위를 확인해야 합니다.

GitHub Pages에서는 임의 HTTP 응답 헤더를 직접 설정할 수 없습니다. HSTS·CSP·서버 로그 보관 정책을 자체 서버처럼 관리할 수 없다는 제약이 있습니다. 사이트는 외부 스크립트와 추적기를 사용하지 않고, 자체 메뉴 스크립트와 사실 기반 JSON-LD만 사용합니다. `local-only/`는 공개 배포물에 포함되지 않습니다.
