import React, { useState, useEffect } from 'react';
import './BoardList.css';
import { supabase } from '../lib/supabase';

const BoardList = ({ post, onBack, onEdit, onDelete, onPostClick, tableName }) => {
  const [instruments, setInstruments] = useState([]);
  const [filteredInstruments, setFilteredInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getInstruments();
  }, []);

  // 초기 로딩 시 모든 데이터를 내림차순으로 정렬하여 표시
  useEffect(() => {
    const sorted = instruments.sort((a, b) => (b.id || 0) - (a.id || 0));
    setFilteredInstruments(sorted);
  }, [instruments]);

  async function getInstruments() {
    try {
      setLoading(true);
      
      // props로 전달받은 테이블명 사용
      let data = null;
      let error = null;
      
      if (!tableName) {
        console.error('테이블명이 전달되지 않았습니다.');
        setError('테이블명이 지정되지 않았습니다.');
        setInstruments([]);
        return;
      }
      
      console.log(`테이블 "${tableName}" 시도 중...`);
      const result = await supabase.from(tableName).select("*");
      console.log(`${tableName} 결과:`, result);
      
      if (!result.error && result.data) {
        data = result.data;
        console.log(`성공! 테이블 "${tableName}"에서 데이터를 가져왔습니다.`);
        console.log('데이터 개수:', data.length);
        if (data.length > 0) {
          console.log('첫 번째 데이터 구조:', data[0]);
          console.log('모든 데이터:', data);
        }
      } else if (result.error) {
        console.log(`${tableName} 오류:`, result.error);
        error = result.error;
      }
      
      if (error) {
        console.error("Supabase 오류:", error);
        setError(error.message);
        setInstruments([]);
      } else if (data && data.length > 0) {
        console.log('받아온 데이터:', data);
        setInstruments(data);
      } else {
        console.log('모든 테이블에서 데이 터를 찾을 수 없습니다.');
        setError("데이터베이스에 게시글이 없거나 테이블을 찾을 수 없습니다.");
        setInstruments([]);
      }
    } catch (err) {
      console.error("데이터 가져오기 오류:", err);
      setError("데이터를 가져오는 중 오류가 발생했습니다: " + err.message);
      setInstruments([]);
    } finally {
      setLoading(false);
    }
  }

  // 게시물 클릭 핸들러 추가
  const handlePostClick = (instrument) => {
    if (onPostClick) {
      onPostClick(instrument);
    } else {
      console.log('게시물 클릭:', instrument);
      // 기본 동작: 콘솔에 로그 출력
    }
  };

  // 검색 함수
  const handleSearch = () => {
    // 검색어가 비어있으면 모든 데이터 표시
    if (searchTerm.trim() === '') {
      // 내림차순으로 정렬
      const sorted = instruments.sort((a, b) => (b.id || 0) - (a.id || 0));
      setFilteredInstruments(sorted);
    } else {
      // 제목과 내용에서 검색어 찾기
      const filtered = instruments.filter(instrument => {
        const title = (instrument.title || '').toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        
        return title.includes(searchLower);
      });
      // 검색 결과도 내림차순으로 정렬
      const sorted = filtered.sort((a, b) => (b.id || 0) - (a.id || 0));
      setFilteredInstruments(sorted);
    }
  };

  // Enter 키로 검색 실행
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (loading) {
    return (
      <div className="board-list">
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="board-list">
        <div className="error">오류: {error}</div>
      </div>
    );
  }

  return (
    <div className="board-list">
      <div className="board-header">
        <div className="board-search-container">
            <input 
              type="text" 
              placeholder="검색어를 입력하세요" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button id="search-button" onClick={handleSearch}>검색</button>
            
        </div>
        {/* <button onClick={onWriteClick} className="btn-write">
          글쓰기
        </button> */}
      </div>
      
      <div className="board-table">
        <table>
          <thead>
            <tr>
              <th id="board-number">번호</th>
              <th id="board-title">제목</th>
              {/* <th>작성자</th> */}
              <th id="board-date">작성일</th>
              {/* <th>조회수</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredInstruments && filteredInstruments.length > 0 ? (
              filteredInstruments.map((instrument, index) => {
                // 데이터베이스 컬럼명에 맞춰서 필드 매핑
                const title = instrument.title || '제목 없음';
                let createdAt = instrument.created_at || '날짜 없음';
                
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
                  <tr key={instrument.id || index} onClick={() => handlePostClick(instrument)}>
                    <td id="board-number">{instrument.id}</td>
                    <td id="board-title">
                      {title}
                    </td>
                    <td id="board-date">{createdAt}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3" className="no-data">
                  {searchTerm.trim() !== '' ? '검색 결과가 없습니다.' : '데이터가 없습니다.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {(!filteredInstruments || filteredInstruments.length === 0) && (
        <div className="empty-state">
          <p>{searchTerm.trim() !== '' ? '검색 결과가 없습니다.' : '등록된 게시글이 없습니다.'}</p>
        </div>
      )}
    </div>
  );
};

export default BoardList; 