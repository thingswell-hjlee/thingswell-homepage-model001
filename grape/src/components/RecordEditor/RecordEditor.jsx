import React, { useState, useEffect, useRef } from 'react';
import ProductPage from '../ProductPage/ProductPage';
import { uploadImage, validateImageFile, checkStorageBucket } from '../../utils/imageUpload';
import { setupStoragePolicies } from '../../utils/supabaseRLS';
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
      { title: '', description: '', link: '' }
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
          { title: '', description: '', link: '' }
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
          validateImageFile(file, 5);
          
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

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleDataChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
        breadcrumbs: ["Home", "제품", "미리보기"]
      };
    } else {
      return {
        title: '실적',
        kindOptions: [
          { value: '스마트안전', label: '스마트안전' },
          { value: '통합제어', label: '통합제어' },
          { value: '정보통신', label: '정보통신' }
        ],
        breadcrumbs: ["Home", "실적", "미리보기"]
      };
    }
  };

  const modeConfig = getModeConfig();

  const content = (
    <div className={`record-editor-container ${isModal ? 'record-editor-container-modal' : ''}`}>
      {/* 미리보기 (왼쪽) */}
      <div className="record-editor-preview">
        <div className="record-editor-preview-content">
                      <ProductPage
              productData={{
                name: formData.title || '제목을 입력하세요',
                title: formData.overview_title || '개요 제목을 입력하세요',
                overview_title: formData.overview_title || '개요 제목을 입력하세요',
                overview: formData.desc || '내용을 입력하세요',
                images: formData.images || [],
                breadcrumbs: modeConfig.breadcrumbs,
                // 제품 전용 데이터
                keyFeatures: formData.keyFeatures.features.filter(f => f.trim() !== ''),
                keyFeaturesImages: formData.keyFeatures.images || [],
                specifications: formData.specifications || [],
                certifications: formData.certifications || [],
                downloads: formData.downloads,
                videos: formData.videos
              }}
              isEditMode={true}
              hideHeader={true}
              isRecordPage={mode === 'record'}
              onDataChange={handleDataChange}
            />
        </div>
      </div>

      {/* 편집 패널 (오른쪽) */}
      <div className="record-editor-panel">
        <div className="record-editor-panel-header">
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
            제목 *
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
            제품명 *
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
            제품 설명 *
          </label>
          <div className="record-editor-tip">
            💡 팁: Enter로 줄바꿈, • 또는 - 로 리스트 작성 가능
          </div>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            required
            placeholder="내용을 입력하세요...

예시:
• 첫 번째 항목
• 두 번째 항목
• 세 번째 항목

또는

- 첫 번째 항목
- 두 번째 항목
- 세 번째 항목"
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

        



        <div className="record-editor-form-group">
          <label className="record-editor-label">
            이미지 업로드
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
              <h4>업로드된 이미지:</h4>
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


        {/* 제품 전용 필드들 */}
        {mode === 'product' && (
          <>
            <div className="record-editor-product-section">
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
                          validateImageFile(file, 5);
                          try {
                            return await uploadImage(file, 'product', 'product');
                          } catch (uploadError) {
                            console.warn('Storage 업로드 실패, Base64로 대체:', uploadError);
                            // Storage 업로드 실패 시 Base64로 대체
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
                    <h5>업로드된 이미지:</h5>
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
                            onClick={() => {
                              const newImages = formData.keyFeatures.images.filter((_, i) => i !== index);
                              setFormData(prev => ({
                                ...prev,
                                keyFeatures: { ...prev.keyFeatures, images: newImages }
                              }));
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
              </div>



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
                          validateImageFile(file, 5);
                          try {
                            return await uploadImage(file, 'product', 'product');
                          } catch (uploadError) {
                            console.warn('Storage 업로드 실패, Base64로 대체:', uploadError);
                            // Storage 업로드 실패 시 Base64로 대체
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
                            onClick={() => {
                              const newImages = formData.specifications.filter((_, i) => i !== index);
                              setFormData(prev => ({
                                ...prev,
                                specifications: newImages
                              }));
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
                          validateImageFile(file, 5);
                          try {
                            return await uploadImage(file, 'product', 'product');
                          } catch (uploadError) {
                            console.warn('Storage 업로드 실패, Base64로 대체:', uploadError);
                            // Storage 업로드 실패 시 Base64로 대체
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
                            onClick={() => {
                              const newImages = formData.certifications.filter((_, i) => i !== index);
                              setFormData(prev => ({
                                ...prev,
                                certifications: newImages
                              }));
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
                        downloads: [...prev.downloads, { title: '', description: '', link: '' }]
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
                          onClick={() => {
                            const newDownloads = formData.downloads.filter((_, i) => i !== index);
                            setFormData(prev => ({ ...prev, downloads: newDownloads }));
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

                    <input
                      type="text"
                      placeholder="다운로드 링크 (URL)"
                      value={download.link || ''}
                      onChange={(e) => {
                        const newDownloads = [...formData.downloads];
                        newDownloads[index] = { ...newDownloads[index], link: e.target.value };
                        setFormData(prev => ({ ...prev, downloads: newDownloads }));
                      }}
                      className="record-editor-download-input"
                    />
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
              <div className="record-editor-button-group">
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
          </>
        )}


      </div>
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
