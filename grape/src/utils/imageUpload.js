import { supabase } from '../lib/supabase';

// 이미지 파일 검증
export const validateImageFile = (file, maxSizeMB = 5) => {
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
export const uploadImage = async (file, folder = 'track_record') => {
  // 개발 중이거나 Storage 설정이 안된 경우 Base64 사용
  if (process.env.NODE_ENV === 'development' || !process.env.REACT_APP_USE_STORAGE) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(new Error('파일 읽기 실패'));
      reader.readAsDataURL(file);
    });
  }
  try {
    // 파일 검증
    validateImageFile(file);
    
    // 고유한 파일명 생성
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    
    // Supabase Storage에 업로드
    const { data, error } = await supabase.storage
      .from('track_record')
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
      
      throw error;
    }
    
    // 공개 URL 생성
    const { data: { publicUrl } } = supabase.storage
      .from('track_record')
      .getPublicUrl(filePath);
    
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
