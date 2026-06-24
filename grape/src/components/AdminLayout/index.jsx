import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdminLayout.css';

const navItems = [
  { label: '대시보드', path: '/admin/dashboard', icon: '📊' },
  { label: '프로필', path: '/admin/profile', icon: '👤' },
  { label: 'OG 설정', path: '/admin/og-settings', icon: '🔗' },
  { label: '비밀번호 변경', path: '/admin/change-password', icon: '🔒' },
  { separator: true },
  { label: '제품 관리', path: '/products/safety', icon: '📦' },
  { label: '공지사항', path: '/customer-service/announcement', icon: '📢' },
  { label: '실적 관리', path: '/cases/smart-safety', icon: '📋' },
];

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleNavClick = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="admin-layout">
      {/* Mobile overlay */}
      <div
        className={`admin-sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <h2 className="admin-sidebar-title">관리자 메뉴</h2>
        </div>
        <nav>
          <ul className="admin-nav">
            {navItems.map((item, index) => {
              if (item.separator) {
                return <li key={index} className="admin-nav-separator" />;
              }
              return (
                <li key={index} className="admin-nav-item">
                  <button
                    className={`admin-nav-link ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.path)}
                  >
                    <span className="admin-nav-icon">{item.icon}</span>
                    <span className="admin-nav-label">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="admin-content">
        {children}
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="admin-sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="관리자 메뉴 토글"
      >
        ☰
      </button>
    </div>
  );
};

export default AdminLayout;
