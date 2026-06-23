/**
 * AWS API Gateway 클라이언트 모듈
 * Supabase 클라이언트를 대체하여 API Gateway + Lambda 백엔드와 통신
 * 
 * 모든 함수는 { data, error } 형태를 반환합니다.
 */

import { getAccessToken } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Board 테이블명 매핑: 레거시 Supabase 이름 -> Lambda URL 경로 세그먼트
const BOARD_TABLE_MAP = {
  'Board_Announcement': 'announcement',
  'Board_Download': 'download',
};

/**
 * Board 테이블명을 Lambda가 인식하는 경로 세그먼트로 변환
 * @param {string} tableName - 레거시 테이블명 (예: 'Board_Announcement')
 * @returns {string} API 경로 세그먼트 (예: 'announcement')
 */
const normalizeBoardTableName = (tableName) => {
  return BOARD_TABLE_MAP[tableName] || tableName;
};

/**
 * API 요청 헬퍼
 * @param {string} path - API 경로 (예: '/boards/Board_Announcement')
 * @param {object} options - fetch 옵션
 * @param {boolean} requireAuth - 인증 필요 여부
 * @returns {{ data, error }}
 */
const apiRequest = async (path, options = {}, requireAuth = false) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // 인증이 필요한 요청에 토큰 추가
    if (requireAuth) {
      const token = await getAccessToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else {
        return { data: null, error: { message: '인증이 필요합니다. 로그인해주세요.' } };
      }
    }

    const url = `${API_BASE_URL}${path}`;
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // 응답 파싱
    let responseData;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      const errorMessage = typeof responseData === 'object' 
        ? responseData.error || responseData.message || `HTTP ${response.status}`
        : `HTTP ${response.status}: ${responseData}`;
      return { data: null, error: { message: errorMessage, status: response.status } };
    }

    return { data: responseData, error: null };
  } catch (error) {
    console.error('API 요청 실패:', error);
    return { data: null, error: { message: error.message || '네트워크 오류가 발생했습니다.' } };
  }
};

// ===== Board (게시판) API =====

/**
 * 게시판 목록 조회
 * @param {string} tableName - 테이블명 ('Board_Announcement' 또는 'Board_Download')
 * @param {object} options - { order, ascending, limit, offset }
 * @returns {{ data, error }}
 */
export const getBoards = async (tableName, options = {}) => {
  const apiTableName = normalizeBoardTableName(tableName);
  const params = new URLSearchParams();
  if (options.order) params.append('order', options.order);
  if (options.ascending !== undefined) params.append('ascending', options.ascending);
  if (options.limit) params.append('limit', options.limit);
  if (options.offset) params.append('offset', options.offset);

  const queryString = params.toString();
  const path = `/boards/${apiTableName}${queryString ? `?${queryString}` : ''}`;
  
  return apiRequest(path);
};

/**
 * 게시판 단건 조회
 * @param {string} tableName - 테이블명
 * @param {string} id - 게시글 ID
 * @returns {{ data, error }}
 */
export const getBoardById = async (tableName, id) => {
  const apiTableName = normalizeBoardTableName(tableName);
  return apiRequest(`/boards/${apiTableName}/${id}`);
};

/**
 * 게시판 글 생성
 * @param {string} tableName - 테이블명
 * @param {object} data - 게시글 데이터
 * @returns {{ data, error }}
 */
export const createBoard = async (tableName, data) => {
  const apiTableName = normalizeBoardTableName(tableName);
  return apiRequest(`/boards/${apiTableName}`, {
    method: 'POST',
    body: JSON.stringify(data),
  }, true);
};

/**
 * 게시판 글 수정
 * @param {string} tableName - 테이블명
 * @param {string} id - 게시글 ID
 * @param {object} data - 수정할 데이터
 * @returns {{ data, error }}
 */
