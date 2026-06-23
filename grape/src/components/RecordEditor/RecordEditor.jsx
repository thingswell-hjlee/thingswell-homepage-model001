import React, { useState, useEffect, useRef } from 'react';
import { uploadImage, uploadMultipleImages, validateImageFile, checkStorageBucket, uploadDownloadFile, validateDownloadFile, extractFilePathFromUrl } from '../../utils/imageUpload';
import { setupStoragePolicies } from '../../utils/supabaseRLS';
import { deleteFile, deleteFiles } from '../../lib/storage';
import './RecordEditor.css';

const RecordEditor = ({ 
  isEditMode = false, 
  editData = null, 
  onSave, 
  onCancel, 
  isModal = false,
  submitting = false,
  mode = 'record', // 'record', 'product', 또는 'case'
  tableName = 'Track_record' // 'Track_record' 또는 'Product'
}) => {
  // 모달이 열렸을 때 body에 클래스 추가하여 메뉴 숨김
  useEffect(() => {
    if (isModal) {
      document.body.classList.add('modal-open');
      return () => {
        document.body.classList.remove('modal-open');
      };
    }
  }, [isModal]);

  // NOTE: 컴포넌트 언마운트 시 업로드된 파일들 정리는 formData 선언 이후에 정의합니다.
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // 임시 업로드 파일들 (실제 업로드는 저장 시점에 수행)
  const [tempUploadFiles, setTempUploadFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    overview_title: '',
    date: '',
    orderer: '',
    type: '',
    kind: mode === 'product' ? '스마트안전' : (mode === 'case' ? '케이스' : ''),
    images: [],
    // 제품 전용 필드들
    keyFeatures: {
      description: '',
      features: ['', '', '', ''], // 주요 기능 목록 (4개)
      images: [] // 각 이미지는 { url: '', caption: '' } 형태로 저장
    },

    specifications: [], // 이미지 배열로 변경
    certifications: [], // 이미지 배열로 변경
    downloads: [
      { title: '', description: '', link: '', file: null }
    ],
    videos: [] // 링크 배열로 변경
  });

  // 최신 formData 레퍼런스 (언마운트 시 안전하게 접근하기 위함)
  const latestFormDataRef = useRef(formData);
  useEffect(() => {
    latestFormDataRef.current = formData;
  }, [formData]);

  // 컴포넌트 언마운트 시 업로드된 파일들 정리 (formData가 선언된 이후에 정의)
  useEffect(() => {
    return () => {
      const fd = latestFormDataRef.current;
      // 편집 모드가 아닌 경우에만 업로드된 파일들을 삭제
      if (!editData && (fd.images?.length > 0 ||
          ((mode === 'product' || mode === 'case') && (
            fd.keyFeatures?.images?.length > 0 ||
            fd.specifications?.length > 0 ||
            fd.certifications?.length > 0 ||
            fd.downloads?.some(d => d.file)
          )))) {
        (async () => {
          try {
            console.log('컴포넌트 언마운트 시 업로드된 파일들 정리 시작');
            const bucket = mode === 'product' ? 'product' : 'track_record'; // case도 track_record 사용
            const filesToDelete = [];

            // 1. 메인 이미지들 삭제
            if (fd.images && fd.images.length > 0) {
              fd.images.forEach(imageUrl => {
                const filePath = extractFilePathFromUrl(imageUrl);
                if (filePath) {
                  filesToDelete.push(filePath);
                }
              });
            }

            // 2. 제품 전용 이미지들 삭제 (Product 모드인 경우)
            if (mode === 'product') {
              // 주요 기능 이미지들
              if (fd.keyFeatures && fd.keyFeatures.images) {
                fd.keyFeatures.images.forEach(imageObj => {
                  if (imageObj.url) {
                    const filePath = extractFilePathFromUrl(imageObj.url);
                    if (filePath) {
                      filesToDelete.push(filePath);
                    }
                  }
                });
              }

              // 사양 이미지들
              if (fd.specifications) {
                fd.specifications.forEach(imageObj => {
                  if (imageObj.url) {
                    const filePath = extractFilePathFromUrl(imageObj.url);
                    if (filePath) {
                      filesToDelete.push(filePath);
                    }
                  }
                });
              }

              // 인증 이미지들
              if (fd.certifications) {
                fd.certifications.forEach(imageObj => {
                  if (imageObj.url) {
                    const filePath = extractFilePathFromUrl(imageObj.url);
                    if (filePath) {
                      filesToDelete.push(filePath);
                    }
                  }
                });
              }

              // 다운로드 파일들
              if (fd.downloads) {
                fd.downloads.forEach(download => {
                  if (download.link && download.file) {
                    const filePath = extractFilePathFromUrl(download.link);
                    if (filePath) {
                      filesToDelete.push(filePath);
                    }
                  }
                });
              }
            }

            // 3. 실제 파일 삭제 실행
            if (filesToDelete.length > 0) {
              console.log(`언마운트 시 삭제할 파일들 (${filesToDelete.length}개):`, filesToDelete);
              const { error } = await deleteFiles(filesToDelete);
              if (error) {
                console.error('언마운트 시 파일 삭제 중 오류:', error);
              } else {
                console.log(`${filesToDelete.length}개의 파일이 언마운트 시 정리되었습니다.`);
              }
            }
          } catch (error) {
            console.error('언마운트 시 파일 정리 중 오류:', error);
          }
        })();
      }
    };
  }, [editData, mode, tempUploadFiles, formData.images]);

  // 드래그 앤 드롭 유틸리티 함수들
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    // 이미지 배열 재정렬
    const reorderImages = (images) => {
      const newImages = [...images];
      const [draggedItem] = newImages.splice(draggedIndex, 1);
      newImages.splice(dropIndex, 0, draggedItem);
      return newImages;
    };

    setFormData(prev => {
      const newImages = reorderImages(prev.images);

      console.log('이미지 순서 변경 후 thumbnail 업데이트:', {
        변경전이미지들: prev.images,
        변경후이미지들: newImages,
        기존썸네일: prev.thumbnail,
        새로운썸네일: newImages.length > 0 ? newImages[0] : null
      });

      return {
        ...prev,
        images: newImages,
        // 순서 변경 후 첫 번째 이미지를 thumbnail로 설정
        thumbnail: newImages.length > 0 ? newImages[0] : null
      };
    });

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleKeyFeaturesImageDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const reorderImages = (images) => {
      const newImages = [...images];
      const [draggedItem] = newImages.splice(draggedIndex, 1);
      newImages.splice(dropIndex, 0, draggedItem);
      return newImages;
    };

    setFormData(prev => ({
      ...prev,
      keyFeatures: {
        ...prev.keyFeatures,
        images: reorderImages(prev.keyFeatures.images)
      }
    }));

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleSpecificationsImageDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const reorderImages = (images) => {
      const newImages = [...images];
      const [draggedItem] = newImages.splice(draggedIndex, 1);
      newImages.splice(dropIndex, 0, draggedItem);
      return newImages;
    };

    setFormData(prev => ({
      ...prev,
      specifications: reorderImages(prev.specifications)
    }));

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleCertificationsImageDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const reorderImages = (images) => {
      const newImages = [...images];
      const [draggedItem] = newImages.splice(draggedIndex, 1);
      newImages.splice(dropIndex, 0, draggedItem);
      return newImages;
    };

    setFormData(prev => ({
      ...prev,
      certifications: reorderImages(prev.certifications)
    }));

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  useEffect(() => {
    // Storage 버킷 확인 (제품 모드일 때는 'product' 버킷, 그 외에는 'track_record' 버킷)
    const bucketName = mode === 'product' ? 'product' : 'track_record'; // case도 track_record 사용
    checkStorageBucket(bucketName).then(bucketExists => {
      if (!bucketExists) {
        console.warn(`${bucketName} Storage 버킷이 존재하지 않습니다.`);
        console.log(`Storage 설정을 위해 다음 단계를 따라주세요:`);
        console.log(`1. AWS S3 Storage 설정 확인`);
        console.log(`2. "${bucketName}" 버킷 생성`);
        console.log(`3. 버킷 권한 설정 확인`);
        setupStoragePolicies();
      } else {
        console.log(`${bucketName} 버킷이 정상적으로 존재합니다.`);
      }
    });

    // URL 파싱 테스트 (개발용)
    if (editData && editData.images) {
      console.log('=== URL 파싱 테스트 시작 ===');
      try {
        const images = Array.isArray(editData.images) ? editData.images : JSON.parse(editData.images || '[]');
        images.forEach((imageUrl, index) => {
          console.log(`이미지 ${index + 1} URL:`, imageUrl);
          const filePath = extractFilePathFromUrl(imageUrl);
          console.log(`추출된 파일 경로:`, filePath);
        });
      } catch (error) {
        console.error('URL 파싱 테스트 실패:', error);
      }
      console.log('=== URL 파싱 테스트 종료 ===');
    }

    if (editData) {
      setFormData({
        title: editData.title || '',
        desc: editData.desc || '',
        overview_title: editData.overview_title || '',
        date: editData.date || '',
        orderer: editData.orderer || '',
        type: editData.type || '',
        kind: editData.kind || (mode === 'product' ? '스마트안전' : (mode === 'case' ? '케이스' : '')),
        images: editData.images ? JSON.parse(editData.images) : [],
        // 제품 전용 필드들
        keyFeatures: editData.keyFeatures ? JSON.parse(editData.keyFeatures) : { 
          description: '', 
          features: ['', '', '', ''],
          images: []
        },

        specifications: editData.specifications ? JSON.parse(editData.specifications) : [],
        certifications: editData.certifications ? JSON.parse(editData.certifications) : [],
        downloads: editData.downloads ? JSON.parse(editData.downloads) : [
          { title: '', description: '', link: '', file: null }
        ],
        videos: editData.videos ? JSON.parse(editData.videos) : []
      });
    }
  }, [editData, mode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (files) => {
    if (files && files.length > 0) {
      try {
        // 먼저 파일들 검증
        const validFiles = [];
        for (let i = 0; i < files.length; i++) {
          try {
            validateImageFile(files[i], 50);
            validFiles.push(files[i]);
          } catch (validationError) {
            console.warn('파일 검증 실패:', files[i].name, validationError.message);
            alert(`파일 검증 실패: ${files[i].name}. ${validationError.message}`);
          }
        }

        if (validFiles.length === 0) {
          alert('업로드할 수 있는 유효한 파일이 없습니다.');
          return;
        }

        console.log('=== UI에 임시 이미지 추가 ===');
        console.log(`추가할 이미지 파일들 (${validFiles.length}개):`, validFiles.map(f => f.name));

        // 편집 모드에서는 실제 업로드를 저장 시점으로 미룸
        if (editData) {
          console.log('편집 모드: 저장 시점에 실제 업로드 수행 예정');

          // UI에 임시 URL들로 표시 (실제로는 업로드되지 않음)
          const tempUrls = validFiles.map((file, index) => {
            try {
              // 브라우저에서 임시로 볼 수 있는 URL 생성
              const tempUrl = URL.createObjectURL(file);
              console.log(`임시 URL 생성 성공: ${file.name} -> ${tempUrl.substring(0, 50)}...`);

              // 파일 정보도 함께 로깅
              console.log(`파일 상세 정보:`, {
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified
              });

              return tempUrl;
            } catch (error) {
              console.error(`임시 URL 생성 실패: ${file.name}`, error);
              // 실패 시 빈 문자열 반환 (나중에 필터링)
              return '';
            }
          });

          // 빈 URL들 필터링
          const validTempUrls = tempUrls.filter(url => url !== '');
          console.log(`유효한 임시 URL들 생성: ${validTempUrls.length}/${tempUrls.length}`);

          // 임시 파일들을 상태에 추가 (URL 생성에 성공한 파일만)
          const validFilesForTemp = validFiles.filter((file, index) => tempUrls[index] !== '');
          setTempUploadFiles(prev => [...prev, ...validFilesForTemp]);
          console.log(`임시 파일들 상태에 추가: ${validFilesForTemp.length}/${validFiles.length}`);

          setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...validTempUrls],
            // 첫 번째 이미지를 thumbnail로 설정 (기존 thumbnail이 없거나 첫 번째 이미지인 경우)
            thumbnail: prev.thumbnail || (validTempUrls.length > 0 ? validTempUrls[0] : null)
          }));

        } else {
          // 신규 모드에서는 즉시 업로드 (기존 동작 유지)
          console.log('신규 모드: 즉시 업로드 수행');

          const folder = mode === 'product' ? 'product' : 'track_record'; // case도 track_record 사용
          const bucket = mode === 'product' ? 'product' : 'track_record'; // case도 track_record 사용
          const uploadResult = await uploadMultipleImages(validFiles, folder, bucket);

          if (uploadResult.images && uploadResult.images.length > 0) {
            setFormData(prev => ({
              ...prev,
              images: [...prev.images, ...uploadResult.images],
              // 첫 번째 이미지를 thumbnail로 설정 (기존 thumbnail이 없거나 첫 번째 이미지인 경우)
              thumbnail: prev.thumbnail || uploadResult.thumbnail
            }));
          }
        }

      } catch (error) {
        console.error('이미지 처리 실패:', error);
        alert('이미지 처리 중 오류가 발생했습니다: ' + error.message);
      }
    }
  };

  const removeImage = async (index) => {
    try {
      const imageUrl = formData.images[index];
      console.log('=== UI에서 이미지 제거 ===');
      console.log('제거할 이미지 URL:', imageUrl);
      console.log('이미지 인덱스:', index);
      console.log('현재 모드:', mode);
      console.log('편집 모드 여부:', !!editData);

      // 편집 모드에서는 실제 파일 삭제를 저장 시점으로 미룸
      if (editData) {
        console.log('편집 모드: 저장 시점에 실제 파일 삭제 수행 예정');

        // 임시 URL인 경우 해당 파일을 tempUploadFiles에서 제거
        if (imageUrl && imageUrl.startsWith('blob:')) {
          console.log('임시 URL 감지됨, tempUploadFiles에서 제거');

          // 해당 임시 URL에 해당하는 파일을 찾아서 제거
          setTempUploadFiles(prev => {
            const newTempFiles = prev.filter((file, fileIndex) => {
              const tempUrl = URL.createObjectURL(file);
              const shouldKeep = tempUrl !== imageUrl;
              if (!shouldKeep) {
                console.log(`임시 파일 제거: ${file.name}`);
                // 메모리 정리
                URL.revokeObjectURL(tempUrl);
              }
              return shouldKeep;
            });
            console.log(`tempUploadFiles 업데이트: ${prev.length} -> ${newTempFiles.length}`);
            return newTempFiles;
          });
        } else {
          // 기존 업로드된 이미지인 경우 나중에 삭제할 목록에 추가
          console.log('기존 업로드된 이미지: 저장 시점에 삭제 예정');
        }

      } else {
        // 신규 생성 모드에서는 즉시 삭제 (업로드된 임시 파일들)
        console.log('신규 모드: 즉시 파일 삭제 수행');

        // Storage에서 파일 경로 추출
        const filePath = extractFilePathFromUrl(imageUrl);
        console.log('추출된 파일 경로:', filePath);

        if (filePath) {
          const bucket = mode === 'product' ? 'product' : 'track_record'; // case도 track_record 사용
          console.log('사용할 버킷:', bucket);
          console.log('최종 삭제 경로:', `${bucket}/${filePath}`);

          // Storage에서 파일 삭제
          const { data, error } = await deleteFile(filePath);

          console.log('Storage 삭제 결과:', { data, error });

          if (error) {
            console.error('Storage 파일 삭제 실패:', error);
            console.error('에러 상세:', {
              message: error.message,
            });
            // 신규 모드에서도 삭제 실패 시 경고만 하고 계속 진행
            console.warn('⚠️ 파일 삭제에 실패했지만 UI에서는 제거됩니다.');
          } else {
            console.log('Storage 파일 삭제 성공:', filePath);
            console.log('삭제된 파일들:', data);
          }
        } else {
          console.warn('파일 경로를 추출할 수 없습니다:', imageUrl);
        }
      }

      // UI에서 이미지 제거 및 thumbnail 업데이트
      setFormData(prev => {
        const newImages = prev.images.filter((_, i) => i !== index);

        // thumbnail 업데이트 로직
        let newThumbnail = prev.thumbnail;

        // 삭제된 이미지가 thumbnail이었다면
        if (prev.thumbnail === imageUrl) {
          // 남은 첫 번째 이미지를 새로운 thumbnail로 설정
          newThumbnail = newImages.length > 0 ? newImages[0] : null;
        }
        // 또는 이미지가 하나도 남지 않았다면 thumbnail을 null로 설정
        else if (newImages.length === 0) {
          newThumbnail = null;
        }

        console.log('이미지 제거 후 thumbnail 업데이트:', {
          제거된이미지: imageUrl,
          남은이미지들: newImages,
          새로운썸네일: newThumbnail
        });

        return {
          ...prev,
          images: newImages,
          thumbnail: newThumbnail
        };
      });

    } catch (error) {
      console.error('이미지 제거 중 오류:', error);
      alert('이미지 제거 중 오류가 발생했습니다.');
    }
  };

  // 편집 모드에서 사용되지 않는 기존 이미지들을 bucket에서 삭제
  const cleanupUnusedImages = async (oldData, newData) => {
    try {
      const bucket = mode === 'product' ? 'product' : 'track_record'; // case도 track_record 사용
      const filesToDelete = [];

      console.log('=== cleanupUnusedImages 시작 ===');
      console.log('현재 모드:', mode);
      console.log('버킷:', bucket);
      console.log('기존 데이터 타입:', typeof oldData);
      console.log('기존 데이터:', oldData);
      console.log('새로운 데이터:', newData);

      // 1. 메인 이미지들 비교
      if (oldData.images) {
        console.log('oldData.images 타입:', typeof oldData.images);
        console.log('oldData.images 값:', oldData.images);

        const oldImages = Array.isArray(oldData.images) ? oldData.images : JSON.parse(oldData.images || '[]');
        const newImages = newData.images || [];

        console.log('파싱된 기존 메인 이미지들:', oldImages);
        console.log('기존 메인 이미지들:', oldImages);
        console.log('새로운 메인 이미지들:', newImages);
        console.log('기존 이미지 개수:', oldImages.length);
        console.log('새로운 이미지 개수:', newImages.length);

        // 기존 이미지 중 새로운 데이터에 없는 것들을 찾아서 삭제
        oldImages.forEach((oldImageUrl, index) => {
          console.log(`기존 이미지 ${index + 1}:`, oldImageUrl);
          console.log(`  새로운 이미지들에 포함되어 있는가?:`, newImages.includes(oldImageUrl));

          if (!newImages.includes(oldImageUrl)) {
            console.log(`  -> 삭제 대상 이미지 발견:`, oldImageUrl);
            const filePath = extractFilePathFromUrl(oldImageUrl);
            console.log(`  추출된 파일 경로:`, filePath);

            if (filePath) {
              console.log('  삭제할 메인 이미지 파일 경로:', filePath);
              filesToDelete.push(filePath);
            } else {
              console.warn('  파일 경로 추출 실패:', oldImageUrl);
            }
          } else {
            console.log(`  -> 유지 대상 이미지:`, oldImageUrl);
          }
        });
      }

      // 2. 제품 전용 이미지들 비교 (Product 모드인 경우)
      if (mode === 'product') {
        // 주요 기능 이미지들
        if (oldData.keyFeatures && oldData.keyFeatures.images) {
          const oldKeyFeatures = Array.isArray(oldData.keyFeatures.images) ? oldData.keyFeatures.images : JSON.parse(oldData.keyFeatures.images || '[]');
          const newKeyFeatures = newData.keyFeatures?.images || [];

          console.log('기존 주요 기능 이미지들:', oldKeyFeatures);
          console.log('새로운 주요 기능 이미지들:', newKeyFeatures);

          oldKeyFeatures.forEach(oldImageObj => {
            const isStillUsed = newKeyFeatures.some(newImageObj => newImageObj.url === oldImageObj.url);
            if (!isStillUsed && oldImageObj.url) {
              const filePath = extractFilePathFromUrl(oldImageObj.url);
              if (filePath) {
                console.log('삭제할 주요 기능 이미지 파일 경로:', filePath);
                filesToDelete.push(filePath);
              }
            }
          });
        }

        // 사양 이미지들
        if (oldData.specifications) {
          const oldSpecifications = Array.isArray(oldData.specifications) ? oldData.specifications : JSON.parse(oldData.specifications || '[]');
          const newSpecifications = newData.specifications || [];

          console.log('기존 사양 이미지들:', oldSpecifications);
          console.log('새로운 사양 이미지들:', newSpecifications);

          oldSpecifications.forEach(oldImageObj => {
            const isStillUsed = newSpecifications.some(newImageObj => newImageObj.url === oldImageObj.url);
            if (!isStillUsed && oldImageObj.url) {
              const filePath = extractFilePathFromUrl(oldImageObj.url);
              if (filePath) {
                console.log('삭제할 사양 이미지 파일 경로:', filePath);
                filesToDelete.push(filePath);
              }
            }
          });
        }

        // 인증 이미지들
        if (oldData.certifications) {
          const oldCertifications = Array.isArray(oldData.certifications) ? oldData.certifications : JSON.parse(oldData.certifications || '[]');
          const newCertifications = newData.certifications || [];

          console.log('기존 인증 이미지들:', oldCertifications);
          console.log('새로운 인증 이미지들:', newCertifications);

          oldCertifications.forEach(oldImageObj => {
            const isStillUsed = newCertifications.some(newImageObj => newImageObj.url === oldImageObj.url);
            if (!isStillUsed && oldImageObj.url) {
              const filePath = extractFilePathFromUrl(oldImageObj.url);
              if (filePath) {
                console.log('삭제할 인증 이미지 파일 경로:', filePath);
                filesToDelete.push(filePath);
              }
            }
          });
        }

        // 다운로드 파일들
        if (oldData.downloads) {
          const oldDownloads = Array.isArray(oldData.downloads) ? oldData.downloads : JSON.parse(oldData.downloads || '[]');
          const newDownloads = newData.downloads || [];

          console.log('기존 다운로드 파일들:', oldDownloads);
          console.log('새로운 다운로드 파일들:', newDownloads);

          oldDownloads.forEach(oldDownload => {
            const isStillUsed = newDownloads.some(newDownload =>
              newDownload.link === oldDownload.link && newDownload.file === oldDownload.file
            );
            if (!isStillUsed && oldDownload.link) {
              const filePath = extractFilePathFromUrl(oldDownload.link);
              if (filePath) {
                console.log('삭제할 다운로드 파일 경로:', filePath);
                filesToDelete.push(filePath);
              }
            }
          });
        }
      }

      // 3. 실제 파일 삭제 실행
      if (filesToDelete.length > 0) {
        console.log(`=== 편집 저장 시 파일 삭제 시작 ===`);
        console.log(`편집 저장 시 삭제할 파일들 (${filesToDelete.length}개):`, filesToDelete);
        console.log('사용할 버킷:', bucket);
        console.log('현재 모드:', mode);

        // 각 파일 존재 여부 확인 후 삭제
        let confirmedFilesToDelete = [];
        for (const filePath of filesToDelete) {
          console.log(`파일 존재 확인: ${filePath}`);
          // S3에서는 파일 존재 확인 없이 직접 삭제 시도 (존재하지 않아도 오류 아님)
          confirmedFilesToDelete.push(filePath);
        }

        if (confirmedFilesToDelete.length > 0) {
          console.log(`실제 삭제할 파일들 (${confirmedFilesToDelete.length}개):`, confirmedFilesToDelete);

          const { data, error } = await deleteFiles(confirmedFilesToDelete);

          if (error) {
            console.error('편집 저장 시 파일 삭제 중 오류:', error);
            console.error('삭제 시도한 파일들:', confirmedFilesToDelete);
            throw new Error(`파일 삭제 중 오류가 발생했습니다: ${error.message}`);
          }

          console.log('삭제 결과:', data);

          if (data) {
            console.log(`삭제 결과 요약: 성공 ${data.deleted}개, 실패 ${data.failed}개`);
          }
        } else {
          console.log('삭제할 파일이 존재하지 않습니다.');
        }

        console.log(`=== 편집 저장 시 파일 삭제 완료 ===`);
      } else {
        console.log('삭제할 파일이 없습니다.');
      }

    } catch (error) {
      console.error('사용되지 않는 이미지 정리 중 오류:', error);
      throw new Error(`사용되지 않는 이미지 정리 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  const handleSave = async () => {
    try {
      // 편집 모드에서 저장할 때는 임시 파일들을 실제로 업로드
      if (editData && tempUploadFiles.length > 0) {
        console.log('=== 편집 모드 임시 파일 업로드 시작 ===');
        console.log(`업로드할 임시 파일들 (${tempUploadFiles.length}개):`, tempUploadFiles.map(f => f.name));

        const folder = mode === 'product' ? 'product' : 'track_record'; // case도 track_record 사용
        const bucket = mode === 'product' ? 'product' : 'track_record'; // case도 track_record 사용
        const isEditMode = !!editData; // 클로저 문제 해결을 위해 미리 저장
        const originalEditData = editData; // 클로저 문제 해결을 위해 미리 저장

        // 임시 파일들을 실제로 업로드
        const uploadResult = await uploadMultipleImages(tempUploadFiles, folder, bucket);

        if (uploadResult.images && uploadResult.images.length > 0) {
          console.log('임시 파일 업로드 성공:', uploadResult.images);

          // formData의 임시 URL들을 실제 업로드된 URL들로 교체하고 저장
          setFormData(prev => {
            let uploadIndex = 0;
            const newImages = prev.images.map((imageUrl, index) => {
              // 임시 URL인 경우 실제 업로드된 URL로 교체
              if (imageUrl && imageUrl.startsWith('blob:') && uploadIndex < uploadResult.images.length) {
                const newUrl = uploadResult.images[uploadIndex];
                console.log(`[이미지 ${index + 1}] 임시 URL 교체:`);
                console.log(`  기존: ${imageUrl}`);
                console.log(`  새로: ${newUrl}`);
                // 메모리 정리
                URL.revokeObjectURL(imageUrl);
                uploadIndex++;
                return newUrl;
              }
              // 기존 Supabase URL은 그대로 유지
              console.log(`[이미지 ${index + 1}] 기존 URL 유지:`, imageUrl);
              return imageUrl;
            });

            // thumbnail도 업데이트 (썸네일이 임시 URL인 경우에만)
            let newThumbnail = prev.thumbnail;
            if (prev.thumbnail && prev.thumbnail.startsWith('blob:') && uploadResult.thumbnail) {
              console.log(`썸네일 교체: ${prev.thumbnail} -> ${uploadResult.thumbnail}`);
              URL.revokeObjectURL(prev.thumbnail);
              newThumbnail = uploadResult.thumbnail;
            }

            const updatedFormData = {
              ...prev,
              images: newImages,
              thumbnail: newThumbnail
            };

            console.log('이미지 교체 결과:', {
              기존이미지수: prev.images.length,
              새이미지들: newImages,
              임시파일들: tempUploadFiles.length,
              업로드결과: uploadResult.images.length
            });

            // 업데이트된 formData로 저장 수행
            setTimeout(async () => {
              console.log('업데이트된 formData로 저장 시작');
              console.log('최종 저장될 데이터:', {
                images: updatedFormData.images,
                thumbnail: updatedFormData.thumbnail
              });

              // 편집 모드에서 저장할 때는 사용되지 않는 기존 이미지들을 bucket에서 삭제
              if (isEditMode) {
                console.log('편집 모드 저장 - 기존 이미지들 정리 시작');
                try {
                  await cleanupUnusedImages(originalEditData, updatedFormData);
                } catch (cleanupError) {
                  console.error('기존 이미지 정리 중 오류:', cleanupError);
                  // 정리 실패해도 저장은 계속 진행
                }
              }

              console.log('임시 파일 업로드 완료 후 저장 수행');
              onSave(updatedFormData);
            }, 0);

            return updatedFormData;
          });

          // 임시 파일들 초기화
          setTempUploadFiles([]);
          console.log('임시 파일들 초기화 완료');

        } else {
          throw new Error('임시 파일 업로드에 실패했습니다.');
        }
      }

      // 모든 경우에 대해 setTimeout에서 저장 처리
      setTimeout(async () => {
        console.log('=== 최종 저장 처리 시작 ===');

        // 편집 모드에서 저장할 때는 사용되지 않는 기존 이미지들을 bucket에서 삭제
        if (editData && tempUploadFiles.length === 0) {
          console.log('편집 모드 저장 - 기존 이미지들 정리 시작');
          try {
            await cleanupUnusedImages(editData, formData);
          } catch (cleanupError) {
            console.error('기존 이미지 정리 중 오류:', cleanupError);
            // 정리 실패해도 저장은 계속 진행
          }
        }

        console.log('저장 수행');
        onSave(formData);
        console.log('=== 최종 저장 처리 완료 ===');
      }, 0);
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      alert('저장 중 오류가 발생했습니다: ' + error.message);
    }
  };

  const handleCancel = async () => {
    try {
      console.log('=== 취소 처리 시작 ===');

      // 편집 모드에서 취소할 때는 임시 파일들을 정리
      if (editData && tempUploadFiles.length > 0) {
        console.log(`임시 파일들 정리 (${tempUploadFiles.length}개):`, tempUploadFiles.map(f => f.name));

        // 임시 URL들을 메모리에서 정리
        formData.images.forEach(imageUrl => {
          if (imageUrl && imageUrl.startsWith('blob:')) {
            URL.revokeObjectURL(imageUrl);
          }
        });

        // 임시 파일들 초기화
        setTempUploadFiles([]);
        console.log('임시 파일들 정리 완료');
      }

      // 편집 모드가 아닌 경우에만 업로드된 파일들을 삭제
      if (!editData) {
        console.log('취소 시 업로드된 파일들 정리 시작');

        const bucket = mode === 'product' ? 'product' : 'track_record'; // case도 track_record 사용
        const filesToDelete = [];

        // 1. 메인 이미지들 삭제
        if (formData.images && formData.images.length > 0) {
          formData.images.forEach(imageUrl => {
            const filePath = extractFilePathFromUrl(imageUrl);
            if (filePath) {
              filesToDelete.push(filePath);
            }
          });
        }

        // 2. 제품 전용 이미지들 삭제 (Product 모드인 경우)
        if (mode === 'product') {
          // 주요 기능 이미지들
          if (formData.keyFeatures && formData.keyFeatures.images) {
            formData.keyFeatures.images.forEach(imageObj => {
              if (imageObj.url) {
                const filePath = extractFilePathFromUrl(imageObj.url);
                if (filePath) {
                  filesToDelete.push(filePath);
                }
              }
            });
          }

          // 사양 이미지들
          if (formData.specifications) {
            formData.specifications.forEach(imageObj => {
              if (imageObj.url) {
                const filePath = extractFilePathFromUrl(imageObj.url);
                if (filePath) {
                  filesToDelete.push(filePath);
                }
              }
            });
          }

          // 인증 이미지들
          if (formData.certifications) {
            formData.certifications.forEach(imageObj => {
              if (imageObj.url) {
                const filePath = extractFilePathFromUrl(imageObj.url);
                if (filePath) {
                  filesToDelete.push(filePath);
                }
              }
            });
          }

          // 다운로드 파일들
          if (formData.downloads) {
            formData.downloads.forEach(download => {
              if (download.link && download.file) {
                const filePath = extractFilePathFromUrl(download.link);
                if (filePath) {
                  filesToDelete.push(filePath);
                }
              }
            });
          }
        }

        // 3. 실제 파일 삭제 실행
        if (filesToDelete.length > 0) {
          console.log(`취소 시 삭제할 파일들 (${filesToDelete.length}개):`, filesToDelete);
          
          const { error } = await deleteFiles(filesToDelete);
          
          if (error) {
            console.error('취소 시 파일 삭제 중 오류:', error);
          } else {
            console.log(`${filesToDelete.length}개의 파일이 취소 시 정리되었습니다.`);
          }
        }
      }
    } catch (error) {
      console.error('취소 시 파일 정리 중 오류:', error);
    }

    console.log('=== 취소 처리 완료 ===');

    onCancel();
  };



  const getModeConfig = () => {
    if (mode === 'product') {
      return {
        title: '제품',
        kindOptions: [
          { value: '스마트안전', label: '스마트안전' },
          { value: '관제시스템', label: '관제시스템' },
          { value: '통합제어', label: '통합제어' }
        ],
        breadcrumbs: ["Home", "제품"]
      };
    } else if (mode === 'case') {
      return {
        title: '케이스',
        kindOptions: [
          { value: '산업안전자동화', label: '산업안전자동화' },
          { value: '스마트통합제어', label: '스마트통합제어' },
          { value: '정보통신', label: '정보통신' }
        ],
        breadcrumbs: ["Home", "케이스"]
      };
    } else {
      return {
        title: '실적',
        kindOptions: [
          { value: '산업안전자동화', label: '산업안전자동화' },
          { value: '스마트통합제어', label: '스마트통합제어' },
          { value: '정보통신', label: '정보통신' }
        ],
        breadcrumbs: ["Home", "실적"]
      };
    }
  };

  const modeConfig = getModeConfig();

  const content = (
    <div className={`record-editor-container ${isModal ? 'record-editor-container-modal' : ''}`}>
      {/* 기본 정보 div */}
      <div className="record-editor-panel">
        <div className="record-editor-panel-header">
          <h3>기본 정보</h3>
          <div className="record-editor-form-group">
            <label className="record-editor-label">
              사업분야 *
            </label>
            <select
              name="kind"
              value={formData.kind}
              onChange={handleInputChange}
              required
              className="record-editor-input"
            >
              <option value="">사업분야를 선택하세요</option>
              {modeConfig.kindOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="record-editor-form-group">
            <label className="record-editor-label">
              카테고리 *
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              className="record-editor-input"
            />
          </div>
          
          <div className="record-editor-form-group">
            <label className="record-editor-label">
            {(mode === 'record' || mode === 'case') ? '사업명' : '모델명'} *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="record-editor-input"
            />
          </div>

          <div className="record-editor-form-group">
            <label className="record-editor-label">
              {(mode === 'record' || mode === 'case') ? '공급내용' : '제품명'} *
            </label>
            <input
              type="text"
              name="overview_title"
              value={formData.overview_title}
              onChange={handleInputChange}
              required
              className="record-editor-input"
            />
          </div>

          <div className="record-editor-form-group">
            <label className="record-editor-label">
              {(mode === 'record' || mode === 'case') ? '실적 설명' : '제품 설명'} *
            </label>
            <div className="record-editor-tip">
              💡 팁: Enter로 줄바꿈, • 또는 - 로 리스트 작성 가능
            </div>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
              required
              placeholder={(mode === 'record' || mode === 'case') ?
                "실적 설명을 입력하세요...\n\n예시:\n• 첫 번째 항목\n• 두 번째 항목\n• 세 번째 항목\n\n또는\n\n- 첫 번째 항목\n- 두 번째 항목\n- 세 번째 항목" :
                "내용을 입력하세요...\n\n예시:\n• 첫 번째 항목\n• 두 번째 항목\n• 세 번째 항목\n\n또는\n\n- 첫 번째 항목\n- 두 번째 항목\n- 세 번째 항목"
              }
              className="record-editor-textarea"
            />
          </div>

          <div className="record-editor-form-group">
            <label className="record-editor-label">
              날짜 *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="record-editor-input"
            />
          </div>

          <div className="record-editor-form-group">
            <label className="record-editor-label">
              {mode === 'product' ? '제조사' : '발주처'} * {/* case도 발주처 사용 */}
            </label>
            <input
              type="text"
              name="orderer"
              value={formData.orderer}
              onChange={handleInputChange}
              required
              className="record-editor-input"
            />
          </div>

          {/* 실적/케이스 모드일 때 버튼을 panel-header 안에 배치 */}
          {(mode === 'record' || mode === 'case') && (
            <div className="record-editor-button-group" style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={handleCancel}
                disabled={submitting}
                className="record-editor-cancel-btn"
                title={!editData ? "취소 (업로드된 파일들은 자동으로 삭제됩니다)" : "취소"}
              >
                취소
              </button>
              <button
                onClick={handleSave}
                disabled={submitting}
                className="record-editor-save-btn"
              >
                {submitting ? '저장 중...' : '저장'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 이미지 업로드 div */}
      <div className="record-editor-panel">
        <div className="record-editor-panel-header">
          <h3>메인 이미지 업로드</h3>
          <div className="record-editor-form-group">
            <label className="record-editor-label">
              메인 이미지 업로드
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files)}
              className="record-editor-image-upload"
            />
            {formData.images.length > 0 && (
              <div className="record-editor-image-list">
                <h4>업로드된 메인 이미지:</h4>
                <p className="record-editor-tip">
                  💡 이미지를 드래그하여 순서를 변경할 수 있습니다.
                </p>
                {formData.images.map((image, index) => {
                  // 이미지 렌더링 시 디버깅
                  console.log(`렌더링 중 이미지 ${index + 1}:`, {
                    url: image.substring(0, 50) + (image.length > 50 ? '...' : ''),
                    isBlob: image.startsWith('blob:'),
                    length: image.length
                  });
                  return (
                  <div
                    key={index}
                    draggable
                    className={`record-editor-image-item ${index === draggedIndex ? 'dragging' : ''} ${index === dragOverIndex ? 'drag-over' : ''}`}
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={() => {
                      setDraggedIndex(null);
                      setDragOverIndex(null);
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span className="record-editor-image-number">{index + 1}</span>
                      <img
                        src={image}
                        alt={`이미지 ${index + 1}`}
                        className="record-editor-image-thumbnail"
                        onLoad={(e) => {
                          console.log(`✅ 이미지 로드 성공: ${image.substring(0, 50)}...`);
                          console.log(`이미지 크기: ${e.target.naturalWidth}x${e.target.naturalHeight}`);
                          console.log(`표시 크기: ${e.target.width}x${e.target.height}`);
                        }}
                        onError={(e) => {
                          console.error(`이미지 로드 실패: ${image.substring(0, 50)}...`);
                          console.error('에러 상세:', e);
                          // blob URL인 경우 재생성 시도
                          if (image && image.startsWith('blob:')) {
                            console.log('blob URL 재생성 시도');
                            // 여기서는 간단히 에러 표시만 함
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }
                        }}
                        style={{
                          width: '100px',
                          height: '100px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          border: '1px solid #ddd'
                        }}
                      />
                      <div style={{
                        display: 'none',
                        width: '100px',
                        height: '100px',
                        backgroundColor: '#f0f0f0',
                        border: '2px dashed #ccc',
                        borderRadius: '4px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        color: '#666',
                        flexDirection: 'column',
                        position: 'relative'
                      }}>
                        <div>미리보기</div>
                        <div>실패</div>
                        <button
                          type="button"
                          onClick={() => {
                            // blob URL 재생성 시도
                            const fileIndex = tempUploadFiles.findIndex(file => {
                              try {
                                const tempUrl = URL.createObjectURL(file);
                                URL.revokeObjectURL(tempUrl);
                                return tempUrl === image;
                              } catch (e) {
                                return false;
                              }
                            });

                            if (fileIndex !== -1) {
                              console.log(`blob URL 재생성 시도 for file: ${tempUploadFiles[fileIndex].name}`);
                              const newBlobUrl = URL.createObjectURL(tempUploadFiles[fileIndex]);

                              // formData 업데이트
                              setFormData(prev => ({
                                ...prev,
                                images: prev.images.map((img, idx) =>
                                  idx === index ? newBlobUrl : img
                                )
                              }));

                              // 기존 blob URL 정리
                              URL.revokeObjectURL(image);
                            }
                          }}
                          style={{
                            position: 'absolute',
                            bottom: '2px',
                            right: '2px',
                            fontSize: '10px',
                            padding: '2px 4px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '2px',
                            cursor: 'pointer'
                          }}
                        >
                          재시도
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="record-editor-delete-btn"
                    >
                      삭제
                    </button>
                  </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>


      {/* 제품 전용 필드 div */}
      {mode === 'product' && (
        <div className="record-editor-panel">
          <div className="record-editor-panel-header">
            <h3>제품 상세 정보</h3>
            <div className="record-editor-product-section">
              <div className="record-editor-product-columns" style={{ display: 'flex', gap: '20px' }}>
                <div className="record-editor-product-left" style={{ flex: '0 0 320px' }}>
                  {mode === 'product' && (
                    <div className="record-editor-form-group">
                      <label className="record-editor-label">
                        주요 기능 이미지
                      </label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            try {
                              const fileArray = Array.from(e.target.files);
                              const imageUrls = await Promise.all(fileArray.map(async file => {
                                validateImageFile(file, 50);
                                try {
                                  return await uploadImage(file, 'product', 'product');
                                } catch (uploadError) {
                                  console.warn('Storage 업로드 실패, Base64로 대체:', uploadError);
                                  return await new Promise((resolve, reject) => {
                                    const reader = new FileReader();
                                    reader.onload = (e) => resolve(e.target.result);
                                    reader.onerror = (e) => reject(new Error('파일 읽기 실패'));
                                    reader.readAsDataURL(file);
                                  });
                                }
                              }));

                              const newImageObjects = imageUrls.map(url => ({ url, caption: '' }));
                              setFormData(prev => ({
                                ...prev,
                                keyFeatures: {
                                  ...prev.keyFeatures,
                                  images: [...(prev.keyFeatures.images || []), ...newImageObjects]
                                }
                              }));
                            } catch (error) {
                              console.error('이미지 처리 실패:', error);
                              alert('이미지 처리 중 오류가 발생했습니다: ' + error.message);
                            }
                          }
                        }}
                        className="record-editor-image-upload"
                      />
                      {formData.keyFeatures.images && formData.keyFeatures.images.length > 0 && (
                        <div className="record-editor-image-list">
                          <h5>업로드된 주요 기능 이미지:</h5>
                          <p className="record-editor-tip">
                            💡 이미지를 드래그하여 순서를 변경할 수 있습니다.
                          </p>
                          {formData.keyFeatures.images.map((imageObj, index) => (
                            <div
                              key={index}
                              draggable
                              className={`record-editor-image-item-large ${index === draggedIndex ? 'dragging' : ''} ${index === dragOverIndex ? 'drag-over' : ''}`}
                              onDragStart={(e) => handleDragStart(e, index)}
                              onDragOver={(e) => handleDragOver(e, index)}
                              onDragLeave={handleDragLeave}
                              onDrop={(e) => handleKeyFeaturesImageDrop(e, index)}
                              onDragEnd={() => {
                                setDraggedIndex(null);
                                setDragOverIndex(null);
                              }}
                            >
                              <div className="record-editor-image-header">
                                <span className="record-editor-image-number-large">{index + 1}</span>
                                <img 
                                  src={imageObj.url} 
                                  alt={`주요 기능 이미지 ${index + 1}`} 
                                  className="record-editor-image-thumbnail-large"
                                />
                                                              <button
                                type="button"
                                onClick={async () => {
                                  try {
                                    const imageObj = formData.keyFeatures.images[index];
                                    console.log('삭제할 주요 기능 이미지:', imageObj);
                                    
                                    // Storage에서 파일 경로 추출
                                    const filePath = extractFilePathFromUrl(imageObj.url);
                                    if (filePath) {
                                      console.log('Storage에서 삭제할 주요 기능 파일 경로:', filePath);
                                      
                                      // Storage에서 파일 삭제
                                      const { error } = await deleteFile(filePath);
                                      
                                      if (error) {
                                        console.error('주요 기능 Storage 파일 삭제 실패:', error);
                                        alert('Storage에서 파일 삭제에 실패했습니다. UI에서는 제거됩니다.');
                                      } else {
                                        console.log('주요 기능 Storage 파일 삭제 성공:', filePath);
                                      }
                                    } else {
                                      console.warn('주요 기능 파일 경로를 추출할 수 없습니다:', imageObj.url);
                                    }
                                    
                                    // UI에서 이미지 제거
                                    const newImages = formData.keyFeatures.images.filter((_, i) => i !== index);
                                    setFormData(prev => ({
                                      ...prev,
                                      keyFeatures: { ...prev.keyFeatures, images: newImages }
                                    }));
                                  } catch (error) {
                                    console.error('주요 기능 이미지 삭제 중 오류:', error);
                                    alert('이미지 삭제 중 오류가 발생했습니다.');
                                  }
                                }}
                                className="record-editor-delete-btn"
                              >
                                삭제
                              </button>
                              </div>
                              <input
                                type="text"
                                placeholder="이미지 설명을 입력하세요 (class='iwc-caption iwc-pos-top-left' 형태로 표시됩니다)"
                                value={imageObj.caption || ''}
                                onChange={(e) => {
                                  const newImages = [...formData.keyFeatures.images];
                                  newImages[index] = { ...newImages[index], caption: e.target.value };
                                  setFormData(prev => ({
                                    ...prev,
                                    keyFeatures: { ...prev.keyFeatures, images: newImages }
                                  }));
                                }}
                                className="record-editor-image-caption-input"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="record-editor-form-group">
                        <label className="record-editor-label">
                          사양 이미지
                        </label>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={async (e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              try {
                                const fileArray = Array.from(e.target.files);
                                const imageUrls = await Promise.all(fileArray.map(async file => {
                                  validateImageFile(file, 50);
                                  try {
                                    return await uploadImage(file, 'product', 'product');
                                  } catch (uploadError) {
                                    console.warn('Storage 업로드 실패, Base64로 대체:', uploadError);
                                    return await new Promise((resolve, reject) => {
                                      const reader = new FileReader();
                                      reader.onload = (e) => resolve(e.target.result);
                                      reader.onerror = (e) => reject(new Error('파일 읽기 실패'));
                                      reader.readAsDataURL(file);
                                    });
                                  }
                                }));

                                const newImageObjects = imageUrls.map(url => ({ url, caption: '' }));
                                setFormData(prev => ({
                                  ...prev,
                                  specifications: [...(prev.specifications || []), ...newImageObjects]
                                }));
                              } catch (error) {
                                console.error('이미지 처리 실패:', error);
                                alert('이미지 처리 중 오류가 발생했습니다: ' + error.message);
                              }
                            }
                          }}
                          className="record-editor-image-upload"
                        />
                        {formData.specifications && formData.specifications.length > 0 && (
                          <div className="record-editor-image-list">
                            <h5>업로드된 사양 이미지:</h5>
                            <p className="record-editor-tip">
                              💡 이미지를 드래그하여 순서를 변경할 수 있습니다.
                            </p>
                            {formData.specifications.map((imageObj, index) => (
                              <div
                                key={index}
                                draggable
                                className={`record-editor-image-item-large ${index === draggedIndex ? 'dragging' : ''} ${index === dragOverIndex ? 'drag-over' : ''}`}
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleSpecificationsImageDrop(e, index)}
                                onDragEnd={() => {
                                  setDraggedIndex(null);
                                  setDragOverIndex(null);
                                }}
                              >
                                <div className="record-editor-image-header">
                                  <span className="record-editor-image-number-large">{index + 1}</span>
                                  <img 
                                    src={imageObj.url} 
                                    alt={`사양 이미지 ${index + 1}`} 
                                    className="record-editor-image-thumbnail-large"
                                  />
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      try {
                                        const imageObj = formData.specifications[index];
                                        console.log('삭제할 사양 이미지:', imageObj);
                                        
                                        // Storage에서 파일 경로 추출
                                        const filePath = extractFilePathFromUrl(imageObj.url);
                                        if (filePath) {
                                          console.log('Storage에서 삭제할 사양 파일 경로:', filePath);
                                          
                                          // Storage에서 파일 삭제
                                          const { error } = await deleteFile(filePath);
                                          
                                          if (error) {
                                            console.error('사양 Storage 파일 삭제 실패:', error);
                                            alert('Storage에서 파일 삭제에 실패했습니다. UI에서는 제거됩니다.');
                                          } else {
                                            console.log('사양 Storage 파일 삭제 성공:', filePath);
                                          }
                                        } else {
                                          console.warn('사양 파일 경로를 추출할 수 없습니다:', imageObj.url);
                                        }
                                        
                                        // UI에서 이미지 제거
                                        const newImages = formData.specifications.filter((_, i) => i !== index);
                                        setFormData(prev => ({
                                          ...prev,
                                          specifications: newImages
                                        }));
                                      } catch (error) {
                                        console.error('사양 이미지 삭제 중 오류:', error);
                                        alert('이미지 삭제 중 오류가 발생했습니다.');
                                      }
                                    }}
                                    className="record-editor-delete-btn"
                                  >
                                    삭제
                                  </button>
                                </div>
                                <input
                                  type="text"
                                  placeholder="이미지 설명을 입력하세요 (class='iwc-caption iwc-pos-top-left' 형태로 표시됩니다)"
                                  value={imageObj.caption || ''}
                                  onChange={(e) => {
                                    const newImages = [...formData.specifications];
                                    newImages[index] = { ...newImages[index], caption: e.target.value };
                                    setFormData(prev => ({
                                      ...prev,
                                      specifications: newImages
                                    }));
                                  }}
                                  className="record-editor-image-caption-input"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="record-editor-form-group">
                        <label className="record-editor-label">
                          인증서 이미지
                        </label>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={async (e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              try {
                                const fileArray = Array.from(e.target.files);
                                const imageUrls = await Promise.all(fileArray.map(async file => {
                                  validateImageFile(file, 50);
                                  try {
                                    return await uploadImage(file, 'product', 'product');
                                  } catch (uploadError) {
                                    console.warn('Storage 업로드 실패, Base64로 대체:', uploadError);
                                    return await new Promise((resolve, reject) => {
                                      const reader = new FileReader();
                                      reader.onload = (e) => resolve(e.target.result);
                                      reader.onerror = (e) => reject(new Error('파일 읽기 실패'));
                                      reader.readAsDataURL(file);
                                    });
                                  }
                                }));

                                const newImageObjects = imageUrls.map(url => ({ url, caption: '' }));
                                setFormData(prev => ({
                                  ...prev,
                                  certifications: [...(prev.certifications || []), ...newImageObjects]
                                }));
                              } catch (error) {
                                console.error('이미지 처리 실패:', error);
                                alert('이미지 처리 중 오류가 발생했습니다: ' + error.message);
                              }
                            }
                          }}
                          className="record-editor-image-upload"
                        />

                        {formData.certifications && formData.certifications.length > 0 && (
                          <div className="record-editor-image-list">
                            <h5>업로드된 인증서 이미지:</h5>
                            <p className="record-editor-tip">
                              💡 이미지를 드래그하여 순서를 변경할 수 있습니다.
                            </p>
                            {formData.certifications.map((imageObj, index) => (
                              <div
                                key={index}
                                draggable
                                className={`record-editor-image-item-large ${index === draggedIndex ? 'dragging' : ''} ${index === dragOverIndex ? 'drag-over' : ''}`}
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleCertificationsImageDrop(e, index)}
                                onDragEnd={() => {
                                  setDraggedIndex(null);
                                  setDragOverIndex(null);
                                }}
                              >
                                <div className="record-editor-image-header">
                                  <span className="record-editor-image-number-large">{index + 1}</span>
                                  <img 
                                    src={imageObj.url} 
                                    alt={`인증서 이미지 ${index + 1}`} 
                                    className="record-editor-image-thumbnail-large"
                                  />
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      try {
                                        const imageObj = formData.certifications[index];
                                        console.log('삭제할 인증서 이미지:', imageObj);
                                        
                                        // Storage에서 파일 경로 추출
                                        const filePath = extractFilePathFromUrl(imageObj.url);
                                        if (filePath) {
                                          console.log('Storage에서 삭제할 인증서 파일 경로:', filePath);
                                          
                                          // Storage에서 파일 삭제
                                          const { error } = await deleteFile(filePath);
                                          
                                          if (error) {
                                            console.error('인증서 Storage 파일 삭제 실패:', error);
                                            alert('Storage에서 파일 삭제에 실패했습니다. UI에서는 제거됩니다.');
                                          } else {
                                            console.log('인증서 Storage 파일 삭제 성공:', filePath);
                                          }
                                        } else {
                                          console.warn('인증서 파일 경로를 추출할 수 없습니다:', imageObj.url);
                                        }
                                        
                                        // UI에서 이미지 제거
                                        const newImages = formData.certifications.filter((_, i) => i !== index);
                                        setFormData(prev => ({
                                          ...prev,
                                          certifications: newImages
                                        }));
                                      } catch (error) {
                                        console.error('인증서 이미지 삭제 중 오류:', error);
                                        alert('이미지 삭제 중 오류가 발생했습니다.');
                                      }
                                    }}
                                    className="record-editor-delete-btn"
                                  >
                                    삭제
                                  </button>
                                </div>
                                <input
                                  type="text"
                                  placeholder="이미지 설명을 입력하세요 (class='iwc-caption iwc-pos-top-left' 형태로 표시됩니다)"
                                  value={imageObj.caption || ''}
                                  onChange={(e) => {
                                    const newImages = [...formData.certifications];
                                    newImages[index] = { ...newImages[index], caption: e.target.value };
                                    setFormData(prev => ({
                                      ...prev,
                                      certifications: newImages
                                    }));
                                  }}
                                  className="record-editor-image-caption-input"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      
                    </div>
                  )}
                </div>

                <div className="record-editor-product-right" style={{ flex: '1' }}>
                  <div className="record-editor-form-group">
                    <div className="record-editor-download-header">
                      <label className="record-editor-label">
                        다운로드
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            downloads: [...prev.downloads, { title: '', description: '', link: '', file: null }]
                          }));
                        }}
                        className="record-editor-add-btn"
                      >
                        <span style={{ fontSize: '14px' }}>+</span> 추가
                      </button>
                    </div>
                    {formData.downloads.map((download, index) => (
                      <div key={index} className="record-editor-download-item">
                        <div className="record-editor-download-header">
                          <span className="record-editor-download-number">다운로드 {index + 1}</span>
                          {formData.downloads.length > 1 && (
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  const download = formData.downloads[index];
                                  console.log('삭제할 다운로드:', download);
                                  
                                  // 업로드된 파일이 있는 경우 Storage에서 삭제
                                  if (download.link && download.file) {
                                    const filePath = extractFilePathFromUrl(download.link);
                                    if (filePath) {
                                      console.log('Storage에서 삭제할 다운로드 파일 경로:', filePath);
                                      
                                      // Storage에서 파일 삭제
                                      const { error } = await deleteFile(filePath);
                                      
                                      if (error) {
                                        console.error('다운로드 Storage 파일 삭제 실패:', error);
                                        alert('Storage에서 파일 삭제에 실패했습니다. UI에서는 제거됩니다.');
                                      } else {
                                        console.log('다운로드 Storage 파일 삭제 성공:', filePath);
                                      }
                                    } else {
                                      console.warn('다운로드 파일 경로를 추출할 수 없습니다:', download.link);
                                    }
                                  }
                                  
                                  // UI에서 다운로드 제거
                                  const newDownloads = formData.downloads.filter((_, i) => i !== index);
                                  setFormData(prev => ({ ...prev, downloads: newDownloads }));
                                } catch (error) {
                                  console.error('다운로드 삭제 중 오류:', error);
                                  alert('다운로드 삭제 중 오류가 발생했습니다.');
                                }
                              }}
                              className="record-editor-delete-btn"
                              style={{ padding: '2px 6px', fontSize: '10px' }}
                            >
                              삭제
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="제목"
                          value={download.title || ''}
                          onChange={(e) => {
                            const newDownloads = [...formData.downloads];
                            newDownloads[index] = { ...newDownloads[index], title: e.target.value };
                            setFormData(prev => ({ ...prev, downloads: newDownloads }));
                          }}
                          className="record-editor-download-input"
                        />
                        <input
                          type="text"
                          placeholder="설명"
                          value={download.description || ''}
                          onChange={(e) => {
                            const newDownloads = [...formData.downloads];
                            newDownloads[index] = { ...newDownloads[index], description: e.target.value };
                            setFormData(prev => ({ ...prev, downloads: newDownloads }));
                          }}
                          className="record-editor-download-input"
                        />

                        <div className="record-editor-download-file-section">
                          <label className="record-editor-label">
                            파일 업로드 (선택사항)
                          </label>
                          <input
                            type="file"
                            accept="*/*"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                try {
                                  const file = e.target.files[0];
                                  validateDownloadFile(file, 100);
                                  
                                  const fileUrl = await uploadDownloadFile(file, 'downloads', mode === 'product' ? 'product' : 'track_record'); // case도 track_record 사용
                                  
                                  const newDownloads = [...formData.downloads];
                                  newDownloads[index] = { 
                                    ...newDownloads[index], 
                                    file: file.name,
                                    link: fileUrl 
                                  };
                                  setFormData(prev => ({ ...prev, downloads: newDownloads }));
                                  
                                  alert(`파일 "${file.name}"이 성공적으로 업로드되었습니다.`);
                                } catch (error) {
                                  console.error('파일 업로드 실패:', error);
                                  alert('파일 업로드에 실패했습니다: ' + error.message);
                                }
                              }
                            }}
                            className="record-editor-file-upload"
                          />
                          {download.file && (
                            <div className="record-editor-uploaded-file">
                              <span>업로드된 파일: {download.file}</span>
                              <button
                                type="button"
                                onClick={async () => {
                                  try {
                                    const download = formData.downloads[index];
                                    console.log('파일 제거할 다운로드:', download);
                                    
                                    // 업로드된 파일이 있는 경우 Storage에서 삭제
                                    if (download.link && download.file) {
                                      const filePath = extractFilePathFromUrl(download.link);
                                      if (filePath) {
                                        console.log('Storage에서 삭제할 다운로드 파일 경로:', filePath);
                                        
                                        // Storage에서 파일 삭제
                                        const { error } = await deleteFile(filePath);
                                        
                                        if (error) {
                                          console.error('다운로드 Storage 파일 삭제 실패:', error);
                                          alert('Storage에서 파일 삭제에 실패했습니다. UI에서는 제거됩니다.');
                                        } else {
                                          console.log('다운로드 Storage 파일 삭제 성공:', filePath);
                                        }
                                      } else {
                                        console.warn('다운로드 파일 경로를 추출할 수 없습니다:', download.link);
                                      }
                                    }
                                    
                                    // UI에서 파일 정보만 제거 (다운로드 항목은 유지)
                                    const newDownloads = [...formData.downloads];
                                    newDownloads[index] = { 
                                      ...newDownloads[index], 
                                      file: null,
                                      link: '' 
                                    };
                                    setFormData(prev => ({ ...prev, downloads: newDownloads }));
                                  } catch (error) {
                                    console.error('파일 제거 중 오류:', error);
                                    alert('파일 제거 중 오류가 발생했습니다.');
                                  }
                                }}
                                className="record-editor-delete-btn"
                                style={{ padding: '2px 6px', fontSize: '10px', marginLeft: '10px' }}
                              >
                                파일 제거
                              </button>
                            </div>
                          )}
                        </div>

                        {!download.file && (
                          <input
                            type="text"
                            placeholder="다운로드 링크 (URL) - 파일 업로드 대신 사용"
                            value={download.link || ''}
                            onChange={(e) => {
                              const newDownloads = [...formData.downloads];
                              newDownloads[index] = { ...newDownloads[index], link: e.target.value };
                              setFormData(prev => ({ ...prev, downloads: newDownloads }));
                            }}
                            className="record-editor-download-input"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="record-editor-form-group">
                    <label className="record-editor-label">
                      동영상 링크
                    </label>
                    <div style={{ marginBottom: '10px' }}>
                      <textarea
                        placeholder="동영상 링크를 입력하세요 (YouTube, Vimeo 등)"
                        value={formData.videos.join('\n')}
                        onChange={(e) => {
                          const links = e.target.value.split('\n').filter(link => link.trim() !== '');
                          setFormData(prev => ({ ...prev, videos: links }));
                        }}
                        className="record-editor-video-textarea"
                      />
                    </div>
                    <div className="record-editor-video-tip">
                      여러 링크를 입력하려면 줄바꿈으로 구분하세요.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 제품 모드용 저장/취소 버튼 */}
            <div className="record-editor-button-group" style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={handleCancel}
                disabled={submitting}
                className="record-editor-cancel-btn"
                title={!editData ? "취소 (업로드된 파일들은 자동으로 삭제됩니다)" : "취소"}
              >
                취소
              </button>
              <button
                onClick={handleSave}
                disabled={submitting}
                className="record-editor-save-btn"
              >
                {submitting ? '저장 중...' : '저장'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="record-editor-modal-overlay">
        <div className="record-editor-modal">
          <div className="record-editor-modal-header">
            <h2 className="record-editor-modal-title">
              {editData ? `${modeConfig.title} 편집` : `${modeConfig.title} 추가`}
            </h2>
            <button
              onClick={handleCancel}
              className="record-editor-modal-close"
              title="창 닫기 (업로드된 파일들은 자동으로 삭제됩니다)"
            >
              ×
            </button>
          </div>
          <div className="record-editor-modal-content">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="record-editor-page-container">
      {content}
    </div>
  );
};

export default RecordEditor;

