import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import BaseLayout from '../../components/Layout/BaseLayout';
import AdminLayout from '../../components/AdminLayout';
import { getProducts, getTrackRecords, getBoards } from '../../lib/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: 0,
    trackRecords: 0,
    boards: 0,
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, trackRecordsRes, boardsRes] = await Promise.all([
          getProducts(),
          getTrackRecords(),
          getBoards('Board_Announcement'),
        ]);

        setStats({
          products: productsRes.data ? (Array.isArray(productsRes.data) ? productsRes.data.length : 0) : 0,
          trackRecords: trackRecordsRes.data ? (Array.isArray(trackRecordsRes.data) ? trackRecordsRes.data.length : 0) : 0,
          boards: boardsRes.data ? (Array.isArray(boardsRes.data) ? boardsRes.data.length : 0) : 0,
        });

        // Recent 5 board posts
        if (boardsRes.data && Array.isArray(boardsRes.data)) {
          setRecentPosts(boardsRes.data.slice(0, 5));
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickLinks = [
    { label: '제품 관리', path: '/products/safety', description: '제품 목록 관리 및 편집', icon: '📦' },
    { label: '실적 관리', path: '/cases/smart-safety', description: '납품 실적 관리', icon: '📋' },
    { label: '공지사항', path: '/customer-service/announcement', description: '공지사항 게시판 관리', icon: '📢' },
    { label: 'OG 설정', path: '/admin/og-settings', description: 'SNS 공유 미리보기 설정', icon: '🔗' },
    { label: '비밀번호 변경', path: '/admin/change-password', description: '계정 비밀번호 변경', icon: '🔒' },
  ];

  const breadcrumbs = [
    { label: '홈', path: '/' },
    { label: '관리자', path: '/admin/dashboard' },
    { label: '대시보드', path: '/admin/dashboard' },
  ];

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      title="관리자 대시보드"
      subtitle="사이트 관리 현황을 한눈에 확인하세요"
    >
      <AdminLayout>
      <div className="admin-dashboard">
        {/* Welcome Section */}
        <div className="dashboard-welcome">
          <h2 className="welcome-title">
            환영합니다{user?.email ? `, ${user.email}` : ''}님
          </h2>
          <p className="welcome-description">
            아래에서 사이트 콘텐츠를 관리하고 현황을 확인할 수 있습니다.
          </p>
        </div>

        {/* Stats Section */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <span className="stat-value">{loading ? '-' : stats.products}</span>
              <span className="stat-label">등록 제품</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <span className="stat-value">{loading ? '-' : stats.trackRecords}</span>
              <span className="stat-label">납품 실적</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📢</div>
            <div className="stat-info">
              <span className="stat-value">{loading ? '-' : stats.boards}</span>
              <span className="stat-label">게시글</span>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="dashboard-section">
          <h3 className="section-title">빠른 링크</h3>
          <div className="quick-links-grid">
            {quickLinks.map((link, index) => (
              <div
                key={index}
                className="quick-link-card"
                onClick={() => navigate(link.path)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate(link.path);
                  }
                }}
              >
                <span className="quick-link-icon">{link.icon}</span>
                <div className="quick-link-content">
                  <span className="quick-link-label">{link.label}</span>
                  <span className="quick-link-description">{link.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="dashboard-section">
          <h3 className="section-title">최근 게시글</h3>
          <div className="recent-posts">
            {loading ? (
              <p className="loading-text">불러오는 중...</p>
            ) : recentPosts.length > 0 ? (
              <ul className="recent-posts-list">
                {recentPosts.map((post, index) => (
                  <li key={post.id || index} className="recent-post-item">
                    <span className="post-title">{post.title || '제목 없음'}</span>
                    <span className="post-date">
                      {post.created_at
                        ? new Date(post.created_at).toLocaleDateString('ko-KR')
                        : ''}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data-text">등록된 게시글이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
      </AdminLayout>
    </BaseLayout>
  );
};

export default Dashboard;
