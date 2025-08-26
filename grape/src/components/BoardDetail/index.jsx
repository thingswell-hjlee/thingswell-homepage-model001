import React from 'react';
import './BoardDetail.css';

const BoardDetail = ({ post, onBack, onEdit, onDelete }) => {
  if (!post) {
    return (
      <div className="board-detail">
        <div className="empty-state">
          <p>게시글을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  // Supabase 데이터 구조에 맞게 필드 매핑
  const title = post.title ||'제목 없음';
  const content = post.content ||  '';
  const author = post.author || '작성자';
  
  console.log('로드된 게시글 콘텐츠:', content);
  let createdAt = post.created_at || '날짜 없음';

  // 날짜 형식을 시간과 분까지만 표시하도록 변환

  if (createdAt !== '날짜 없음' && createdAt) {
    try {
      const date = new Date(createdAt);
      if (!isNaN(date.getTime())) {
        createdAt = date.toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
      }
    } catch (error) {
      console.error('날짜 변환 오류:', error);
    }
  } 


  return (
    <div className="board-detail">
      <div className="post-content">
        <div className="post-header">
          <h1 className="post-title">{title}</h1>
          <div className="post-meta">
            <span className="date">작성일: {createdAt}</span>
          </div>
        </div>
        
        <div className="post-body">
          <div 
            className="content-html"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        
        <div className="post-actions">
          <button onClick={() => onEdit(post)} className="btn-edit">
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail; 