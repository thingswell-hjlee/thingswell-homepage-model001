# ============================================
# 싱스웰 홈페이지 - S3 + CloudFront 배포 스크립트
# ============================================
# 
# 사용법: PowerShell에서 실행
#   .\deploy-s3.ps1
#
# 사전 조건:
#   1. AWS CLI 설치 완료
#   2. aws configure 완료
#   3. Node.js 설치 완료
#   4. npm install 완료
# ============================================

# === 설정 (본인 환경에 맞게 수정) ===
$S3_BUCKET = "thingswell-homepage"
$REGION = "ap-northeast-2"
$CLOUDFRONT_DISTRIBUTION_ID = ""  # CloudFront 생성 후 입력

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " 싱스웰 홈페이지 S3 배포" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# 1. 빌드
Write-Host "[1/4] 프로덕션 빌드 중..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "빌드 실패" -ForegroundColor Red
    exit 1
}
Write-Host "빌드 완료" -ForegroundColor Green
Write-Host ""

# 2. S3 업로드 (정적 자산 - 긴 캐시)
Write-Host "[2/4] S3에 업로드 중..." -ForegroundColor Yellow
aws s3 sync dist/ "s3://$S3_BUCKET/" --region $REGION --delete --cache-control "public, max-age=31536000" --exclude "index.html" --exclude "*.json"

# index.html (캐시 없음)
aws s3 cp dist/index.html "s3://$S3_BUCKET/index.html" --region $REGION --cache-control "no-cache, no-store, must-revalidate" --content-type "text/html"

Write-Host "S3 업로드 완료" -ForegroundColor Green
Write-Host ""

# 3. CloudFront 캐시 무효화
if ($CLOUDFRONT_DISTRIBUTION_ID -ne "") {
    Write-Host "[3/4] CloudFront 캐시 무효화 중..." -ForegroundColor Yellow
    aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
    Write-Host "CloudFront 캐시 무효화 완료" -ForegroundColor Green
} else {
    Write-Host "[3/4] CloudFront 배포 ID 미설정 - 스킵" -ForegroundColor Gray
}
Write-Host ""

# 4. 완료
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " 배포 완료!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "S3 URL: http://$S3_BUCKET.s3-website.$REGION.amazonaws.com" -ForegroundColor White
if ($CLOUDFRONT_DISTRIBUTION_ID -ne "") {
    Write-Host "CloudFront를 통해 HTTPS로 접속 가능합니다." -ForegroundColor White
}
