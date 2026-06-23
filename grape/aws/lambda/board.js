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
          // 목록 조회 (전체 스캔 후 id 내림차순 정렬)
          const result = await docClient.send(new ScanCommand({
            TableName: dynamoTable,
          }));
          const items = (result.Items || []).sort((a, b) => b.id - a.id);
          return response(200, items);
        }
      }

      case 'POST': {
        const data = JSON.parse(body || '{}');
        const newId = await getNextId(dynamoTable);
        const item = {
          id: newId,
          title: data.title || '',
          content: data.content || '',
          images: data.images || '[]',
          files: data.files || '[]',
          author: data.author || '',
          created_at: new Date().toISOString(),
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

        if (updateExpressions.length === 0) {
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
    return response(500, { error: 'Internal server error', detail: error.message });
  }
};
