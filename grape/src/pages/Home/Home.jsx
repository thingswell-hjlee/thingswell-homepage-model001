import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardRotator from "../../components/CardRotator";
import Footer from "../../components/Footer";
import HomePopup from "../../components/HomePopup";
import { getBoards } from "../../lib/api";
import useTranslation from "../../hooks/useTranslation";
import aiImage from "../../assets/main/AI.webp";
import humanImage from "../../assets/main/human.webp";
import ondeviceImage from "../../assets/main/ondevice.webp";
import familyImage from "../../assets/main/family.webp";
import noticeBg from "../../assets/1.png";
import cameraImage from "../../assets/main/camera_2.png";

export default function Home() {
  const { t, currentLang } = useTranslation();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [latestAnnouncement, setLatestAnnouncement] = useState(null);
  const navigate = useNavigate();
  const [visibleBackgroundIndex, setVisibleBackgroundIndex] = useState(0);
  const [previousBackgroundIndex, setPreviousBackgroundIndex] = useState(null);
  const backgroundFadeTimeoutRef = useRef(null);

  const getAnnouncementBackgroundImage = () => {
    return noticeBg;
  };

  const backgroundImages = [aiImage, ondeviceImage, humanImage, familyImage];

  const cards = useMemo(() => {
    const translatedCards = t('home.cards');
    const ctaHrefs = [
      `/${currentLang}/solutions/overview`,
      `/${currentLang}/solutions/overview`,
      `/${currentLang}/solutions/overview`,
      `/${currentLang}/solutions/overview`,
    ];
    if (Array.isArray(translatedCards)) {
      return translatedCards.map((card, i) => ({
        ...card,
        ctaHref: ctaHrefs[i],
        backgroundImage: backgroundImages[i],
      }));
    }
    return [];
  }, [t, currentLang]);

  const handleCardChange = (index) => {
    if (index !== currentCardIndex) {
      setTimeout(() => {
        setCurrentCardIndex(index);
      }, 525);
    }
  };

  useEffect(() => {
    const fetchLatestAnnouncement = async () => {
      try {
        const { data, error } = await getBoards('Board_Announcement', {
          order: 'id',
          ascending: false,
          limit: 1
        });

        if (error) {
          console.error("Error fetching announcement:", error);
          return;
        }
        if (data && data.length > 0) {
          setLatestAnnouncement(data[0]);
        }
      } catch (err) {
        console.error("Exception fetching announcement:", err);
      }
    };
    fetchLatestAnnouncement();
  }, []);

  useEffect(() => {
    backgroundImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (currentCardIndex === visibleBackgroundIndex) return;

    if (backgroundFadeTimeoutRef.current) {
      clearTimeout(backgroundFadeTimeoutRef.current);
      backgroundFadeTimeoutRef.current = null;
    }

    const leavingIndex = visibleBackgroundIndex;

    setPreviousBackgroundIndex(leavingIndex);
    setVisibleBackgroundIndex(currentCardIndex);

    backgroundFadeTimeoutRef.current = setTimeout(() => {
      setPreviousBackgroundIndex(null);
      backgroundFadeTimeoutRef.current = null;
    }, 525);
  }, [currentCardIndex, visibleBackgroundIndex]);

  useEffect(() => {
    return () => {
      if (backgroundFadeTimeoutRef.current) {
        clearTimeout(backgroundFadeTimeoutRef.current);
      }
    };
  }, []);

  const handleAnnouncementClick = () => {
    if (latestAnnouncement && latestAnnouncement.id) {
      navigate(`/${currentLang}/customer-service/announcement?id=${encodeURIComponent(latestAnnouncement.id)}&t=Board_Announcement`);
    } else {
      navigate(`/${currentLang}/customer-service/announcement`);
    }
  };

  return (
    <div className="home-layout">
      <div className="home-background-stack" aria-hidden="true">
        {previousBackgroundIndex !== null && (
          <div
            className="home-background-layer is-leaving"
            style={{
              backgroundImage: `url(${cards[previousBackgroundIndex]?.backgroundImage || backgroundImages[previousBackgroundIndex]})`,
            }}
          />
        )}
        <div
          className={`home-background-layer is-visible${previousBackgroundIndex !== null ? " is-entering" : ""}`}
          style={{
            backgroundImage: `url(${cards[visibleBackgroundIndex]?.backgroundImage || backgroundImages[visibleBackgroundIndex]})`,
          }}
        />
      </div>
      <div className="home-content-container">
        <CardRotator
          cards={cards}
          onCardChange={handleCardChange}
          currentIndex={currentCardIndex}
        />

        <section className="hero-content-section">
          <Link
            to={`/${currentLang}/products/safety?detail=1`}
            className="hero-content-card hero-content-card_1"
            aria-label={t('home.heroProductAriaLabel')}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.20), rgba(0,0,0,0.10)), url(${cameraImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="hero-content-card-content">
              <h1 className="hero-content-card-title">
                {t('home.heroProductTitle')}
              </h1>
            </div>
          </Link>

          <div
            className="hero-content-card announcement-card"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.35)), url(${getAnnouncementBackgroundImage()})`,
              cursor: "pointer"
            }}
            role="button"
            tabIndex={0}
            aria-label={t('home.heroAnnouncementAriaLabel')}
            onClick={handleAnnouncementClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleAnnouncementClick();
              }
            }}
          >
            <div className="hero-content-card-content">
              <h1 className="hero-content-card-title">
                {latestAnnouncement?.title || t('home.heroAnnouncementEmpty')}
              </h1>
            </div>
          </div>

          <Link
            to={`/${currentLang}/cases/smart-safety`}
            className="hero-content-card hero-content-card_2"
            aria-label={t('home.heroCaseAriaLabel')}
          >
            <div className="hero-content-card-content">
              <h1 className="hero-content-card-title">
                {t('home.heroCaseTitle')}
              </h1>
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
}
