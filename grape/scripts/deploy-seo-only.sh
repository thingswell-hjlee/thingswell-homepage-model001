#!/usr/bin/env bash
# robots.txt + sitemap.xml 두 파일만 운영에 반영 (사이트 나머지는 미변경)
# 사전조건: npm run seo && npm run build 로 dist/ 최신화 완료
set -euo pipefail

BUCKET="thingswell-homepage"
DIST_ID="EQTMTY6FNARD8"          # thingswell.co.kr (safegai EEWV39QWFGBHW 아님!)
DIST_DIR="dist"

# 안전장치: 두 파일 존재 및 robots가 Allow인지 확인 (Disallow:/ 사고 방지)
test -f "$DIST_DIR/robots.txt" -a -f "$DIST_DIR/sitemap.xml" || { echo "ERROR: dist에 파일 없음. npm run seo && npm run build 먼저"; exit 1; }
head -3 "$DIST_DIR/robots.txt" | grep -q "Allow: /" || { echo "ERROR: robots.txt에 'Allow: /' 없음 — 배포 중단"; exit 1; }
grep -q "Disallow: /$" "$DIST_DIR/robots.txt" && { echo "ERROR: 전체 Disallow 감지 — 배포 중단"; exit 1; }
LOC=$(grep -c "<loc>" "$DIST_DIR/sitemap.xml")
echo "[check] sitemap loc=$LOC, robots Allow 확인됨"

# 업로드 (no-cache: SNS/크롤러가 항상 최신 조회)
aws s3 cp "$DIST_DIR/robots.txt"  "s3://$BUCKET/robots.txt"  --cache-control "no-cache" --content-type "text/plain; charset=utf-8"
aws s3 cp "$DIST_DIR/sitemap.xml" "s3://$BUCKET/sitemap.xml" --cache-control "no-cache" --content-type "application/xml; charset=utf-8"

# thingswell 배포만 무효화
aws cloudfront create-invalidation --distribution-id "$DIST_ID" --paths "/robots.txt" "/sitemap.xml" --no-cli-pager

echo "[done] 배포 완료. 검증:"
echo "  curl -s https://www.thingswell.co.kr/robots.txt | head -4"
echo "  curl -sI https://www.thingswell.co.kr/sitemap.xml | grep -iE 'HTTP|content-type'"
