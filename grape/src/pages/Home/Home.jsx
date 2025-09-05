import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardRotator from "../../components/CardRotator";
import Footer from "../../components/Footer";
import { supabase } from "../../lib/supabase";
import aiImage from "../../assets/main/AI.webp";
import humanImage from "../../assets/main/human.webp";
import ondeviceImage from "../../assets/main/ondevice.webp";
import familyImage from "../../assets/main/family.webp";
import noticeBg from "../../assets/1.png";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [latestAnnouncement, setLatestAnnouncement] = useState(null);
  const navigate = useNavigate();

  // 공지사항 배경 이미지 함수
  const getAnnouncementBackgroundImage = () => {
    return noticeBg;
  };

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

  const handleCardChange = (index) => {
    if (index !== currentCardIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentCardIndex(index);
      }, 525);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1050);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const fetchLatestAnnouncement = async () => {
      try {
        const { data, error } = await supabase
          .from("Board_Announcement")
          .select("id, title, created_at, images")
          .order("id", { ascending: false })
          .limit(1);

        if (error) {
          console.error("최신 공지 조회 오류:", error);
          return;
        }
        if (data && data.length > 0) {
          setLatestAnnouncement(data[0]);
        }
      } catch (err) {
        console.error("최신 공지 조회 예외:", err);
      }
    };
    fetchLatestAnnouncement();
  }, []);

  // 배경 이미지 적용 (홈 페이지에서만 - .home-layout에 적용)
  useEffect(() => {
    // 현재 경로가 홈 페이지인지 확인
    if (window.location.pathname === '/') {
      // body 대신 .home-layout에 배경 적용
      const homeLayout = document.querySelector('.home-layout');
      if (homeLayout) {
        homeLayout.style.backgroundImage = `url(${cards[currentCardIndex].backgroundImage})`;
        homeLayout.style.backgroundSize = 'cover';
        homeLayout.style.backgroundPosition = 'center';
        homeLayout.style.backgroundRepeat = 'no-repeat';
        
        // 모바일에서는 scroll, 데스크톱에서는 fixed
        const isMobileDevice = window.innerWidth <= 768;
        homeLayout.style.backgroundAttachment = isMobileDevice ? 'scroll' : 'scroll'; // 모든 기기에서 scroll 사용
      }
    }

    // 컴포넌트 언마운트 시 배경 초기화
    return () => {
      if (window.location.pathname === '/') {
        const homeLayout = document.querySelector('.home-layout');
        if (homeLayout) {
          homeLayout.style.backgroundImage = '';
          homeLayout.style.backgroundSize = '';
          homeLayout.style.backgroundPosition = '';
          homeLayout.style.backgroundRepeat = '';
          homeLayout.style.backgroundAttachment = '';
        }
      }
    };
  }, [currentCardIndex, cards]);

  const handleAnnouncementClick = () => {
    if (latestAnnouncement && latestAnnouncement.id) {
      navigate(`/customer-service/announcement?id=${encodeURIComponent(latestAnnouncement.id)}&t=Board_Announcement`);
    } else {
      navigate("/customer-service/announcement");
    }
  };

  return (
    <div className="home-layout">
      <div className="home-content-container">
        {/* 카드 로테이터 섹션 */}
        <CardRotator
          cards={cards}
          onCardChange={handleCardChange}
          currentIndex={currentCardIndex}
        />

        {/* 히어로 콘텐츠 섹션 */}
        <section className="hero-content-section">
          {/* 제품 카드 */}
          <Link
            to="/products/safety?detail=1"
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
  );
}
