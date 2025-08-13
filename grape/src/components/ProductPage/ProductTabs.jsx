import React, { useState, useEffect } from 'react';
import './ProductTabs.css';

const ProductTabs = ({ 
  productName = "XCN-3000",
  tabs = [
    { id: 'overview', label: 'XCN-3000', content: 'overview' },
    { id: 'features', label: '주요기능', content: 'features' },
    { id: 'specs', label: '제품스펙', content: 'specs' },
    { id: 'certifications', label: '인증', content: 'certifications' },
    { id: 'downloads', label: '자료 다운로드', content: 'downloads' },
    { id: 'videos', label: '관련영상', content: 'videos' }
  ],
  activeTab = 'overview',
  onTabChange,
  collapsed = false,
  onToggleChange
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  useEffect(() => {
    setIsCollapsed(collapsed);
  }, [collapsed]);

  const handleTabClick = (tabId) => {
    setCurrentTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  const handleToggle = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    if (onToggleChange) {
      onToggleChange(next);
    }
  };

  return (
    <div className="product-tabs">
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${currentTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        {currentTab === 'overview' && (
        <button
          type="button"
          className={`tab-toggle-button${isCollapsed ? ' collapsed' : ''}`}
          onClick={handleToggle}
          aria-pressed={!isCollapsed}
          aria-label={isCollapsed ? '탭 콘텐츠 열기' : '탭 콘텐츠 닫기'}
          title={isCollapsed ? '열기' : '닫기'}
        >
          {isCollapsed ? '+' : '−'}
        </button>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
