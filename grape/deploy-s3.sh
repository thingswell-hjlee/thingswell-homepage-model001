#!/bin/bash
# ============================================
# 싱스웰 홈페이지 - S3 + CloudFront 배포 스크립트
# ============================================
#
# 사전 조건:
#   1. AWS CLI 설치: https://aws.amazon.com/cli/
#   2. AWS 자격 증명 설정: aws configure
#   3. S3 버킷 생성 완료
#   4. Node.js 18+ 설치 및 npm install 완료
#
# 환경변수 설정:
#   export CLOUDFRONT_DISTRIBUTION_ID="E1234567890ABC"
#
# 사용법:
#   chmod +x deploy-s3.sh
#   ./deploy-s3.sh
# ============================================

set -e  # 에러 발생 시 즉시 중단

# === 설정 ===
S3_BUCKET="thingswell-homepage"
REGION="ap-northeast-2"

# CloudFront Distribution ID는 환경변수에서 읽음 (보안)
# 환경변수가 없으면 빈 문자열
CF_DIST_ID="${CLOUDFRONT_DISTRIBUTION_ID:-}"

echo "=========================================="
echo " 싱스웰 홈페이지 S3 배포 시작"
echo "=========================================="
echo ""
echo " S3 Bucket : $S3_BUCKET"
echo " Region    : $REGION"
if [ -n "$CF_DIST_ID" ]; then
  echo " CloudFront: $CF_DIST_ID"
else
  echo " CloudFront: (미설정 - 캐시 무효화 스킵)"
fi
echo ""

# === 사전 확인 ===
if ! command -v aws &> /dev/null; then
  echo "❌ 오류: AWS CLI가 설치되지 않았습니다."
  echo "   설치: https://aws.amazon.com/cli/"
  exit 1
fi

if ! command -v node &> /dev/null; then
  echo "❌ 오류: Node.js가 설치되지 않았습니다."
  exit 1
fi

if [ ! -f "package.json" ]; then
  echo "❌ 오류: package.json을 찾을 수 없습니다."
  echo "   grape 디렉토리에서 실행해주세요."
  exit 1
fi

# === 1단계: 프로덕션 빌드 ===
echo "[1/4] 프로덕션 빌드 중..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ 빌드 실패 — 배포를 중단합니다."
  exit 1
fi

if [ ! -d "dist" ]; then
  echo "❌ 오류: dist 폴더가 생성되지 않았습니다."
  exit 1
fi

if [ ! -f "dist/index.html" ]; then
  echo "❌ 오류: dist/index.html이 존재하지 않습니다."
  exit 1
fi

echo "✅ 빌드 완료"
echo ""

# === 2단계: S3 업로드 (정적 에셋 - 장기 캐시) ===
echo "[2/4] S3에 업로드 중..."

aws s3 sync dist/ s3://$S3_BUCKET/ \
  --region $REGION \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "index.html" \
  --exclude "*.json"

if [ $? -ne 0 ]; then
  echo "❌ S3 에셋 업로드 실패 — 배포를 중단합니다."
  exit 1
fi

# index.html은 캐시 없이 업로드 (항상 최신 버전)
aws s3 cp dist/index.html s3://$S3_BUCKET/index.html \
  --region $REGION \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html; charset=utf-8"

if [ $? -ne 0 ]; then
  echo "❌ index.html 업로드 실패 — 배포를 중단합니다."
  exit 1
fi

echo "✅ S3 업로드 완료"
echo ""

# === 3단계: CloudFront 캐시 무효화 ===
if [ -n "$CF_DIST_ID" ]; then
  echo "[3/4] CloudFront 캐시 무효화 중..."
  aws cloudfront create-invalidation \
    --distribution-id "$CF_DIST_ID" \
    --paths "/*"

  if [ $? -ne 0 ]; then
    echo "❌ CloudFront 캐시 무효화 실패"
    echo "   Distribution ID를 확인하세요: $CF_DIST_ID"
    exit 1
  fi

  echo "✅ CloudFront 캐시 무효화 완료 (전파까지 약 5~10분 소요)"
else
  echo "[3/4] ⚠️  CloudFront Distribution ID가 설정되지 않았습니다."
  echo "   환경변수를 설정하세요:"
  echo "   export CLOUDFRONT_DISTRIBUTION_ID=\"YOUR_DISTRIBUTION_ID\""
  echo ""
  echo "   캐시 무효화를 건너뜁니다."
  echo "   S3 업로드는 완료되었으나, CDN 캐시에 이전 버전이 남아있을 수 있습니다."
fi
echo ""

# === 4단계: 완료 ===
echo "=========================================="
echo "✅ 배포 완료!"
echo "=========================================="
echo ""
echo "S3 정적 웹사이트:"
echo "  http://$S3_BUCKET.s3-website.$REGION.amazonaws.com"
echo ""
if [ -n "$CF_DIST_ID" ]; then
  echo "CloudFront를 통해 HTTPS 접속 가능합니다."
  echo ""
fi
echo "------------------------------------------"
echo "배포 후 확인할 URL (운영 도메인으로 대체하세요):"
echo "  /ko"
echo "  /ko/about/company"
echo "  /ko/about/directions"
echo "  /ko/products/safety"
echo "  /ko/cases"
echo "  /ko/customer-service/announcement"
echo "  /ko/login"
echo "  /en"
echo "  /en/about/company"
echo "------------------------------------------"
echo ""
echo "확인 항목:"
echo "  - 페이지 정상 표시"
echo "  - 새로고침 시 403/404 없음"
echo "  - 메뉴 이동 정상"
echo "  - 이미지 깨짐 없음"
echo "  - 모바일 메뉴 정상"
echo "  - HTTPS 정상"
