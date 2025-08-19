import React, { useState, useEffect } from 'react';
import welding from '../../assets/welding.jpg';
import ProductList from '../Products/ProductList';
import main from '../../assets/case_bus_seoul/main_4.jpg';
import headerImage from '../../assets/header_image/performance.jpg';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function ProductListControlPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    title: '',
    desc: '',
    date: '',
    orderer: '',
    type: ''
  });
  const [submitting, setSubmitting] = useState(false);
  
  const { user, isAuthenticated, canEditContent } = useAuth();

  useEffect(() => {
    fetchTrackRecords();
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
      const formattedProducts = data.map(record => ({
        name: record.title,
        title: record.desc,
        img: main, // 기본 이미지 사용 (필요시 record에서 이미지 필드 추가 가능)
        link: `/cases/${record.id}`,
        category: record.type,
        organization: record.orderer,
        date: record.date
      }));

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
    setSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('Track_record')
        .insert([newRecord])
        .select();

      if (error) {
        throw error;
      }

      // 성공적으로 추가되면 모달 닫고 데이터 새로고침
      setShowAddModal(false);
      setNewRecord({ title: '', desc: '', date: '', orderer: '', type: '' });
      fetchTrackRecords();
    } catch (err) {
      console.error('데이터 추가 중 오류 발생:', err);
      alert('데이터 추가 중 오류가 발생했습니다: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 미리보기용 실적 데이터 생성
  const previewProduct = {
    name: newRecord.title || '제목을 입력하세요',
    title: newRecord.desc || '설명을 입력하세요',
    img: main,
    category: newRecord.type || '유형을 입력하세요',
    organization: newRecord.orderer || '발주처를 입력하세요',
    date: newRecord.date || '날짜를 선택하세요'
  };

  if (loading) {
    return <div>데이터를 불러오는 중...</div>;
  }

  if (error) {
    return <div>오류가 발생했습니다: {error}</div>;
  }

  return (
    <div>
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
            padding: '30px',
            borderRadius: '10px',
            width: '90vw',
            maxWidth: '1200px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h2 style={{ textAlign: 'left', marginBottom: 'var(--spacing-lg)' }}>새 실적 추가</h2>
            
            <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
              {/* 입력 폼 */}
              <div style={{ flex: 1, minWidth: '300px' }}>
                <form onSubmit={handleAddRecord}>
                  <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-sm)', textAlign: 'left' }}>제목</label>
                    <input
                      type="text"
                      name="title"
                      value={newRecord.title}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm)',
                        border: '1px solid #ddd',
                        borderRadius: 'var(--border-radius-sm)',
                        fontSize: 'var(--font-size-sm)'
                      }}
                    />
                  </div>
                
                  <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-sm)', textAlign: 'left' }}>설명</label>
                    <textarea
                      name="desc"
                      value={newRecord.desc}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm)',
                        border: '1px solid #ddd',
                        borderRadius: 'var(--border-radius-sm)',
                        fontSize: 'var(--font-size-sm)'
                      }}
                    />
                  </div>
                
                  <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-sm)', textAlign: 'left' }}>날짜</label>
                    <input
                      type="date"
                      name="date"
                      value={newRecord.date}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm)',
                        border: '1px solid #ddd',
                        borderRadius: 'var(--border-radius-sm)',
                        fontSize: 'var(--font-size-sm)'
                      }}
                    />
                  </div>
                
                  <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-sm)', textAlign: 'left' }}>발주처</label>
                    <input
                      type="text"
                      name="orderer"
                      value={newRecord.orderer}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm)',
                        border: '1px solid #ddd',
                        borderRadius: 'var(--border-radius-sm)',
                        fontSize: 'var(--font-size-sm)'
                      }}
                    />
                  </div>
                
                  <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-sm)', textAlign: 'left' }}>유형</label>
                    <input
                      type="text"
                      name="type"
                      value={newRecord.type}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm)',
                        border: '1px solid #ddd',
                        borderRadius: 'var(--border-radius-sm)',
                        fontSize: 'var(--font-size-sm)'
                      }}
                    />
                  </div>
                
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    gap: 'var(--spacing-md)',
                    marginTop: 'var(--spacing-lg)'
                  }}>
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      style={{
                        background: '#6c757d',
                        color: 'white',
                        border: 'none',
                        padding: 'var(--spacing-md) var(--spacing-lg)',
                        borderRadius: 'var(--border-radius-md)',
                        cursor: 'pointer',
                        fontSize: 'var(--font-size-base)',
                        fontWeight: 'var(--font-weight-medium)',
                        minWidth: '100px',
                        height: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: 'var(--spacing-md) var(--spacing-lg)',
                        borderRadius: 'var(--border-radius-md)',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        opacity: submitting ? 0.6 : 1,
                        fontSize: 'var(--font-size-base)',
                        fontWeight: 'var(--font-weight-medium)',
                        minWidth: '100px',
                        height: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {submitting ? '추가 중...' : '추가'}
                    </button>
                  </div>
                </form>
              </div>

              {/* 미리보기 */}
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h3 style={{ marginBottom: 'var(--spacing-md)', fontSize: 'var(--font-size-lg)', color: '#666' }}>미리보기</h3>
                <div style={{ 
                  background: '#f5f5f5', 
                  padding: '20px', 
                  borderRadius: '12px',
                  border: '2px dashed #ddd'
                }}>
                  <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <div style={{
                      textAlign: 'center',
                      backgroundColor: '#333',
                      padding: 'var(--spacing-md)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '60px'
                    }}>
                      <h3 style={{ 
                        margin: 0, 
                        fontSize: 'var(--font-size-xl)',
                        fontWeight: 'var(--font-weight-semibold)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '100%'
                      }}>
                        {previewProduct.name}
                      </h3>
                    </div>
                    
                    <img
                      src={previewProduct.img}
                      alt={previewProduct.name}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover'
                      }}
                    />
                    
                    {previewProduct.title && (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: 0,
                        padding: 'var(--spacing-md)',
                        flex: 1,
                        wordBreak: 'keep-all',
                        overflowWrap: 'anywhere',
                        whiteSpace: 'normal'
                      }}>
                        <h3 style={{
                          margin: 0,
                          fontSize: 'var(--font-size-xl)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#000',
                          lineHeight: 1.3
                        }}>
                          {previewProduct.title}
                        </h3>
                      </div>
                    )}
                  </div>
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
