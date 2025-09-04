import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BoardList from '../BoardList';
import BoardDetail from '../BoardDetail';
import BoardEditor from '../BoardEditor';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { deleteAllPostFiles } from '../../utils/imageUpload';
import './Board.css';

const Board = ({ tableName, tableNames }) => {
  const [posts, setPosts] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'detail', 'write', 'edit'
  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const resolvedTableName = tableName || (Array.isArray(tableNames) && tableNames.length > 0 ? tableNames[0] : undefined);
  const location = useLocation();
  const navigate = useNavigate();

  // 샘플 데이터 (실제로는 API에서 가져올 데이터)
  useEffect(() => {
    const samplePosts = [
    ];
    setPosts(samplePosts);
  }, []);

  // 쿼리스트링으로 들어온 id, t(테이블), detail, edit, write 처리
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idParam = params.get('id');
    const tableParam = params.get('t');
    const detailParam = params.get('detail');
    const editParam = params.get('edit');
    const writeParam = params.get('write');
    
    if (editParam) {
      // 편집 모드
      const targetTable = tableParam || resolvedTableName;
      if (targetTable) {
        // Supabase에서 해당 게시물 조회
        (async () => {
          try {
            const { data, error } = await supabase
              .from(targetTable)
              .select('*')
              .eq('id', editParam)
              .single();
            if (!error && data) {
              setEditingPost({ ...data, tableName: targetTable });
              setCurrentView('edit');
            }
          } catch (e) {
            console.error('편집 조회 오류:', e);
          }
        })();
      }
    } else if (writeParam) {
      // 작성 모드
      setCurrentView('write');
      setSelectedPost(null);
      setEditingPost(null);
    } else if (idParam || detailParam) {
      // 상세 모드
      const targetId = idParam || detailParam;
      const targetTable = tableParam || resolvedTableName;
      if (targetTable) {
        // Supabase에서 해당 게시물 조회
        (async () => {
          try {
            const { data, error } = await supabase
              .from(targetTable)
              .select('*')
              .eq('id', targetId)
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
    } else {
      // 파라미터가 없으면 리스트 모드로 설정
      setCurrentView('list');
      setSelectedPost(null);
      setEditingPost(null);
    }
  }, [location.search, resolvedTableName]);

  const handlePostClick = (post) => {
    console.log('게시물 클릭:', post);
    
    // URL에 detail 파라미터 추가
    const currentSearch = new URLSearchParams(location.search);
    currentSearch.set('detail', post.id);
    const target = `${location.pathname}?${currentSearch.toString()}`;
    
    // 동일한 위치로의 중복 네비게이션 방지
    if (location.pathname + location.search === target) {
      console.log('[Board] handlePostClick - target equals current, skipping navigate');
      return;
    }
    navigate(target, { replace: false });
  };

  const handleWriteClick = () => {
    setEditingPost(null);
    setCurrentView('write');
    
    // URL에 write 파라미터 추가
    const currentSearch = new URLSearchParams(location.search);
    currentSearch.set('write', 'true');
    const target = `${location.pathname}?${currentSearch.toString()}`;
    
    // 동일한 위치로의 중복 네비게이션 방지
    if (location.pathname + location.search !== target) {
      navigate(target, { replace: false });
    }
  };

  const handleEditClick = (post) => {
    console.log('편집할 게시글:', post);
    setEditingPost(post);
    setCurrentView('edit');
    
    // URL에 edit 파라미터 추가
    const currentSearch = new URLSearchParams(location.search);
    currentSearch.set('edit', post.id);
    const target = `${location.pathname}?${currentSearch.toString()}`;
    
    // 동일한 위치로의 중복 네비게이션 방지
    if (location.pathname + location.search !== target) {
      navigate(target, { replace: false });
    }
    
    console.log('편집 모드로 전환됨, editingPost:', post);
  };

  const handleBackToList = () => {
    // URL에서 detail, edit, write 파라미터를 제거하여 리스트 모드로 돌아가기
    const currentSearch = new URLSearchParams(location.search);
    currentSearch.delete('detail');
    currentSearch.delete('edit');
    currentSearch.delete('write');
    navigate(`${location.pathname}?${currentSearch.toString()}`, { replace: false });
  };

  const handleSavePost = (postData) => {
    // BoardEditor에서 이미 Supabase에 저장했으므로, 
    // 여기서는 UI 상태만 업데이트하면 됩니다
    if (postData.isEdit) {
      // 수정된 경우
      const updatedPosts = posts.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...postData.savedData, updatedAt: new Date().toISOString().split('T')[0] }
          : post
      );
      setPosts(updatedPosts);
    } else {
      // 새 글 작성된 경우
      const newPost = {
        ...postData.savedData,
        author: '관리자',
        views: 0,
        isNew: true
      };
      setPosts([newPost, ...posts]);
    }
    
    // URL 파라미터를 제거하여 목록 모드로 돌아가기
    const currentSearch = new URLSearchParams(location.search);
    currentSearch.delete('detail');
    currentSearch.delete('edit');
    currentSearch.delete('write');
    navigate(`${location.pathname}?${currentSearch.toString()}`, { replace: false });
    
    setCurrentView('list');
    setEditingPost(null);
  };

  const handleDeletePost = async (post) => {
    if (window.confirm('정말 삭제하시겠습니까?\n\n⚠️ 주의: 관련된 모든 이미지와 파일도 함께 삭제됩니다.')) {
      try {
        // 1. 먼저 관련된 모든 이미지와 파일 삭제
        const targetTable = post?.tableName || resolvedTableName;
        await deleteAllPostFiles(post, targetTable);
        
        // 2. Supabase에서 실제 데이터 삭제
        const { error } = await supabase
          .from(targetTable)
          .delete()
          .eq('id', post.id);

        if (error) {
          console.error('삭제 오류:', error);
          alert('삭제 중 오류가 발생했습니다: ' + error.message);
        } else {
          console.log('게시물과 관련된 모든 파일이 성공적으로 삭제되었습니다.');
          alert('게시물과 관련된 모든 파일이 삭제되었습니다.');
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
        console.log('편집 모드 렌더링 - editingPost:', editingPost);
        return (
          <BoardEditor
            initialContent={editingPost?.content || ''}
            title={editingPost?.title || ''}
            onSave={handleSavePost}
            tableName={resolvedTableName}
            onCancel={handleBackToList}
            existingId={editingPost?.id}
            isEditMode={true}
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