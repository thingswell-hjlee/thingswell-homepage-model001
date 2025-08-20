import React, { useMemo, useState, useEffect, useRef } from 'react';
import SearchComponent from '../../components/SearchComponent';
import ProductFilter from '../../components/ProductFilter';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { BaseLayout } from '../../components/Layout';
import ThreeColumnGrid from '../../components/ThreeColumnGrid';
import { Link } from 'react-router-dom';
import './ProductsCommon.css';

/**
 * 공통 제품 목록 페이지 컴포넌트
 * - 필터, 검색, 카드/리스트 보기 토글을 포함
 * - 제품 데이터는 상위에서 주입
 */
const MarqueeTitle = ({ text }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [needsMarquee, setNeedsMarquee] = useState(false);

  useEffect(() => {
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

// 페이징 컴포넌트
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="pagination-container">
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>
        
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`pagination-btn ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
            onClick={() => page !== '...' && onPageChange(page)}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}
        
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
};

const ProductList = ({
  products = [],
  title = 'Products',
  subtitle = '',
  breadcrumbs = ['Home', 'Products'],
  longVertical = false,
  embedded = false,
  hideToolbar = false,
  hideSearchAndView = false,
  hideSearch = false,
  headerImage = null,
  addButton = null,
  onEditRecord = null,
  canEdit = false,
  itemsPerPage: customItemsPerPage = 9,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('card');
  const [previewImage, setPreviewImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = customItemsPerPage;

  useEffect(() => {
    if (!previewImage) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setPreviewImage(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [previewImage]);

  // 필터나 검색어가 변경되면 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category).filter(Boolean));
    return Array.from(unique);
  }, [products]);

  const filteredProducts = useMemo(() => {
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

  // 페이징 처리 - 전체 데이터를 페이징 처리
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // 페이지 변경 시 스크롤을 맨 위로 이동
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const content = (
    <div className="product-list-content">
      {!hideToolbar && (
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
          {!hideSearchAndView && (
            <div className="product-list-actions">
              {!hideSearch && (
                <div className="product-list-search">
                  <SearchComponent
                    placeholder="검색어를 입력하세요"
                    onSearch={(value) => setSearchTerm(value)}
                    noPadding={false}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                </div>
              )}
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
          )}
        </div>
      )}

      <div className="product-list-grid-container">
        {currentProducts.length > 0 ? (
          (() => {
            // 리스트 뷰와 카드 뷰를 분리
            const listItems = [];
            const cardItems = [];
            
            currentProducts.forEach((product, idx) => {
              // 이미지가 없는 경우 자동으로 리스트 뷰로 표시
              const shouldShowAsList = viewMode === 'list' || (!product.img || product.img === 'undefined' || product.img === null);
              
              const Card = (
                <div className={`product-card ${shouldShowAsList ? 'list-item' : ''}`} style={shouldShowAsList ? { width: '100%', marginBottom: '10px' } : {}}>
                  {shouldShowAsList ? (
                    // 리스트 뷰: 제목(왼쪽), 기관/날짜(오른쪽) 배치
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
                    // 카드 뷰: 기존 레이아웃 유지 (이미지가 있는 경우만)
                    <>
                      <MarqueeTitle text={product.name} />
                      {product.img && product.img !== 'undefined' && product.img !== null ? (
                        <img
                          src={product.img}
                          alt={product.name}
                          className={embedded ? 'clickable' : ''}
                          onClick={() => {
                            if (embedded) setPreviewImage(product.img);
                          }}
                        />
                      ) : null}
                      {product.title && (
                        <div className="product-info_title">
                          <h3>{product.title}</h3>
                        </div>
                      )}
                      <div className={product.title ? 'product-info_desc' : 'product-info'}>
                        <p>{product.desc}</p>
                      </div>
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
                  ) : product.link ? (
                    <Link to={product.link}>
                      {Card}
                    </Link>
                  ) : (
                    <div>{Card}</div>
                  )}
                  
                  {/* 편집 버튼 */}
                  {canEdit && onEditRecord && product.rawData && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditRecord(product.rawData);
                      }}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(0, 123, 255, 0.9)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '5px 10px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        zIndex: 10,
                        backdropFilter: 'blur(4px)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(0, 123, 255, 1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(0, 123, 255, 0.9)';
                      }}
                    >
                      편집
                    </button>
                  )}
                </div>
              );
              
              // 리스트 뷰와 카드 뷰를 분리하여 저장
              if (shouldShowAsList) {
                listItems.push(cardWithEdit);
              } else {
                cardItems.push(cardWithEdit);
              }
            });
            
            return (
              <>
                {/* 카드 뷰 항목들 (이미지 있는 항목) - 위쪽에 배치 */}
                {cardItems.length > 0 && (
                  <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <ThreeColumnGrid listView={false} longVertical={longVertical}>
                      {cardItems}
                    </ThreeColumnGrid>
                  </div>
                )}
                
                {/* 리스트 뷰 항목들 (이미지 없는 항목) - 아래쪽에 배치 */}
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
              <p>선택한 조건에 맞는 제품이 없습니다.</p>
              <p>다른 카테고리나 검색어를 시도해보세요.</p>
            </div>
          )}
      </div>

      {/* 페이징 처리 - 9개 이상일 때만 표시 */}
      {filteredProducts.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* 추가 버튼 영역 - 맨 아래에 배치 */}
      {addButton && (
        <div className="product-list-add-button" style={{ marginTop: '30px', textAlign: 'right' }}>
          {addButton}
        </div>
      )}
    </div>
  );

  if (embedded) {
    return (
      <div className="product-list-embedded">
        {content}
        {previewImage && (
          <div className="image-modal-overlay" onClick={() => setPreviewImage(null)}>
            <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="image-modal-close"
                onClick={() => setPreviewImage(null)}
                aria-label="닫기"
              >
                ×
              </button>
              <img src={previewImage} alt="확대 보기" />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <BaseLayout
      header={headerImage ? () => <ProductHeader image={headerImage} /> : ProductHeader}
      breadcrumbs={<Breadcrumbs breadcrumbs={breadcrumbs} />}
      title={title}
      subtitle={subtitle}
    >
      {content}
    </BaseLayout>
  );
};

export default ProductList;


