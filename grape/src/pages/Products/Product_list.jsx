import React, { useState, useMemo } from "react";
import "./Product_list.css"; // 그리드 스타일을 여기에 추가
import ProductFilter from "../../components/ProductFilter";
import welding from '../../assets/welding.jpg';
import grinding from '../../assets/grinding.jpg';
import construction from '../../assets/construction.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import fire from '../../assets/fire.jpg';
import dangerous from '../../assets/dangerous.jpg';
import falldown from '../../assets/falldown.jpg';
import collision from '../../assets/collision.jpg';
import collapse from '../../assets/collapse.jpg';
import { Link } from "react-router-dom";
import SearchComponent from "../../components/SearchComponent";
import ProductHeader from "../../components/ProductPage/ProductHeader";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { BaseLayout } from "../../components/Layout";

const products = [
  {
    name: "XCN-3000",
    desc: "어드밴스드 통합제어기 - 산업용 통합 제어 시스템",
    img: welding,
    link: "/product-list/1",
    category: "통합제어"
  },
  {
    name: "XCN-2000",
    desc: "스마트 제어 시스템 - 중소형 공장용 제어 시스템",
    img: grinding,
    link: "/product-list/2",
    category: "통합제어"
  },
  {
    name: "XCN-1000",
    desc: "기본 제어 모듈 - 소형 장비용 제어 모듈",
    img: construction,
    link: "/product-list/3",
    category: "센서"
  },
  {
    name: "AIB-TS2-08",
    desc: "AI 브릿지 제어 모듈 - 영상 분석 통합 제어",
    img: manufacturing,
    link: "/product-list/4",
    category: "센서"
  },
  {
    name: "Safety-XCN-500",
    desc: "안전 제어 시스템 - 화재 감지 및 예방 제어",
    img: fire,  
    link: "/product-list/5",
    category: "안전장비"
  },
  {
    name: "Safety-XCN-400",
    desc: "위험 감지 제어기 - 위험 상황 감지 및 대응",
    img: dangerous,
    link: "/product-list/6",
    category: "안전장비"
  },
  {
    name: "Safety-XCN-300",
    desc: "낙하 감지 제어기 - 낙하 사고 감지 및 알림",
    img: falldown,
    link: "/product-list/7",
    category: "안전장비"
  },
  {
    name: "Monitor-XCN-200",
    desc: "충돌 감지 모니터링 시스템 - 충돌 사고 감지 및 분석",
    img: collision,
    link: "/product-list/8",
    category: "모니터링"
  },
  {
    name: "Monitor-XCN-100",
    desc: "붕괴 감지 모니터링 시스템 - 구조물 안전 모니터링",
    img: collapse,
    link: "/product-list/9",
    category: "모니터링"
  },
  {
    name: "Safety-XCN-200",
    desc: "종합 안전 제어 시스템 - 다중 위험 요소 통합 제어",
    img: collision,
    link: "/product-list/10",
    category: "안전장비"
  }
];

const breadcrumbs = ["Home", "Products", "System Control"];

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("card"); // "card" 또는 "list"

  // 카테고리 목록 추출
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return uniqueCategories;
  }, []);

  // 제품 필터링
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === "전체" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.desc.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <BaseLayout
      header={ProductHeader}
      breadcrumbs={<Breadcrumbs breadcrumbs={breadcrumbs} />}
      title="통합제어"
      subtitle="산업용 통합 제어 시스템 제품들을 확인하세요"
    >
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
                onSearch={(searchTerm) => {
                  console.log("검색어:", searchTerm);
                  setSearchTerm(searchTerm);
                }}
                noPadding={false}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
            {/* 뷰 모드 전환 버튼 */}
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
          <div className={`product-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, idx) => (
                <Link to={product.link} key={idx}>
                  <div className={`product-card ${viewMode === 'list' ? 'list-item' : ''}`}>
                    <div className="product-info-title">
                      <h3>{product.name}</h3>
                    </div>
                    <img src={product.img} alt={product.name} />
                    <div className="product-info">
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
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default ProductList;
