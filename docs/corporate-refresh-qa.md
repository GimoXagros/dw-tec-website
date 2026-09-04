# 기업형 홈페이지 개편 QA

## 2026-09-04 한·영 사이트 및 공개 콘텐츠 조정

- 기존 한국어 12개 URL을 유지하고 대응하는 영어 `/en/` 12개 URL을 추가했다.
- 헤더 Contact 오른쪽에 현재 페이지를 유지하는 KOR/ENG 메뉴를 추가했다. 키보드, Escape 포커스 복귀, 바깥 클릭, 모바일 포커스 트랩, JS 비활성 탐색을 지원한다.
- 메인 FIELD EXPERIENCE와 CONTACT 사이에 한전KPS, 수산인더스트리, 금화PSC, OES를 텍스트 타일로 표시했다. 타사 로고 사용권이 확인되지 않아 로고는 사용하지 않았다.
- 공개용 평가금액 보드·카드·데이터·설명과 전용 CSS를 제거하고 4개 등록 공사업 및 ISO 관리체계 중심으로 재구성했다.
- 정적 25페이지, 890개 내부 링크·자산, 6개 화면 폭, Playwright 14개 테스트를 확인했다. 25개 페이지 × 6개 폭의 Axe WCAG A/AA 검사와 수평 overflow 검사가 모두 통과했다.
- 새 런타임 의존성은 추가하지 않았다. `public/CNAME`, DNS, 네임서버, 메일 레코드는 변경하지 않았다.

세부 URL 및 편집 방법은 [한·영 콘텐츠 운영 안내](i18n.md)를 따른다.

