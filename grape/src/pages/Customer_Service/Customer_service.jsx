import React from "react";
import SolutionCard from "../../components/SolutionCard";
import SearchComponent from "../../components/SearchComponent";
import "./Customer_service.css";
import { Link } from "react-router-dom";

const Customer_service = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
            <div className="solutions-section">
              <SolutionCard
                subtitle="Customer Service"
                title="고객지원"
                description="고객지원"
                showButton={false}
                link="/solutions"
                className="custom-solution-left"
                variant="hero"
                reverse={false}
              />
              <div className="customer-service-container">
                <div className="customer-service-section">
                <SearchComponent 
                  placeholder="검색어를 입력하세요"
                  onSearch={(searchTerm) => {
                    console.log("검색어:", searchTerm);

                    // 여기에 검색 로직을 추가할 수 있습니다
                  }}
                  noPadding={true}
                />
                  <div className="service-grid">
                    <div className="service-box">
                      <Link to="/customer-service/announcement">
                        <h3>공지사항</h3>
                        <p>최신 공지사항을 확인하세요</p>
                      </Link>
                    </div>
                    <div className="service-box">
                      <Link to="/customer-service/contact">
                        <h3>문의하기</h3>
                        <p>궁금한 점을 문의하세요</p>
                      </Link>
                    </div>
                    <div className="service-box">
                      <Link to="/customer-service/downloads">
                        <h3>다운로드</h3>
                        <p>관련 자료를 다운로드하세요</p>
                      </Link>
                    </div>
                    <div className="service-box">
                      <Link to="/faq">
                        <h3>FAQ</h3>
                        <p>자주 묻는 질문을 확인하세요</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer_service;
