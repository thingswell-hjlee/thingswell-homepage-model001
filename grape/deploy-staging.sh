#!/usr/bin/env bash
# ============================================================
# SafeGAI 홈페이지 - STAGING 배포 스크립트 (S3 + CloudFront)
# 사전조건: AWS CLI 설치 + 자격증명(aws configure)
# 사용법:  cd grape && bash deploy-staging.sh
# ============================================================
set -euo pipefail

# ===== 배포 설정 (환경에 맞게 수정) =====
BUILD_CMD="npm run build:staging"
S3_BUCKET="thingswell-homepage-staging"
CLOUDFRONT_DISTRIBUTION_ID="E39F1U1NGGUK2D"
REGION="ap-northeast-2"
EXPECTED_DOMAIN="staging.safegai.co.kr"
# ========================================

# 스크립트 위치(grape) 기준으로 실행
cd "$(dirname "$0")"

echo "=========================================="
echo " STAGING 배포 시작 ($EXPECTED_DOMAIN)"
echo "=========================================="

echo ""
echo "[1/4] 빌드: $BUILD_CMD"
$BUILD_CMD

echo ""
echo "[2/4] 도메인 검증: dist/index.html 에 '$EXPECTED_DOMAIN' 존재 확인"
if ! grep -q "$EXPECTED_DOMAIN" dist/index.html; then
  echo "❌ dist/index.html 에서 '$EXPECTED_DOMAIN' 를 찾지 못함 — 빌드 모드/환경변수(.env.staging) 확인. 중단."
  exit 1
fi
echo "✅ '$EXPECTED_DOMAIN' 확인됨"

echo ""
echo "[3/4] S3 업로드: s3://$S3_BUCKET"
# 정적 자산: 장기 캐시 (index.html / json 제외)
aws s3 sync dist/ "s3://$S3_BUCKET/" \
  --region "$REGION" --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "index.html" --exclude "*.json"
# index.html: 항상 최신
aws s3 cp dist/index.html "s3://$S3_BUCKET/index.html" \
  --region "$REGION" \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html"
# json: 항상 최신 (있을 경우)
aws s3 sync dist/ "s3://$S3_BUCKET/" \
  --region "$REGION" \
  --exclude "*" --include "*.json" \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "application/json"

echo ""
echo "[4/4] CloudFront 캐시 무효화: $CLOUDFRONT_DISTRIBUTION_ID"
aws cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" --paths "/*"

echo ""
echo "=========================================="
echo "✅ STAGING 배포 완료: https://$EXPECTED_DOMAIN"
echo "=========================================="
