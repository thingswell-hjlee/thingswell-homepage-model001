# ============================================
# 싱스웰 홈페이지 - S3 + CloudFront 배포 스크립트 (Windows PowerShell)
# ============================================
#
# 사전 조건:
#   1. AWS CLI 설치 완료
#   2. aws configure 완료
#   3. Node.js 18+ 설치 완료
#   4. npm install 완료
#
# 환경변수 설정:
#   $env:CLOUDFRONT_DISTRIBUTION_ID = "E1234567890ABC"
#
# 사용법:
#   .\deploy-s3.ps1
# ============================================

$ErrorActionPreference = "Stop"

# === 설정 ===
$S3_BUCKET = "thingswell-homepage"
$REGION = "ap-northeast-2"

# CloudFront Distribution ID는 환경변수에서 읽음 (보안)
$CF_DIST_ID = $env:CLOUDFRONT_DISTRIBUTION_ID

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " 싱스웰 홈페이지 S3 배포 시작" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host " S3 Bucket : $S3_BUCKET"
Write-Host " Region    : $REGION"
if ($CF_DIST_ID) {
    Write-Host " CloudFront: $CF_DIST_ID"
} else {
    Write-Host " CloudFront: (미설정 - 캐시 무효화 스킵)" -ForegroundColor Gray
}
Write-Host ""

# === 사전 확인 ===
if (-not (Get-Command "aws" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ 오류: AWS CLI가 설치되지 않았습니다." -ForegroundColor Red
    Write-Host "   설치: https://aws.amazon.com/cli/"
    exit 1
}

if (-not (Get-Command "node" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ 오류: Node.js가 설치되지 않았습니다." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "package.json")) {
    Write-Host "❌ 오류: package.json을 찾을 수 없습니다." -ForegroundColor Red
    Write-Host "   grape 디렉토리에서 실행해주세요."
    exit 1
}

# === 1단계: 프로덕션 빌드 ===
Write-Host "[1/4] 프로덕션 빌드 중..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 빌드 실패 - 배포를 중단합니다." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "dist")) {
    Write-Host "❌ 오류: dist 폴더가 생성되지 않았습니다." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "dist/index.html")) {
    Write-Host "❌ 오류: dist/index.html이 존재하지 않습니다." -ForegroundColor Red
    exit 1
}

Write-Host "✅ 빌드 완료" -ForegroundColor Green
Write-Host ""

# === 2단계: S3 업로드 ===
Write-Host "[2/4] S3에 업로드 중..." -ForegroundColor Yellow

# 정적 에셋 (장기 캐시)
aws s3 sync dist/ "s3://$S3_BUCKET/" `
    --region $REGION `
    --delete `
    --cache-control "public, max-age=31536000" `
    --exclude "index.html" `
    --exclude "*.json"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ S3 에셋 업로드 실패 - 배포를 중단합니다." -ForegroundColor Red
    exit 1
}

# index.html (캐시 없음 - 항상 최신)
aws s3 cp dist/index.html "s3://$S3_BUCKET/index.html" `
    --region $REGION `
    --cache-control "no-cache, no-store, must-revalidate" `
    --content-type "text/html; charset=utf-8"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ index.html 업로드 실패 - 배포를 중단합니다." -ForegroundColor Red
    exit 1
}

Write-Host "✅ S3 업로드 완료" -ForegroundColor Green
Write-Host ""

# === 3단계: CloudFront 캐시 무효화 ===
if ($CF_DIST_ID) {
    Write-Host "[3/4] CloudFront 캐시 무효화 중..." -ForegroundColor Yellow
    aws cloudfront create-invalidation `
        --distribution-id $CF_DIST_ID `
        --paths "/*"

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ CloudFront 캐시 무효화 실패" -ForegroundColor Red
        Write-Host "   Distribution ID를 확인하세요: $CF_DIST_ID"
        exit 1
    }

    Write-Host "✅ CloudFront 캐시 무효화 완료 (전파까지 약 5~10분 소요)" -ForegroundColor Green
} else {
    Write-Host "[3/4] ⚠️  CloudFront Distribution ID가 설정되지 않았습니다." -ForegroundColor Yellow
    Write-Host '   환경변수를 설정하세요:'
    Write-Host '   $env:CLOUDFRONT_DISTRIBUTION_ID = "YOUR_DISTRIBUTION_ID"'
    Write-Host ""
    Write-Host "   캐시 무효화를 건너뜁니다." -ForegroundColor Gray
    Write-Host "   S3 업로드는 완료되었으나, CDN 캐시에 이전 버전이 남아있을 수 있습니다." -ForegroundColor Gray
}
Write-Host ""

# === 4단계: 완료 ===
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✅ 배포 완료!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "S3 정적 웹사이트:"
Write-Host "  http://$S3_BUCKET.s3-website.$REGION.amazonaws.com"
Write-Host ""
if ($CF_DIST_ID) {
    Write-Host "CloudFront를 통해 HTTPS 접속 가능합니다." -ForegroundColor White
    Write-Host ""
}
Write-Host "------------------------------------------"
Write-Host "배포 후 확인할 URL (운영 도메인으로 대체하세요):" -ForegroundColor White
Write-Host "  /ko"
Write-Host "  /ko/about/company"
Write-Host "  /ko/about/directions"
Write-Host "  /ko/products/safety"
Write-Host "  /ko/cases"
Write-Host "  /ko/customer-service/announcement"
Write-Host "  /ko/login"
Write-Host "  /en"
Write-Host "  /en/about/company"
Write-Host "------------------------------------------"
Write-Host ""
Write-Host "확인 항목:" -ForegroundColor White
Write-Host "  - 페이지 정상 표시"
Write-Host "  - 새로고침 시 403/404 없음"
Write-Host "  - 메뉴 이동 정상"
Write-Host "  - 이미지 깨짐 없음"
Write-Host "  - 모바일 메뉴 정상"
Write-Host "  - HTTPS 정상"
