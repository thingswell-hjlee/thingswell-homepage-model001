#!/usr/bin/env bash
# ============================================================
# OG 대표 이미지 교체 스크립트 (직접 파일명 방식)
#
# 새 이미지를 "원본 파일명 그대로" S3에 올리고, 배포된 index.html의
# og:image / twitter:image URL을 그 새 파일명으로 치환한 뒤 재업로드,
# 마지막으로 index.html 만 CloudFront 무효화한다.
# (파일명이 매번 달라 이미지 자체는 장기 캐시해도 안전 → SNS 캐시 우회에도 유리)
#
# 사전조건: AWS CLI 설치 + 자격증명(aws configure)
#
# 사용법:
#   bash update-og-image.sh <새이미지파일경로> [환경]
#     인자1: 새 이미지 파일 경로 (필수, jpg/png)
#     인자2: 환경 production | staging (선택, 기본 production)
# 예:
#   bash update-og-image.sh ~/og-image-20260627-001.jpg production
#   bash update-og-image.sh ./new-og.png staging
# ============================================================
set -euo pipefail

# ===== 설정 (환경에 맞게 수정) =====
REGION="ap-northeast-2"

BUCKET_PROD="thingswell-homepage"
CF_PROD="EQTMTY6FNARD8 EEWV39QWFGBHW"          # thingswell.co.kr + safegai.co.kr
DOMAINS_PROD="https://www.thingswell.co.kr https://www.safegai.co.kr"

BUCKET_STAGING="thingswell-homepage-staging"
CF_STAGING="E39F1U1NGGUK2D"
DOMAINS_STAGING="https://staging.safegai.co.kr"
# ===================================

usage() {
  cat <<USAGE
사용법: bash update-og-image.sh <새이미지파일경로> [환경]
  인자1: 새 이미지 파일 경로 (필수, .jpg/.jpeg/.png)
  인자2: 환경 production | staging (선택, 기본 production)

예:
  bash update-og-image.sh ~/og-image-20260627-001.jpg production
  bash update-og-image.sh ./new-og.png staging
USAGE
}

# ---- 인자 없으면 usage ----
if [ "$#" -lt 1 ]; then
  usage
  exit 1
fi

IMG_PATH="$1"
ENVIRONMENT="${2:-production}"

# ---- 1) 입력 검증 ----
if [ ! -f "$IMG_PATH" ]; then
  echo "❌ 파일을 찾을 수 없음: $IMG_PATH"
  exit 1
fi

EXT="$(echo "${IMG_PATH##*.}" | tr '[:upper:]' '[:lower:]')"
case "$EXT" in
  jpg|jpeg) CONTENT_TYPE="image/jpeg" ;;
  png)      CONTENT_TYPE="image/png" ;;
  *) echo "❌ 지원하지 않는 확장자: .$EXT (jpg, jpeg, png 만 가능)"; exit 1 ;;
esac

KEY="$(basename "$IMG_PATH")"   # 파일명(basename)을 그대로 S3 키로 사용

# ---- 2) 환경별 설정 선택 ----
case "$ENVIRONMENT" in
  production) BUCKET="$BUCKET_PROD";    CF_LIST="$CF_PROD";    DOMAINS="$DOMAINS_PROD" ;;
  staging)    BUCKET="$BUCKET_STAGING"; CF_LIST="$CF_STAGING"; DOMAINS="$DOMAINS_STAGING" ;;
  *) echo "❌ 알 수 없는 환경: '$ENVIRONMENT' (production | staging 만 허용)"; exit 1 ;;
esac

echo "=========================================="
echo " OG 이미지 교체 [$ENVIRONMENT]"
echo " 소스 : $IMG_PATH ($CONTENT_TYPE)"
echo " 키   : $KEY"
echo " 버킷 : s3://$BUCKET"
echo "=========================================="

# ---- 3) 새 이미지 업로드 (장기 캐시: 파일명이 매번 새 URL) ----
echo ""
echo "[1/4] 새 이미지 업로드: s3://$BUCKET/$KEY"
aws s3 cp "$IMG_PATH" "s3://$BUCKET/$KEY" \
  --region "$REGION" \
  --cache-control "public, max-age=31536000, immutable" \
  --content-type "$CONTENT_TYPE"
echo "✅ 이미지 업로드 완료"

# ---- 4) index.html 의 og:image / twitter:image URL 갱신 ----
echo ""
echo "[2/4] index.html 다운로드 → og:image/twitter:image 갱신 → 재업로드"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

aws s3 cp "s3://$BUCKET/index.html" "$TMP_DIR/index.html" --region "$REGION"

# og:image / twitter:image content URL의 "마지막 경로 세그먼트(파일명)"만 새 KEY로 치환
sed -E \
  -e "s#(property=\"og:image\" content=\"[^\"]*/)[^\"/]+\"#\1${KEY}\"#" \
  -e "s#(name=\"twitter:image\" content=\"[^\"]*/)[^\"/]+\"#\1${KEY}\"#" \
  "$TMP_DIR/index.html" > "$TMP_DIR/index.new.html"

# 치환 결과 확인 (새 KEY가 og:image 라인에 들어갔는지)
if ! grep -q "og:image\" content=\"[^\"]*/${KEY}\"" "$TMP_DIR/index.new.html"; then
  echo "❌ index.html 의 og:image URL 치환 실패 — 태그 형식 확인 필요. 중단(이미지는 업로드됨)."
  exit 1
fi

aws s3 cp "$TMP_DIR/index.new.html" "s3://$BUCKET/index.html" \
  --region "$REGION" \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html"
echo "✅ index.html 갱신·재업로드 완료"

# ---- 5) CloudFront 무효화 (/index.html 만) ----
echo ""
echo "[3/4] CloudFront 무효화 (/index.html)"
for CF in $CF_LIST; do
  echo "  - distribution: $CF"
  aws cloudfront create-invalidation --distribution-id "$CF" --paths "/index.html"
done
echo "✅ 무효화 요청 완료"

# ---- 6) 완료 안내 ----
echo ""
echo "[4/4] 완료"
echo "=========================================="
echo "✅ 새 OG 이미지 URL (도메인별):"
for D in $DOMAINS; do
  echo "   $D/$KEY"
done
echo ""
echo "ℹ️  SNS는 OG 정보를 자체 캐시합니다. 즉시 갱신하려면 디버거에서 재스크랩:"
echo "   • Facebook : https://developers.facebook.com/tools/debug/"
echo "   • Kakao    : https://developers.kakao.com/tool/debugger/sharing"
echo "=========================================="
