import React from 'react';
import DOMPurify from 'dompurify';
import './BoardDetail.css';
import { useAuth } from '../../contexts/AuthContext';
import useTranslation from '../../hooks/useTranslation';

// TODO: 게시글/자료실 콘텐츠 자체의 다국어 지원은 별도 DB 필드 또는 language 컬럼 기준으로 분리 필요.

const BoardDetail = ({ post, onBack, onEdit, onDelete }) => {
  const { isAdmin } = useAuth();
  const { t, currentLang } = useTranslation();
  
  if (!post) {
    return (
      <div className="board-detail">
        <div className="empty-state">
          <p>{t('board.postNotFound')}</p>
        </div>
      </div>
    );
  }

  // Supabase 데이터 구조에 맞게 필드 매핑
  const title = post.title || t('board.noTitle');
  const content = post.content ||  '';
  const author = post.author || t('board.author');
  
  let createdAt = post.created_at || null;

  // 날짜 형식을 날짜까지만 표시하도록 변환

  if (createdAt) {
    try {
      const date = new Date(createdAt);
      if (!isNaN(date.getTime())) {
        const dateLocale = currentLang === 'en' ? 'en-US' : 'ko-KR';
        createdAt = date.toLocaleDateString(dateLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
      } else {
        createdAt = t('board.noDate');
      }
    } catch (error) {
      console.error('날짜 변환 오류:', error);
      createdAt = t('board.noDate');
    }
  } else {
    createdAt = t('board.noDate');
  } 

  return (
    <div className="board-detail">
      <div className="post-content">
        <div className="post-header">
          <h1 className="post-title">{title}</h1>
        </div>
        
        <div className="post-body">
          <div 
            className="content-html"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
          />
        </div>
        
        <div className="post-footer">
          <div className="post-meta">
            <span className="date">{t('board.dateLabel')} {createdAt}</span>
          </div>
          <div className="post-actions">
            <button onClick={onBack} className="btn-back">
              {t('board.backToList')}
            </button>
            {isAdmin() && (
              <button onClick={() => onEdit(post)} className="btn-edit">
                {t('board.edit')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail; 