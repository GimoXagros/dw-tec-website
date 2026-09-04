# DW-TEC 기업형 홈페이지 개편 최종 보고서

## 2026-09-04 한·영 사이트 및 공개 콘텐츠 조정 — 운영 배포 완료

- 기준선: `f3714ec5bd91c3a10dd23217de5a3974f5fc28f4`
- 한·영 사이트 구현 커밋: `23782b8e29139fa1bccf7f116101b17d66b578b5`
- PR #3 병합: `baa10403f52a7fb0b1b3fd03dde34012bdf1ad72`
- 모바일 언어 전환 보완 커밋: `1ec560de188ffc77a42f0906d0928848f192c45e`
- 최종 웹 구현·운영 배포 SHA: `a3ad23470f1e673b6c8a850bb61bae3a99047d3c`
- PR: [#3 한·영 사이트 전환 및 주요 발주처·협력사 섹션 추가](https://github.com/GimoXagros/dw-tec-website/pull/3), [#4 모바일 언어 전환 동작 보완](https://github.com/GimoXagros/dw-tec-website/pull/4)
- Pages 배포: [33839175510 · attempt 2 성공](https://github.com/GimoXagros/dw-tec-website/actions/runs/33839175510/attempts/2)
- main 품질 검사: [33839175470 성공](https://github.com/GimoXagros/dw-tec-website/actions/runs/33839175470)

### 구현 결과

기존 한국어 URL 12개를 유지하면서 동일 경로의 영어 `/en/` 페이지 12개를 추가했다. 공통 페이지 컴포넌트와 한·영 데이터 구조를 사용해 본문, 메뉴, breadcrumb, 버튼, 대체 텍스트, 접근성 이름, title·description, Open Graph를 모두 번역했다. 헤더 Contact 오른쪽의 KOR/ENG 메뉴는 현재 페이지의 대응 경로와 query를 유지한다. 모바일에서는 메뉴 안의 독립 언어 영역으로 제공하며 일반 링크 기반의 JS 비활성 fallback을 유지한다.

공개 홈페이지의 공종별 평가금액 보드·카드·데이터·설명과 전용 CSS를 제거했다. 메인은 4개 등록 공사업과 ISO 3개 시스템, 기술·인증 페이지는 등록 분야별 수행 역량과 품질·환경·안전보건 관리 중심으로 재구성했다. 현재 `src`, `public`, `docs`, `dist`, README와 이 보고서에서 제거 대상 문구·네 금액·데이터 필드 검색 결과는 0건이다.

메인 FIELD EXPERIENCE 뒤, CONTACT 앞에 주요 발주처·협력사 섹션을 추가했다. 사용자 승인 지명원 목록을 기준으로 발주처는 한전KPS, 협력사는 수산인더스트리·금화PSC·OES로 분류했다. 타사 로고의 홈페이지 공개 사용권을 입증하는 원본이 없어 상호명 텍스트 타일을 사용했으며 다른 회사 사이트나 참고 영상의 로고·회사를 사용하지 않았다.

### 검증과 운영 확인

- Prettier, ESLint, Astro 타입 검사와 정적 빌드 통과. 타입 오류·경고·힌트 0.
- 정적 25페이지, 내부 링크·자산 965개, 고유 메타데이터, sitemap과 `public/CNAME` 검사 통과.
- 공개 파일·민감 문자열·Git 이력 검사 통과.
- Playwright 14개 테스트 통과. 25개 페이지 × 360/390/768/1024/1440/1920px에서 Axe WCAG A/AA 위반 0, 가로 넘침 없음, 이미지와 내부 링크 정상.
- ko/en 자기 canonical과 대응 `hreflang` ko/en/x-default, 언어 전환, 키보드·Escape·바깥 클릭, 모바일 focus trap, reduced-motion, JS 비활성 탐색을 확인.
- 운영의 한국어·영어 홈, 기술·인증, 문의 페이지가 200이고 `lang`·제거 문구·연락처·파트너 목록이 정상임을 확인.
- 운영 모바일에서 `/business/electrical/` → `/en/business/electrical/` 클릭 전환과 가로 넘침 없음 확인.
- `npm audit --audit-level=high`는 PR 및 main 품질 검사에서 성공. Pages 첫 시도는 npm 보안 서버 네트워크 타임아웃으로 게시 전 실패했고, 동일 설정의 attempt 2에서 성공했다.

이번 작업에서 새 dependency는 추가하지 않았다. 최종 초기 실행 JavaScript는 raw 4,132 bytes, gzip 1,570 bytes다. Lighthouse는 이번 콘텐츠·i18n 조정에서 재측정하지 않았으며, 브라우저 회귀·Axe·레이아웃 검사를 수행했다. 이전 개편의 Lighthouse 결과는 아래 기록을 유지한다.

### 운영 주소와 변경하지 않은 설정

- 한국어: [홈](https://dw-tec.co.kr/), [기술·인증](https://dw-tec.co.kr/company/capabilities/), [문의](https://dw-tec.co.kr/contact/)
- 영어: [Home](https://dw-tec.co.kr/en/), [Capabilities](https://dw-tec.co.kr/en/company/capabilities/), [Contact](https://dw-tec.co.kr/en/contact/)
- DNS changes: **NONE**
- Name server changes: **NONE**
- Mail record changes: **NONE**
- 전화 `054-783-9170`, 팩스 `054-783-9171`, 이메일 `dwtec@dw-tec.co.kr`, `public/CNAME` 유지

사람이 추가 확인할 항목은 타사 공식 영문 상호 표기와 로고의 웹 공개 사용권, 물리적 iOS/Android·Safari/Firefox·화면낭독기 수동 검사, 실제 사용자 성능 지표, 메일 송수신 및 침투·부하 시험이다.

롤백 기준 SHA는 `f3714ec5bd91c3a10dd23217de5a3974f5fc28f4`다. 신규 복구 브랜치에서 `git revert -m 1 a3ad23470f1e673b6c8a850bb61bae3a99047d3c` 후 `git revert -m 1 baa10403f52a7fb0b1b3fd03dde34012bdf1ad72`를 실행하고 검증·PR·정상 병합·Pages 배포 순으로 복구한다. 이력 재작성, force push, DNS·메일 변경은 하지 않는다.

## 상태 및 버전

- 현재 단계: **DEPLOYED — 운영 배포 및 실제 주소 검증 완료**
- 기준선 SHA: `21c9676f8f90f2df45cd16cc01ae56518931ba17`
- 검증한 웹 구현 SHA: `61601d213b805dab475980ad06ab90edf270b13b`
- 검증한 운영 배포 SHA: `4d1f192a2bc27656bd30a96da63680c817bdb9c7` (PR #1 병합)
- 브랜치: `codex/corporate-motion-refresh`
- PR: [#1 기업형 디자인·이미지·모션 개편](https://github.com/GimoXagros/dw-tec-website/pull/1)
- 배포 Actions: [33601522673 · attempt 2 성공](https://github.com/GimoXagros/dw-tec-website/actions/runs/33601522673/attempts/2), 2026-09-02 16:15 KST 완료.
- 이 보고서는 위 웹 배포를 검증한 기록이다. 이후 보고서만 변경하는 커밋은 웹 구현 변경과 구분하며, 웹 배포 산출물의 동일성을 별도로 확인한다.
- 운영 주소: [https://dw-tec.co.kr/](https://dw-tec.co.kr/)
- 이번 문서는 기존 보고서의 미완료 DNS 연결 설명을 대체한다. 이번 작업은 기존 도메인·HTTPS·GitHub Pages를 유지한 콘텐츠/디자인 재배포다.

## 디자인 전후와 변경 범위

지명원의 표·카드 반복 위주 화면에서, 첫 메시지 → 4개 전문 사업 → 회사 소개 → 수행 역량 → 실적 분야 → 문의로 이어지는 기업형 흐름으로 변경했다. 밝은 공통 헤더, 네이비·블루, 자체 호스팅 Pretendard, 사각형 구성과 규칙적인 간격을 전 페이지에 적용했다.

| 영역           | 적용 내용·효과                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------ |
| 메인           | 단일 대형 산업 플랜트 콘셉트, 핵심 메시지/문의, 4공종 바로가기, 회사 수치, 넓은 사업 패널, 시공능력·ISO, 실적·문의 |
| 공통 메뉴      | 회사/사업 하위 메뉴, 현재 위치 표시, 전체 모바일 메뉴, 키보드·Escape·포커스 관리                                   |
| 회사 소개      | 기본 정보와 실제 본사 사진, CEO 메시지·경영 원칙 구분                                                              |
| 연혁           | 수직 연혁과 연도별 읽기 순서                                                                                       |
| 기술·인증      | 4개 면허 분야·공종별 평가액·ISO 3종 분리                                                                           |
| 사업 목록·상세 | 4공종 동등한 분류, 수행 범위·작업 기준·관련 사업·문의 흐름                                                         |
| 수행실적       | 확인된 수행 유형 중심, 공개 미승인 프로젝트/사진 추가 없음                                                         |
| 문의·하단      | 전화·이메일·팩스·주소·지도 연결, 회사/사업 하단 탐색                                                               |
| 개인정보·404   | 정보 우선, 별도 본문 등장 모션 없음                                                                                |

주요 파일: `src/components/`, `src/layouts/BaseLayout.astro`, `src/pages/`, `src/styles/`, `src/scripts/`, `tests/site.spec.ts`, 이미지 2개 및 문서.

## 모션·성능

새 외부 의존성 없이 CSS와 IntersectionObserver로 1회 등장, 짧은 hover/focus, 헤더 축소, 메뉴 진입을 구현했다. reduced-motion·JavaScript 비활성·observer 실패 시에도 정보 접근이 가능하다. 위치를 일괄 읽도록 초기화 비용을 줄였고, 숫자는 처음부터 최종값을 표시한다. 페이지 전환 라이브러리는 추가하지 않았다.

최종 후보 로컬 Lighthouse 모바일: 메인 **90/100/100/100**, 기술·인증 **91/100/100/100**, 문의 **100/100/100/100**. 순서는 성능/접근성/권장사항/SEO. 기준선은 각각 94/100/100/100, 100/100/100/100, 100/100/100/100이다. 최종 CLS는 0.004918 / 0.000280 / 0.000154다. 목표는 통과했지만 일부 기준선 성능보다 낮고 측정 변동이 있다. 실제 사용자 지표로 표현하지 않는다.

초기 실행 JS gzip **349 → 1,465 bytes (+1,116 bytes)**. 새 라이브러리·버전 변경 없음. 자세한 중간 결과와 LCP 비교는 [개편 QA](docs/corporate-refresh-qa.md)에 기록했다.

## 검증

`npm ci`, `npm run format`, `format:check`, `lint`, `check`, `build`, `test:links`, `test:privacy`, `test:history`, `test:smoke`, `validate`, `npm audit --audit-level=high` 실행·통과. 타입 오류/경고/힌트 0, 정적 13페이지와 434개 경로/자산 검사, 13개 브라우저 테스트 성공. 6가지 폭에서 78개 페이지/화면 조합의 Axe 위반 0·가로 넘침 없음.

변경 전후 전체 화면은 Git 제외 `local-only/corporate-refresh/{before,after}/{local,live}/`에 보관한다. 각 묶음은 11개 주요 경로 × 6개 폭의 66개 화면 및 모바일 메뉴다. 최종 운영 화면 66개 모두 200 응답·가로 넘침 없음.

운영 주소의 12개 페이지를 360/1440px에서 검사한 24개 조합 모두 로컬 검증 HTML과 SHA-256 일치, Axe 위반 0, 이미지 정상 표시, 콘솔/page 오류 없음. 모바일 메뉴·Escape·스크롤 잠금, 데스크톱 하위 메뉴, reduced-motion, JS 비활성, 연락처 링크, 404·robots·sitemap을 확인했다. HTTPS 연결 및 http/www → https://dw-tec.co.kr/ 전환도 통과했다. 사용자가 삭제 요청한 화면 문구는 모든 페이지에서 검출되지 않았다. 세부 증거는 `local-only/corporate-refresh/after/live-verification.json`에 보관한다.

첫 배포 시도는 검사용 폰트 다운로드가 약 10분 정체되어 게시 전 중단했다. 동일 SHA·동일 검사·동일 설정으로 새 실행 환경에서 재시도해 모든 검사와 배포를 통과했다. 검사 생략이나 설정 완화는 없었다.

## 사진·권리와 사실

사용자 제공 회사 데이터·로고·실제 사옥 사진을 보존했다. 회사 데이터와 CNAME·lockfile 변경 없음. 공개 미승인 원전 내부 사진이나 인증서/직원 개인정보를 추가하지 않았다.

사용자 허용에 따라 내장 이미지 생성 도구로 산업 플랜트 콘셉트 1장을 제작했다. 사용자의 후속 요청으로 화면 설명 문구는 제거했으며, 실제 본사·시공 실적이라고 주장하지 않는다. 생성 원본과 출처를 보관한다. 타사 참고 사이트의 사진·코드·문구를 복사하지 않았다. [이미지 파일·프롬프트·출처](docs/visual-assets.md).

## 변경하지 않은 설정 / 수행하지 않은 검사

- DNS write: **NONE**
- mail record write: **NONE**
- 전화 054-783-9170 / 팩스 054-783-9171 / 이메일 dwtec@dw-tec.co.kr 유지
- 기존 GitHub Pages·도메인·HTTPS 운영 방식 유지
- 실제 메일 송수신 시험: **NOT VERIFIED**
- 물리적 모바일 기기, Safari/Firefox, 화면낭독기 수동 종합검사, 실제 사용자 INP/LCP, 침투·DDoS·법적 무위험 인증: **NOT VERIFIED**

## 추가 콘텐츠 및 롤백

추가 실제 작업사진은 촬영자 권리와 현장 인터넷 공개 승인 범위가 확인된 자료만 반영할 수 있다. [필요 자료](docs/content-needed.md). 현재 사이트 완성의 필수 선행조건은 아니다.

롤백 목표 SHA: `21c9676f8f90f2df45cd16cc01ae56518931ba17`.
신규 복구 브랜치에서 `git revert -m 1 4d1f192a2bc27656bd30a96da63680c817bdb9c7`를 실행하고 검증·PR·정상 병합·기존 Pages Actions 배포 순으로 복구한다. 이후 보고서 전용 커밋은 사이트 원복에 영향을 주지 않는다. 이력 재작성·force push·DNS/메일 변경을 하지 않는다.

[디자인 진단](docs/design-audit.md) · [모션 규칙](docs/motion-system.md) · [개편 QA](docs/corporate-refresh-qa.md) · [배포 안내](docs/deployment.md)
