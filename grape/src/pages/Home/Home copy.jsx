import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardRotator from "../../components/CardRotator";
import Footer from "../../components/Footer";
import { getBoards } from "../../lib/api";
import { BaseLayout } from "../../components/Layout";
import aiImage from "../../assets/main/AI.jpg";
import humanImage from "../../assets/main/human.jpg";
import ondeviceImage from "../../assets/main/ondevice.jpeg";
import familyImage from "../../assets/main/family.jpg";
import noticeBg from "../../assets/1.png";

/**
 * Home 컴포넌트
 * 
 * 메인 홈페이지 컴포넌트로 다음 기능들을 제공합니다:
 * - 동적 배경 이미지가 있는 카드 로테이터
 * - 제품, 공지사항, 사례 링크가 있는 히어로 콘텐츠 섹션
 * - 반응형 디자인 지원
 * - BaseLayout을 사용하지 않는 독립적인 레이아웃
 */
export default function Home() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [latestAnnouncement, setLatestAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 카드 데이터 정의
  const cards = [
    {
      eyebrow: "Safety Secured with AI, a Future Opened with Technology",
      title: "AI로 지키는 안전, 기술로 여는 미래",
      description: "AI 기반의 솔루션으로 위험을 예측하고, 혁신적인 기술로 더 안전한 미래를 만들어갑니다.",
      descriptionEng: "We predict risks with AI-based solutions and create a safer future with innovative technology.",
      ctaText: "Learn more",
      ctaHref: "/solutions/overview",
      caption: "AI Safety Solutions",
      backgroundImage: aiImage,
    },
    {
      eyebrow: "On-Device AI: Safety in Severe Environments",
      title: "온디바이스 AI, 극한 환경에서도 안전을",
      description: "외부 네트워크 연결 없이도 기기 자체적으로 위험을 감지하고 대응하여, 어떤 환경에서도 안전을 보장합니다.",
      descriptionEng: "By detecting and responding to risks directly on the device without an external network connection, we ensure safety in any environment.",
      ctaText: "Learn more",
      ctaHref: "/solutions/overview",
      caption: "On-Device AI",
      backgroundImage: ondeviceImage,
    },
    {
      eyebrow: "Innovation for People, Technology for Safety",
      title: "사람을 위한 혁신, 안전을 위한 기술",
      description: "인간의 삶을 더 풍요롭게 하는 혁신을 추구하며, 모든 기술은 오직 사람의 안전을 최우선으로 합니다.",
      descriptionEng: "We pursue innovation that enriches human lives, and all our technology prioritizes the safety of people above all else.",
      ctaText: "Learn more",
      ctaHref: "/solutions/overview",
      caption: "Human-Centered Innovation",
      backgroundImage: humanImage,
    },
    {
      eyebrow: "Your Safety, Everywhere. With ThingsWell",
      title: "산업안전에서 생활안전까지, 싱스웰이 함께합니다",
      description: "공장의 위험 작업 환경부터 일상생활의 작은 사고까지, 싱스웰의 기술은 모든 곳에서 당신을 지켜줍니다.",
      descriptionEng: "From hazardous work environments in factories to small accidents in daily life, Singswell's technology protects you everywhere.",
      ctaText: "Learn more",
      ctaHref: "/solutions/overview",
      caption: "Comprehensive Safety",
      backgroundImage: familyImage,
    },
  ];

  // 카드 변경 핸들러
  const handleCardChange = (index) => {
    if (index !== currentCardIndex) {
      setCurrentCardIndex(index);
    }
  };

  // 최신 공지사항 가져오기
  useEffect(() => {
    const fetchLatestAnnouncement = async () => {
      try {
        setLoading(true);
        const { data, error } = await getBoards('Board_Announcement', {
          order: 'id',
          ascending: false,
          limit: 1
        });

        if (error) {
          console.error("최신 공지 조회 오류:", error);
          return;
        }
        
        if (data && data.length > 0) {
          setLatestAnnouncement(data[0]);
        }
      } catch (err) {
        console.error("최신 공지 조회 예외:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestAnnouncement();
  }, []);

  // 배경 이미지 동적 적용
  useEffect(() => {
    const homeLayout = document.querySelector('.home-layout');
    if (homeLayout && cards[currentCardIndex]) {
      homeLayout.style.backgroundImage = `url(${cards[currentCardIndex].backgroundImage})`;
    }

    // 컴포넌트 언마운트 시 배경 초기화
    return () => {
      if (homeLayout) {
        homeLayout.style.backgroundImage = '';
      }
    };
  }, [currentCardIndex, cards]);

  // 공지사항 클릭 핸들러
  const handleAnnouncementClick = () => {
    if (latestAnnouncement?.id) {
      navigate(`/customer-service/announcement?id=${encodeURIComponent(latestAnnouncement.id)}&t=Board_Announcement`);
    } else {
      navigate("/customer-service/announcement");
    }
  };

  // 공지사항 배경 이미지 처리
  const getAnnouncementBackgroundImage = () => {
    if (latestAnnouncement?.images) {
      try {
        const images = JSON.parse(latestAnnouncement.images);
        return images[0] || noticeBg;
      } catch {
        return noticeBg;
      }
    }
    return noticeBg;
  };

  // 로딩 상태 처리
  if (loading) {
    return (
      <div className="home-layout">
        <div className="page-content">
          <div className="home-overlay">
            <div className="home-content-wrapper">
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '50vh',
                color: 'white',
                fontSize: 'var(--font-size-lg)'
              }}>
                데이터를 불러오는 중...
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="home-layout">
      <div className="home-content-container">
        <div className="page-content">
          <div className="home-overlay">
            <div className="home-content-wrapper">
              {/* 카드 로테이터 섹션 */}
              <div className="card-rotator-section">
                <CardRotator 
                  cards={cards} 
                  onCardChange={handleCardChange} 
                  currentIndex={currentCardIndex} 
                />
              </div>

              {/* 히어로 콘텐츠 섹션 */}
              <section className="hero-content-section">
                {/* 제품 카드 */}
                <Link 
                  to="/products/safety/14" 
                  className="hero-content-card hero-content-card_1"
                  aria-label="HIKVISION 네트워크 PTZ 카메라 제품 보기"
                >
                  <div className="hero-content-card-content">
                    <h1 className="hero-content-card-title">
                      HIKVISION 네트워크 PTZ 카메라
                    </h1>
                  </div>
                </Link>

                {/* 공지사항 카드 */}
                <div
                  className="hero-content-card announcement-card"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.35)), url(${getAnnouncementBackgroundImage()})`
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="최신 공지사항 보기"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleAnnouncementClick();
                    }
                  }}
                >
                  <div className="hero-content-card-content">
                    <h1 
                      className="hero-content-card-title" 
                      onClick={handleAnnouncementClick} 
                      style={{ cursor: "pointer" }}
                    >
                      {latestAnnouncement?.title || "등록된 공지사항이 없습니다."}
                    </h1>
                  </div>
                </div>

                {/* 사례 카드 */}
                <Link 
                  to="/cases/smart-safety" 
                  className="hero-content-card hero-content-card_2"
                  aria-label="서울 버스 스마트쉼터 AI 상황인지 시스템 사례 보기"
                >
                  <div className="hero-content-card-content">
                    <h1 className="hero-content-card-title">
                      서울 버스 스마트쉼터 AI 상황인지 시스템
                    </h1>
                  </div>
                </Link>
              </section>
            </div>
          </div>
        </div>
        
        {/* 푸터 래퍼 */}
        <div className="footer-wrapper">
          <Footer />
        </div>
      </div>
    </div>
  );
}