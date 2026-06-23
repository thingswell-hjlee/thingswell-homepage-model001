# ThingsWell 서버리스 백엔드 (AWS)

## 아키텍처

```
[프론트엔드 (React SPA)]
        |
        v
[CloudFront] --> [S3 - 정적 호스팅]
        |
        v
[API Gateway (REST API)]
   /boards/*     /products/*    /track-records/*    /upload/*
        |              |               |                |
        v              v               v                v
[Lambda: board] [Lambda: product] [Lambda: trackRecord] [Lambda: upload]
        |              |               |                |
        v              v               v                v
[DynamoDB Tables]                              [S3 Upload Bucket]
  - BoardAnnouncement
  - BoardDownload
  - Product (GSI: kind)
  - TrackRecord (GSI: kind)
  - ThingswellCounter (ID 자동증가용)

[Cognito User Pool] --> 인증 (POST/PUT/DELETE 요청 보호)
```

## 사전 준비

1. AWS 계정 (Account ID: 050649355977)
2. AWS CloudShell 접근 권한
3. IAM 권한: CloudFormation, DynamoDB, Lambda, API Gateway, S3, Cognito, IAM

## 배포 방법

### 1단계: 파일 업로드

AWS CloudShell에서 이 `aws/` 폴더를 업로드합니다:

```bash
# CloudShell에서 파일 업로드 (Actions > Upload file)
# 또는 git clone으로 프로젝트를 가져옵니다
```

### 2단계: 배포 실행

```bash
cd aws
chmod +x deploy.sh
./deploy.sh
```

배포 스크립트가 자동으로 수행하는 작업:
1. Lambda 코드 배포용 S3 버킷 생성
2. Lambda 함수 패키징 (npm install + zip)
3. S3에 Lambda 패키지 업로드
4. CloudFormation 스택 배포
5. 출력값 표시 (API URL, Cognito 정보)

### 3단계: 프론트엔드 환경변수 설정

배포 완료 후 출력되는 값을 `grape/.env` 파일에 설정:

```env
VITE_API_URL=https://xxxxxxxxxx.execute-api.ap-northeast-2.amazonaws.com/v1
VITE_COGNITO_USER_POOL_ID=ap-northeast-2_XXXXXXXXX
VITE_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_UPLOAD_BUCKET=thingswell-uploads-050649355977
VITE_AWS_REGION=ap-northeast-2
```

### 4단계: 관리자 계정 생성

```bash
# Cognito에 관리자 계정 생성
aws cognito-idp admin-create-user \
  --user-pool-id <USER_POOL_ID> \
  --username admin@safegai.co.kr \
  --user-attributes Name=email,Value=admin@safegai.co.kr \
  --temporary-password "TempPass123!"

# 비밀번호 확정 (첫 로그인 시 변경 필요)
aws cognito-idp admin-set-user-password \
  --user-pool-id <USER_POOL_ID> \
  --username admin@safegai.co.kr \
  --password "YourSecurePassword!" \
  --permanent
```

## API 엔드포인트

### 게시판 (Board)

| Method | Path | Auth | 설명 |
|--------|------|------|------|
| GET | /boards/announcement | X | 공지사항 목록 |
| GET | /boards/announcement/{id} | X | 공지사항 상세 |
| POST | /boards/announcement | O | 공지사항 작성 |
| PUT | /boards/announcement/{id} | O | 공지사항 수정 |
| DELETE | /boards/announcement/{id} | O | 공지사항 삭제 |
| GET | /boards/download | X | 자료실 목록 |
| GET | /boards/download/{id} | X | 자료실 상세 |
| POST | /boards/download | O | 자료실 작성 |
| PUT | /boards/download/{id} | O | 자료실 수정 |
| DELETE | /boards/download/{id} | O | 자료실 삭제 |

### 제품 (Product)

| Method | Path | Auth | 설명 |
|--------|------|------|------|
| GET | /products?kind={kind} | X | 제품 목록 (kind 필터) |
| GET | /products/{id} | X | 제품 상세 |
| POST | /products | O | 제품 등록 |
| PUT | /products/{id} | O | 제품 수정 |
| DELETE | /products/{id} | O | 제품 삭제 |
| PATCH | /products/{id}/active | O | 활성화 토글 |

