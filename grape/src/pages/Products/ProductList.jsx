import React, { useMemo, useState } from 'react';
import SearchComponent from '../../components/SearchComponent';
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
const ProductList = ({
  products = [],
  title = 'Products',
  subtitle = '',
  breadcrumbs = ['Home', 'Products'],
  longVertical = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('card');

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category).filter(Boolean));
    return Array.from(unique);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === '전체' || product.category === selectedCategory;
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        (product.desc || '').toLowerCase().includes(term) ||
        (product.title || '').toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  return (
    <BaseLayout
      header={ProductHeader}
      breadcrumbs={<Breadcrumbs breadcrumbs={breadcrumbs} />}
      title={title}
      subtitle={subtitle}
    >
      <div className="product-list-content">
        <div className="product-list-toolbar">
          <div className="product-list-filter">
            {/* 간단한 카테고리 필터 (기존 ProductFilter 의존 없이 경량 구현) */}
            <div className="filter-container">
              <label htmlFor="category-select" className="sr-only">카테고리</label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="전체">전체</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <span style={{ marginLeft: '8px', color: 'var(--color-text-secondary)' }}>
                {filteredProducts.length}개 결과
              </span>
            </div>
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
          <ThreeColumnGrid listView={viewMode === 'list'} longVertical={longVertical}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, idx) => (
                <Link to={product.link} key={idx}>
                  <div className={`product-card ${viewMode === 'list' ? 'list-item' : ''}`}>
                    <div className="product-info-title">
                      <h3>{product.name}</h3>
                    </div>
                    <img src={product.img} alt={product.name} />
                    {product.title && (
                      <div className="product-info_title">
                        <h3>{product.title}</h3>
                      </div>
                    )}
                    <div className={product.title ? 'product-info_desc' : 'product-info'}>
                      <p>{product.desc}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="no-products-message">
                <p>선택한 조건에 맞는 제품이 없습니다.</p>
                <p>다른 카테고리나 검색어를 시도해보세요.</p>
              </div>
            )}
          </ThreeColumnGrid>
        </div>
      </div>
    </BaseLayout>
  );
};

export default ProductList;


