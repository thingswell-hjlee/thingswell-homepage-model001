import React from "react";
import "./ProductFilter.css";
import useTranslation from "../../hooks/useTranslation";

const ProductFilter = ({ 
  selectedCategory, 
  setSelectedCategory, 
  searchTerm, 
  setSearchTerm, 
  categories, 
  filteredProductsCount,
  boardTypeOptions = [],
  selectedBoardType,
  setSelectedBoardType
}) => {
  const { t } = useTranslation();
  // 선택된 카테고리들을 배열로 관리
  const selectedCategories = selectedCategory === "전체" ? ["전체"] : selectedCategory.split(',').filter(cat => cat.trim());

  const handleCategoryClick = (category) => {
    if (category === "전체") {
      // 전체 선택 시 다른 모든 선택 초기화
      setSelectedCategory("전체");
    } else {
      // 개별 카테고리 선택 시
      if (selectedCategory === "전체") {
        // 전체가 선택되어 있으면 전체 해제하고 해당 카테고리만 선택
        setSelectedCategory(category);
      } else {
        // 이미 선택된 카테고리들 중에서
        const currentSelected = selectedCategories.filter(cat => cat !== "전체");
        
        if (currentSelected.includes(category)) {
          // 이미 선택된 카테고리면 제거
          const newSelected = currentSelected.filter(cat => cat !== category);
          if (newSelected.length === 0) {
            // 아무것도 선택되지 않으면 전체로 설정
            setSelectedCategory("전체");
          } else {
            setSelectedCategory(newSelected.join(','));
          }
        } else {
          // 새로운 카테고리 추가
          const newSelected = [...currentSelected, category];
          setSelectedCategory(newSelected.join(','));
        }
      }
    }
  };

  return (
    <div className="filter-sidebar">
      <div className="filter-section">
        <div className="filter-options">
          {Array.isArray(boardTypeOptions) && boardTypeOptions.length > 1 && (
            <>
              <button
                key={`board-type-all`}
                className={`filter-button ${selectedBoardType === '전체' ? 'active' : ''}`}
                onClick={() => setSelectedBoardType && setSelectedBoardType('전체')}
              >
                {t('board.all')}
              </button>
              {boardTypeOptions
                .filter((opt) => opt !== '전체')
                .map((opt) => {
                const isActive = selectedBoardType === opt;
                const label = (opt === 'Board_Announcement' ? t('board.notice') : (opt === 'Board_Download' ? t('board.download') : opt));
                return (
                  <button
                    key={`board-type-${opt}`}
                    className={`filter-button ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedBoardType && setSelectedBoardType(isActive ? '전체' : opt)}
                  >
                    {label}
                  </button>
                );
              })}
            </>
          )}
          {Array.isArray(categories) && categories.length > 0 && (
            <>
              <button
                className={`filter-button ${selectedCategory === "전체" ? "active" : ""}`}
                onClick={() => handleCategoryClick("전체")}
              >
                {t('board.all')}
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-button ${selectedCategories.includes(category) ? "active" : ""}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter; 