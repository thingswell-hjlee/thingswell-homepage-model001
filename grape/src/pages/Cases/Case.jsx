import React, { useState, useEffect } from 'react';
import welding from '../../assets/welding.jpg';
import ProductList from '../Products/ProductList';
import main from '../../assets/case_bus_seoul/main_4.jpg';
import headerImage from '../../assets/header_image/performance.jpg';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import ProductPage from '../../components/ProductPage/ProductPage';
import { setupTrackRecordRLS, createTrackRecordPolicies, checkUserAuthStatus, checkAndCreateMissingPolicies } from '../../utils/supabaseRLS';
import RecordEditor from '../../components/RecordEditor';
import TrackRecordGrid from '../../components/TrackRecordGrid';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { BaseLayout } from '../../components/Layout';
import SearchComponent from '../../components/SearchComponent';
import ProductFilter from '../../components/ProductFilter';
import '../Products/ProductsCommon.css';

/**
 * TrackRecordPage 컴포넌트
 * 
 * 실적 데이터를 표시하고 관리하는 공통 컴포넌트입니다.
 * kindFilter prop을 통해 특정 카테고리의 실적만 필터링할 수 있습니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.kindFilter - 필터링할 실적 카테고리 (예: "스마트안전", "정보통신", "통합제어")
 * 
 * 사용법:
 * <TrackRecordPage kindFilter="스마트안전" />
 * <TrackRecordPage kindFilter="정보통신" />
 * <TrackRecordPage kindFilter="통합제어" />
 * <TrackRecordPage /> // 모든 실적 표시
 */

