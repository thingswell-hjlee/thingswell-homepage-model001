import React, { useState, useEffect } from 'react';
import welding from '../../assets/welding.jpg';
import ProductList from '../Products/ProductList';
import main from '../../assets/case_bus_seoul/main_4.jpg';
import headerImage from '../../assets/header_image/performance.jpg';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

import ProductPage from '../../components/ProductPage/ProductPage';
import { uploadImage, validateImageFile } from '../../utils/imageUpload';
import { setupTrackRecordRLS, createTrackRecordPolicies, checkUserAuthStatus, checkAndCreateMissingPolicies } from '../../utils/supabaseRLS';

export default function ProductListControlPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' 또는 'detail'
  const [editingExistingRecord, setEditingExistingRecord] = useState(null);
  const [newRecord, setNewRecord] = useState({
    title: '',
    overview_title: '',
    desc: '',
    date: '',
    orderer: '',
    type: '',
    images: []
  });
  const [submitting, setSubmitting] = useState(false);
  
  const { user, isAuthenticated, canEditContent } = useAuth();

  useEffect(() => {
    fetchTrackRecords();
    // RLS 정책 및 인증 상태 확인
    setupTrackRecordRLS();
    checkUserAuthStatus();
    checkAndCreateMissingPolicies();
  }, []);

  const fetchTrackRecords = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('Track_record')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        throw error;
      }

      // 원시 데이터 확인을 위한 로깅
      console.log('Track_record 원시 데이터:', data);

      // 데이터를 ProductList 컴포넌트에서 사용하는 형식으로 변환
      const formattedProducts = data.map(record => {
        // 이미지 URL 처리
        let imageUrl = main; // 기본 이미지
        if (record.images) {
          try {
            const images = JSON.parse(record.images);
            if (images && images.length > 0 && images[0]) {
              imageUrl = images[0]; // 첫 번째 이미지 사용
            }
          } catch (error) {
            console.error('이미지 파싱 오류:', error);
          }
        }
        
        return {
          name: record.title,
          title: record.overview_title || record.desc,
          img: imageUrl,
          onClick: () => handleRecordClick(record),
          category: record.type,
          organization: record.orderer,
          date: record.date,
          rawData: record // 원본 데이터 보존
        };
      });

      setProducts(formattedProducts);
    } catch (err) {
      console.error('Track_record 데이터를 가져오는 중 오류 발생:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();
    
    // 인증 상태 확인
    const { isAuthenticated } = await checkUserAuthStatus();
    if (!isAuthenticated) {
      alert('실적을 추가하려면 로그인이 필요합니다.');
      return;
    }
    
    // 편집 모드인지 확인
    if (editingExistingRecord) {
      // 편집 모드: 기존 레코드 업데이트
      try {
        setSubmitting(true);
        
        const { data, error } = await supabase
          .from('Track_record')
          .update({
            title: newRecord.title,
            desc: newRecord.desc,
            overview_title: newRecord.overview_title,
            date: newRecord.date,
            orderer: newRecord.orderer,
            type: newRecord.type,
            images: newRecord.images && newRecord.images.length > 0 ? JSON.stringify(newRecord.images) : null
          })
          .eq('id', editingExistingRecord.id)
          .select();

        if (error) {
          console.error('Supabase 오류 상세:', error);
          
          if (error.message.includes('row-level security policy')) {
            console.log('RLS 정책이 필요합니다. 다음 정책을 Supabase 대시보드에서 실행하세요:');
            createTrackRecordPolicies();
            alert('보안 정책 설정이 필요합니다. 개발자에게 문의하세요.');
          } else {
            throw error;
          }
          return;
        }

        console.log('실적 수정 성공:', data);
        alert('실적이 성공적으로 수정되었습니다!');
        
        // 모달 닫기 및 데이터 초기화
        setShowAddModal(false);
        setEditingExistingRecord(null);
        setNewRecord({ title: '', overview_title: '', desc: '', date: '', orderer: '', type: '', images: [] });
        
        // 실적 목록 새로고침
        fetchTrackRecords();
        
      } catch (error) {
        console.error('실적 수정 중 오류 발생:', error);
        alert('실적 수정 중 오류가 발생했습니다: ' + error.message);
      } finally {
        setSubmitting(false);
      }
    } else {
      // 추가 모드: 새 레코드 추가
      // 날짜 유효성 검증
      if (!newRecord.date) {
        alert('날짜를 선택해주세요.');
        return;
      }
      
      // 기본 정보 검증
      if (!newRecord.title || !newRecord.overview_title || !newRecord.desc || !newRecord.date || !newRecord.orderer || !newRecord.type) {
        alert('모든 필드를 입력해주세요.');
        return;
      }

      try {
        setSubmitting(true);
        
        // 데이터베이스에 저장
        const { data, error } = await supabase
          .from('Track_record')
          .insert({
            title: newRecord.title,
            desc: newRecord.desc,
            overview_title: newRecord.overview_title,
            date: newRecord.date,
            orderer: newRecord.orderer,
            type: newRecord.type,
            images: newRecord.images && newRecord.images.length > 0 ? JSON.stringify(newRecord.images) : null
          })
          .select();

        if (error) {
          console.error('Supabase 오류 상세:', error);
          
          // RLS 오류인 경우 정책 생성 안내
          if (error.message.includes('row-level security policy')) {
            console.log('RLS 정책이 필요합니다. 다음 정책을 Supabase 대시보드에서 실행하세요:');
            createTrackRecordPolicies();
            alert('보안 정책 설정이 필요합니다. 개발자에게 문의하세요.');
          } else {
            throw error;
          }
          return;
        }

        console.log('실적 추가 성공:', data);
        alert('실적이 성공적으로 추가되었습니다!');
        
        // 모달 닫기 및 데이터 초기화
        setShowAddModal(false);
        setNewRecord({ title: '', overview_title: '', desc: '', date: '', orderer: '', type: '', images: [] });
        
        // 실적 목록 새로고침
        fetchTrackRecords();
        
      } catch (error) {
        console.error('실적 추가 중 오류 발생:', error);
        alert('실적 추가 중 오류가 발생했습니다: ' + error.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // 날짜 필드인 경우 형식 강제 지정
    if (name === 'date' && value) {
      // 브라우저가 다른 형식으로 반환하더라도 yyyy-mm-dd로 변환
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        
        setNewRecord(prev => ({
          ...prev,
          [name]: formattedDate
        }));
        return;
      }
    }
    
    setNewRecord(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (files) => {
    if (files && files.length > 0) {
      try {
        setSubmitting(true);
        
        const uploadedImages = [];
        
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          
          // 파일 검증
          validateImageFile(file, 5); // 5MB 제한
          
          // Supabase Storage에 업로드
          const imageUrl = await uploadImage(file);
          uploadedImages.push(imageUrl);
          
          console.log(`이미지 ${i + 1} 업로드 성공:`, imageUrl);
        }
        
        setNewRecord(prev => ({
          ...prev,
          images: [...prev.images, ...uploadedImages]
        }));
        
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        alert(error.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const removeImage = (index) => {
    setNewRecord(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    // 목록 페이지로 돌아가기
    setViewMode('list');
    setSelectedRecord(null);
  };

  const handleEditRecord = async (record) => {
    // 인증 상태 확인
    const { isAuthenticated } = await checkUserAuthStatus();
    if (!isAuthenticated) {
      alert('실적을 편집하려면 로그인이 필요합니다.');
      return;
    }
    
    // 편집할 데이터를 newRecord에 설정
    setNewRecord({
      title: record.title || '',
      overview_title: record.overview_title || '',
      desc: record.desc || '',
      date: record.date || '',
      orderer: record.orderer || '',
      type: record.type || '',
      images: record.images ? JSON.parse(record.images) : []
    });
    
    // 편집 모드로 설정
    setEditingExistingRecord(record);
    setShowAddModal(true);
  };





  if (loading) {
    return <div>데이터를 불러오는 중...</div>;
  }

  if (error) {
    return <div>오류가 발생했습니다: {error}</div>;
  }

  // 상세 보기 모드일 때
  if (viewMode === 'detail' && selectedRecord) {
    return (
      <div>
        <div style={{
          padding: '20px',
          background: '#f8f9fa',
          borderBottom: '1px solid #dee2e6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, color: '#495057' }}>실적 상세</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            {canEditContent() && (
              <button
                onClick={() => handleEditRecord(selectedRecord)}
                style={{
                  padding: '10px 20px',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                편집
              </button>
            )}
            <button
              onClick={handleBackToList}
              style={{
                padding: '10px 20px',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
        <div style={{ padding: '20px' }}>
          <ProductPage
            productData={{
              name: selectedRecord.title || '제목 없음',
              title: selectedRecord.overview_title || selectedRecord.desc || '개요 없음',
              overview_title: selectedRecord.overview_title || selectedRecord.desc || '개요 없음',
              overview: selectedRecord.overview || selectedRecord.desc || '내용 없음',
              images: selectedRecord.images ? JSON.parse(selectedRecord.images) : [main, main, main, main],
              breadcrumbs: ["Home", "실적"]
            }}
            isRecordPage={true}
          />
        </div>
      </div>
    );
  }

  // 목록 보기 모드
  return (
    <div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          /* 날짜 입력 필드 형식 강제 지정 */
          input[type="date"]::-webkit-datetime-edit-fields-wrapper {
            display: flex;
          }
          
          input[type="date"]::-webkit-datetime-edit-text {
            padding: 0 2px;
          }
          
          input[type="date"]::-webkit-datetime-edit-month-field,
          input[type="date"]::-webkit-datetime-edit-day-field,
          input[type="date"]::-webkit-datetime-edit-year-field {
            padding: 0 2px;
          }
          
          /* Firefox용 날짜 형식 */
          input[type="date"] {
            position: relative;
          }
          
          input[type="date"]::-webkit-calendar-picker-indicator {
            cursor: pointer;
          }
        `}
      </style>
      {/* 추가 모달 */}
      {showAddModal && (
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
                {editingExistingRecord ? '실적 편집' : '실적 추가'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingExistingRecord(null);
                }}
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
              {/* 미리보기 (왼쪽) */}
              <div style={{ flex: '2', padding: '20px', overflow: 'auto', background: '#fff', borderRadius: '8px', border: '1px solid #ddd' }}>
                <div style={{ 
                  transform: 'scale(0.8)', 
                  width: '125%', 
                  transformOrigin: 'top left',
                  minHeight: '400px'
                }}>
                  <ProductPage
                    productData={{
                      name: newRecord.title || '',
                      title: newRecord.overview_title || '',
                      overview_title: newRecord.overview_title || '',
                      overview: newRecord.desc || '',
                      images: newRecord.images && newRecord.images.length > 0 ? newRecord.images : [main],
                      breadcrumbs: ["Home", "실적", "미리보기"]
                    }}
                    isEditMode={true}
                    hideHeader={true}
                    isRecordPage={true}
                    onDataChange={(field, value) => {
                      setNewRecord(prev => ({
                        ...prev,
                        [field]: value
                      }));
                    }}
                  />
                </div>
              </div>

              {/* 편집 패널 (오른쪽) */}
              <div style={{ flex: '1', padding: '20px', overflow: 'auto', background: '#f8f9fa', borderRadius: '8px', minWidth: '300px', textAlign: 'left' }}>
                <h3 style={{ marginBottom: '20px', color: '#495057', textAlign: 'left' }}>편집 도구</h3>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#495057', fontWeight: 'bold', textAlign: 'left' }}>
                    제목 *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newRecord.title}
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
                      fontSize: '14px',
                      textAlign: 'left'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#495057', fontWeight: 'bold', textAlign: 'left' }}>
                    개요 제목 *
                  </label>
                  <input
                    type="text"
                    name="overview_title"
                    value={newRecord.overview_title || ''}
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
                      fontSize: '14px',
                      textAlign: 'left'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#495057', fontWeight: 'bold', textAlign: 'left' }}>
                    설명 *
                  </label>
                  <textarea
                    name="desc"
                    value={newRecord.desc}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    lang="ko"
                    inputMode="text"
                    onCompositionStart={(e) => e.target.style.imeMode = 'active'}
                    onCompositionEnd={(e) => e.target.style.imeMode = 'inactive'}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px',
                      resize: 'vertical',
                      textAlign: 'left'
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
                    value={newRecord.date}
                    onChange={handleInputChange}
                    required
                    lang="ko"
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
                    발주처 *
                  </label>
                  <input
                    type="text"
                    name="orderer"
                    value={newRecord.orderer}
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
                      fontSize: '14px',
                      textAlign: 'left'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#495057', fontWeight: 'bold', textAlign: 'left' }}>
                    유형 *
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={newRecord.type}
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
                      fontSize: '14px',
                      textAlign: 'left'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ marginBottom: '10px', color: '#495057', fontSize: '14px', textAlign: 'left' }}>이미지</h4>
                  <div style={{
                    border: '2px dashed #ddd',
                    borderRadius: '6px',
                    padding: '15px',
                    textAlign: 'center',
                    background: '#fff'
                  }}>
                    {/* 업로드된 이미지들 표시 */}
                    {newRecord.images && newRecord.images.length > 0 && (
                      <div style={{ marginBottom: '15px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                          {newRecord.images.map((image, index) => (
                            <div key={index} style={{ position: 'relative' }}>
                              <img
                                src={image}
                                alt={`이미지 ${index + 1}`}
                                style={{
                                  width: '80px',
                                  height: '80px',
                                  objectFit: 'cover',
                                  borderRadius: '4px',
                                  border: '1px solid #ddd'
                                }}
                              />
                              <button
                                onClick={() => removeImage(index)}
                                style={{
                                  position: 'absolute',
                                  top: '-5px',
                                  right: '-5px',
                                  background: '#ff4444',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '50%',
                                  width: '20px',
                                  height: '20px',
                                  fontSize: '12px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleImageChange(e.target.files)}
                      style={{
                        width: '100%',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{ marginTop: '5px', fontSize: '11px', color: '#666' }}>
                      사진 선택
                    </div>
                    {submitting && (
                      <div style={{ marginTop: '10px', color: '#666', fontSize: '12px' }}>
                        <div style={{
                          display: 'inline-block',
                          width: '16px',
                          height: '16px',
                          border: '2px solid #f3f3f3',
                          borderTop: '2px solid #007bff',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }}></div>
                        업로드 중...
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  gap: '10px', 
                  justifyContent: 'flex-end',
                  marginTop: '20px'
                }}>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
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
                    type="submit"
                    onClick={handleAddRecord}
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
                    {submitting ? (editingExistingRecord ? '수정 중...' : '추가 중...') : (editingExistingRecord ? '수정' : '추가')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}



      <ProductList
        products={products}
        title="스마트안전장비 실적"
        subtitle="스마트안전장비 실적을 확인하세요"
        breadcrumbs={["Home", "실적", "스마트안전장비"]}
        headerImage={headerImage}
        onEditRecord={handleEditRecord}
        canEdit={canEditContent()}
        addButton={canEditContent() && (
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              padding: 'var(--spacing-sm) var(--spacing-md)',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              outline: 'none',
              borderRadius: 'var(--border-radius-md)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer',
              transition: 'background-color var(--transition-slow)',
              whiteSpace: 'nowrap',
              height: '40px',
              minWidth: '80px',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#0056b3';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--color-primary)';
            }}
          >
            + 실적 추가
          </button>
        )}
      />
    </div>
  );
}
