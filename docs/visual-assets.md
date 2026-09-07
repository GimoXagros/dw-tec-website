# 이미지 출처와 적용 범위

## AI 플랜트 콘셉트

사용자가 2026-09-02 대화에서 AI 이미지의 적극 활용을 허용한 뒤, 내장 image generation 도구로 신규 생성했다. 참고 회사의 사진·화면은 생성 입력으로 사용하지 않았다. 특정 실제 원전이나 고객 현장을 재현한 사진이 아니며, 대표 화면에만 사용한다. 수행실적과 실제 작업사진을 대체하지 않는다.

- 공개 파일: `public/images/plant-concept-800.avif`, `public/images/plant-concept-1600.avif`
- 원본 보관: Git 제외 `local-only/corporate-refresh/ai/plant-concept-original.png` (생성 출처 메타데이터가 포함된 원본 유지)
- 원본 SHA-256: `7051BF7D02B18B3641ED2F9FFEE3A837F36F264C214554C34BD1F743392A81C2`
- 웹용 변환: 800×450 / 1600×900 AVIF, 각각 20,405 / 61,516 bytes. 구도 내용 변경 없이 리사이즈·압축.
- 화면의 설명 문구는 사용자의 후속 요청에 따라 제거했다. 대체텍스트는 "기업 소개용 산업 플랜트 전경 이미지"이며, 실적·본사·특정 시설이라고 설명하지 않는다. 생성 출처는 이 문서와 비공개 보관 원본에 유지한다.
- 육안 검수: 인물·회사 로고·시설명·도면·제어실·명판 없음. 법적 무위험 보증이나 독점 저작권 보유를 뜻하지 않는다.

### 최종 생성 프롬프트

```text
Use case: ads-marketing.
Asset type: a single wide 16:9 photographic-concept hero background for the Korean industrial plant construction company DW-TEC. This is a fictional brand mood image, never a real project record.
Primary request: create an original, photorealistic, premium industrial plant exterior conveying engineering precision, electrical and mechanical installation, and dependable construction.
Scene: a fictional modern power-and-industrial utilities complex in a broad open landscape, large clean steel-clad utility halls, a few well-organized silver pipe racks and platforms, restrained electrical infrastructure. Low hills in the distance. No identifiable real site.
Composition: very wide landscape; camera at a moderately elevated architectural viewpoint, level horizon; primary industrial structures in the right 60 percent and lower half, the left 40 percent relatively calm/dark with clean blue sky above so white Korean web text can be overlaid in HTML. The photograph fills the frame, no borders, no embedded website layout.
Lighting: refined early blue-hour light with subtle warm facility lighting, realistic surfaces, crisp but natural detail. Deep navy and steel blue, not neon or science fiction.
Constraints: no people, no corporate logos, no letters, no labels, no watermarks, no identifiable security infrastructure, no blueprints or control-room details. No real nuclear facility replica, no cooling-tower smoke, no dystopian pollution, no exaggerated towers, no fantastical architecture. Make it plausible industrial architectural photography, NOT a claim of an actual DW-TEC facility. Output one high-resolution landscape image.
```

## 기존 자사 자료와 그래픽

회사 로고·사옥·본사 주변 녹지 사진 및 기존 소셜 공유 이미지를 유지했다. 메인 회사소개 영역에는 사용자가 제공한 확대 사옥 전경 `public/images/company-exterior.webp`를 적용했다. 자사 사진의 기존 상세 출처 검토 기록은 공개하지 않는 `local-only/source-audit.md`에 있다. 승인 범위가 확인되지 않은 원전 내부/현장 사진·개인정보·계약 증빙은 새로 게시하지 않았다.

5개 사업 아이콘은 이 개편에서 직접 작성한 단순 기능성 선형 SVG다. 실제 장비·계통도·고객사 표장으로 사용하지 않는다. 참고 사이트의 코드·사진·카피는 복사하지 않았다.

## 주요 발주처·협력사 로고

2026-09-07 사용자 확인 목록에 따라 대원종합이엔지, 퍼스트키퍼스, 유림기술을 제외한 13개 업체의 로고와 공식 홈페이지 주소를 적용한다. 각 로고는 회사 식별 및 해당 홈페이지 연결 목적으로만 사용하며, 한국수력원자력 로고는 사용자가 직접 제공한 PNG를 사용한다.

- 공개 파일: `public/images/partners/`
- 회사명·표시순서·링크·파일 연결: `src/data/organizations.ts`
- 로고는 형태·색상을 재디자인하지 않고 비율을 유지한다. 흰색 문자가 포함된 로고는 원본 식별성을 위해 네이비 배경 위에 표시한다.
- 모든 링크는 새 창으로 열리며 `noopener noreferrer`를 적용한다.
- OES·비케이비전·리얼게인의 제공 주소는 HTTP만 사용한다. 로고 이미지는 사이트 내부에 저장해 혼합 콘텐츠를 방지하지만 외부 이동 후 연결 보안은 해당 업체 홈페이지 운영 범위다.
