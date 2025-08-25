import React, { useState } from 'react';
import Breadcrumbs from '../Breadcrumbs';
import './ProductInfo.css';

const ProductInfo = ({ 
  productName = "XCN-3000",
  productTitle = "어드밴스드 통합제어기",
  description = "산업 자동화 및 스마트 시스템 통합을 위한 다목적 인터페이스 제어 모듈로, 다양한 환경에서 안정적인 연결성과 정밀한 제어를 제공하며, 효율적인 관리와 운영을 가능하게 합니다.",
  breadcrumbs = ["Home", "Products", "Control system"],
  isEditMode = false,
  onDataChange = null,
  isRecordPage = false
}) => {
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");

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
      if (e.key === 'Enter') {
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
    <div className="product-info">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      
      {isEditMode ? (
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#6c757d' }}>
            {isRecordPage ? '실적명' : '제품명'}
          </label>
          <EditableText
            field="name"
            value={productName}
            placeholder={isRecordPage ? "실적명을 입력하세요" : "제품명을 입력하세요"}
            style={{ fontSize: '24px', fontWeight: 'bold' }}
          />
        </div>
      ) : (
        <h1 className="product-name">{productName}</h1>
      )}
    </div>
  );
};

export default ProductInfo;
