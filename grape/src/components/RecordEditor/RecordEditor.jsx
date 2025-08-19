import React, { useState, useEffect, useRef } from 'react';
import ProductPage from '../ProductPage/ProductPage';
import main from '../../assets/main_image.jpg';
import { uploadImage, validateImageFile } from '../../utils/imageUpload';

const RecordEditor = ({ 
  isEditMode = false, 
  editData = null, 
  onSave, 
  onCancel, 
  isModal = false,
  submitting = false 
}) => {
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    overview_title: '',
    overview: '',
    bottom_box_title: '',
    bottom_box_photo_caption: '',
    bottom_box_photo_captions: '',
    images: [main, main, main, main]
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.title || '',
        title: editData.desc || '',
        overview_title: editData.overview_title || '',
        overview: editData.overview || '',
        bottom_box_title: editData.bottom_box_title || '',
        bottom_box_photo_caption: editData.bottom_box_photo_caption || '',
        bottom_box_photo_captions: editData.bottom_box_photo_captions || '',
        images: editData.images ? JSON.parse(editData.images) : [main, main, main, main]
      });
    }
  }, [editData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (index, file) => {
    if (file) {
      try {
        // 파일 검증
        validateImageFile(file, 5); // 5MB 제한
        
        // Supabase Storage에 업로드
        const imageUrl = await uploadImage(file);
        
        const newImages = [...formData.images];
        newImages[index] = imageUrl;
        setFormData(prev => ({
          ...prev,
          images: newImages
        }));
        
        console.log(`이미지 ${index + 1} 업로드 성공:`, imageUrl);
      } catch (error) {
        console.error(`이미지 ${index + 1} 업로드 실패:`, error);
        alert(error.message);
      }
    }
  };

  const handleSave = () => {
    onSave(formData);
  };

  const startEditing = (field, value) => {
    setEditingField(field);
    setTempValue(value || '');
  };

  const saveEdit = () => {
    if (editingField) {
      setFormData(prev => ({
        ...prev,
        [editingField]: tempValue
      }));
    }
    setEditingField(null);
    setTempValue('');
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  // 편집 가능한 텍스트 컴포넌트
  const EditableText = ({ field, value, placeholder, multiline = false, style = {} }) => {
    const isEditing = editingField === field;
    
    if (isEditing) {
      const Component = multiline ? 'textarea' : 'input';
      return (
        <Component
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          style={{
            ...style,
            border: '2px solid #007bff',
            borderRadius: '4px',
            padding: '8px',
            fontSize: 'inherit',
            fontFamily: 'inherit',
            background: 'white',
            outline: 'none',
            resize: multiline ? 'vertical' : 'none',
            minHeight: multiline ? '60px' : 'auto',
            width: '100%',
            boxSizing: 'border-box'
          }}
          autoFocus
          lang="ko"
          inputMode="text"
          onCompositionStart={(e) => e.target.style.imeMode = 'active'}
          onCompositionEnd={(e) => e.target.style.imeMode = 'auto'}
        />
      );
    }

    return (
      <div
        onClick={() => startEditing(field, value)}
        style={{
          ...style,
          cursor: 'pointer',
          border: '2px solid transparent',
          borderRadius: '4px',
          padding: '8px',
          transition: 'all 0.2s ease',
          minHeight: multiline ? '60px' : 'auto',
          display: 'flex',
          alignItems: multiline ? 'flex-start' : 'center'
        }}
        onMouseEnter={(e) => {
          e.target.style.borderColor = '#e9ecef';
          e.target.style.backgroundColor = '#f8f9fa';
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = 'transparent';
          e.target.style.backgroundColor = 'transparent';
        }}
      >
        {value || placeholder}
      </div>
    );
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
              name: formData.name || '제목을 입력하세요',
              title: formData.overview_title || '개요 제목을 입력하세요',
              overview: formData.overview || '개요 내용을 입력하세요',
              bottom_box_title: formData.bottom_box_title || '하단 박스 제목을 입력하세요',
              images: formData.images || [main, main, main, main],
              breadcrumbs: ["Home", "실적", "편집"]
            }}
            isEditMode={true}
            onDataChange={(field, value) => {
              setFormData(prev => ({
                ...prev,
                [field]: value
              }));
            }}
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
        <h3 style={{ marginBottom: '20px', color: '#495057' }}>편집 도구</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#495057', fontWeight: 'bold' }}>
            제목 *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            lang="ko"
            inputMode="text"
            onCompositionStart={(e) => e.target.style.imeMode = 'active'}
            onCompositionEnd={(e) => e.target.style.imeMode = 'inactive'}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#495057', fontWeight: 'bold' }}>
            개요 제목
          </label>
          <input
            type="text"
            name="overview_title"
            value={formData.overview_title}
            onChange={handleInputChange}
            lang="ko"
            inputMode="text"
            onCompositionStart={(e) => e.target.style.imeMode = 'active'}
            onCompositionEnd={(e) => e.target.style.imeMode = 'inactive'}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '10px', color: '#495057', fontSize: '14px' }}>이미지 업로드</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[0, 1, 2, 3].map((index) => (
              <div key={index} style={{ 
                border: '2px dashed #ddd', 
                borderRadius: '6px', 
                padding: '8px',
                textAlign: 'center',
                background: '#fff'
              }}>
                <div style={{ 
                  width: '100%', 
                  height: '60px', 
                  background: '#f8f9fa',
                  borderRadius: '4px',
                  marginBottom: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  {formData.images && formData.images[index] ? (
                    <img 
                      src={formData.images[index]} 
                      alt={`이미지 ${index + 1}`}
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '100%', 
                        objectFit: 'cover' 
                      }}
                    />
                  ) : (
                    <span style={{ color: '#999', fontSize: '10px' }}>이미지 없음</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                  style={{ 
                    width: '100%', 
                    fontSize: '10px',
                    cursor: 'pointer'
                  }}
                />
                <div style={{ fontSize: '9px', color: '#666', marginTop: '2px' }}>
                  이미지 {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

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
            <h2 style={{ margin: 0, fontSize: '24px', color: '#333' }}>실적 편집</h2>
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
