import React, { useState, useEffect } from 'react';
import BoardList from './BoardList';
import BoardDetail from './BoardDetail';
import BoardEditor from './BoardEditor';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import './Board.css';

const Board = ({ tableName }) => {
  const [posts, setPosts] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'detail', 'write', 'edit'
  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  // 샘플 데이터 (실제로는 API에서 가져올 데이터)
  useEffect(() => {
    const samplePosts = [
      {
        id: 1,
        title: '싱스웰 공지사항 안내',
        content: '# 싱스웰 공지사항\n\n안녕하세요. 싱스웰입니다.\n\n## 주요 안내사항\n\n1. **서비스 업데이트**\n   - 새로운 기능이 추가되었습니다.\n   - 더 나은 사용자 경험을 제공합니다.\n\n2. **고객지원**\n   - 24시간 고객지원 서비스를 제공합니다.\n   - 문의사항이 있으시면 언제든 연락주세요.\n\n감사합니다.',
        htmlContent: '<h1>싱스웰 공지사항</h1><p>안녕하세요. 싱스웰입니다.</p><h2>주요 안내사항</h2><ol><li><strong>서비스 업데이트</strong><ul><li>새로운 기능이 추가되었습니다.</li><li>더 나은 사용자 경험을 제공합니다.</li></ul></li><li><strong>고객지원</strong><ul><li>24시간 고객지원 서비스를 제공합니다.</li><li>문의사항이 있으시면 언제든 연락주세요.</li></ul></li></ol><p>감사합니다.</p>',
        author: '관리자',
        createdAt: '2024-01-15',
        views: 125,
        isNew: true
      },
      {
        id: 2,
        title: '시스템 점검 안내',
        content: '시스템 점검이 예정되어 있습니다.\n\n**점검 시간**: 2024년 1월 20일 02:00 ~ 06:00\n\n점검 시간 동안 서비스 이용이 제한될 수 있습니다.\n\n불편을 끼쳐 죄송합니다.',
        htmlContent: '<p>시스템 점검이 예정되어 있습니다.</p><p><strong>점검 시간</strong>: 2024년 1월 20일 02:00 ~ 06:00</p><p>점검 시간 동안 서비스 이용이 제한될 수 있습니다.</p><p>불편을 끼쳐 죄송합니다.</p>',
        author: '시스템관리자',
        createdAt: '2024-01-10',
        views: 89,
        isNew: false
      }
    ];
    setPosts(samplePosts);
  }, []);

  const handlePostClick = (post) => {
    console.log('게시물 클릭:', post);
    setSelectedPost(post);
    setCurrentView('detail');
  };

  const handleWriteClick = () => {
    setEditingPost(null);
    setCurrentView('write');
  };

  const handleEditClick = (post) => {
    setEditingPost(post);
    setCurrentView('edit');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedPost(null);
    setEditingPost(null);
  };

  const handleSavePost = (postData) => {
    if (editingPost) {
      // 수정
      const updatedPosts = posts.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...postData, updatedAt: new Date().toISOString().split('T')[0] }
          : post
      );
      setPosts(updatedPosts);
    } else {
      // 새 글 작성
      const newPost = {
        id: Date.now(),
        ...postData,
        author: '관리자',
        createdAt: new Date().toISOString().split('T')[0],
        views: 0,
        isNew: true
      };
      setPosts([newPost, ...posts]);
    }
    setCurrentView('list');
    setEditingPost(null);
  };

  const handleDeletePost = async (post) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        // Supabase에서 실제 데이터 삭제
        const { error } = await supabase
          .from(tableName)
          .delete()
          .eq('id', post.id);

        if (error) {
          console.error('삭제 오류:', error);
          alert('삭제 중 오류가 발생했습니다: ' + error.message);
        } else {
          console.log('게시물이 성공적으로 삭제되었습니다.');
          alert('게시물이 삭제되었습니다.');
          // 목록 새로고침을 위해 페이지를 다시 로드하거나 상태를 업데이트
          window.location.reload();
        }
      } catch (error) {
        console.error('삭제 중 예외 발생:', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'list':
        return (
          <BoardList
            onPostClick={handlePostClick}
            onWriteClick={handleWriteClick}
            onDelete={handleDeletePost}
            tableName={tableName}
          />
        );
      case 'detail':
        return (
          <BoardDetail
            post={selectedPost}
            onBack={handleBackToList}
            onEdit={handleEditClick}
            onDelete={handleDeletePost}
          />
        );
      case 'write':
        return (
          <BoardEditor
            onSave={handleSavePost}
            tableName={tableName}
            onCancel={handleBackToList}
          />
        );
      case 'edit':
        return (
          <BoardEditor
            initialContent={editingPost?.content || ''}
            title={editingPost?.title || ''}
            onSave={handleSavePost}
            tableName={tableName}
            onCancel={handleBackToList}
          />
        );
      default:
        return <BoardList onPostClick={handlePostClick} onWriteClick={handleWriteClick} onDelete={handleDeletePost} tableName={tableName} />;
    }
  };

  return (
    <div className="board-container">
      {renderContent()}
    </div>
  );
};

export default Board; 