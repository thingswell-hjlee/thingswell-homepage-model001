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
import poe from '../../assets/poe.jpg';
import { Link } from "react-router-dom";
import SearchComponent from "../../components/SearchComponent";

const products = [
  {
    name: "DS-2CD2026G2-I(U)",
    desc: "2 MP AcuSense Fixed Mini Bullet Network Camera",
    img: welding,
    link: "/product/1",
    category: "카메라"
  },
  {
    name: "DS-2CD2026G2-I(U)",
    desc: "2 MP AcuSense Fixed Mini Bullet Network Camera",
    img: grinding,
    link: "/product/2",
    category: "카메라"
  },
  {
    name: "DS-2CD2026G2-I(U)",
    desc: "2 MP AcuSense Fixed Mini Bullet Network Camera",
    img: construction,
    link: "/product/3",
    category: "센서"
  },
  {
    name: "DS-2CD2026G2-I(U)",
    desc: "2 MP AcuSense Fixed Mini Bullet Network Camera",
    img: manufacturing,
    link: "/product/4",
    category: "센서"
  },
  {
    name: "DS-2CD2026G2-I(U)",
    desc: "2 MP AcuSense Fixed Mini Bullet Network Camera",
    img: fire,  
    link: "/product/5",
    category: "안전장비"
  },
  {
    name: "DS-2CD2026G2-I(U)",
    desc: "2 MP AcuSense Fixed Mini Bullet Network Camera",
    img: dangerous,
    link: "/product/6",
    category: "안전장비"
  },
  {
    name: "DS-2CD2026G2-I(U)",
    desc: "2 MP AcuSense Fixed Mini Bullet Network Camera",
    img: falldown,
    link: "/product/7",
    category: "안전장비"
  },
  {
    name: "DS-2CD2026G2-I(U)",
    desc: "2 MP AcuSense Fixed Mini Bullet Network Camera",
    img: collision,
    link: "/product/8",
    category: "모니터링"
  },
  {
    name: "DS-2CD2026G2-I(U)",
    desc: "2 MP AcuSense Fixed Mini Bullet Network Camera",
    img: collapse,
    link: "/product/9",
    category: "모니터링"
  },
  // 제품 추가 시 위 내용 복사하여 추가할 것
];

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
    <div className="page-container">
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
            <div className="solutions-section menu-spacing">
              <div className="product-list-container">
                <div className="product-list-header">
                  <p>Products List</p>
                  <h1 className="product-list-title">제품 리스트</h1>
                </div>
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
                
                <div className="product-list-search-container">
                  <div className="product-list-layout">
                    <ProductFilter
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      categories={categories}
                      filteredProductsCount={filteredProducts.length}
                    />
                    
                    <div className={`product-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, idx) => (
                          <Link to={product.link} key={idx}>
                            <div className={`product-card ${viewMode === 'list' ? 'list-item' : ''}`}>
                              <img src={product.img} alt={product.name} />
                              <div className="product-info">
                                <h3>{product.name}</h3>
                                <p>{product.desc}</p>
                                <span className="product-category">{product.category}</span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
