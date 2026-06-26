import React, { useState, useEffect } from 'react';
import './ProductTabs.css';
import useTranslation from '../../hooks/useTranslation';

const ProductTabs = ({ 
  productName = "XCN-3000",
  tabs = [],
  activeTab = 'overview',
  onTabChange,
  collapsed = false,
  onToggleChange,
  allowedTabIds,
  maxVisibleTabs,
  isRecordPage = false
}) => {
  const { t } = useTranslation();
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
    <div className={`product-tabs${!isEnabled ? ' disabled' : ''}${isRecordPage ? ' record-page' : ''}`}>
      <div className="tabs-header">
        {isEnabled && !isRecordPage ? (
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
        ) : isEnabled && isRecordPage ? (
          // 실적 페이지에서는 탭 버튼을 표시하지 않음
          null
        ) : (
          <button
            type="button"
            className="tab-button"
            disabled
            aria-disabled
            title={t('ui2.tabs.noTabsTitle')}
          >
            {t('ui2.tabs.noTabs')}
          </button>
        )}
        {/* 제품 페이지에서만 +/- 아이콘 표시 (개요 탭이 활성화되어 있고, 다른 탭들이 있을 때) */}
        {isEnabled && currentTab === 'overview' && !isRecordPage && visibleTabs.filter(tab => tab.id !== 'overview').length > 0 && (
        <button
          type="button"
          className={`tab-toggle-button${isCollapsed ? ' collapsed' : ''}`}
          onClick={handleToggle}
          aria-pressed={!isCollapsed}
          aria-label={isCollapsed ? t('ui2.tabs.openLabel') : t('ui2.tabs.closeLabel')}
          title={isCollapsed ? t('ui2.tabs.openTitle') : t('ui2.tabs.closeTitle')}
        >
          {isCollapsed ? '+' : '−'}
        </button>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
