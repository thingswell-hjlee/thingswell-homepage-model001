import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BoardList from '../BoardList';
import BoardDetail from '../BoardDetail';
import BoardEditor from '../BoardEditor';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import './Board.css';

const Board = ({ tableName, tableNames }) => {
  const [posts, setPosts] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'detail', 'write', 'edit'
  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const resolvedTableName = tableName || (Array.isArray(tableNames) && tableNames.length > 0 ? tableNames[0] : undefined);
  const location = useLocation();

  // 샘플 데이터 (실제로는 API에서 가져올 데이터)
  useEffect(() => {
    const samplePosts = [
    ];
    setPosts(samplePosts);
  }, []);

  // 쿼리스트링으로 들어온 id, t(테이블) 처리 -> 상세로 바로 진입
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idParam = params.get('id');
    const tableParam = params.get('t');
    if (idParam) {
      const targetTable = tableParam || resolvedTableName;
      if (targetTable) {
        // Supabase에서 해당 게시물 조회
        (async () => {
          try {
            const { data, error } = await supabase
              .from(targetTable)
              .select('*')
              .eq('id', idParam)
              .single();
            if (!error && data) {
              setSelectedPost({ ...data, tableName: targetTable });
              setCurrentView('detail');
            }
          } catch (e) {
            console.error('상세 조회 오류:', e);
          }
        })();
      }
    }
  }, [location.search, resolvedTableName]);

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
        const targetTable = post?.tableName || resolvedTableName;
        const { error } = await supabase
          .from(targetTable)
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
            onEdit={handleEditClick}
            onDelete={handleDeletePost}
            tableName={resolvedTableName}
            tableNames={tableNames}
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
            tableName={resolvedTableName}
            onCancel={handleBackToList}
          />
        );
      case 'edit':
        return (
          <BoardEditor
            initialContent={editingPost?.content || ''}
            title={editingPost?.title || ''}
            onSave={handleSavePost}
            tableName={resolvedTableName}
            onCancel={handleBackToList}
          />
        );
      default:
        return <BoardList onPostClick={handlePostClick} onWriteClick={handleWriteClick} onEdit={handleEditClick} onDelete={handleDeletePost} tableName={tableName} />;
    }
  };

  return (
    <div className="board-container">
      {renderContent()}
    </div>
  );
};

export default Board; 