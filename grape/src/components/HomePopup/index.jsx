import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePopup.css";
import logoSmallKorean from "../../assets/logos/logo_small_korean.png";

const STORAGE_KEY = "homePopupHiddenDate";

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function shouldShowPopup() {
  try {
    const hiddenDate = localStorage.getItem(STORAGE_KEY);
    const today = getTodayString();
    return hiddenDate !== today;
  } catch {
    return true;
  }
}

export default function HomePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(shouldShowPopup());
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  const handleDontShowToday = () => {
    try {
      localStorage.setItem(STORAGE_KEY, getTodayString());
    } catch (e) {
      console.warn("localStorage setItem failed", e);
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="home-popup-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="home-popup-title"
    >
      <div className="home-popup-box" onClick={(e) => e.stopPropagation()}>
        <div className="home-popup-body">
          <img
            src={logoSmallKorean}
            alt="㈜ 싱스웰"
            className="home-popup-logo"
          />

          <h2 id="home-popup-title" className="home-popup-year">2026년</h2>
          <div className="home-popup-badges">
            <span className="home-popup-badge home-popup-badge-light">소상공인</span>
            <span className="home-popup-badge home-popup-badge-dark">스마트상점 지원사업</span>
          </div>
          <p className="home-popup-highlight">정부지원 최대 80%</p>
          <p className="home-popup-desc">사업장 관리를 한눈에</p>
          <p className="home-popup-tagline">
            <strong className="home-popup-ai">AI</strong>{" "}
            <strong className="home-popup-smart">스마트 상점</strong>
          </p>
          <p className="home-popup-features">
            매장 안전 관리 <span className="home-popup-divider">|</span> 무인 매장관리{" "}
            <span className="home-popup-divider">|</span> 매장 현황 분석
          </p>

          <Link
            to="/government-support"
            className="home-popup-cta"
            onClick={handleClose}
          >
            상세내용 확인하기
          </Link>
        </div>

        <div className="home-popup-actions">
          <button
            type="button"
            className="home-popup-btn home-popup-btn-dont-show"
            onClick={handleDontShowToday}
          >
            오늘 하루 보지않기
          </button>
          <button
            type="button"
            className="home-popup-btn home-popup-btn-close"
            onClick={handleClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
