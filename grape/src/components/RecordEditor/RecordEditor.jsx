import React, { useState, useEffect, useRef } from 'react';
import { uploadImage, validateImageFile, checkStorageBucket, uploadDownloadFile, validateDownloadFile, extractFilePathFromUrl } from '../../utils/imageUpload';
import { setupStoragePolicies } from '../../utils/supabaseRLS';
import { supabase } from '../../lib/supabase';
import './RecordEditor.css';

const RecordEditor = ({ 
  isEditMode = false, 
  editData = null, 
  onSave, 
  onCancel, 
  isModal = false,
  submitting = false,
  mode = 'record', // 'record' 또는 'product'
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
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    overview_title: '',
    date: '',
    orderer: '',
    type: '',
    kind: mode === 'product' ? '스마트안전' : '',
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

    setFormData(prev => ({
      ...prev,
      images: reorderImages(prev.images)
    }));

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
    // Storage 버킷 확인
    checkStorageBucket().then(bucketExists => {
      if (!bucketExists) {
        console.warn('track_record Storage 버킷이 존재하지 않습니다.');
        console.log('Storage 설정을 위해 다음 단계를 따라주세요:');
        setupStoragePolicies();
      }
    });

    if (editData) {
      setFormData({
        title: editData.title || '',
        desc: editData.desc || '',
        overview_title: editData.overview_title || '',
        date: editData.date || '',
        orderer: editData.orderer || '',
        type: editData.type || '',
        kind: editData.kind || (mode === 'product' ? '스마트안전' : ''),
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
        const uploadedImages = [];
        const bucket = mode === 'product' ? 'product' : 'track_record';
        
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          validateImageFile(file, 50);
          
          try {
            const folder = mode === 'product' ? 'product' : 'track_record';
            const imageUrl = await uploadImage(file, folder, bucket);
            uploadedImages.push(imageUrl);
          } catch (uploadError) {
            console.error('Storage 업로드 실패:', uploadError);
            alert(`이미지 업로드 실패: ${file.name}. Storage 서버를 확인해주세요.`);
            continue; // 실패한 이미지는 건너뛰고 다음 이미지 처리
          }
        }
        
        if (uploadedImages.length > 0) {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...uploadedImages]
          }));
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
      console.log('삭제할 이미지 URL:', imageUrl);
      
      // Storage에서 파일 경로 추출
      const filePath = extractFilePathFromUrl(imageUrl);
      if (filePath) {
        const bucket = mode === 'product' ? 'product' : 'track_record';
        console.log('Storage에서 삭제할 파일 경로:', filePath, '버킷:', bucket);
        
        // Storage에서 파일 삭제
        const { error } = await supabase.storage
          .from(bucket)
          .remove([filePath]);
        
        if (error) {
          console.error('Storage 파일 삭제 실패:', error);
          alert('Storage에서 파일 삭제에 실패했습니다. UI에서는 제거됩니다.');
        } else {
          console.log('Storage 파일 삭제 성공:', filePath);
        }
      } else {
        console.warn('파일 경로를 추출할 수 없습니다:', imageUrl);
      }
      
      // UI에서 이미지 제거
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
      
    } catch (error) {
      console.error('이미지 삭제 중 오류:', error);
      alert('이미지 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleSave = () => {
    onSave(formData);
  };

  const handleCancel = () => {
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
            {mode === 'record' ? '실적명' : '모델명'} *
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
              {mode === 'record' ? '소제목' : '제품명'} *
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
              {mode === 'record' ? '실적 설명' : '제품 설명'} *
            </label>
            <div className="record-editor-tip">
              💡 팁: Enter로 줄바꿈, • 또는 - 로 리스트 작성 가능
            </div>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
              required
              placeholder={mode === 'record' ? 
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
              {mode === 'product' ? '제조사' : '발주처'} *
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

          {/* 실적 모드일 때 버튼을 panel-header 안에 배치 */}
          {mode === 'record' && (
            <div className="record-editor-button-group" style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={handleCancel}
                disabled={submitting}
                className="record-editor-cancel-btn"
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
                {formData.images.map((image, index) => (
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
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="record-editor-delete-btn"
                    >
                      삭제
                    </button>
                  </div>
                ))}
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
                                      const { error } = await supabase.storage
                                        .from('product')
                                        .remove([filePath]);
                                      
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
                                          const { error } = await supabase.storage
                                            .from('product')
                                            .remove([filePath]);
                                          
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
                          인증 이미지
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
                            <h5>업로드된 인증 이미지:</h5>
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
                                    alt={`인증 이미지 ${index + 1}`} 
                                    className="record-editor-image-thumbnail-large"
                                  />
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      try {
                                        const imageObj = formData.certifications[index];
                                        console.log('삭제할 인증 이미지:', imageObj);
                                        
                                        // Storage에서 파일 경로 추출
                                        const filePath = extractFilePathFromUrl(imageObj.url);
                                        if (filePath) {
                                          console.log('Storage에서 삭제할 인증 파일 경로:', filePath);
                                          
                                          // Storage에서 파일 삭제
                                          const { error } = await supabase.storage
                                            .from('product')
                                            .remove([filePath]);
                                          
                                          if (error) {
                                            console.error('인증 Storage 파일 삭제 실패:', error);
                                            alert('Storage에서 파일 삭제에 실패했습니다. UI에서는 제거됩니다.');
                                          } else {
                                            console.log('인증 Storage 파일 삭제 성공:', filePath);
                                          }
                                        } else {
                                          console.warn('인증 파일 경로를 추출할 수 없습니다:', imageObj.url);
                                        }
                                        
                                        // UI에서 이미지 제거
                                        const newImages = formData.certifications.filter((_, i) => i !== index);
                                        setFormData(prev => ({
                                          ...prev,
                                          certifications: newImages
                                        }));
                                      } catch (error) {
                                        console.error('인증 이미지 삭제 중 오류:', error);
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
                                            const { error } = await supabase.storage
                                              .from('product')
                                              .remove([filePath]);
                                            
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
                                      
                                      const fileUrl = await uploadDownloadFile(file, 'downloads', mode === 'product' ? 'product' : 'track_record');
                                      
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
                                            const { error } = await supabase.storage
                                              .from('product')
                                              .remove([filePath]);
                                            
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
                  )}
                </div>

                <div className="record-editor-product-right" style={{ flex: '1' }}>
                  {/* 오른쪽 컬럼은 비워둠 - 모든 내용을 왼쪽으로 이동 */}
                </div>
              </div>
            </div>

            {/* 제품 모드용 저장/취소 버튼 */}
            <div className="record-editor-button-group" style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={handleCancel}
                disabled={submitting}
                className="record-editor-cancel-btn"
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
