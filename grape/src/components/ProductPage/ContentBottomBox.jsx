import React, { useState } from 'react';
import './ContentBottomBox.css';
import ImageWithCaption from '../Common/ImageWithCaption';
import { marked } from 'marked';
import useTranslation from '../../hooks/useTranslation';

const ContentBottomBox = ({
  title,
  description,
  photo,
  photos,
  photoCaption,
  photoCaptions,
  children,
  isEditMode = false,
  onDataChange = null,
  isRecordPage = false
}) => {
  const { t } = useTranslation();
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const photoList = Array.isArray(photos) ? photos.filter(Boolean) : [];
  const captionsList = Array.isArray(photoCaptions) ? photoCaptions : [];
  const hasTwoOrMore = photoList.length >= 2;
  const hasSingle = !hasTwoOrMore && (photoList.length === 1 || !!photo);

  // 편집 가능한 텍스트 컴포넌트
  const EditableText = ({ field, value, placeholder, style = {} }) => {
    const isEditing = editingField === field;
    
    const startEditing = () => {
      if (isEditMode) {
        setEditingField(field);
        setTempValue(value || "");
      }
    };

    const saveEdit = () => {
      if (onDataChange && editingField === field) {
        onDataChange(field, tempValue);
      }
      setEditingField(null);
      setTempValue("");
    };

    const cancelEdit = () => {
      setEditingField(null);
      setTempValue("");
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        saveEdit();
      } else if (e.key === 'Escape') {
        cancelEdit();
      }
    };

    if (isEditing) {
      return (
        <input
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
            width: '100%',
            boxSizing: 'border-box',
            textAlign: 'left'
          }}
          autoFocus
          lang="ko"
          inputMode="text"
          onCompositionStart={(e) => {
            e.target.style.imeMode = 'active';
            e.target.setAttribute('data-composing', 'true');
          }}
          onCompositionEnd={(e) => {
            e.target.style.imeMode = 'auto';
            e.target.removeAttribute('data-composing');
            // 한글 입력 완료 시 최종 값 설정
            setTempValue(e.target.value);
          }}
                  onChange={(e) => {
          // 한글 입력 중이 아닐 때만 값 업데이트
          if (!e.target.getAttribute('data-composing')) {
            setTempValue(e.target.value);
          }
        }}
        />
      );
    }

    return (
      <div
        onClick={startEditing}
        style={{
          ...style,
          cursor: isEditMode ? 'pointer' : 'default',
          border: '2px solid transparent',
          borderRadius: '4px',
          padding: '8px',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          boxSizing: 'border-box',
          justifyContent: 'flex-start',
          textAlign: 'left'
        }}
        onMouseEnter={(e) => {
          if (isEditMode) {
            e.target.style.borderColor = '#e9ecef';
            e.target.style.backgroundColor = '#f8f9fa';
          }
        }}
        onMouseLeave={(e) => {
          if (isEditMode) {
            e.target.style.borderColor = 'transparent';
            e.target.style.backgroundColor = 'transparent';
          }
        }}
      >
        {value || placeholder}
      </div>
    );
  };

  return (
    <div className="content-bottom-box">
      <div className="bottom-box-content">
        {title && !isRecordPage ? (
          isEditMode ? (
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#6c757d', fontSize: '12px' }}>{t('ui2.bottomBox.titleLabel')}</label>
              <EditableText
                field="bottom_box_title"
                value={title}
                placeholder={t('ui2.bottomBox.titlePlaceholder')}
                style={{ fontSize: '16px', fontWeight: 'bold' }}
              />
            </div>
          ) : (
            <div 
              dangerouslySetInnerHTML={{ __html: title ? marked(title) : '' }}
              style={{
                lineHeight: '1.6',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            />
          )
        ) : null}
        
        {description ? <p>{description}</p> : null}

        {hasTwoOrMore ? (
          <div className="bottom-box-images">
            <div style={{ position: 'relative' }}>
              <ImageWithCaption
                className="bottom-box-image"
                src={photoList[0]}
                alt="bottom-box-photo-1"
                caption={captionsList[0]}
                position="top-left"
              />
              {isEditMode && (
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#6c757d', fontSize: '12px' }}>{t('ui2.bottomBox.caption1Label')}</label>
                  <EditableText
                    field="photo_caption_0"
                    value={captionsList[0]}
                    placeholder={t('ui2.bottomBox.caption1Placeholder')}
                    style={{ fontSize: '14px' }}
                  />
                </div>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <ImageWithCaption
                className="bottom-box-image"
                src={photoList[1]}
                alt="bottom-box-photo-2"
                caption={captionsList[1]}
                position="top-left"
              />
              {isEditMode && (
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#6c757d', fontSize: '12px' }}>{t('ui2.bottomBox.caption2Label')}</label>
                  <EditableText
                    field="photo_caption_1"
                    value={captionsList[1]}
                    placeholder={t('ui2.bottomBox.caption2Placeholder')}
                    style={{ fontSize: '14px' }}
                  />
                </div>
              )}
            </div>
          </div>
        ) : hasSingle ? (
          <div style={{ position: 'relative' }}>
            <ImageWithCaption
              className="bottom-box-image"
              src={photoList[0] || photo}
              alt="bottom-box-photo"
              caption={photoCaption}
              position="top-left"
            />
            {isEditMode && (
              <div style={{ marginTop: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#6c757d', fontSize: '12px' }}>{t('ui2.bottomBox.captionLabel')}</label>
                <EditableText
                  field="bottom_box_photo_caption"
                  value={photoCaption}
                  placeholder={t('ui2.bottomBox.captionPlaceholder')}
                  style={{ fontSize: '14px' }}
                />
              </div>
            )}
          </div>
        ) : null}

        {children}
      </div>
    </div>
  );
};

export default ContentBottomBox;


