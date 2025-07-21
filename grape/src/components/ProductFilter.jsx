import React from "react";
import "./ProductFilter.css";

const ProductFilter = ({ 
  selectedCategory, 
  setSelectedCategory, 
  searchTerm, 
  setSearchTerm, 
  categories, 
  filteredProductsCount 
}) => {
  return (
    
    <div className="filter-sidebar">
      <div className="filter-section">
        <h3 className="filter-title">카테고리</h3>
        <div className="filter-options">
          <label className="filter-option">
            <input
              type="radio"
              name="category"
              value="전체"
              checked={selectedCategory === "전체"}
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
            <span>전체</span>
          </label>
          {categories.map(category => (
            <label key={category} className="filter-option">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">검색</h3>
        <input
          type="text"
          placeholder="제품명 또는 설명 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-section">
        <h3 className="filter-title">결과</h3>
        <p className="result-count">{filteredProductsCount}개의 제품</p>
      </div>
    </div>
  );
};

export default ProductFilter; 