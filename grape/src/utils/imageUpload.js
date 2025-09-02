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

// 이미지 파일을 WebP로 변환
export const convertImageToWebP = async (file, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            URL.revokeObjectURL(url);
            if (!blob) return reject(new Error('WebP 변환 실패'));
            resolve(blob);
          }, 'image/webp', quality);
        } catch (err) {
          URL.revokeObjectURL(url);
          reject(err);
        }
      };
      img.onerror = (err) => {
        URL.revokeObjectURL(url);
        reject(new Error('이미지 로드 실패'));
      };
      img.src = url;
    } catch (err) {
      reject(err);
    }
  });
};

// Supabase Storage에 이미지 업로드
export const uploadImage = async (file, folder = 'track_record', bucket = 'track_record', token = null) => {
  try {
    // 파일 검증 (50MB까지 허용)
    validateImageFile(file, 50);
    
    // Supabase 클라이언트 확인
    if (!supabase) {
      throw new Error('Supabase 클라이언트가 초기화되지 않았습니다.');
    }

    // 토큰이 제공된 경우 세션 설정
    if (token) {
      await supabase.auth.setSession({
        access_token: token,
        refresh_token: token // 임시로 같은 토큰 사용
      });
    }

    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('파일 정보:', { name: file.name, size: file.size, type: file.type });
    
    // WebP 변환 시도 (이미 변환된 파일은 그대로 사용)
    let uploadFile = file;
    try {
      const webpBlob = await convertImageToWebP(file, 0.8);
      const webpName = file.name.replace(/\.[^/.]+$/, '.webp');
      uploadFile = new File([webpBlob], webpName, { type: 'image/webp' });
      console.log('이미지 WebP로 변환됨:', webpName);
    } catch (err) {
      console.warn('WebP 변환 실패, 원본 파일로 업로드합니다:', err);
      uploadFile = file;
    }

    // 고유한 파일명 생성
    const fileExt = uploadFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    
    console.log('업로드 경로:', filePath);
    console.log('사용 버킷:', bucket);
    
    // Supabase Storage에 업로드
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, uploadFile, {
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

// 여러 이미지 업로드 (thumbnail 기능 포함)
export const uploadMultipleImages = async (files, folder = 'track_record', bucket = 'track_record', token = null) => {
  const uploadPromises = files.map(file => uploadImage(file, folder, bucket, token));
  const uploadedUrls = await Promise.all(uploadPromises);

  // 첫 번째 이미지 URL을 thumbnail로 반환
  const result = {
    images: uploadedUrls,
    thumbnail: uploadedUrls.length > 0 ? uploadedUrls[0] : null
  };

  console.log('업로드된 이미지들:', uploadedUrls);
  console.log('썸네일로 설정된 이미지:', result.thumbnail);

  return result;
};

// 이미지 삭제
export const deleteImage = async (filePath, token = null) => {
  try {
    // 토큰이 제공된 경우 세션 설정
    if (token) {
      await supabase.auth.setSession({
        access_token: token,
        refresh_token: token // 임시로 같은 토큰 사용
      });
    }

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
export const checkStorageBucket = async (bucketName = 'track_record') => {
  try {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) {
      console.error('버킷 목록 조회 실패:', error);
      return false;
    }

    const bucketExists = data.some(bucket => bucket.name === bucketName);
    console.log(`${bucketName} 버킷 존재:`, bucketExists);
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
    console.log('URL 파싱 시작:', url);
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    console.log('파싱된 경로 파트들:', pathParts);

    // Supabase Storage URL 패턴들:
    // 1. https://xxx.supabase.co/storage/v1/object/public/bucket/folder/filename
    // 2. https://xxx.supabase.co/bucket/folder/filename
    // 3. https://xxx.supabase.co/storage/v1/object/public/bucket/folder/filename

    // 첫 번째 패턴: /storage/v1/object/public/bucket/... 형태
    if (pathParts.includes('storage') && pathParts.includes('v1') && pathParts.includes('object') && pathParts.includes('public')) {
      const publicIndex = pathParts.indexOf('public');
      if (publicIndex !== -1 && publicIndex + 1 < pathParts.length) {
        const result = pathParts.slice(publicIndex + 1).join('/');
        console.log('Storage URL에서 추출된 파일 경로 (패턴1):', result);

        // 버킷 이름이 중복되는 경우 제거
        // 예: product/product/1756797917620-d0pzn9g1h98.webp -> product/1756797917620-d0pzn9g1h98.webp
        const bucketNames = ['track_record', 'product'];
        for (const bucketName of bucketNames) {
          if (result.startsWith(`${bucketName}/${bucketName}/`)) {
            const correctedResult = result.substring(bucketName.length + 1); // bucketName/ 제거
            console.log('버킷 중복 제거 후 파일 경로:', correctedResult);
            return correctedResult;
          }
        }

        return result;
      }
    }

    // 두 번째 패턴: 버킷이 직접 경로에 있는 경우
    // 예: /track_record/product/12345.jpg 또는 /product/images/abc.jpg
    const bucketIndex = pathParts.findIndex(part => part === 'track_record' || part === 'product');
    if (bucketIndex !== -1 && bucketIndex + 1 < pathParts.length) {
      const result = pathParts.slice(bucketIndex + 1).join('/');
      console.log('버킷 기반으로 추출된 파일 경로 (패턴2):', result);
      return result;
    }

    // 세 번째 패턴: URL에서 마지막 슬래시 이후의 부분을 파일명으로 간주
    // 예: https://xxx.supabase.co/storage/v1/object/public/bucket/folder/file.jpg
    const lastPart = pathParts[pathParts.length - 1];
    if (lastPart && lastPart.includes('.')) {
      // 파일명이 있는 경우, 전체 경로에서 bucket 다음 부분을 추출
      const fullPath = pathParts.join('/');
      const bucketName = 'product'; // 현재 컨텍스트에서 사용하는 버킷

      // URL에서 bucket 이후의 경로 추출
      if (fullPath.includes(`/${bucketName}/`)) {
        const result = fullPath.split(`/${bucketName}/`)[1];
        console.log('파일명 기반으로 추출된 파일 경로 (패턴3):', result);
        return result;
      }
    }

    console.warn('URL에서 파일 경로를 추출할 수 없습니다. URL 형식:', url);
    console.warn('지원되는 URL 형식:');
    console.warn('1. /storage/v1/object/public/bucket/folder/filename');
    console.warn('2. /bucket/folder/filename');
    return null;
  } catch (error) {
    console.error('URL 파싱 실패:', error, 'URL:', url);
    return null;
  }
};

// 게시글 삭제 시 관련된 모든 이미지와 파일 삭제
export const deleteAllPostFiles = async (postData, tableName = 'Track_record', token = null) => {
  try {
    const bucket = tableName === 'Product' ? 'product' : 'track_record';
    const filesToDelete = [];
    
    console.log('삭제 시작 - 테이블:', tableName, '버킷:', bucket);
    console.log('삭제할 게시글 데이터:', postData);

    // 1. 메인 이미지들 삭제
    if (postData.images) {
      try {
        const images = typeof postData.images === 'string' ? JSON.parse(postData.images) : postData.images;
        console.log('메인 이미지들:', images);
        images.forEach((imageUrl, index) => {
          console.log(`메인 이미지 ${index + 1}:`, imageUrl);
          const filePath = extractFilePathFromUrl(imageUrl);
          console.log(`추출된 파일 경로 ${index + 1}:`, filePath);
          if (filePath) {
            filesToDelete.push(filePath);
          }
        });
      } catch (error) {
        console.warn('메인 이미지 파싱 실패:', error);
      }
    }

    // 2. 제품 전용 이미지들 삭제 (Product 테이블인 경우)
    if (tableName === 'Product') {
      console.log('제품 전용 이미지 삭제 시작');
      
      // 주요 기능 이미지들
      if (postData.keyFeatures) {
        try {
          const keyFeatures = typeof postData.keyFeatures === 'string' ? JSON.parse(postData.keyFeatures) : postData.keyFeatures;
          console.log('주요 기능 데이터:', keyFeatures);
          if (keyFeatures.images) {
            console.log('주요 기능 이미지들:', keyFeatures.images);
            keyFeatures.images.forEach((imageObj, index) => {
              console.log(`주요 기능 이미지 ${index + 1}:`, imageObj);
              if (imageObj.url) {
                const filePath = extractFilePathFromUrl(imageObj.url);
                console.log(`주요 기능 파일 경로 ${index + 1}:`, filePath);
                if (filePath) {
                  filesToDelete.push(filePath);
                }
              }
            });
          }
        } catch (error) {
          console.warn('주요 기능 이미지 파싱 실패:', error);
        }
      }

      // 사양 이미지들
      if (postData.specifications) {
        try {
          const specifications = typeof postData.specifications === 'string' ? JSON.parse(postData.specifications) : postData.specifications;
          console.log('사양 이미지들:', specifications);
          specifications.forEach((imageObj, index) => {
            console.log(`사양 이미지 ${index + 1}:`, imageObj);
            if (imageObj.url) {
              const filePath = extractFilePathFromUrl(imageObj.url);
              console.log(`사양 파일 경로 ${index + 1}:`, filePath);
              if (filePath) {
                filesToDelete.push(filePath);
              }
            }
          });
        } catch (error) {
          console.warn('사양 이미지 파싱 실패:', error);
        }
      }

      // 인증 이미지들
      if (postData.certifications) {
        try {
          const certifications = typeof postData.certifications === 'string' ? JSON.parse(postData.certifications) : postData.certifications;
          console.log('인증 이미지들:', certifications);
          certifications.forEach((imageObj, index) => {
            console.log(`인증 이미지 ${index + 1}:`, imageObj);
            if (imageObj.url) {
              const filePath = extractFilePathFromUrl(imageObj.url);
              console.log(`인증 파일 경로 ${index + 1}:`, filePath);
              if (filePath) {
                filesToDelete.push(filePath);
              }
            }
          });
        } catch (error) {
          console.warn('인증 이미지 파싱 실패:', error);
        }
      }

      // 다운로드 파일들
      if (postData.downloads) {
        try {
          const downloads = typeof postData.downloads === 'string' ? JSON.parse(postData.downloads) : postData.downloads;
          console.log('다운로드 파일들:', downloads);
          downloads.forEach((download, index) => {
            console.log(`다운로드 ${index + 1}:`, download);
            if (download.link && download.file) {
              const filePath = extractFilePathFromUrl(download.link);
              console.log(`다운로드 파일 경로 ${index + 1}:`, filePath);
              if (filePath) {
                filesToDelete.push(filePath);
              }
            }
          });
        } catch (error) {
          console.warn('다운로드 파일 파싱 실패:', error);
        }
      }
    }

    // 3. 실제 파일 삭제 실행
    if (filesToDelete.length > 0) {
      console.log(`삭제할 파일들 (${filesToDelete.length}개):`, filesToDelete);
      console.log('사용할 버킷:', bucket);

      // 토큰이 제공된 경우 세션 설정
      if (token) {
        await supabase.auth.setSession({
          access_token: token,
          refresh_token: token // 임시로 같은 토큰 사용
        });
      }

      const { data, error } = await supabase.storage
        .from(bucket)
        .remove(filesToDelete);
      
      if (error) {
        console.error('파일 삭제 중 오류:', error);
        console.error('삭제 시도한 파일들:', filesToDelete);
        console.error('사용한 버킷:', bucket);
        throw new Error(`파일 삭제 중 오류가 발생했습니다: ${error.message}`);
      }
      
      console.log('삭제 결과:', data);
      console.log(`${filesToDelete.length}개의 파일이 성공적으로 삭제되었습니다.`);
    } else {
      console.log('삭제할 파일이 없습니다.');
    }

    return true;
  } catch (error) {
    console.error('게시글 관련 파일 삭제 실패:', error);
    throw new Error(`게시글 관련 파일 삭제에 실패했습니다: ${error.message}`);
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
export const uploadDownloadFile = async (file, folder = 'downloads', bucket = 'track_record', token = null) => {
  try {
    // 파일 검증 (100MB까지 허용)
    validateDownloadFile(file, 100);
    
    // Supabase 클라이언트 확인
    if (!supabase) {
      throw new Error('Supabase 클라이언트가 초기화되지 않았습니다.');
    }

    // 토큰이 제공된 경우 세션 설정
    if (token) {
      await supabase.auth.setSession({
        access_token: token,
        refresh_token: token // 임시로 같은 토큰 사용
      });
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
export const deleteDownloadFile = async (filePath, token = null) => {
  try {
    // 토큰이 제공된 경우 세션 설정
    if (token) {
      await supabase.auth.setSession({
        access_token: token,
        refresh_token: token // 임시로 같은 토큰 사용
      });
    }

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

// 디버깅용: URL에서 파일 경로 추출 테스트
export const testExtractFilePath = (url) => {
  console.log('테스트 URL:', url);
  const result = extractFilePathFromUrl(url);
  console.log('추출된 파일 경로:', result);
  return result;
};

// 디버깅용: 게시글 데이터 분석
export const analyzePostData = (postData, tableName) => {
  console.log('=== 게시글 데이터 분석 ===');
  console.log('테이블명:', tableName);
  console.log('전체 데이터:', postData);
  
  if (postData.images) {
    console.log('메인 이미지 필드:', postData.images);
    try {
      const images = typeof postData.images === 'string' ? JSON.parse(postData.images) : postData.images;
      console.log('파싱된 메인 이미지들:', images);
    } catch (error) {
      console.error('메인 이미지 파싱 실패:', error);
    }
  }
  
  if (tableName === 'Product') {
    if (postData.keyFeatures) {
      console.log('주요 기능 필드:', postData.keyFeatures);
      try {
        const keyFeatures = typeof postData.keyFeatures === 'string' ? JSON.parse(postData.keyFeatures) : postData.keyFeatures;
        console.log('파싱된 주요 기능:', keyFeatures);
      } catch (error) {
        console.error('주요 기능 파싱 실패:', error);
      }
    }
    
    if (postData.specifications) {
      console.log('사양 필드:', postData.specifications);
      try {
        const specifications = typeof postData.specifications === 'string' ? JSON.parse(postData.specifications) : postData.specifications;
        console.log('파싱된 사양:', specifications);
      } catch (error) {
        console.error('사양 파싱 실패:', error);
      }
    }
    
    if (postData.certifications) {
      console.log('인증 필드:', postData.certifications);
      try {
        const certifications = typeof postData.certifications === 'string' ? JSON.parse(postData.certifications) : postData.certifications;
        console.log('파싱된 인증:', certifications);
      } catch (error) {
        console.error('인증 파싱 실패:', error);
      }
    }
    
    if (postData.downloads) {
      console.log('다운로드 필드:', postData.downloads);
      try {
        const downloads = typeof postData.downloads === 'string' ? JSON.parse(postData.downloads) : postData.downloads;
        console.log('파싱된 다운로드:', downloads);
      } catch (error) {
        console.error('다운로드 파싱 실패:', error);
      }
    }
  }
  
  console.log('=== 분석 완료 ===');
};
