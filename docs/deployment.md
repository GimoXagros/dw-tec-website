# GitHub Pages 배포와 복구

## 구성

- 소유자: `GimoXagros`
- 저장소: `dw-tec-website`
- 기본 브랜치: `main`
- 기준 주소: `https://dw-tec.co.kr`
- 산출물: `dist/`
- Node: `.nvmrc`의 LTS 버전

`Quality checks`는 push와 pull request를 검사합니다. `Deploy GitHub Pages`는 main push 또는 수동 실행으로 포맷·린트·타입·빌드·경로·공개 안전성·브라우저 테스트와 audit가 통과한 파일만 Pages artifact로 업로드합니다. 배포 작업만 `pages:write`, `id-token:write` 권한을 가집니다. 동시 배포는 직렬화합니다.

2026-09-02 공식 저장소 기준 checkout/setup-node v7, upload-pages-artifact/deploy-pages v5를 사용했습니다. [Astro 배포 문서](https://docs.astro.build/en/guides/deploy/github/)와 [GitHub custom domain 문서](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)를 변경 전에 다시 확인하세요.

## 최초 배포 순서

아래는 최초 연결 시 참고 절차다. 현재 사용 중인 도메인·HTTPS는 유지하며, 이번 기업형 디자인 개편에서는 기존 Actions로만 재배포한다. DNS·네임서버·메일 설정은 수정하지 않는다. 최신 작업 범위와 검증 결과는 `corporate-refresh-qa.md`와 `FINAL_REPORT.md`에서 확인한다.

1. `gh auth status`, `gh api user --jq .login`으로 소유자가 GimoXagros인지 확인합니다. 비밀번호·토큰은 문서나 대화에 입력하지 않습니다.
2. 같은 이름의 저장소를 확인합니다. 다른 프로젝트라면 덮어쓰지 않습니다. 공개 파일 검토 후 저장소를 만들고 main을 push합니다.
3. Settings → Pages → Build and deployment → Source를 GitHub Actions로 설정합니다.
4. Actions의 빌드·artifact 생성을 확인합니다. Pages custom domain에 `dw-tec.co.kr`를 등록합니다. 계정 도메인 검증 TXT가 발급되면 정확히 기록하고 보존합니다.
5. **DNS 관리자의 전체 zone/TTL 백업 후에만** 웹 레코드를 변경합니다. [메일 보호 안내](dns-and-mail-safety.md)를 따릅니다.
6. DNS와 인증서가 확인되면 Enforce HTTPS를 활성화합니다.
7. HTTP→HTTPS, www→apex, 모든 경로·이미지·canonical과 메일 레코드 전후 동일성을 검증합니다.
8. 확인된 커밋에 `v1.0.0` 태그와 GitHub Release를 발행합니다. 배포가 검증되지 않은 상태에서 완료 릴리스를 만들지 않습니다.

`public/CNAME`은 설정 가시성을 위한 파일입니다. custom Actions 배포에서는 이 파일만으로 도메인이 등록되지 않으며 저장소의 Pages custom domain 설정이 기준입니다. `astro.config.mjs`에는 저장소용 `base`를 넣지 않습니다. 따라서 도메인 연결 전 기본 프로젝트 URL에서는 루트 자산 경로가 작동하지 않을 수 있습니다.

## 검증

```sh
gh run list --workflow deploy.yml
gh api repos/GimoXagros/dw-tec-website/pages
curl -I http://dw-tec.co.kr
curl -I https://dw-tec.co.kr
curl -I http://www.dw-tec.co.kr
curl -I https://www.dw-tec.co.kr
```

실서비스 모바일 Lighthouse도 실행합니다. 로컬 점수는 실서비스 점수로 대체할 수 없습니다. 인증서 발급·DNS 전파 중에는 기다린 뒤 다시 확인하고 성공을 추정하지 않습니다.

## 수정·롤백

정상 커밋을 기준으로 새 수정 커밋을 main에 push하면 자동 배포됩니다. 장애 시 잘못된 변경을 `git revert`로 되돌려 새 커밋을 배포하고 Actions 성공을 확인합니다. force push와 이력 삭제를 사용하지 않습니다.

DNS 복구가 필요하면 비공개 백업의 이전 A·AAAA·www CNAME만 복원합니다. MX·SPF·DKIM·DMARC·기타 메일 레코드는 건드리지 않습니다. 최초 연결 시 이전 웹 레코드가 없었으면 추가한 웹 레코드만 되돌리며, 도메인을 미확인 Pages 대상으로 방치하지 않도록 Pages 설정과 함께 검토합니다.

Google Search Console과 Naver Search Advisor 등록은 소유자 계정으로 진행하고 발급된 정확한 검증 값을 추가합니다. 현재는 임의 검증 토큰이나 분석 코드를 넣지 않았습니다.
