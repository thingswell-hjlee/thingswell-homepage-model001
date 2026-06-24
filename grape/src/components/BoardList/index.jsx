import React, { useState, useEffect, useMemo } from "react";
import "./BoardList.css";
import { getBoards } from "../../lib/api";
import { useAuth } from "../../contexts/AuthContext";
import SearchComponent from "../SearchComponent";
import ProductFilter from "../ProductFilter";

const BoardList = ({
  post,
  onBack,
  onEdit,
  onDelete,
  onPostClick,
  onWriteClick,
  tableName,
  tableNames,
}) => {
  const [instruments, setInstruments] = useState([]);
  const [filteredInstruments, setFilteredInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const { user, isAdmin } = useAuth(); // 로그인 상태 가져오기
  const [selectedBoardType, setSelectedBoardType] = useState('전체');

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
  }, [tableName, JSON.stringify(tableNames)]);

  // 카테고리 목록 계산
  const categories = useMemo(() => {
    const unique = new Set(
      instruments
        .map((item) => item.category)
        .filter((c) => typeof c === "string" && c.trim().length > 0)
    );
    return Array.from(unique);
  }, [instruments]);

  // 게시판 종류 옵션 계산
  const boardTypeOptions = useMemo(() => {
    const labelMap = {
      Board_Announcement: '공지사항',
      Board_Download: '자료실',
    };
    const unique = new Set(
      (tableNames && Array.isArray(tableNames) && tableNames.length > 0
        ? tableNames
        : instruments.map((i) => i.tableName)
      ).filter(Boolean)
    );
    return ['전체', ...Array.from(unique)];
  }, [tableNames, instruments]);

  // 필터/검색 적용 및 정렬
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();

    const filtered = instruments.filter((item) => {
      // 검색 매칭 (제목, 내용, 카테고리)
      const title = (item.title || "").toLowerCase();
      const matchesSearch = !term || title.includes(term) || (item.content || '').toLowerCase().includes(term) || (item.category || '').toLowerCase().includes(term);

      // 게시판 종류 매칭
      if (selectedBoardType !== '전체') {
        if (item.tableName !== selectedBoardType) return false;
      }

      // 카테고리 매칭
      if (selectedCategory === "전체") return matchesSearch;
      const selectedList = selectedCategory
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);
      const itemCategory = item.category;
      const matchesCategory = selectedList.includes(itemCategory);

      return matchesCategory && matchesSearch;
    });

    // 내림차순 정렬
    const sorted = filtered.sort((a, b) => (b.id || 0) - (a.id || 0));
    setFilteredInstruments(sorted);
    setCurrentPage(1);
  }, [instruments, searchTerm, selectedCategory, selectedBoardType]);

  async function getInstruments() {
    try {
      setLoading(true);
      setError(null); // 오류 상태 초기화

      // 단일/다중 테이블 지원
      if (tableNames && Array.isArray(tableNames) && tableNames.length > 0) {
        const results = await Promise.all(
          tableNames.map((t) => getBoards(t))
        );

        const errors = results.filter((r) => r.error).map((r) => r.error);
        if (errors.length > 0) {
          console.error('API 오류(다중):', errors[0]);
          setError('게시글을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
          setInstruments([]);
        } else {
          const merged = results.flatMap((r, idx) =>
            (r.data || []).map((row) => ({ ...row, tableName: tableNames[idx] }))
          );
          setInstruments(merged);
        }
      } else {
        // 단일 테이블
        if (!tableName) {
          console.error('테이블명이 전달되지 않았습니다.');
          setError('게시글을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
          setInstruments([]);
          return;
        }

        const result = await getBoards(tableName);

        if (result.error) {
          console.error(`${tableName} API 오류:`, result.error);
          setError('게시글을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
          setInstruments([]);
        } else {
          const data = (result.data || []).map((row) => ({ ...row, tableName }));
          setInstruments(data);
        }
      }
    } catch (err) {
      console.error("데이터 가져오기 오류:", err);
      setError('게시글을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
      setInstruments([]);
    } finally {
      setLoading(false);
    }
  }

  // 게시물 클릭 핸들러 추가
  const handlePostClick = (instrument) => {
    if (onPostClick) {
      onPostClick(instrument);
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

  // 검색 함수 - 검색어 상태만 업데이트
  const handleSearch = (value) => {
    setSearchTerm(value);
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
        <div className="error">게시글을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</div>
      </div>
    );
  }

  return (
    <div className="board-list">
      <div className="board-header-bleed">
        <div className="board-header">
        <div className="board-filter-container">
          <ProductFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categories={categories}
            filteredProductsCount={filteredInstruments.length}
            boardTypeOptions={boardTypeOptions}
            selectedBoardType={selectedBoardType}
            setSelectedBoardType={setSelectedBoardType}
          />
        </div>
        <div className="board-search-container">
          <SearchComponent
            placeholder={isMobile ? "검색" : "검색어를 입력하세요"}
            onSearch={handleSearch}
            backgroundColor="var(--color-background-light)"
            noPadding={true}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            showWriteButton={isAdmin()}
            onWriteClick={onWriteClick}
          />
        </div>
        </div>
      </div>

      <div className="board-table">
        <table>
          <thead>
            <tr>
              <th id="board-number">번호</th>
              <th id="board-title">제목</th>
              {isAdmin() && <th id="board-actions">관리</th>}
              <th id="board-date">작성일</th>
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
                    {isAdmin() && (
                      <td id="board-actions">
                        <button
                          className="edit-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onEdit) {
                              onEdit(instrument);
                            }
                          }}
                          aria-label="수정"
                        >
                          {isMobile ? "수정" : "수정"}
                        </button>
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
                    <td
                      id="board-date"
                      onClick={() => handlePostClick(instrument)}
                    >
                      {formattedDate}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={isAdmin() ? 4 : 3} className="no-data">
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
