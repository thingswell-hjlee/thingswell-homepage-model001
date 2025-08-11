import React, { useState, useEffect } from "react";
import "./BoardList.css";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import SearchComponent from "../SearchComponent";

const BoardList = ({
  post,
  onBack,
  onEdit,
  onDelete,
  onPostClick,
  onWriteClick,
  tableName,
}) => {
  const [instruments, setInstruments] = useState([]);
  const [filteredInstruments, setFilteredInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const { user } = useAuth(); // 로그인 상태 가져오기

  // 페이징 관련 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 페이지당 아이템 수

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    getInstruments();
  }, []);

  // 초기 로딩 시 모든 데이터를 내림차순으로 정렬하여 표시
  useEffect(() => {
    const sorted = instruments.sort((a, b) => (b.id || 0) - (a.id || 0));
    setFilteredInstruments(sorted);
    setCurrentPage(1); // 데이터가 변경되면 첫 페이지로 이동
  }, [instruments]);

  async function getInstruments() {
    try {
      setLoading(true);
      setError(null); // 오류 상태 초기화

      // props로 전달받은 테이블명 사용
      let data = null;
      let error = null;

      if (!tableName) {
        console.error("테이블명이 전달되지 않았습니다.");
        setError("테이블명이 지정되지 않았습니다.");
        setInstruments([]);
        return;
      }

      console.log(`테이블 "${tableName}"에서 데이터를 가져오는 중...`);
      const result = await supabase.from(tableName).select("*");
      console.log(`${tableName} 쿼리 결과:`, result);

      if (result.error) {
        console.error(`${tableName} Supabase 오류:`, result.error);
        error = result.error;
      } else {
        data = result.data;
        console.log(
          `성공! 테이블 "${tableName}"에서 ${
            data ? data.length : 0
          }개의 데이터를 가져왔습니다.`
        );
        if (data && data.length > 0) {
          console.log("첫 번째 데이터 구조:", data[0]);
        }
      }

      if (error) {
        console.error("Supabase 오류:", error);
        setError(`데이터베이스 오류: ${error.message}`);
        setInstruments([]);
      } else if (data) {
        console.log("받아온 데이터:", data);
        setInstruments(data);
        // 데이터가 없어도 오류가 아닌 정상적인 상태로 처리
        if (data.length === 0) {
          console.log("테이블에 데이터가 없습니다. (정상적인 상태)");
        }
      } else {
        console.error("예상치 못한 오류: 데이터와 오류 모두 null");
        setError("데이터를 가져오는 중 예상치 못한 오류가 발생했습니다.");
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
      console.log("게시물 클릭:", instrument);
      // 기본 동작: 콘솔에 로그 출력
    }
  };

  // 페이징 관련 함수들
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInstruments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInstruments.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 검색 함수
  const handleSearch = (searchValue) => {
    // 검색어가 비어있으면 모든 데이터 표시
    if (searchValue.trim() === "") {
      // 내림차순으로 정렬
      const sorted = instruments.sort((a, b) => (b.id || 0) - (a.id || 0));
      setFilteredInstruments(sorted);
    } else {
      // 제목과 내용에서 검색어 찾기
      const filtered = instruments.filter((instrument) => {
        const title = (instrument.title || "").toLowerCase();
        const searchLower = searchValue.toLowerCase();

        return title.includes(searchLower);
      });
      // 검색 결과도 내림차순으로 정렬
      const sorted = filtered.sort((a, b) => (b.id || 0) - (a.id || 0));
      setFilteredInstruments(sorted);
    }
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  // Enter 키로 검색 실행 - 이 함수는 이제 필요 없음
  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     handleSearch();
  //   }
  // };

  // 제목 길이 제한 함수 (모바일에서 사용)
  const truncateTitle = (title, maxLength = 20) => {
    if (isMobile && title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString || dateString === "날짜 없음") return "날짜 없음";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "날짜 없음";

      if (isMobile) {
        // 모바일에서는 간단한 형식
        return date.toLocaleDateString("ko-KR", {
          month: "2-digit",
          day: "2-digit",
        });
      } else {
        // 데스크톱에서는 상세한 형식
        return date.toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      }
    } catch (error) {
      console.error("날짜 변환 오류:", error);
      return "날짜 없음";
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
          <SearchComponent
            placeholder={isMobile ? "검색" : "검색어를 입력하세요"}
            onSearch={handleSearch}
            backgroundColor="var(--color-background-light)"
            noPadding={true}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        {user && (
          <button onClick={onWriteClick} className="btn-write">
            {isMobile ? "글쓰기" : "글쓰기"}
          </button>
        )}
      </div>

      <div className="board-table">
        <table>
          <thead>
            <tr>
              <th id="board-number">번호</th>
              <th id="board-title">제목</th>
              <th id="board-date">작성일</th>
              {user && <th id="board-actions">관리</th>}
            </tr>
          </thead>
          <tbody>
            {currentItems && currentItems.length > 0 ? (
              currentItems.map((instrument, index) => {
                // 데이터베이스 컬럼명에 맞춰서 필드 매핑
                const title = instrument.title || "제목 없음";
                const formattedDate = formatDate(instrument.created_at);

                return (
                  <tr key={instrument.id || index}>
                    <td
                      id="board-number"
                      onClick={() => handlePostClick(instrument)}
                    >
                      {instrument.id}
                    </td>
                    <td
                      id="board-title"
                      onClick={() => handlePostClick(instrument)}
                    >
                      {truncateTitle(title)}
                    </td>
                    <td
                      id="board-date"
                      onClick={() => handlePostClick(instrument)}
                    >
                      {formattedDate}
                    </td>
                    {user && (
                      <td id="board-actions">
                        <button
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onDelete) {
                              onDelete(instrument);
                            }
                          }}
                          aria-label="삭제"
                        >
                          {isMobile ? "삭제" : "삭제"}
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={user ? 4 : 3} className="no-data">
                  데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이징 컴포넌트 */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={handlePrevPage} 
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            이전
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`page-number ${currentPage === pageNumber ? 'active' : ''}`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          
          <button 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default BoardList;
