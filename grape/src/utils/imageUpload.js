import { supabase } from '../lib/supabase';

// 이미지 파일 검증
export const validateImageFile = (file, maxSizeMB = 50) => {
  const maxSize = maxSizeMB * 1024 * 1024; // MB를 바이트로 변환
  
  if (!file) {
    throw new Error('파일을 선택해주세요.');
  }
  
  if (!file.type.startsWith('image/')) {
    throw new Error('이미지 파일만 업로드 가능합니다.');
  }
  
  if (file.size > maxSize) {
    throw new Error(`파일 크기는 ${maxSizeMB}MB 이하여야 합니다.`);
  }
  
  return true;
};

// Supabase Storage에 이미지 업로드
export const uploadImage = async (file, folder = 'track_record', bucket = 'track_record') => {
  try {
    // 파일 검증 (50MB까지 허용)
    validateImageFile(file, 50);
    
    // Supabase 클라이언트 확인
    if (!supabase) {
      throw new Error('Supabase 클라이언트가 초기화되지 않았습니다.');
    }
    
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('파일 정보:', { name: file.name, size: file.size, type: file.type });
    
    // 고유한 파일명 생성
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    
    console.log('업로드 경로:', filePath);
    console.log('사용 버킷:', bucket);
    
    // Supabase Storage에 업로드
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Storage 업로드 오류:', error);
      
      // 버킷이 없는 경우 안내
      if (error.message.includes('Bucket not found')) {
        throw new Error('Storage 버킷이 생성되지 않았습니다. Supabase 대시보드에서 "track_record" 버킷을 생성해주세요.');
      }
      
      // 권한 오류인 경우 안내
      if (error.message.includes('permission') || error.message.includes('policy')) {
        throw new Error('Storage 접근 권한이 없습니다. Storage 정책을 설정해주세요.');
      }
      
      // 네트워크 오류인 경우 안내
      if (error.message.includes('fetch') || error.message.includes('network')) {
        throw new Error('네트워크 연결을 확인해주세요.');
      }
      
      throw error;
    }
    
    console.log('업로드 성공:', data);
    
    // 공개 URL 생성
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    console.log('공개 URL:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw new Error(`이미지 업로드에 실패했습니다: ${error.message}`);
  }
};

// 여러 이미지 업로드
export const uploadMultipleImages = async (files, folder = 'track_record') => {
  const uploadPromises = files.map(file => uploadImage(file, folder));
  return Promise.all(uploadPromises);
};

// 이미지 삭제
export const deleteImage = async (filePath) => {
  try {
    const { error } = await supabase.storage
      .from('track_record')
      .remove([filePath]);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('이미지 삭제 실패:', error);
    throw new Error(`이미지 삭제에 실패했습니다: ${error.message}`);
  }
};

// Storage 버킷 존재 확인
export const checkStorageBucket = async () => {
  try {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) {
      console.error('버킷 목록 조회 실패:', error);
      return false;
    }
    
    const bucketExists = data.some(bucket => bucket.name === 'track_record');
    console.log('track_record 버킷 존재:', bucketExists);
    console.log('사용 가능한 버킷:', data.map(b => b.name));
    
    return bucketExists;
  } catch (error) {
    console.error('버킷 확인 실패:', error);
    return false;
  }
};

// URL에서 파일 경로 추출
export const extractFilePathFromUrl = (url) => {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const bucketIndex = pathParts.findIndex(part => part === 'track_record');
    if (bucketIndex !== -1 && bucketIndex + 1 < pathParts.length) {
      return pathParts.slice(bucketIndex + 1).join('/');
    }
    return null;
  } catch (error) {
    console.error('URL 파싱 실패:', error);
    return null;
  }
};

// 다운로드 파일 검증
export const validateDownloadFile = (file, maxSizeMB = 100) => {
  const maxSize = maxSizeMB * 1024 * 1024; // MB를 바이트로 변환
  
  if (!file) {
    throw new Error('파일을 선택해주세요.');
  }
  
  if (file.size > maxSize) {
    throw new Error(`파일 크기는 ${maxSizeMB}MB 이하여야 합니다.`);
  }
  
  return true;
};

// Supabase Storage에 다운로드 파일 업로드
export const uploadDownloadFile = async (file, folder = 'downloads', bucket = 'track_record') => {
  try {
    // 파일 검증 (100MB까지 허용)
    validateDownloadFile(file, 100);
    
    // Supabase 클라이언트 확인
    if (!supabase) {
      throw new Error('Supabase 클라이언트가 초기화되지 않았습니다.');
    }
    
    console.log('다운로드 파일 정보:', { name: file.name, size: file.size, type: file.type });
    
    // 고유한 파일명 생성
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    
    console.log('다운로드 파일 업로드 경로:', filePath);
    console.log('사용 버킷:', bucket);
    
    // Supabase Storage에 업로드
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('다운로드 파일 업로드 오류:', error);
      
      // 버킷이 없는 경우 안내
      if (error.message.includes('Bucket not found')) {
        throw new Error('Storage 버킷이 생성되지 않았습니다. Supabase 대시보드에서 "track_record" 버킷을 생성해주세요.');
      }
      
      // 권한 오류인 경우 안내
      if (error.message.includes('permission') || error.message.includes('policy')) {
        throw new Error('Storage 접근 권한이 없습니다. Storage 정책을 설정해주세요.');
      }
      
      // 네트워크 오류인 경우 안내
      if (error.message.includes('fetch') || error.message.includes('network')) {
        throw new Error('네트워크 연결을 확인해주세요.');
      }
      
      throw error;
    }
    
    console.log('다운로드 파일 업로드 성공:', data);
    
    // 공개 URL 생성
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    console.log('다운로드 파일 공개 URL:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('다운로드 파일 업로드 실패:', error);
    throw new Error(`다운로드 파일 업로드에 실패했습니다: ${error.message}`);
  }
};

// 다운로드 파일 삭제
export const deleteDownloadFile = async (filePath) => {
  try {
    const { error } = await supabase.storage
      .from('track_record')
      .remove([filePath]);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('다운로드 파일 삭제 실패:', error);
    throw new Error(`다운로드 파일 삭제에 실패했습니다: ${error.message}`);
  }
};
