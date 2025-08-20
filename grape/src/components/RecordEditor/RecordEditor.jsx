import React, { useState, useEffect, useRef } from 'react';
import ProductPage from '../ProductPage/ProductPage';
import { uploadImage, validateImageFile, checkStorageBucket } from '../../utils/imageUpload';
import { setupStoragePolicies } from '../../utils/supabaseRLS';

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
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    overview_title: '',
    date: '',
    orderer: '',
    type: '',
    kind: mode === 'product' ? '스마트안전장비' : '',
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
        kind: editData.kind || (mode === 'product' ? '스마트안전장비' : ''),
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
          { value: '스마트안전장비', label: '스마트안전장비' },
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
    <div style={{ 
      display: 'flex', 
      gap: '20px', 
      height: '100%',
      maxHeight: isModal ? '80vh' : '100vh'
    }}>
      {/* 미리보기 (왼쪽) */}
      <div style={{ 
        flex: '2', 
        padding: '20px',
        overflow: 'auto',
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <div style={{ 
          transform: 'scale(0.8)', 
          width: '125%', 
          transformOrigin: 'top left',
          minHeight: '400px'
        }}>
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
      <div style={{ 
        flex: '1', 
        padding: '20px',
        overflow: 'auto',
        background: '#f8f9fa',
        borderRadius: '8px',
        minWidth: '300px'
      }}>
        <h3 style={{ marginBottom: '20px', color: '#495057' }}>{modeConfig.title} 편집 도구</h3>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#495057', fontWeight: 'bold', textAlign: 'left' }}>
            사업분야 *
          </label>
          <select
            name="kind"
            value={formData.kind}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              textAlign: 'left'
            }}
          >
            <option value="">사업분야를 선택하세요</option>
            {modeConfig.kindOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#495057', fontWeight: 'bold', textAlign: 'left' }}>
            소분류 *
          </label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              textAlign: 'left'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#495057', fontWeight: 'bold', textAlign: 'left' }}>
            사업명 *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              textAlign: 'left'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#495057', fontWeight: 'bold', textAlign: 'left' }}>
            주요품목 *
          </label>
          <input
            type="text"
            name="overview_title"
            value={formData.overview_title}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              textAlign: 'left'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#495057', fontWeight: 'bold', textAlign: 'left' }}>
            사업 설명 *
          </label>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: '#6c757d', fontStyle: 'italic' }}>
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
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              textAlign: 'left',
              minHeight: '150px',
              resize: 'vertical',
              fontFamily: 'inherit',
              lineHeight: '1.5'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#495057', fontWeight: 'bold', textAlign: 'left' }}>
            날짜 *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              textAlign: 'left'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#495057', fontWeight: 'bold', textAlign: 'left' }}>
            {mode === 'product' ? '제조사' : '발주처'} *
          </label>
          <input
            type="text"
            name="orderer"
            value={formData.orderer}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              textAlign: 'left'
            }}
          />
        </div>

        



        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#495057', fontWeight: 'bold', textAlign: 'left' }}>
            이미지 업로드
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageChange(e.target.files)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          {formData.images.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              <h4>업로드된 이미지:</h4>
              {formData.images.map((image, index) => (
                <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={image} alt={`이미지 ${index + 1}`} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    style={{
                      padding: '5px 10px',
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 제품 전용 필드들 */}
        {mode === 'product' && (
          <>
            <div style={{ marginBottom: '20px', borderTop: '2px solid #dee2e6', paddingTop: '20px' }}>
              <h4 style={{ marginBottom: '15px', color: '#495057' }}>제품 상세 정보</h4>
              


              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#495057', fontWeight: 'bold', textAlign: 'left' }}>
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
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
                {formData.keyFeatures.images && formData.keyFeatures.images.length > 0 && (
                  <div style={{ marginTop: '10px' }}>
                    <h5>업로드된 이미지:</h5>
                    {formData.keyFeatures.images.map((imageObj, index) => (
                      <div key={index} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                          <img 
                            src={imageObj.url} 
                            alt={`주요 기능 이미지 ${index + 1}`} 
                            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
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
                            style={{
                              padding: '5px 10px',
                              background: '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
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
                          style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>



              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#495057', fontWeight: 'bold', textAlign: 'left' }}>
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
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
                {formData.specifications && formData.specifications.length > 0 && (
                  <div style={{ marginTop: '10px' }}>
                    <h5>업로드된 사양 이미지:</h5>
                    {formData.specifications.map((imageObj, index) => (
                      <div key={index} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                          <img 
                            src={imageObj.url} 
                            alt={`사양 이미지 ${index + 1}`} 
                            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
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
                            style={{
                              padding: '5px 10px',
                              background: '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
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
                          style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#495057', fontWeight: 'bold', textAlign: 'left' }}>
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
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
                {formData.certifications && formData.certifications.length > 0 && (
                  <div style={{ marginTop: '10px' }}>
                    <h5>업로드된 인증 이미지:</h5>
                    {formData.certifications.map((imageObj, index) => (
                      <div key={index} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                          <img 
                            src={imageObj.url} 
                            alt={`인증 이미지 ${index + 1}`} 
                            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
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
                            style={{
                              padding: '5px 10px',
                              background: '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
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
                          style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '14px', color: '#495057', fontWeight: 'bold', textAlign: 'left' }}>
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
                    style={{
                      padding: '4px 8px',
                      background: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span style={{ fontSize: '14px' }}>+</span> 추가
                  </button>
                </div>
                {formData.downloads.map((download, index) => (
                  <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #eee', borderRadius: '4px', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#666' }}>다운로드 {index + 1}</span>
                      {formData.downloads.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newDownloads = formData.downloads.filter((_, i) => i !== index);
                            setFormData(prev => ({ ...prev, downloads: newDownloads }));
                          }}
                          style={{
                            padding: '2px 6px',
                            background: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontSize: '10px'
                          }}
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
                      style={{
                        width: '100%',
                        padding: '6px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        marginBottom: '5px'
                      }}
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
                      style={{
                        width: '100%',
                        padding: '6px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        marginBottom: '5px'
                      }}
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
                      style={{
                        width: '100%',
                        padding: '6px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#495057', fontWeight: 'bold', textAlign: 'left' }}>
                  동영상 링크
                </label>
                <div style={{ marginBottom: '10px' }}>
                  <input
                    type="text"
                    placeholder="동영상 링크를 입력하세요 (YouTube, Vimeo 등)"
                    value={formData.videos.join('\n')}
                    onChange={(e) => {
                      const links = e.target.value.split('\n').filter(link => link.trim() !== '');
                      setFormData(prev => ({ ...prev, videos: links }));
                    }}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px',
                      minHeight: '100px',
                      resize: 'vertical'
                    }}
                    as="textarea"
                  />
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  여러 링크를 입력하려면 줄바꿈으로 구분하세요.
                </div>
              </div>
            </div>
          </>
        )}

        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          justifyContent: 'flex-end',
          marginTop: '20px'
        }}>
          <button
            onClick={handleCancel}
            disabled={submitting}
            style={{
              padding: '10px 20px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: '#fff',
              color: '#666',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={submitting}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              background: submitting ? '#ccc' : '#007bff',
              color: '#fff',
              cursor: submitting ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            {submitting ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '10px',
          width: '95vw',
          maxWidth: '1400px',
          maxHeight: '95vh',
          overflow: 'auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
            borderBottom: '1px solid #eee'
          }}>
            <h2 style={{ margin: 0, fontSize: '24px', color: '#333' }}>
              {editData ? `${modeConfig.title} 편집` : `${modeConfig.title} 추가`}
            </h2>
            <button
              onClick={handleCancel}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>
          </div>
          <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
            {content}
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default RecordEditor;
