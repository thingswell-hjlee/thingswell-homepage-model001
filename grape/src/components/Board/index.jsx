import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BoardList from '../BoardList';
import BoardDetail from '../BoardDetail';
import BoardEditor from '../BoardEditor';
import { getBoardById, deleteBoard } from '../../lib/api';
import { deleteAllPostFiles } from '../../utils/imageUpload';
import useTranslation from '../../hooks/useTranslation';
import './Board.css';

// TODO: 게시글/자료실 콘텐츠 자체의 다국어 지원은 별도 DB 필드 또는 language 컬럼 기준으로 분리 필요.

const Board = ({ tableName, tableNames }) => {
  const { t } = useTranslation();
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
        (async () => {
          try {
            const { data, error } = await getBoardById(targetTable, editParam);
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
        (async () => {
          try {
            const { data, error } = await getBoardById(targetTable, targetId);
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
    // URL에 detail 파라미터 추가
    const currentSearch = new URLSearchParams(location.search);
    currentSearch.set('detail', post.id);
    const target = `${location.pathname}?${currentSearch.toString()}`;
    
    // 동일한 위치로의 중복 네비게이션 방지
    if (location.pathname + location.search === target) {
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
    if (window.confirm(t('board.deleteConfirm'))) {
      try {
        // 1. 먼저 관련된 모든 이미지와 파일 삭제
        const targetTable = post?.tableName || resolvedTableName;
        await deleteAllPostFiles(post, targetTable);
        
        // 2. API를 통해 실제 데이터 삭제
        const { error } = await deleteBoard(targetTable, post.id);

        if (error) {
          console.error('삭제 오류:', error);
          alert(t('board.deleteFail') + ': ' + error.message);
        } else {
          alert(t('board.deleteSuccess'));
          // 목록으로 돌아가기
          const currentSearch = new URLSearchParams(location.search);
          currentSearch.delete('detail');
          currentSearch.delete('edit');
          currentSearch.delete('write');
          navigate(`${location.pathname}?${currentSearch.toString()}`, { replace: false });
        }
      } catch (error) {
        console.error('삭제 중 예외 발생:', error);
        alert(t('board.deleteFail'));
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