검증일: 2026-09-02 (KST). 기준선 `21c9676f8f90f2df45cd16cc01ae56518931ba17`.
웹 구현 최종 후보: `61601d213b805dab475980ad06ab90edf270b13b`.
[개편 PR #1](https://github.com/GimoXagros/dw-tec-website/pull/1).
운영 배포 SHA: `4d1f192a2bc27656bd30a96da63680c817bdb9c7`.
[배포 33601522673 · attempt 2](https://github.com/GimoXagros/dw-tec-website/actions/runs/33601522673/attempts/2) 성공. 운영 검증 완료.

## 검증 범위와 결과

| 항목          | 실제 실행 결과                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| 설치          | 기존 lockfile로 npm ci 성공, 버전 변경 없음                                                            |
| 포맷          | npm run format / format:check 통과                                                                     |
| 린트          | npm run lint 통과                                                                                      |
| 타입          | npm run check: 28개 파일, 오류·경고·힌트 0                                                             |
| 빌드          | npm run build: 정적 페이지 13개 생성                                                                   |
| 내부 링크·SEO | npm run test:links: 434개 링크/자산, 고유 메타데이터·canonical·sitemap·CNAME 통과                      |
| 공개 파일     | npm run test:privacy: 121개 배포 파일에서 금지 파일/민감 문자열 없음. 이미지 권리 검수를 대체하지 않음 |
| Git 이력      | npm run test:history 통과 (배포 전 최종 검사 78개 이력 텍스트 객체)                                    |
| 통합          | npm run validate 통과, Playwright 13개 테스트 모두 성공                                                |
| 접근성        | 13개 경로 × 360/390/768/1024/1440/1920px = 78개 조합에서 Axe WCAG A/AA 위반 0                          |
| 이미지/화면   | 대체텍스트·너비·높이·실제 로딩, 가로 overflow 없음                                                     |
| 메뉴          | 키보드/클릭, 하위 메뉴, focus trap, Escape 복귀, 배경 inert·스크롤 잠금, 링크 선택 시 닫힘             |
| 모션          | 최초 진입·재초기화·스크롤 등장·최종 상태, reduced-motion, observer 부재·알림 정지 시 fail-open         |
| JS 비활성     | 13개 경로의 본문 및 사업 탐색 가능                                                                     |
| 기타          | 콘솔/page error 없음, 404·robots·사이트맵, 전화·이메일·팩스 유지                                       |
| 의존성        | npm audit --audit-level=high: 알려진 취약점 0                                                          |

정적 404.html 자체는 로컬 정적 파일로 200, 존재하지 않는 경로는 404 응답과 404 화면을 별도 검사했다. 데이터·인증서 숫자를 숨기거나 테스트 기준을 낮추지 않았다. 애니메이션 요소를 실제 스크롤해 나타낸 뒤 종료 상태에서 Axe를 수행한다.

## Lighthouse: 변경 전후

Lighthouse 13.4.1, 동일한 기본 모바일 시뮬레이션, 로컬 production preview, 같은 3개 경로. 점수 순서: Performance / Accessibility / Best Practices / SEO. 측정 조건·카테고리·스로틀링을 바꾸지 않았다.

| 페이지    | 기준선                | 최종 후보 마지막 측정 | LCP 전 → 후     | CLS 전 → 후         |
| --------- | --------------------- | --------------------- | --------------- | ------------------- |
| 메인      | 94 / 100 / 100 / 100  | 90 / 100 / 100 / 100  | 2.718s → 3.022s | 0.000164 → 0.004918 |
| 기술·인증 | 100 / 100 / 100 / 100 | 91 / 100 / 100 / 100  | 1.062s → 2.868s | 0.001134 → 0.000280 |
| 문의      | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | 1.061s → 1.060s | 0.000245 → 0.000154 |

최종 후보는 명시된 목표 P≥90/A≥95/BP≥95/SEO≥95/CLS≤0.05를 만족한다. 다만 메인·기술인증 성능은 기준선보다 4/9점 낮았으며 개선으로 표현하지 않는다. 최종 측정 TBT는 세 페이지 모두 0ms다. LCP/INP의 실제 사용자 현장값은 측정하지 않았다.

### 중간 실패와 보완

- 첫 기준선 validate는 Astro preview 자동 백그라운드 시작과 테스트 대기 방식 문제로 실패했다. 서버 준비 후 같은 명령을 재실행해 통과했다.
- 초기 변경본 Axe가 등장 전환 중의 대비를 측정했고, 이후 애니메이션 취소에 따른 대기 오류도 있었다. 콘텐츠를 실제 표시하고 진행 중 애니메이션이 끝날 때까지 기다리도록 테스트를 보완했다. 테스트·대비 기준을 삭제/완화하지 않았다.
- 첫 개편 메인 Lighthouse 성능 86점. 모션 초기화에서 요소 위치를 읽고 스타일을 쓰는 작업을 반복해 layout 재계산이 발생했다. 위치를 먼저 일괄 읽은 후 스타일을 쓰도록 개선했다.
- 개선 직후 측정은 메인 99, 기술인증 96, 문의 100점이었다. 최종 문구 제거본 재측정은 표와 같이 90/91/100점이다. 높은 점수만 선택하지 않고 마지막 후보 측정값 및 중간 결과를 함께 보관했다.

## 용량·자산·사실 보존

- 초기 실행 JS gzip: **349 → 1,465 bytes (+1,116 bytes, 약 1.09 KiB)**.
- 초기 inline JS 원문: 630 → 3,801 bytes. 새 외부 JS 파일·애니메이션 의존성 없음.
- 히어로: AVIF 800px 20,405 bytes / 1600px 61,516 bytes. high-priority preload 및 srcset 유지.
- 회사 사실 데이터 SHA-256 전후 일치: `B519084A6B29B8282913B77D5EE0F010B10BED3F8D0EA91EAD782D94F21D1A04`.
- package-lock 및 public/CNAME 변경 없음. 전화 054-783-9170 / 팩스 054-783-9171 / 이메일 dwtec@dw-tec.co.kr 유지.
- AI 히어로는 사용자 승인으로 생성했으며 화면 설명 문구는 후속 요청에 따라 제거했다. 본사·고객 현장·실적 사진으로 명명하지 않는다. 출처와 프롬프트는 [visual-assets.md](visual-assets.md).

## 화면 비교 산출물

Git 제외 `local-only/corporate-refresh/` 아래 보관한다.

- `before/local/`, `before/live/`: 11개 주요 경로 × 6개 폭, 각각 66개 전체 화면 + 모바일 메뉴.
- `after/local/`, `after/live/`: 같은 66개 전체 화면 + 모바일 메뉴, 각각 생성 완료. 운영 66개 모두 200·overflow false.
- `screenshots-*.json`: 각 화면의 경로·크기·응답·overflow 결과.
- `before/lighthouse-*.json/html`, `after/lighthouse-*.json/html`, `lighthouse-first/second-summary.json`, `bundle.json`.
- 360/1440/1920 대표 합성 및 개별 화면에서 제목/본문/금액/선/간격/한글 줄바꿈/메뉴를 육안 확인. 사업 목록·상세 하단 간격과 모바일 문장 공백 보완.

대용량 PNG와 원본 회사 자료는 저장소에 커밋하지 않는다.

## 운영·보안 범위

2026-09-02 운영 주소의 12개 페이지 × 360/1440px = 24개 조합을 검사했다. 모든 HTML SHA-256이 로컬 검증 산출물과 일치했고, Axe 위반 0·이미지 정상 표시·가로 넘침 없음·콘솔/page error 없음이었다. 요청한 화면 설명 문구가 모든 페이지에서 제거되었음을 검사했다.

모바일 메뉴·Escape 복귀·스크롤 잠금, 데스크톱 하위 메뉴, reduced-motion, JS 비활성 본문/탐색, 전화·이메일 링크, 404·robots·sitemap, TLS secure context, HTTP/www의 HTTPS 기본 주소 전환 통과. 결과는 `after/live-verification.json`, 화면은 `after/live/`에 보관한다.

첫 운영 검증 보조 도구는 Axe가 명시적 browser context를 요구해 중단됐다. 도구의 context 생성만 수정한 뒤 동일한 기준으로 재검사해 통과했다. 사이트 코드나 접근성 기준을 바꾸지 않았다.

첫 배포 시도는 검사용 폰트 다운로드 정체로 약 10분 후 게시 전에 취소했다. 동일 SHA·설정·검사로 재시도한 attempt 2에서 build 2분 11초, deploy 40초로 완료했다. PR 검증과 배포의 validate·audit 모두 통과했다.

검증한 dist 121개 파일의 상대 경로/개별 SHA-256을 정렬·결합한 매니페스트 SHA-256: `9d90d7798be49a5d46b21019ed93a9b72dd85b551a94776ec1cb61fa15862508`. 보고서 전용 변경 후에도 사이트 산출물이 같은지 비교하는 기준이다.

DNS write: **NONE**. Mail record write: **NONE**.
네임서버·WHOIS·메일 관리자 설정 및 CNAME을 변경하지 않았다. 외부 추적·서버 폼·새 API 키 없음.

NOT VERIFIED: 물리적 iOS/Android 기기, Safari/Firefox 수동 검사, 실제 사용자 LCP/INP 현장 데이터, 화면낭독기 수동 종합검사, 실제 메일 송수신, 침투·부하·DDoS 시험, 법률상 무위험 인증. Chromium 자동검사는 이를 대신하지 않는다.
