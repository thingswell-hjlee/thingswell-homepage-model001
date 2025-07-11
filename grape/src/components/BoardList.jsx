import React from 'react';
import './BoardList.css';

const BoardList = ({ posts, onPostClick, onWriteClick }) => {
  return (
    <div className="board-list">
      <div className="board-header">
        <div className="board-search-container">
            <input type="text" placeholder="검색어를 입력하세요" />
            <button>검색</button>
        </div>
        {/* <button onClick={onWriteClick} className="btn-write">
          글쓰기
        </button> */}
      </div>
      
      <div className="board-table">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id} onClick={() => onPostClick(post)}>
                <td>{posts.length - index}</td>
                <td className="post-title">
                  {post.title}
                  {post.isNew && <span className="new-badge">NEW</span>}
                </td>
                <td>{post.author}</td>
                <td>{post.createdAt}</td>
                <td>{post.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {posts.length === 0 && (
        <div className="empty-state">
          <p>등록된 게시글이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default BoardList; 