import React, { useEffect } from 'react';
import './BoardDetail.css';
import { useAuth } from '../../contexts/AuthContext';

const BoardDetail = ({ post, onBack, onEdit, onDelete }) => {
  const { isAuthenticated } = useAuth();
  
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
  console.log('전체 post 객체:', post);
  let createdAt = post.created_at || '날짜 없음';

  // 날짜 형식을 날짜까지만 표시하도록 변환

  if (createdAt !== '날짜 없음' && createdAt) {
    try {
      const date = new Date(createdAt);
      if (!isNaN(date.getTime())) {
        createdAt = date.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
      }
    } catch (error) {
      console.error('날짜 변환 오류:', error);
    }
  } 

  useEffect(() => {
    const contentHtml = document.querySelector('.content-html');
    const postBody = document.querySelector('.post-body');
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/fad17f9a-a263-4dc1-b203-f05ae309c76a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'pre-fix',hypothesisId:'H5',location:'src/components/BoardDetail/index.jsx:detail-layout',message:'board detail computed alignment',data:{postId:post.id??null,contentHtmlTextAlign:contentHtml?window.getComputedStyle(contentHtml).textAlign:null,postBodyTextAlign:postBody?window.getComputedStyle(postBody).textAlign:null,hasCenterAlignMarkup:/text-align:\s*center/i.test(content),hasLeftAlignMarkup:/text-align:\s*left/i.test(content),contentPreview:content.replace(/\s+/g,' ').slice(0,160)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
  }, [content, post]);


  return (
    <div className="board-detail">
      <div className="post-content">
        <div className="post-header">
          <h1 className="post-title">{title}</h1>
        </div>
        
        <div className="post-body">
          <div 
            className="content-html"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        
        <div className="post-footer">
          <div className="post-meta">
            <span className="date">작성일: {createdAt}</span>
          </div>
          {isAuthenticated() && (
            <div className="post-actions">
              <button onClick={() => onEdit(post)} className="btn-edit">
                수정
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardDetail; 