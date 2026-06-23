/**
 * Product Lambda Handler
 * Product 테이블 CRUD 처리
 * 
 * Routes:
 *   GET    /products?kind={kind}       - 목록 조회 (kind 필터 가능)
 *   GET    /products/{id}              - 단건 조회
 *   POST   /products                   - 생성 (인증 필요)
 *   PUT    /products/{id}              - 수정 (인증 필요)
 *   DELETE /products/{id}              - 삭제 (인증 필요)
 *   PATCH  /products/{id}/active       - is_active 설정 (인증 필요)
 */

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  ScanCommand,
  QueryCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'ap-northeast-2' });
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_PRODUCT || 'Product';
const COUNTER_TABLE = process.env.TABLE_COUNTER || 'ThingswellCounter';

// CORS 헤더
// TODO: 프로덕션 배포 시 Access-Control-Allow-Origin을 실제 프론트엔드 도메인으로 제한할 것
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
  'Content-Type': 'application/json',
};

function response(statusCode, body) {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(body),
  };
}

// 다음 ID 생성 (atomic counter)
async function getNextId() {
  const result = await docClient.send(new UpdateCommand({
    TableName: COUNTER_TABLE,
    Key: { tableName: TABLE_NAME },
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

/**
 * DynamoDB Query 전체 결과 조회 (페이지네이션 처리)
 */
async function queryAll(params) {
  const items = [];
  let lastKey = undefined;
  do {
    const command = new QueryCommand({
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
  if (event.httpMethod === 'OPTIONS') {
    return response(200, {});
  }

  try {
    const { httpMethod, pathParameters, queryStringParameters, body, resource } = event;
    const id = pathParameters?.id ? parseInt(pathParameters.id, 10) : null;

    // PATCH /products/{id}/active - is_active 설정
    if (httpMethod === 'PATCH' && resource?.includes('/active')) {
      if (!id) return response(400, { error: 'ID is required' });

      // 현재 값 조회 (존재 확인)
      const current = await docClient.send(new GetCommand({
        TableName: TABLE_NAME,
        Key: { id },
      }));
      if (!current.Item) {
        return response(404, { error: 'Product not found' });
      }

      // 클라이언트가 보낸 is_active 값 사용, 미제공시 토글 (fallback)
      const parsedBody = JSON.parse(body || '{}');
      const newActive = parsedBody.is_active !== undefined
        ? parsedBody.is_active
        : !current.Item.is_active;

      const result = await docClient.send(new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: 'SET is_active = :active, updated_at = :updatedAt',
        ExpressionAttributeValues: {
          ':active': newActive,
          ':updatedAt': new Date().toISOString(),
        },
        ReturnValues: 'ALL_NEW',
      }));
      return response(200, result.Attributes);
    }

    switch (httpMethod) {
      case 'GET': {
        if (id) {
          // 단건 조회
          const result = await docClient.send(new GetCommand({
            TableName: TABLE_NAME,
            Key: { id },
          }));
          if (!result.Item) {
            return response(404, { error: 'Product not found' });
          }
          return response(200, result.Item);
        } else {
          // 목록 조회
          const kind = queryStringParameters?.kind;

          if (kind) {
            // GSI를 사용한 kind 필터링 (페이지네이션 포함)
            const items = await queryAll({
              TableName: TABLE_NAME,
              IndexName: 'KindIndex',
              KeyConditionExpression: 'kind = :kind',
              ExpressionAttributeValues: { ':kind': kind },
            });
            items.sort((a, b) => b.id - a.id);
            return response(200, items);
          } else {
            // 전체 목록 (페이지네이션 포함)
            const items = await scanAll({ TableName: TABLE_NAME });
            items.sort((a, b) => b.id - a.id);
            return response(200, items);
          }
        }
      }

      case 'POST': {
        const data = JSON.parse(body || '{}');
        const newId = await getNextId();
        const now = new Date().toISOString();
        const item = {
          id: newId,
          title: data.title || '',
          description: data.description || data.desc || '',
          content: data.content || '',
          category: data.category || data.type || '',
          kind: data.kind || '',
          images: data.images || '[]',
          date: data.date || now.split('T')[0],
          is_active: data.is_active !== undefined ? data.is_active : true,
          overview_title: data.overview_title || '',
          orderer: data.orderer || '',
          keyFeatures: data.keyFeatures || '[]',
          specifications: data.specifications || '[]',
          certifications: data.certifications || '[]',
          downloads: data.downloads || '[]',
          videos: data.videos || '[]',
          created_at: now,
          updated_at: now,
        };
        await docClient.send(new PutCommand({
          TableName: TABLE_NAME,
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

        const fields = [
          'title', 'description', 'content', 'category', 'kind',
          'images', 'date', 'is_active', 'overview_title', 'orderer',
          'keyFeatures', 'specifications', 'certifications', 'downloads', 'videos',
        ];

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
          TableName: TABLE_NAME,
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
          TableName: TABLE_NAME,
          Key: { id },
        }));
        return response(200, { message: 'Deleted successfully' });
      }

      default:
        return response(405, { error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Product Lambda Error:', error);
    return response(500, { error: 'Internal server error' });
  }
};
