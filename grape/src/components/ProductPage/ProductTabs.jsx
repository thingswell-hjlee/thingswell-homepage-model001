import React, { useState, useEffect } from 'react';
import './ProductTabs.css';

const ProductTabs = ({ 
  productName = "XCN-3000",
  tabs = [],
  activeTab = 'overview',
  onTabChange,
  collapsed = false,
  onToggleChange,
  allowedTabIds,
  maxVisibleTabs
}) => {
  const [currentTab, setCurrentTab] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const normalizedAllowed = Array.isArray(allowedTabIds) && allowedTabIds.length > 0 ? allowedTabIds : null;
  const visibleTabsAll = Array.isArray(tabs) ? (normalizedAllowed ? tabs.filter(t => normalizedAllowed.includes(t.id)) : tabs) : [];
  const visibleTabs = Number.isFinite(maxVisibleTabs) ? visibleTabsAll.slice(0, maxVisibleTabs) : visibleTabsAll;
  const isEnabled = Array.isArray(visibleTabs) && visibleTabs.length > 0;

  useEffect(() => {
    setIsCollapsed(collapsed);
  }, [collapsed]);

  useEffect(() => {
    if (isEnabled) {
      const hasActive = visibleTabs.some(t => t.id === activeTab);
      setCurrentTab(hasActive ? activeTab : visibleTabs[0]?.id || null);
    } else {
      setCurrentTab(null);
    }
  }, [isEnabled, visibleTabs, activeTab]);

  const handleTabClick = (tabId) => {
    if (!isEnabled) return;
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
    <div className={`product-tabs${!isEnabled ? ' disabled' : ''}`}>
      <div className="tabs-header">
        {isEnabled ? (
          visibleTabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${currentTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
              disabled={Boolean(tab.disabled)}
              aria-disabled={Boolean(tab.disabled)}
            >
              {tab.label}
            </button>
          ))
        ) : (
          <button
            type="button"
            className="tab-button"
            disabled
            aria-disabled
            title="탭이 제공되지 않았습니다"
          >
            탭 없음
          </button>
        )}
        {isEnabled && currentTab === 'overview' && (
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
