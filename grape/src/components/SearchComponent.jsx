import React from "react";
import "./SearchComponent.css";

const SearchComponent = ({ 
  placeholder = "검색어를 입력하세요", 
  onSearch, 
  backgroundColor = "var(--color-surface)",
  noPadding = false,
  searchTerm = "",
  setSearchTerm
}) => {
  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div 
      className={`search-section-container ${noPadding ? 'no-padding' : ''}`}
      style={{ backgroundColor }}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchComponent; 