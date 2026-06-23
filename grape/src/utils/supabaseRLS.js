/**
 * API 헬퍼 유틸리티
 * 기존 supabaseRLS.js를 대체 (import 경로 호환성 유지)
 * 
 * AWS API Gateway + Cognito 환경에서는 RLS 정책이 필요하지 않습니다.
 * API Gateway의 Cognito Authorizer가 인증/인가를 처리합니다.
 */

import { getSession } from '../lib/auth';

/**
 * 테이블 존재 여부 확인
 * DynamoDB 테이블은 CloudFormation으로 배포시 항상 존재
 * @param {string} tableName - 테이블명
 * @returns {boolean}
 */
export const checkTableExists = async (tableName) => {
  // AWS DynamoDB 테이블은 CloudFormation으로 배포되므로 항상 존재
  console.log(`${tableName} 테이블 확인: AWS DynamoDB 사용 중 (항상 존재)`);
  return true;
};

/**
 * 테이블 RLS 정책 확인 (no-op)
 * API Gateway + Cognito Authorizer로 대체됨
 */
export const checkTableRLS = async (tableName) => {
  // AWS에서는 API Gateway Cognito Authorizer가 인증을 처리
  console.log(`${tableName}: API Gateway Cognito Authorizer로 인증 처리 중`);
  return { hasRLS: false, needsPolicy: false };
};

/**
 * RLS 비활성화 안내 (no-op)
 * AWS에서는 해당 없음
 */
export const disableTableRLS = (tableName) => {
  console.log(`${tableName}: AWS 환경에서는 RLS 개념이 없습니다. API Gateway 인증 사용.`);
  return '';
};

/**
 * 테이블 정책 생성 (no-op)
 * AWS에서는 API Gateway + Cognito로 대체됨
 */
export const createTablePolicies = (tableName) => {
  console.log(`${tableName}: AWS API Gateway + Cognito Authorizer로 인증/인가 처리`);
  return [];
};

/**
 * Track Record 정책 생성 (하위 호환성)
 */
export const createTrackRecordPolicies = () => {
  return createTablePolicies('track_record');
};

/**
 * 현재 사용자 인증 상태 확인
 * Cognito 세션 기반으로 확인
 */
export const checkUserAuthStatus = async () => {
  try {
    const { data, error } = await getSession();
    
    if (error) {
      console.error('사용자 인증 상태 확인 실패:', error);
      return { isAuthenticated: false, user: null, error };
    }
    
    const session = data?.session;
    const user = session?.user || null;
    const isAuthenticated = !!session;
    
    console.log('현재 사용자:', user);
    console.log('인증 상태:', isAuthenticated);
    
    return { isAuthenticated, user, error: null };
  } catch (error) {
    console.error('인증 상태 확인 중 오류:', error);
    return { isAuthenticated: false, user: null, error };
  }
};

/**
 * Storage 정책 설정 안내 (no-op)
 * AWS S3 버킷 정책은 CloudFormation으로 설정됨
 */
export const setupStoragePolicies = () => {
  console.log('AWS S3 버킷 정책은 CloudFormation 템플릿으로 관리됩니다.');
  return [];
};
