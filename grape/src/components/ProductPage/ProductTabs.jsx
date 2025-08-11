import React, { useState } from 'react';
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
  onTabChange
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabClick = (tabId) => {
    setCurrentTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className="product-tabs">
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${currentTab === tab.id ? 'active' : ''} ${tab.id === 'overview' ? 'overview-tab' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductTabs;