### 실적 (Track Record)

| Method | Path | Auth | 설명 |
|--------|------|------|------|
| GET | /track-records?kind={kind} | X | 실적 목록 (kind 필터) |
| GET | /track-records/{id} | X | 실적 상세 |
| POST | /track-records | O | 실적 등록 |
| PUT | /track-records/{id} | O | 실적 수정 |
| DELETE | /track-records/{id} | O | 실적 삭제 |
| PATCH | /track-records/{id}/active | O | 활성화 토글 |

### 파일 업로드

| Method | Path | Auth | 설명 |
|--------|------|------|------|
| POST | /upload/presigned-url | O | Presigned URL 생성 |

**요청 본문:**
```json
{
  "fileName": "example.png",
  "fileType": "image/png",
  "folder": "boards/announcement"
}
```

**응답:**
```json
{
  "uploadUrl": "https://...(presigned PUT URL)",
  "publicUrl": "https://...(공개 접근 URL)",
  "key": "boards/announcement/1234567890_example.png"
}
```

## 비용 예측

월 예상 비용: **$0 ~ $3**

| 서비스 | 프리티어 | 예상 사용량 | 비용 |
|--------|---------|------------|------|
| DynamoDB | 25GB, 25 RCU/WCU | 약 1GB | $0 |
| Lambda | 월 100만 건 | 약 1,000건 | $0 |
| API Gateway | 월 100만 건 | 약 1,000건 | $0 |
| S3 (업로드) | 5GB | 약 1GB | ~$0.03 |
| Cognito | 월 50,000 MAU | 약 10명 | $0 |
| CloudWatch | 5GB 로그 | 약 100MB | $0 |
| **합계** | | | **~$0/월** |

프리티어 만료(12개월) 후에도 사용량이 적으면 월 $1~3 수준입니다.

## Supabase에서 데이터 마이그레이션

### 1. Supabase에서 데이터 내보내기

```sql
-- Supabase SQL Editor에서 실행
-- JSON 형식으로 데이터 확인
SELECT json_agg(t) FROM "Board_Announcement" t;
SELECT json_agg(t) FROM "Board_Download" t;
SELECT json_agg(t) FROM "Product" t;
SELECT json_agg(t) FROM "Track_record" t;
```

### 2. DynamoDB에 데이터 가져오기

```bash
# 내보낸 JSON 파일을 사용하여 DynamoDB에 입력
# migrate_data.js 스크립트 예시:

node -e "
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const data = require('./exported_data.json');

const client = DynamoDBDocumentClient.from(new DynamoDBClient({ region: 'ap-northeast-2' }));

async function migrate() {
  for (const item of data) {
    await client.send(new PutCommand({
      TableName: 'BoardAnnouncement',
      Item: item
    }));
  }
  console.log('Migration complete');
}
migrate();
"
```

### 3. Counter 테이블 초기화

마이그레이션 후 각 테이블의 최대 ID를 Counter 테이블에 설정:

```bash
aws dynamodb put-item \
  --table-name ThingswellCounter \
  --item '{"tableName":{"S":"BoardAnnouncement"},"currentId":{"N":"최대ID값"}}'

aws dynamodb put-item \
  --table-name ThingswellCounter \
  --item '{"tableName":{"S":"BoardDownload"},"currentId":{"N":"최대ID값"}}'

aws dynamodb put-item \
  --table-name ThingswellCounter \
  --item '{"tableName":{"S":"Product"},"currentId":{"N":"최대ID값"}}'

aws dynamodb put-item \
  --table-name ThingswellCounter \
  --item '{"tableName":{"S":"TrackRecord"},"currentId":{"N":"최대ID값"}}'
```

## 스택 삭제

```bash
aws cloudformation delete-stack --stack-name thingswell-serverless --region ap-northeast-2
```

주의: S3 버킷에 파일이 있으면 스택 삭제가 실패합니다. 먼저 버킷을 비워주세요:
```bash
aws s3 rm s3://thingswell-uploads-050649355977 --recursive
```
