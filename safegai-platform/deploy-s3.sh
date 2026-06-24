#!/bin/bash
# ============================================
# SafeGAI Platform - S3 + CloudFront 배포 스크립트
# ============================================
#
# 사전 조건:
# 1. AWS CLI 설치: https://aws.amazon.com/cli/
# 2. AWS 자격 증명 설정: aws configure
# 3. S3 버킷 생성 완료
# 4. Node.js 18+ 설치
#
# 사용법:
#   chmod +x deploy-s3.sh
#   ./deploy-s3.sh
# ============================================

# === 설정 (본인 환경에 맞게 수정) ===
S3_BUCKET="safegai-platform"                # S3 버킷 이름
REGION="ap-northeast-2"                     # 서울 리전
CLOUDFRONT_DISTRIBUTION_ID=""               # CloudFront 배포 ID (생성 후 입력)

echo "=========================================="
echo "SafeGAI Platform S3 배포 시작"
echo "=========================================="

# 0. 의존성 확인
if ! command -v aws &> /dev/null; then
  echo "❌ AWS CLI가 설치되지 않았습니다."
  echo "   설치: https://aws.amazon.com/cli/"
  exit 1
fi

if ! command -v node &> /dev/null; then
  echo "❌ Node.js가 설치되지 않았습니다."
  exit 1
fi

# 1. 의존성 설치
echo ""
echo "[1/5] 의존성 설치 중..."
npm install
if [ $? -ne 0 ]; then
  echo "❌ 의존성 설치 실패"
  exit 1
fi
echo "✅ 의존성 설치 완료"

# 2. 프로덕션 빌드
echo ""
echo "[2/5] 프로덕션 빌드 중..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ 빌드 실패"
  exit 1
fi
echo "✅ 빌드 완료"

# 3. S3 동기화 - 정적 에셋 (장기 캐시)
echo ""
echo "[3/5] S3에 업로드 중..."
aws s3 sync dist/ s3://$S3_BUCKET/ \
  --region $REGION \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "index.html" \
  --exclude "*.json" \
  --exclude "*.txt"

# index.html은 캐시 없이 업로드 (항상 최신 버전)
aws s3 cp dist/index.html s3://$S3_BUCKET/index.html \
  --region $REGION \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html; charset=utf-8"

# JSON, manifest 등은 짧은 캐시
if [ -f "dist/manifest.json" ]; then
  aws s3 cp dist/manifest.json s3://$S3_BUCKET/manifest.json \
    --region $REGION \
    --cache-control "public, max-age=3600" \
    --content-type "application/json"
fi

echo "✅ S3 업로드 완료"

# 4. CloudFront 캐시 무효화
if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
  echo ""
  echo "[4/5] CloudFront 캐시 무효화 중..."
  aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
    --paths "/*"
  echo "✅ CloudFront 캐시 무효화 완료"
else
  echo ""
  echo "[4/5] CloudFront 배포 ID가 설정되지 않음 - 스킵"
  echo "   CLOUDFRONT_DISTRIBUTION_ID 변수를 설정한 후 다시 실행하세요."
fi

# 5. 완료
echo ""
echo "=========================================="
echo "✅ SafeGAI Platform 배포 완료!"
echo "=========================================="
echo ""
echo "S3 정적 웹사이트 URL:"
echo "  http://$S3_BUCKET.s3-website.$REGION.amazonaws.com"
echo ""
if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
  echo "CloudFront를 통해 HTTPS 접속 가능"
  echo "도메인: https://safegai.com"
fi
echo ""
echo "배포 후 확인사항:"
echo "  1. https://safegai.com 접속 확인"
echo "  2. 모바일 반응형 확인"
echo "  3. 메뉴 네비게이션 동작 확인"
echo "  4. 사용자/관리자 화면 전환 확인"
echo "  5. Contact 모달 동작 확인"
