#!/bin/bash
# ============================================
# 싱스웰 홈페이지 - S3 + CloudFront 배포 스크립트
# ============================================
# 
# 사전 조건:
# 1. AWS CLI 설치: https://aws.amazon.com/cli/
# 2. AWS 자격 증명 설정: aws configure
# 3. S3 버킷 생성 완료
#
# 사용법:
#   chmod +x deploy-s3.sh
#   ./deploy-s3.sh
# ============================================

# === 설정 (본인 환경에 맞게 수정) ===
S3_BUCKET="thingswell-homepage"           # S3 버킷 이름
REGION="ap-northeast-2"                    # 서울 리전
CLOUDFRONT_DISTRIBUTION_ID=""              # CloudFront 배포 ID (생성 후 입력)

echo "=========================================="
echo "싱스웰 홈페이지 S3 배포 시작"
echo "=========================================="

# 1. 빌드
echo ""
echo "[1/4] 프로덕션 빌드 중..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ 빌드 실패"
  exit 1
fi
echo "✅ 빌드 완료"

# 2. S3 동기화
echo ""
echo "[2/4] S3에 업로드 중..."
aws s3 sync dist/ s3://$S3_BUCKET/ \
  --region $REGION \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "index.html" \
  --exclude "*.json"

# index.html은 캐시 없이 업로드 (항상 최신 버전)
aws s3 cp dist/index.html s3://$S3_BUCKET/index.html \
  --region $REGION \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html"

echo "✅ S3 업로드 완료"

# 3. CloudFront 캐시 무효화
if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
  echo ""
  echo "[3/4] CloudFront 캐시 무효화 중..."
  aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
    --paths "/*"
  echo "✅ CloudFront 캐시 무효화 완료"
else
  echo ""
  echo "[3/4] CloudFront 배포 ID가 설정되지 않음 - 스킵"
fi

# 4. 완료
echo ""
echo "=========================================="
echo "✅ 배포 완료!"
echo "=========================================="
echo ""
echo "S3 URL: http://$S3_BUCKET.s3-website.$REGION.amazonaws.com"
if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
  echo "CloudFront를 통해 HTTPS 접속 가능"
fi
