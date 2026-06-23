#!/bin/bash
# ============================================
# ThingsWell Serverless Backend 배포 스크립트
# AWS CloudShell에서 실행
# ============================================

set -e

# 설정
STACK_NAME="thingswell-serverless"
REGION="ap-northeast-2"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
LAMBDA_BUCKET="thingswell-lambda-deploy-${ACCOUNT_ID}"
LAMBDA_KEY="lambda/thingswell-lambda.zip"

echo "============================================"
echo " ThingsWell Serverless Backend 배포"
echo "============================================"
echo " AWS Account: ${ACCOUNT_ID}"
echo " Region: ${REGION}"
echo " Stack: ${STACK_NAME}"
echo "============================================"

# 1. Lambda 코드 배포용 S3 버킷 생성
echo ""
echo "[1/5] Lambda 배포용 S3 버킷 생성..."
if aws s3 ls "s3://${LAMBDA_BUCKET}" 2>/dev/null; then
    echo "  버킷이 이미 존재합니다: ${LAMBDA_BUCKET}"
else
    aws s3 mb "s3://${LAMBDA_BUCKET}" --region ${REGION}
    echo "  버킷 생성 완료: ${LAMBDA_BUCKET}"
fi

# 2. Lambda 함수 패키징
echo ""
echo "[2/5] Lambda 함수 패키징..."
LAMBDA_DIR="$(dirname "$0")/lambda"
TEMP_DIR=$(mktemp -d)

# node_modules 설치 (CloudShell에는 npm 있음)
cp -r "${LAMBDA_DIR}"/* "${TEMP_DIR}/"
cd "${TEMP_DIR}"
npm install --production
echo "  npm install 완료"

# ZIP 파일 생성
zip -r lambda.zip . > /dev/null
echo "  lambda.zip 생성 완료 ($(du -h lambda.zip | cut -f1))"

# 3. Lambda ZIP을 S3에 업로드
echo ""
echo "[3/5] Lambda 패키지를 S3에 업로드..."
aws s3 cp lambda.zip "s3://${LAMBDA_BUCKET}/${LAMBDA_KEY}"
echo "  업로드 완료: s3://${LAMBDA_BUCKET}/${LAMBDA_KEY}"

# 임시 디렉토리 정리
cd -
rm -rf "${TEMP_DIR}"

# 4. CloudFormation 스택 배포
echo ""
echo "[4/5] CloudFormation 스택 배포..."
TEMPLATE_PATH="$(dirname "$0")/cloudformation.yaml"

aws cloudformation deploy \
    --template-file "${TEMPLATE_PATH}" \
    --stack-name "${STACK_NAME}" \
    --region "${REGION}" \
    --capabilities CAPABILITY_NAMED_IAM \
    --parameter-overrides \
        LambdaCodeBucket="${LAMBDA_BUCKET}" \
        LambdaCodeKey="${LAMBDA_KEY}" \
    --no-fail-on-empty-changeset

echo "  스택 배포 완료!"

# 5. 출력값 표시
echo ""
echo "[5/5] 배포 결과:"
echo "============================================"

API_URL=$(aws cloudformation describe-stacks \
    --stack-name "${STACK_NAME}" \
    --query "Stacks[0].Outputs[?OutputKey=='ApiGatewayUrl'].OutputValue" \
    --output text)

USER_POOL_ID=$(aws cloudformation describe-stacks \
    --stack-name "${STACK_NAME}" \
    --query "Stacks[0].Outputs[?OutputKey=='UserPoolId'].OutputValue" \
    --output text)

CLIENT_ID=$(aws cloudformation describe-stacks \
    --stack-name "${STACK_NAME}" \
    --query "Stacks[0].Outputs[?OutputKey=='UserPoolClientId'].OutputValue" \
    --output text)

UPLOAD_BUCKET=$(aws cloudformation describe-stacks \
    --stack-name "${STACK_NAME}" \
    --query "Stacks[0].Outputs[?OutputKey=='UploadBucketName'].OutputValue" \
    --output text)

echo ""
echo " API Gateway URL:        ${API_URL}"
echo " Cognito User Pool ID:   ${USER_POOL_ID}"
echo " Cognito Client ID:      ${CLIENT_ID}"
echo " Upload Bucket:          ${UPLOAD_BUCKET}"
echo ""
echo "============================================"
echo " 프론트엔드 .env 파일에 다음 값을 설정하세요:"
echo "============================================"
echo ""
echo "VITE_API_URL=${API_URL}"
echo "VITE_COGNITO_USER_POOL_ID=${USER_POOL_ID}"
echo "VITE_COGNITO_CLIENT_ID=${CLIENT_ID}"
echo "VITE_UPLOAD_BUCKET=${UPLOAD_BUCKET}"
echo "VITE_AWS_REGION=${REGION}"
echo ""
echo "============================================"
echo " 배포 완료!"
echo "============================================"
