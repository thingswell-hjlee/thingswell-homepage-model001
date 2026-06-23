/**
 * AWS S3 스토리지 모듈
 * Supabase Storage를 대체하여 S3 Presigned URL 방식으로 파일 업로드/삭제/조회
 */

import { getAccessToken } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const UPLOAD_BUCKET_URL = import.meta.env.VITE_UPLOAD_BUCKET_URL;

/**
 * Presigned URL 요청 (Lambda를 통해 생성)
 * @param {string} fileName - 파일명
 * @param {string} fileType - MIME 타입
 * @param {string} folder - S3 폴더 경로
 * @returns {{ data: { uploadUrl, key }, error }}
 */
export const getPresignedUrl = async (fileName, fileType, folder = 'uploads') => {
  try {
    const token = await getAccessToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/upload/presigned-url`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        fileName,
        fileType,
        folder,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { data: null, error: { message: data.error || 'Presigned URL 생성 실패' } };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: { message: error.message || '네트워크 오류' } };
  }
};

/**
 * 파일을 S3에 업로드 (Presigned URL 사용)
 * @param {File|Blob} file - 업로드할 파일
 * @param {string} folder - S3 폴더 경로
 * @returns {{ data: { key, publicUrl }, error }}
 */
export const uploadFile = async (file, folder = 'uploads') => {
  try {
    // 고유한 파일명 생성
    const fileExt = file.name ? file.name.split('.').pop() : 'bin';
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const fileType = file.type || 'application/octet-stream';

    // Presigned URL 요청
    const { data: presignedData, error: presignedError } = await getPresignedUrl(
      uniqueName,
      fileType,
      folder
    );

    if (presignedError) {
      return { data: null, error: presignedError };
    }

    const { uploadUrl, key } = presignedData;

    // S3에 직접 업로드
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': fileType,
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      return { data: null, error: { message: `S3 업로드 실패: HTTP ${uploadResponse.status}` } };
    }

    // 공개 URL 생성
    const publicUrl = getPublicUrl(key);

    return { data: { key, publicUrl }, error: null };
  } catch (error) {
    return { data: null, error: { message: error.message || '파일 업로드 실패' } };
  }
};

/**
 * 파일의 공개 URL 생성
 * @param {string} key - S3 오브젝트 키
 * @returns {string} 공개 접근 URL
 */
export const getPublicUrl = (key) => {
  if (!key) return '';
  // 이미 전체 URL인 경우 그대로 반환
  if (key.startsWith('http://') || key.startsWith('https://')) {
    return key;
  }
  return `${UPLOAD_BUCKET_URL}/${key}`;
};

/**
 * S3에서 파일 삭제 (API를 통해)
 * @param {string} key - S3 오브젝트 키 또는 전체 URL
 * @returns {{ data, error }}
 */
export const deleteFile = async (key) => {
  try {
    // URL에서 키 추출
    let fileKey = key;
    if (key && key.startsWith('http')) {
      try {
        const url = new URL(key);
        fileKey = url.pathname.startsWith('/') ? url.pathname.substring(1) : url.pathname;
      } catch (e) {
        // URL 파싱 실패시 그대로 사용
      }
    }

    const token = await getAccessToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/upload/delete`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ key: fileKey }),
    });

    if (!response.ok) {
      const data = await response.json();
      return { data: null, error: { message: data.error || '파일 삭제 실패' } };
    }

    return { data: { message: '삭제 완료' }, error: null };
  } catch (error) {
    return { data: null, error: { message: error.message || '파일 삭제 실패' } };
  }
};

/**
 * 여러 파일 삭제
 * @param {string[]} keys - S3 오브젝트 키 배열
 * @returns {{ data, error }}
 */
export const deleteFiles = async (keys) => {
  try {
    const results = await Promise.allSettled(
      keys.map((key) => deleteFile(key))
    );

    const errors = results
      .filter((r) => r.status === 'rejected' || r.value?.error)
      .map((r) => r.reason || r.value?.error);

    if (errors.length > 0) {
      console.warn('일부 파일 삭제 실패:', errors);
    }

    return { data: { deleted: keys.length - errors.length, failed: errors.length }, error: null };
  } catch (error) {
    return { data: null, error: { message: error.message || '파일 삭제 실패' } };
  }
};

const storage = {
  getPresignedUrl,
  uploadFile,
  getPublicUrl,
  deleteFile,
  deleteFiles,
};

export default storage;
