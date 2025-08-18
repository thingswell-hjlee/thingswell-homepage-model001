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
}) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('card');
  const [previewImage, setPreviewImage] = useState(null);

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
        <ThreeColumnGrid listView={viewMode === 'list'} longVertical={longVertical}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, idx) => {
              const Card = (
                <div className={`product-card ${viewMode === 'list' ? 'list-item' : ''}`}>
                  {viewMode === 'list' ? (
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
                    // 카드 뷰: 기존 레이아웃 유지
                    <>
                      <MarqueeTitle text={product.name} />
                      <img
                        src={product.img}
                        alt={product.name}
                        className={embedded ? 'clickable' : ''}
                        onClick={() => {
                          if (embedded) setPreviewImage(product.img);
                        }}
                      />
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
              return product.link ? (
                <Link to={product.link} key={idx}>
                  {Card}
                </Link>
              ) : (
                <div key={idx}>{Card}</div>
              );
            })
          ) : (
            <div className="no-products-message">
              <p>선택한 조건에 맞는 제품이 없습니다.</p>
              <p>다른 카테고리나 검색어를 시도해보세요.</p>
            </div>
          )}
        </ThreeColumnGrid>
      </div>
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