export const updateBoard = async (tableName, id, data) => {
  const apiTableName = normalizeBoardTableName(tableName);
  return apiRequest(`/boards/${apiTableName}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true);
};

/**
 * 게시판 글 삭제
 * @param {string} tableName - 테이블명
 * @param {string} id - 게시글 ID
 * @returns {{ data, error }}
 */
export const deleteBoard = async (tableName, id) => {
  const apiTableName = normalizeBoardTableName(tableName);
  return apiRequest(`/boards/${apiTableName}/${id}`, {
    method: 'DELETE',
  }, true);
};

// ===== Product (제품) API =====

/**
 * 제품 목록 조회
 * @param {object} options - { kind, order, ascending, limit, offset }
 * @returns {{ data, error }}
 */
export const getProducts = async (options = {}) => {
  const params = new URLSearchParams();
  if (options.kind) params.append('kind', options.kind);
  if (options.order) params.append('order', options.order);
  if (options.ascending !== undefined) params.append('ascending', options.ascending);
  if (options.limit) params.append('limit', options.limit);
  if (options.offset) params.append('offset', options.offset);

  const queryString = params.toString();
  const path = `/products${queryString ? `?${queryString}` : ''}`;
  
  return apiRequest(path);
};

/**
 * 제품 단건 조회
 * @param {string} id - 제품 ID
 * @returns {{ data, error }}
 */
export const getProductById = async (id) => {
  return apiRequest(`/products/${id}`);
};

/**
 * 제품 생성
 * @param {object} data - 제품 데이터
 * @returns {{ data, error }}
 */
export const createProduct = async (data) => {
  return apiRequest('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  }, true);
};

/**
 * 제품 수정
 * @param {string} id - 제품 ID
 * @param {object} data - 수정할 데이터
 * @returns {{ data, error }}
 */
export const updateProduct = async (id, data) => {
  return apiRequest(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true);
};

/**
 * 제품 삭제
 * @param {string} id - 제품 ID
 * @returns {{ data, error }}
 */
export const deleteProduct = async (id) => {
  return apiRequest(`/products/${id}`, {
    method: 'DELETE',
  }, true);
};

/**
 * 제품 활성/비활성 토글
 * @param {string} id - 제품 ID
 * @param {boolean} isActive - 활성 상태
 * @returns {{ data, error }}
 */
export const toggleProductActive = async (id, isActive) => {
  return apiRequest(`/products/${id}/active`, {
    method: 'PATCH',
    body: JSON.stringify({ is_active: isActive }),
  }, true);
};

// ===== Track Record (실적) API =====

/**
 * 실적 목록 조회
 * @param {object} options - { kind, order, ascending, limit, offset }
 * @returns {{ data, error }}
 */
export const getTrackRecords = async (options = {}) => {
  const params = new URLSearchParams();
  if (options.kind) params.append('kind', options.kind);
  if (options.order) params.append('order', options.order);
  if (options.ascending !== undefined) params.append('ascending', options.ascending);
  if (options.limit) params.append('limit', options.limit);
  if (options.offset) params.append('offset', options.offset);

  const queryString = params.toString();
  const path = `/track-records${queryString ? `?${queryString}` : ''}`;
  
  return apiRequest(path);
};

/**
 * 실적 단건 조회
 * @param {string} id - 실적 ID
 * @returns {{ data, error }}
 */
export const getTrackRecordById = async (id) => {
  return apiRequest(`/track-records/${id}`);
};

/**
 * 실적 생성
 * @param {object} data - 실적 데이터
 * @returns {{ data, error }}
 */
export const createTrackRecord = async (data) => {
  return apiRequest('/track-records', {
    method: 'POST',
    body: JSON.stringify(data),
  }, true);
};

/**
 * 실적 수정
 * @param {string} id - 실적 ID
 * @param {object} data - 수정할 데이터
 * @returns {{ data, error }}
 */
export const updateTrackRecord = async (id, data) => {
  return apiRequest(`/track-records/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, true);
};

/**
 * 실적 삭제
 * @param {string} id - 실적 ID
 * @returns {{ data, error }}
 */
export const deleteTrackRecord = async (id) => {
  return apiRequest(`/track-records/${id}`, {
    method: 'DELETE',
  }, true);
};

/**
 * 실적 활성/비활성 토글
 * @param {string} id - 실적 ID
 * @param {boolean} isActive - 활성 상태
 * @returns {{ data, error }}
 */
export const toggleTrackRecordActive = async (id, isActive) => {
  return apiRequest(`/track-records/${id}/active`, {
    method: 'PATCH',
    body: JSON.stringify({ is_active: isActive }),
  }, true);
};

// 기본 내보내기
const api = {
  // Board
  getBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  // Product
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductActive,
  // Track Record
  getTrackRecords,
  getTrackRecordById,
  createTrackRecord,
  updateTrackRecord,
  deleteTrackRecord,
  toggleTrackRecordActive,
};

export default api;
