/**
 * Upload Lambda Handler
 * S3 Presigned URL 생성 및 파일 삭제
 * 
 * Routes:
 *   POST /upload/presigned-url - Presigned PUT URL 생성
 *     Body: { fileName, fileType, folder }
 *     Response: { uploadUrl, publicUrl, key }
 *   POST /upload/delete - S3 오브젝트 삭제
 *     Body: { key }
 *     Response: { message }
 */

const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3Client = new S3Client({ region: process.env.AWS_REGION || 'ap-northeast-2' });
const BUCKET_NAME = process.env.UPLOAD_BUCKET || 'thingswell-uploads';

// CORS 헤더
// TODO: 프로덕션 배포 시 Access-Control-Allow-Origin을 실제 프론트엔드 도메인으로 제한할 것
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Content-Type': 'application/json',
};

function response(statusCode, body) {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return response(200, {});
  }

  try {
    if (event.httpMethod !== 'POST') {
      return response(405, { error: 'Method not allowed' });
    }

    // 라우팅: resource path로 presigned-url vs delete 구분
    const resource = event.resource || event.path || '';

    if (resource.includes('/delete')) {
      return handleDelete(event);
    }

    return handlePresignedUrl(event);
  } catch (error) {
    console.error('Upload Lambda Error:', error);
    return response(500, { error: 'Internal server error' });
  }
};

/**
 * Presigned URL 생성 핸들러
 */
async function handlePresignedUrl(event) {
  const data = JSON.parse(event.body || '{}');
  const { fileName, fileType, folder } = data;

  if (!fileName || !fileType) {
    return response(400, { error: 'fileName and fileType are required' });
  }

  // 파일명에 타임스탬프 추가하여 고유성 보장
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const folderPath = folder ? `${folder}/` : '';
  const key = `${folderPath}${timestamp}_${sanitizedFileName}`;

  // Presigned URL 생성 (5분간 유효)
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: fileType,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

  // 공개 URL (S3 정적 호스팅 또는 CloudFront를 통한 접근)
  const publicUrl = `https://${BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${key}`;

  return response(200, {
    uploadUrl,
    publicUrl,
    key,
  });
}

/**
 * S3 오브젝트 삭제 핸들러
 */
async function handleDelete(event) {
  const data = JSON.parse(event.body || '{}');
  const { key } = data;

  if (!key) {
    return response(400, { error: 'key is required' });
  }

  // Path traversal 방지: key가 bucket 외부를 참조하지 못하도록 검증
  const sanitizedKey = key.replace(/^\/+/, '');
  if (sanitizedKey.includes('..') || sanitizedKey.startsWith('/')) {
    return response(400, { error: 'Invalid key' });
  }

  await s3Client.send(new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: sanitizedKey,
  }));

  return response(200, { message: 'File deleted successfully' });
}
