import React from "react";
import useTranslation from "../../hooks/useTranslation";
import "./SearchComponent.css";

const SearchComponent = (props) => {
  const { t } = useTranslation();
  const {
    placeholder = t('ui3.search.placeholder'),
    onSearch,
    backgroundColor = "var(--color-surface)",
    noPadding = false,
    searchTerm = "",
    setSearchTerm,
    showWriteButton = false,
    onWriteClick
  } = props;
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
      <button onClick={handleSearch}>{t('ui3.search.button')}</button>
      {showWriteButton && onWriteClick && (
        <button onClick={onWriteClick} className="btn-write">
          {t('ui3.search.writeButton')}
        </button>
      )}
    </div>
  );
};

export default SearchComponent; 