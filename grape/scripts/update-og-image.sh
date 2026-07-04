#!/usr/bin/env bash
# ============================================================
# OG 대표 이미지 교체 스크립트 (CloudShell 독립 실행용) v2
#
# 사용법:
#   bash update-og-image.sh <새이미지파일경로> [production|staging]
#   환경 생략 시 staging (안전을 위해 기본 staging)
# ============================================================

set -euo pipefail

# ---------- 환경별 설정 ----------
REGION="ap-northeast-2"
BUCKET_PROD="thingswell-homepage"
CF_PROD="EQTMTY6FNARD8 EEWV39QWFGBHW"
DOMAINS_PROD="https://www.thingswell.co.kr https://www.safegai.co.kr"
BUCKET_STAGING="thingswell-homepage-staging"
CF_STAGING="E39F1U1NGGUK2D"
DOMAINS_STAGING="https://staging.safegai.co.kr"
# ---------------------------------

usage() {
  cat <<EOF
사용법: bash $0 <새이미지파일경로> [production|staging]
  환경 생략 시 staging (안전 기본값)

예:
  bash $0 ~/og-image-20260627-001.jpg staging
  bash $0 ~/og-image-20260627-001.jpg production
EOF
  exit 1
}

[ $# -lt 1 ] && usage

IMG_PATH="$1"
ENV="${2:-staging}"

if [ ! -f "$IMG_PATH" ]; then
  echo "❌ 파일을 찾을 수 없습니다: $IMG_PATH"
  exit 1
fi

IMG_NAME="$(basename "$IMG_PATH")"

case "${IMG_NAME,,}" in
  *.jpg|*.jpeg) CONTENT_TYPE="image/jpeg" ;;
  *.png)        CONTENT_TYPE="image/png" ;;
  *) echo "❌ jpg/jpeg/png 만 지원합니다: $IMG_NAME"; exit 1 ;;
esac

case "$ENV" in
  production|prod)
    BUCKET="$BUCKET_PROD"; CF_IDS="$CF_PROD"; DOMAINS="$DOMAINS_PROD"; ENV="production" ;;
  staging|stage)
    BUCKET="$BUCKET_STAGING"; CF_IDS="$CF_STAGING"; DOMAINS="$DOMAINS_STAGING"; ENV="staging" ;;
  *) echo "❌ 환경은 production 또는 staging 이어야 합니다: $ENV"; usage ;;
esac

echo "============================================"
echo " 환경       : $ENV"
echo " 버킷       : $BUCKET"
echo " 새 이미지  : $IMG_NAME ($CONTENT_TYPE)"
echo " CloudFront : $CF_IDS"
echo "============================================"

echo "▶ 1/3 이미지 업로드..."
aws s3 cp "$IMG_PATH" "s3://${BUCKET}/${IMG_NAME}" \
  --region "$REGION" \
  --cache-control "public, max-age=31536000, immutable" \
  --content-type "$CONTENT_TYPE" \
  --no-cli-pager
echo "  ✅ 업로드 완료: s3://${BUCKET}/${IMG_NAME}"

echo "▶ 2/3 index.html OG 태그 갱신..."
TMP_HTML="$(mktemp)"
aws s3 cp "s3://${BUCKET}/index.html" "$TMP_HTML" --region "$REGION" --no-cli-pager >/dev/null

OLD_NAME="$(grep -oE 'og:image"[[:space:]]+content="[^"]+"' "$TMP_HTML" \
  | head -1 \
  | grep -oE '[^/"]+\.(jpg|jpeg|png)' \
  | head -1 || true)"

if [ -z "$OLD_NAME" ]; then
  echo "  ⚠️  index.html에서 기존 og:image 파일명을 찾지 못했습니다. 중단합니다."
  rm -f "$TMP_HTML"
  exit 1
fi

echo "  기존 파일명: $OLD_NAME → 새 파일명: $IMG_NAME"

if [ "$OLD_NAME" = "$IMG_NAME" ]; then
  echo "  ℹ️  기존과 새 파일명이 동일합니다. 치환 생략, 무효화만 진행."
else
  sed -i "s|/${OLD_NAME}\"|/${IMG_NAME}\"|g" "$TMP_HTML"

  NEW_COUNT="$(grep -c "/${IMG_NAME}\"" "$TMP_HTML" || true)"
  OLD_LEFT="$(grep -c "/${OLD_NAME}\"" "$TMP_HTML" || true)"

  if [ "$NEW_COUNT" -ge 1 ] && [ "$OLD_LEFT" -eq 0 ]; then
    aws s3 cp "$TMP_HTML" "s3://${BUCKET}/index.html" \
      --region "$REGION" \
      --cache-control "no-cache, no-store, must-revalidate" \
      --content-type "text/html" \
      --no-cli-pager
    echo "  ✅ index.html 갱신 완료 (${NEW_COUNT}건 치환)"
  else
    echo "  ❌ 치환 검증 실패 (새:${NEW_COUNT}, 남은 기존:${OLD_LEFT}). 중단."
    rm -f "$TMP_HTML"
    exit 1
  fi
fi
rm -f "$TMP_HTML"

echo "▶ 3/3 CloudFront 무효화 (/index.html)..."
for CF in $CF_IDS; do
  INV_ID="$(aws cloudfront create-invalidation \
    --distribution-id "$CF" \
    --paths "/index.html" \
    --query "Invalidation.Id" --output text --no-cli-pager)"
  echo "  ✅ $CF → 무효화 $INV_ID"
done

echo "============================================"
echo " ✅ 완료!"
echo "============================================"
echo " 새 이미지 URL:"
for D in $DOMAINS; do
  echo "   $D/${IMG_NAME}"
done
echo ""
echo " ⚠️  SNS 미리보기 강제 갱신:"
echo "   • 페이스북: https://developers.facebook.com/tools/debug/"
echo "   • 카카오  : https://developers.kakao.com/tool/debugger/sharing"
echo "============================================"