export default function TrackRecordPage({ kindFilter = null }) {
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
    kind: '',
    images: []
  });
  const [submitting, setSubmitting] = useState(false);
  
  const { user, isAuthenticated, canEditContent } = useAuth();

  // kindFilter에 따른 제목과 설명 매핑
  const getPageInfo = (kind) => {
    const pageInfoMap = {
      '정보통신': {
        title: '정보통신 실적',
        subtitle: '정보통신 시스템 구축 실적들을 확인하세요'
      },
      '통합제어': {
        title: '통합제어 실적',
        subtitle: '통합제어 시스템 구축 실적들을 확인하세요'
      },
      '스마트안전': {
        title: '스마트안전 실적',
        subtitle: '스마트안전 솔루션 실적들을 확인하세요'
      },
      'AI': {
        title: 'AI 실적',
        subtitle: 'AI 관련 실적들을 확인하세요'
      }
    };
    
    return pageInfoMap[kind] || {
      title: '실적',
      subtitle: '실적들을 확인하세요'
    };
  };

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
      let query = supabase
        .from('Track_record')
        .select('*')
        .order('date', { ascending: false });
      
      // kindFilter가 있으면 해당 kind만 필터링
      if (kindFilter) {
        query = query.eq('kind', kindFilter);
      }
      
      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // 원시 데이터 확인을 위한 로깅
      console.log('Track_record 원시 데이터:', data);

      // 데이터를 ProductList 컴포넌트에서 사용하는 형식으로 변환
      const formattedProducts = data.map(record => {
        // 이미지 URL 처리
        let imageUrl = null; // 기본값을 null로 설정
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
          rawData: record, // 원본 데이터 보존
          hasImage: !!imageUrl // 이미지 유무 플래그 추가
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

  const handleDeleteRecord = async (record) => {
    const { isAuthenticated } = await checkUserAuthStatus();
    if (!isAuthenticated) {
      alert('삭제하려면 로그인이 필요합니다.');
      return;
    }

    if (!window.confirm('이 실적을 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase.from('Track_record').delete().eq('id', record.id);
      if (error) throw error;
      alert('실적이 삭제되었습니다.');
      fetchTrackRecords();
    } catch (err) {
      console.error('삭제 중 오류 발생:', err);
      alert('삭제 중 오류가 발생했습니다: ' + err.message);
    }
  };

  const handleAddRecord = async (formData) => {
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
            title: formData.title,
            desc: formData.desc,
            overview_title: formData.overview_title,
            date: formData.date,
            orderer: formData.orderer,
            type: formData.type,
            kind: formData.kind,
            images: formData.images && formData.images.length > 0 ? JSON.stringify(formData.images) : null
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
        setNewRecord({ title: '', overview_title: '', desc: '', date: '', orderer: '', type: '', kind: '', images: [] });
        
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
      // 기본 정보 검증
      if (!formData.title || !formData.overview_title || !formData.desc || !formData.date || !formData.orderer || !formData.type || !formData.kind) {
        alert('모든 필드를 입력해주세요.');
        return;
      }

      try {
        setSubmitting(true);
        
        // 데이터베이스에 저장
        const { data, error } = await supabase
          .from('Track_record')
          .insert({
            title: formData.title,
            desc: formData.desc,
            overview_title: formData.overview_title,
            date: formData.date,
            orderer: formData.orderer,
            type: formData.type,
            kind: formData.kind,
            images: formData.images && formData.images.length > 0 ? JSON.stringify(formData.images) : null
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
        setNewRecord({ title: '', overview_title: '', desc: '', date: '', orderer: '', type: '', kind: '', images: [] });
        
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

  if (viewMode === 'detail' && selectedRecord) {
    return (
      <div>
        <div>
          <ProductPage
            productData={{
              name: selectedRecord.title || '제목 없음',
              title: selectedRecord.overview_title || selectedRecord.desc || '개요 없음',
              overview_title: selectedRecord.overview_title || selectedRecord.desc || '개요 없음',
              overview: selectedRecord.overview || selectedRecord.desc || '내용 없음',
              images: selectedRecord.images ? JSON.parse(selectedRecord.images) : [],
              breadcrumbs: ["Home", "고객사례", selectedRecord.kind, selectedRecord.title || "상세"]
            }}
            isRecordPage={true}
          />
        </div>
      </div>
    );
  }

  // 목록 보기 모드
  return (
    <BaseLayout
      header={() => <ProductHeader image={headerImage} />}
      breadcrumbs={<Breadcrumbs breadcrumbs={kindFilter ? ["Home", "고객사례", kindFilter] : ["Home", "고객사례"]} />}
      title={getPageInfo(kindFilter).title}
      subtitle={getPageInfo(kindFilter).subtitle}
    >
      <div>
        {/* 추가 모달 */}
        {showAddModal && (
          <RecordEditor
            isModal={true}
            mode="record"
            tableName="Track_record"
            editData={editingExistingRecord}
            submitting={submitting}
            onSave={handleAddRecord}
            onCancel={() => {
              setShowAddModal(false);
              setEditingExistingRecord(null);
            }}
          />
        )}

        <TrackRecordList
          products={products}
          onEditRecord={handleEditRecord}
          canEdit={canEditContent()}
          onAddRecord={() => setShowAddModal(true)}
          canDelete={canEditContent()}
          onDeleteRecord={handleDeleteRecord}
        />
      </div>
    </BaseLayout>
  );
}

// TrackRecordList 컴포넌트
const TrackRecordList = ({ products, onEditRecord, canEdit, onAddRecord, canDelete, onDeleteRecord }) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('card');

  const categories = React.useMemo(() => {
    const unique = new Set(products.map((p) => p.category).filter(Boolean));
    return Array.from(unique);
  }, [products]);

  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        (product.desc || '').toLowerCase().includes(term) ||
        (product.title || '').toLowerCase().includes(term);

      if (selectedCategory === '전체') {
        return matchesSearch;
      }

      const selectedList = selectedCategory
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);
      const matchesCategory = selectedList.includes(product.category);
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const MarqueeTitle = ({ text }) => {
    const containerRef = React.useRef(null);
    const textRef = React.useRef(null);
    const [needsMarquee, setNeedsMarquee] = React.useState(false);

    React.useEffect(() => {
      const update = () => {
        if (!containerRef.current || !textRef.current) return;
        const containerWidth = containerRef.current.clientWidth;
        const textWidth = textRef.current.scrollWidth;
        setNeedsMarquee(textWidth > containerWidth);
      };
      update();
      window.addEventListener('resize', update);
      const id = setTimeout(update, 0);
      return () => {
        window.removeEventListener('resize', update);
        clearTimeout(id);
      };
    }, [text]);

    if (needsMarquee) {
      return (
        <div className="product-info-title" ref={containerRef}>
          <div className="marquee">
            <span className="marquee-text" ref={textRef}>{text}</span>
            <span className="marquee-text" aria-hidden="true">{text}</span>
          </div>
        </div>
      );
    }
    return (
      <div className="product-info-title" ref={containerRef}>
        <h3 ref={textRef}>{text}</h3>
      </div>
    );
  };

  return (
    <div className="product-list-content">
      <div className="product-list-toolbar">
        <div className="product-list-filter">
          <ProductFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categories={categories}
            filteredProductsCount={filteredProducts.length}
          />
        </div>
        <div className="product-list-actions">
          <div className="product-list-search">
            <SearchComponent
              placeholder="검색어를 입력하세요"
              onSearch={(value) => setSearchTerm(value)}
              noPadding={false}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
          <div className="view-mode-toggle">
            <button
              className={`view-mode-btn ${viewMode === 'card' ? 'active' : ''}`}
              onClick={() => setViewMode('card')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              카드 보기
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
              리스트 보기
            </button>
          </div>
        </div>
      </div>

      <div className="product-list-grid-container">
        {filteredProducts.length > 0 ? (
          (() => {
            const listItems = [];
            const cardItems = [];
            
            filteredProducts.forEach((product, idx) => {
              const shouldShowAsList = viewMode === 'list' || (!product.img || product.img === 'undefined' || product.img === null);
              
              const Card = (
                <div className={`product-card ${shouldShowAsList ? 'list-item' : ''}`} style={shouldShowAsList ? { width: '100%', marginBottom: '10px' } : {}}>
                  {shouldShowAsList ? (
                    <>
                      <div className="product-list-title">
                        <h3>{product.name}</h3>
                      </div>
                      <div className="product-list-info">
                        <div className="product-list-organization">
                          <span>{product.organization || '기관명'}</span>
                        </div>
                        <div className="product-list-date">
                          <span>{product.date || '날짜'}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <MarqueeTitle text={product.name} />
                      {product.img && product.img !== 'undefined' && product.img !== null ? (
                        <div className="image-container">
                          <img
                            src={product.img}
                            alt={product.name}
                            onClick={product.onClick}
                          />
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              );
              
              const cardWithEdit = (
                <div key={idx} style={{ position: 'relative' }}>
                  {product.onClick ? (
                    <div onClick={product.onClick} style={{ cursor: 'pointer' }}>
                      {Card}
                    </div>
                  ) : (
                    <div>{Card}</div>
                  )}
                  
                  {product.rawData && (canEdit || canDelete) && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 20, display: 'flex', gap: '8px' }}>
                      {canEdit && onEditRecord && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditRecord(product.rawData);
                          }}
                          style={{
                            background: 'rgba(0, 123, 255, 0.9)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '5px 10px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            backdropFilter: 'blur(4px)'
                          }}
                          onMouseEnter={(e) => { e.target.style.background = 'rgba(0, 123, 255, 1)'; }}
                          onMouseLeave={(e) => { e.target.style.background = 'rgba(0, 123, 255, 0.9)'; }}
                        >
                          편집
                        </button>
                      )}

                      {canDelete && onDeleteRecord && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteRecord(product.rawData);
                          }}
                          style={{
                            background: 'rgba(255, 0, 0, 0.9)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '5px 10px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            backdropFilter: 'blur(4px)'
                          }}
                          onMouseEnter={(e) => { e.target.style.background = 'rgba(255, 0, 0, 1)'; }}
                          onMouseLeave={(e) => { e.target.style.background = 'rgba(255, 0, 0, 0.9)'; }}
                        >
                          삭제
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
              
              if (shouldShowAsList) {
                listItems.push(cardWithEdit);
              } else {
                cardItems.push(cardWithEdit);
              }
            });
            
            return (
              <>
                {cardItems.length > 0 && (
                  <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <TrackRecordGrid>
                      {cardItems}
                    </TrackRecordGrid>
                  </div>
                )}
                
                {listItems.length > 0 && (
                  <div>
                    {listItems}
                  </div>
                )}
              </>
            );
          })()
        ) : (
          <div className="no-products-message">
            <p>선택한 조건에 맞는 실적이 없습니다.</p>
            <p>다른 카테고리나 검색어를 시도해보세요.</p>
          </div>
        )}
      </div>

      {canEdit && (
        <div className="product-list-add-button" style={{ marginTop: '30px', textAlign: 'right' }}>
          <button
            onClick={onAddRecord}
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
        </div>
      )}
    </div>
  );
};
