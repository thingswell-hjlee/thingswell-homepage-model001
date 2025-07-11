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

  return (
    <div className="board-detail">
      <div className="detail-header">
        <button onClick={onBack} className="btn-back">
          ← 목록으로
        </button>
        <div className="detail-actions">
          <button onClick={() => onEdit(post)} className="btn-edit">
            수정
          </button>
          <button onClick={() => onDelete(post.id)} className="btn-delete">
            삭제
          </button>
        </div>
      </div>
      
      <div className="post-content">
        <div className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <span className="author">작성자: {post.author}</span>
            <span className="date">작성일: {post.createdAt}</span>
            <span className="views">조회수: {post.views}</span>
          </div>
        </div>
        
        <div className="post-body">
          <div 
            className="content-html"
            dangerouslySetInnerHTML={{ __html: post.htmlContent || post.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default BoardDetail; 