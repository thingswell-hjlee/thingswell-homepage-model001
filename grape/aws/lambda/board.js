/**
 * Board Lambda Handler
 * Board_Announcement / Board_Download CRUD 처리
 * 
 * Routes:
 *   GET    /boards/{tableName}       - 목록 조회 (id 내림차순)
 *   GET    /boards/{tableName}/{id}  - 단건 조회
 *   POST   /boards/{tableName}       - 생성 (인증 필요)
 *   PUT    /boards/{tableName}/{id}  - 수정 (인증 필요)
 *   DELETE /boards/{tableName}/{id}  - 삭제 (인증 필요)
 */

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'ap-northeast-2' });
const docClient = DynamoDBDocumentClient.from(client);

// 테이블 이름 매핑
const TABLE_MAP = {
  announcement: process.env.TABLE_BOARD_ANNOUNCEMENT || 'BoardAnnouncement',
  download: process.env.TABLE_BOARD_DOWNLOAD || 'BoardDownload',
};

// CORS 헤더
// TODO: 프로덕션 배포 시 Access-Control-Allow-Origin을 실제 프론트엔드 도메인으로 제한할 것
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Content-Type': 'application/json',
};

// 응답 생성 헬퍼
function response(statusCode, body) {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(body),
  };
}

// 다음 ID 생성 (atomic counter 패턴)
async function getNextId(tableName) {
  const counterTable = process.env.TABLE_COUNTER || 'ThingswellCounter';
  const result = await docClient.send(new UpdateCommand({
    TableName: counterTable,
    Key: { tableName },
    UpdateExpression: 'SET currentId = if_not_exists(currentId, :zero) + :inc',
    ExpressionAttributeValues: { ':zero': 0, ':inc': 1 },
    ReturnValues: 'UPDATED_NEW',
  }));
  return result.Attributes.currentId;
}

/**
 * DynamoDB Scan 전체 결과 조회 (페이지네이션 처리)
 * DynamoDB는 1회 Scan에 최대 1MB만 반환하므로 LastEvaluatedKey를 사용하여 반복 조회
 */
async function scanAll(params) {
  const items = [];
  let lastKey = undefined;
  do {
    const command = new ScanCommand({
      ...params,
      ExclusiveStartKey: lastKey,
    });
    const result = await docClient.send(command);
    items.push(...(result.Items || []));
    lastKey = result.LastEvaluatedKey;
  } while (lastKey);
  return items;
}

exports.handler = async (event) => {
  // OPTIONS 요청 처리 (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return response(200, {});
  }

  try {
    const { httpMethod, pathParameters, body } = event;
    const tableName = pathParameters?.tableName;

    // 테이블 이름 검증
    if (!tableName || !TABLE_MAP[tableName]) {
      return response(400, { error: 'Invalid table name. Use "announcement" or "download".' });
    }

    const dynamoTable = TABLE_MAP[tableName];
    const id = pathParameters?.id ? parseInt(pathParameters.id, 10) : null;

    switch (httpMethod) {
      case 'GET': {
        if (id) {
          // 단건 조회
          const result = await docClient.send(new GetCommand({
            TableName: dynamoTable,
            Key: { id },
          }));
          if (!result.Item) {
            return response(404, { error: 'Item not found' });
          }
          return response(200, result.Item);
        } else {
          // 목록 조회 (전체 스캔 + 페이지네이션 후 id 내림차순 정렬)
          const items = await scanAll({ TableName: dynamoTable });
          items.sort((a, b) => b.id - a.id);
          return response(200, items);
        }
      }

      case 'POST': {
        const data = JSON.parse(body || '{}');
        const newId = await getNextId(dynamoTable);
        const now = new Date().toISOString();
        const item = {
          id: newId,
          title: data.title || '',
          content: data.content || '',
          images: data.images || '[]',
          files: data.files || '[]',
          author: data.author || '',
          created_at: now,
          updated_at: now,
        };
        await docClient.send(new PutCommand({
          TableName: dynamoTable,
          Item: item,
        }));
        return response(201, item);
      }

      case 'PUT': {
        if (!id) return response(400, { error: 'ID is required' });
        const data = JSON.parse(body || '{}');
        const updateExpressions = [];
        const expressionValues = {};
        const expressionNames = {};

        const fields = ['title', 'content', 'images', 'files', 'author'];
        fields.forEach((field) => {
          if (data[field] !== undefined) {
            updateExpressions.push(`#${field} = :${field}`);
            expressionValues[`:${field}`] = data[field];
            expressionNames[`#${field}`] = field;
          }
        });

        // 서버 측에서 updated_at 설정 (클라이언트 값 무시)
        updateExpressions.push('#updated_at = :updated_at');
        expressionValues[':updated_at'] = new Date().toISOString();
        expressionNames['#updated_at'] = 'updated_at';

        if (updateExpressions.length <= 1) {
          // updated_at만 있으면 실제 업데이트 필드 없음
          return response(400, { error: 'No fields to update' });
        }

        const result = await docClient.send(new UpdateCommand({
          TableName: dynamoTable,
          Key: { id },
          UpdateExpression: `SET ${updateExpressions.join(', ')}`,
          ExpressionAttributeValues: expressionValues,
          ExpressionAttributeNames: expressionNames,
          ReturnValues: 'ALL_NEW',
        }));
        return response(200, result.Attributes);
      }

      case 'DELETE': {
        if (!id) return response(400, { error: 'ID is required' });
        await docClient.send(new DeleteCommand({
          TableName: dynamoTable,
          Key: { id },
        }));
        return response(200, { message: 'Deleted successfully' });
      }

      default:
        return response(405, { error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Board Lambda Error:', error);
    return response(500, { error: 'Internal server error' });
  }
};
