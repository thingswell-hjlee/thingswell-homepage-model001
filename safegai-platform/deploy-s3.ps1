# ============================================
# SafeGAI Platform - S3 + CloudFront 배포 스크립트 (Windows PowerShell)
# ============================================
#
# 사전 조건:
# 1. AWS CLI 설치: https://aws.amazon.com/cli/
# 2. AWS 자격 증명 설정: aws configure
# 3. S3 버킷 생성 완료
# 4. Node.js 18+ 설치
#
# 사용법:
#   .\deploy-s3.ps1
# ============================================

# === 설정 (본인 환경에 맞게 수정) ===
$S3_BUCKET = "safegai-platform"
$REGION = "ap-northeast-2"
$CLOUDFRONT_DISTRIBUTION_ID = ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "SafeGAI Platform S3 배포 시작" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. 의존성 설치
Write-Host ""
Write-Host "[1/5] 의존성 설치 중..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 의존성 설치 실패" -ForegroundColor Red
    exit 1
}
Write-Host "✅ 의존성 설치 완료" -ForegroundColor Green

# 2. 프로덕션 빌드
Write-Host ""
Write-Host "[2/5] 프로덕션 빌드 중..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 빌드 실패" -ForegroundColor Red
    exit 1
}
Write-Host "✅ 빌드 완료" -ForegroundColor Green

# 3. S3 동기화
Write-Host ""
Write-Host "[3/5] S3에 업로드 중..." -ForegroundColor Yellow

# 정적 에셋 (장기 캐시)
aws s3 sync dist/ "s3://$S3_BUCKET/" `
    --region $REGION `
    --delete `
    --cache-control "public, max-age=31536000, immutable" `
    --exclude "index.html" `
    --exclude "*.json" `
    --exclude "*.txt"

# index.html (캐시 없음)
aws s3 cp dist/index.html "s3://$S3_BUCKET/index.html" `
    --region $REGION `
    --cache-control "no-cache, no-store, must-revalidate" `
    --content-type "text/html; charset=utf-8"

Write-Host "✅ S3 업로드 완료" -ForegroundColor Green

# 4. CloudFront 캐시 무효화
if ($CLOUDFRONT_DISTRIBUTION_ID) {
    Write-Host ""
    Write-Host "[4/5] CloudFront 캐시 무효화 중..." -ForegroundColor Yellow
    aws cloudfront create-invalidation `
        --distribution-id $CLOUDFRONT_DISTRIBUTION_ID `
        --paths "/*"
    Write-Host "✅ CloudFront 캐시 무효화 완료" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "[4/5] CloudFront 배포 ID가 설정되지 않음 - 스킵" -ForegroundColor Gray
}

# 5. 완료
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✅ SafeGAI Platform 배포 완료!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "S3 URL: http://$S3_BUCKET.s3-website.$REGION.amazonaws.com"
if ($CLOUDFRONT_DISTRIBUTION_ID) {
    Write-Host "도메인: https://safegai.com" -ForegroundColor Cyan
}
