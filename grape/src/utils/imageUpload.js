import { uploadFile, getPublicUrl, deleteFile, deleteFiles } from '../lib/storage';

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
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('이미지 로드 실패'));
      };
      img.src = url;
    } catch (err) {
      reject(err);
    }
  });
};

// S3에 이미지 업로드
export const uploadImage = async (file, folder = 'track_record', bucket = 'track_record', token = null) => {
  try {
    // 파일 검증 (50MB까지 허용)
    validateImageFile(file, 50);

    console.log('파일 정보:', { name: file.name, size: file.size, type: file.type });
    
    // WebP 변환 시도 (이미 변환된 파일은 그대로 사용)
    let fileToUpload = file;
    try {
      const webpBlob = await convertImageToWebP(file, 0.8);
      const webpName = file.name.replace(/\.[^/.]+$/, '.webp');
      fileToUpload = new File([webpBlob], webpName, { type: 'image/webp' });
      console.log('이미지 WebP로 변환됨:', webpName);
    } catch (err) {
      console.warn('WebP 변환 실패, 원본 파일로 업로드합니다:', err);
      fileToUpload = file;
    }

    // S3 폴더 경로 결정 (bucket/folder 조합)
    const s3Folder = `${bucket}/${folder}`;
    
    console.log('업로드 폴더:', s3Folder);
    
    // S3에 업로드 (Presigned URL 방식)
    const { data, error } = await uploadFile(fileToUpload, s3Folder);
    
    if (error) {
      console.error('Storage 업로드 오류:', error);
      throw new Error(error.message || '업로드 실패');
    }
    
    console.log('업로드 성공:', data);
    console.log('공개 URL:', data.publicUrl);
    
    return data.publicUrl;
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
    const { error } = await deleteFile(filePath);
    
    if (error) {
      throw new Error(error.message || '삭제 실패');
    }
    
    return true;
  } catch (error) {
    console.error('이미지 삭제 실패:', error);
    throw new Error(`이미지 삭제에 실패했습니다: ${error.message}`);
  }
};

// Storage 버킷 존재 확인 (AWS에서는 항상 true 반환)
export const checkStorageBucket = async (bucketName = 'track_record') => {
  // AWS S3 버킷은 CloudFormation으로 배포시 항상 존재
  console.log(`${bucketName} 버킷 확인: AWS S3 사용 중`);
  return true;
};

// URL에서 파일 경로 추출
export const extractFilePathFromUrl = (url) => {
  try {
    console.log('URL 파싱 시작:', url);
    const urlObj = new URL(url);
    
    // S3 URL 패턴: https://bucket.s3.region.amazonaws.com/key
    // CloudFront URL 패턴: https://xxxxx.cloudfront.net/key
    const pathname = urlObj.pathname;
    
    // 첫 번째 '/' 제거
    const key = pathname.startsWith('/') ? pathname.substring(1) : pathname;
    
    if (key) {
      console.log('추출된 파일 키:', key);
      return key;
    }

    // Supabase Storage URL 패턴 (하위호환)
    const pathParts = pathname.split('/');
    if (pathParts.includes('storage') && pathParts.includes('public')) {
      const publicIndex = pathParts.indexOf('public');
      if (publicIndex !== -1 && publicIndex + 1 < pathParts.length) {
        const result = pathParts.slice(publicIndex + 1).join('/');
        console.log('Supabase URL에서 추출된 파일 경로:', result);

        const bucketNames = ['track_record', 'product'];
        for (const bucketName of bucketNames) {
          if (result.startsWith(`${bucketName}/${bucketName}/`)) {
            const correctedResult = result.substring(bucketName.length + 1);
            return correctedResult;
          }
        }
        return result;
      }
    }

    console.warn('URL에서 파일 경로를 추출할 수 없습니다:', url);
    return null;
  } catch (error) {
    console.error('URL 파싱 실패:', error, 'URL:', url);
    return null;
  }
};

// 게시글 삭제 시 관련된 모든 이미지와 파일 삭제
export const deleteAllPostFiles = async (postData, tableName = 'Track_record', token = null) => {
  try {
    const filesToDelete = [];
    
    console.log('삭제 시작 - 테이블:', tableName);
    console.log('삭제할 게시글 데이터:', postData);

    // 1. 메인 이미지들 삭제
    if (postData.images) {
      try {
        const images = typeof postData.images === 'string' ? JSON.parse(postData.images) : postData.images;
        console.log('메인 이미지들:', images);
        images.forEach((imageUrl) => {
          const filePath = extractFilePathFromUrl(imageUrl);
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
      // 주요 기능 이미지들
      if (postData.keyFeatures) {
        try {
          const keyFeatures = typeof postData.keyFeatures === 'string' ? JSON.parse(postData.keyFeatures) : postData.keyFeatures;
          if (keyFeatures.images) {
            keyFeatures.images.forEach((imageObj) => {
              if (imageObj.url) {
                const filePath = extractFilePathFromUrl(imageObj.url);
                if (filePath) filesToDelete.push(filePath);
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
          specifications.forEach((imageObj) => {
            if (imageObj.url) {
              const filePath = extractFilePathFromUrl(imageObj.url);
              if (filePath) filesToDelete.push(filePath);
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
          certifications.forEach((imageObj) => {
            if (imageObj.url) {
              const filePath = extractFilePathFromUrl(imageObj.url);
              if (filePath) filesToDelete.push(filePath);
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
          downloads.forEach((download) => {
            if (download.link && download.file) {
              const filePath = extractFilePathFromUrl(download.link);
              if (filePath) filesToDelete.push(filePath);
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

      const { error } = await deleteFiles(filesToDelete);
      
      if (error) {
        console.error('파일 삭제 중 오류:', error);
        throw new Error(`파일 삭제 중 오류가 발생했습니다: ${error.message}`);
      }
      
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

// S3에 다운로드 파일 업로드
export const uploadDownloadFile = async (file, folder = 'downloads', bucket = 'track_record', token = null) => {
  try {
    // 파일 검증 (100MB까지 허용)
    validateDownloadFile(file, 100);

    console.log('다운로드 파일 정보:', { name: file.name, size: file.size, type: file.type });
    
    // S3 폴더 경로 결정
    const s3Folder = `${bucket}/${folder}`;
    
    console.log('다운로드 파일 업로드 폴더:', s3Folder);
    
    // S3에 업로드 (Presigned URL 방식)
    const { data, error } = await uploadFile(file, s3Folder);
    
    if (error) {
      console.error('다운로드 파일 업로드 오류:', error);
      throw new Error(error.message || '업로드 실패');
    }
    
    console.log('다운로드 파일 업로드 성공:', data);
    console.log('다운로드 파일 공개 URL:', data.publicUrl);
    
    return data.publicUrl;
  } catch (error) {
    console.error('다운로드 파일 업로드 실패:', error);
    throw new Error(`다운로드 파일 업로드에 실패했습니다: ${error.message}`);
  }
};

// 다운로드 파일 삭제
export const deleteDownloadFile = async (filePath, token = null) => {
  try {
    const { error } = await deleteFile(filePath);
    
    if (error) {
      throw new Error(error.message || '삭제 실패');
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
    }
    if (postData.specifications) {
      console.log('사양 필드:', postData.specifications);
    }
    if (postData.certifications) {
      console.log('인증 필드:', postData.certifications);
    }
    if (postData.downloads) {
      console.log('다운로드 필드:', postData.downloads);
    }
  }
  
  console.log('=== 분석 완료 ===');
};
