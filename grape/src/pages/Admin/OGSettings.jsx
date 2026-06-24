import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import BaseLayout from '../../components/Layout/BaseLayout';
import './OGSettings.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// SNS 플랫폼별 권장 사양
const PLATFORM_SPECS = [
  {
    name: '카카오톡',
    icon: '💬',
    imageSize: '800 x 400px',
    titleLimit: '최대 35자',
    descLimit: '최대 55자',
    notes: '정사각형 이미지도 지원. 가로형 권장.',
  },
  {
    name: 'Facebook',
    icon: '📘',
    imageSize: '1200 x 630px',
    titleLimit: '최대 60자',
    descLimit: '최대 155자',
    notes: 'OG 이미지 최소 600x315px. 비율 1.91:1 권장.',
  },
  {
    name: 'Twitter',
    icon: '🐦',
    imageSize: '1200 x 628px',
    titleLimit: '최대 70자',
    descLimit: '최대 200자',
    notes: 'summary_large_image 카드 타입 사용.',
  },
  {
    name: '네이버 밴드',
    icon: '🟢',
    imageSize: '800 x 400px',
    titleLimit: '최대 40자',
    descLimit: '최대 80자',
    notes: 'OG 태그 기본 지원. 가로형 이미지 권장.',
  },
];

// 기본 OG 설정값
const DEFAULT_OG = {
  title: '싱스웰 - AI 기반 스마트 안전 솔루션',
  description: 'AI 카메라, 스마트밴드, 환경센서, 통합제어 시스템으로 산업안전을 혁신합니다.',
  imageUrl: 'https://www.safegai.co.kr/og-image.png',
  siteName: '싱스웰 (ThingsWell)',
  url: 'https://www.safegai.co.kr',
};

export default function OGSettings() {
  const { isAuthenticated, canEditContent } = useAuth();
  const [ogData, setOgData] = useState(DEFAULT_OG);
  const [savedOgData, setSavedOgData] = useState(DEFAULT_OG);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [previewPlatform, setPreviewPlatform] = useState('카카오톡');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    loadOGSettings();
  }, []);

  const loadOGSettings = () => {
    try {
      const saved = localStorage.getItem('og_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        setOgData(parsed);
        setSavedOgData(parsed);
      }
    } catch (error) {
      console.error('OG 설정 로드 실패:', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      let finalImageUrl = ogData.imageUrl;

      // 이미지 파일이 있으면 S3에 업로드 시도
      if (imageFile) {
        try {
          const { getAccessToken } = await import('../../lib/auth');
          const token = await getAccessToken();
          
          const presignResponse = await fetch(`${API_BASE_URL}/upload/presigned-url`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              fileName: `og-images/${Date.now()}-${imageFile.name}`,
              fileType: imageFile.type,
            }),
          });

          if (presignResponse.ok) {
            const { uploadUrl, fileUrl } = await presignResponse.json();
            await fetch(uploadUrl, {
              method: 'PUT',
              headers: { 'Content-Type': imageFile.type },
              body: imageFile,
            });
            finalImageUrl = fileUrl;
          } else {
            console.warn('이미지 업로드 실패, 기존 URL 유지');
          }
        } catch (uploadError) {
          console.warn('이미지 업로드 오류, 기존 URL 유지:', uploadError);
        }
      }

      const newOgData = { ...ogData, imageUrl: finalImageUrl };
      
      // localStorage에 저장
      localStorage.setItem('og_settings', JSON.stringify(newOgData));
      setOgData(newOgData);
      setSavedOgData(newOgData);
      setMessage('저장되었습니다! 실제 반영하려면 index.html 재배포가 필요합니다.');
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error('저장 실패:', error);
      setMessage('저장 중 오류가 발생했습니다: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCopyMetaTags = () => {
    const metaTags = generateMetaTags();
    navigator.clipboard.writeText(metaTags).then(() => {
      setMessage('메타태그가 클립보드에 복사되었습니다!');
    });
  };

  const generateMetaTags = () => {
    return `    <!-- Open Graph (Facebook, 카카오톡, 밴드 등) -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${ogData.siteName}" />
    <meta property="og:title" content="${ogData.title}" />
    <meta property="og:description" content="${ogData.description}" />
    <meta property="og:image" content="${ogData.imageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="${ogData.url}" />
    <meta property="og:locale" content="ko_KR" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${ogData.title}" />
    <meta name="twitter:description" content="${ogData.description}" />
    <meta name="twitter:image" content="${ogData.imageUrl}" />`;
  };

  if (!isAuthenticated()) {
    return (
      <BaseLayout title="OG 태그 관리">
        <div className="og-settings-page">
          <p className="og-auth-message">이 페이지는 관리자만 접근할 수 있습니다. 로그인해주세요.</p>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout title="공유 미리보기 관리">
      <div className="og-settings-page">
        {/* 설명 */}
        <section className="og-intro">
          <h2>SNS 공유 미리보기 설정</h2>
          <p>
            카카오톡, Facebook, 밴드 등에서 홈페이지 URL을 공유할 때 보이는
            이미지, 제목, 설명을 관리합니다.
          </p>
        </section>

        {/* 플랫폼별 권장 사양 */}
        <section className="og-specs">
          <h3>플랫폼별 권장 사양</h3>
          <div className="og-specs-grid">
            {PLATFORM_SPECS.map((spec) => (
              <div key={spec.name} className="og-spec-card">
                <div className="og-spec-header">
                  <span className="og-spec-icon">{spec.icon}</span>
                  <span className="og-spec-name">{spec.name}</span>
                </div>
                <div className="og-spec-body">
                  <div className="og-spec-row">
                    <span className="og-spec-label">이미지</span>
                    <span className="og-spec-value">{spec.imageSize}</span>
                  </div>
                  <div className="og-spec-row">
                    <span className="og-spec-label">제목</span>
                    <span className="og-spec-value">{spec.titleLimit}</span>
                  </div>
                  <div className="og-spec-row">
                    <span className="og-spec-label">설명</span>
                    <span className="og-spec-value">{spec.descLimit}</span>
                  </div>
                  <p className="og-spec-note">{spec.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 설정 폼 */}
        <section className="og-form-section">
          <h3>OG 태그 설정</h3>
          <div className="og-form">
            <div className="og-form-group">
              <label>사이트명</label>
              <input
                type="text"
                value={ogData.siteName}
                onChange={(e) => setOgData({ ...ogData, siteName: e.target.value })}
                placeholder="싱스웰 (ThingsWell)"
              />
            </div>

            <div className="og-form-group">
              <label>제목 <span className="og-char-count">({ogData.title.length}자)</span></label>
              <input
                type="text"
                value={ogData.title}
                onChange={(e) => setOgData({ ...ogData, title: e.target.value })}
                placeholder="공유 시 표시될 제목"
                maxLength={70}
              />
            </div>

            <div className="og-form-group">
              <label>설명 <span className="og-char-count">({ogData.description.length}자)</span></label>
              <textarea
                value={ogData.description}
                onChange={(e) => setOgData({ ...ogData, description: e.target.value })}
                placeholder="공유 시 표시될 설명"
                maxLength={200}
                rows={3}
              />
            </div>

            <div className="og-form-group">
              <label>대표 이미지 URL</label>
              <input
                type="text"
                value={ogData.imageUrl}
                onChange={(e) => setOgData({ ...ogData, imageUrl: e.target.value })}
                placeholder="https://www.safegai.co.kr/og-image.png"
              />
              <div className="og-image-upload">
                <label className="og-upload-btn">
                  이미지 업로드
                  <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                </label>
                <span className="og-upload-hint">권장: 1200 x 630px, 최대 5MB</span>
              </div>
              {(imagePreview || ogData.imageUrl) && (
                <div className="og-image-preview">
                  <img src={imagePreview || ogData.imageUrl} alt="OG 이미지 미리보기" />
                </div>
              )}
            </div>

            <div className="og-form-group">
              <label>URL</label>
              <input
                type="text"
                value={ogData.url}
                onChange={(e) => setOgData({ ...ogData, url: e.target.value })}
                placeholder="https://www.safegai.co.kr"
              />
            </div>

            <div className="og-form-actions">
              <button onClick={handleSave} disabled={saving} className="og-save-btn">
                {saving ? '저장 중...' : '설정 저장'}
              </button>
              <button onClick={handleCopyMetaTags} className="og-copy-btn">
                메타태그 복사
              </button>
            </div>

            {message && <div className="og-message">{message}</div>}
          </div>
        </section>

        {/* 미리보기 */}
        <section className="og-preview-section">
          <h3>공유 미리보기</h3>
          <div className="og-preview-tabs">
            {PLATFORM_SPECS.map((spec) => (
              <button
                key={spec.name}
                className={`og-preview-tab ${previewPlatform === spec.name ? 'active' : ''}`}
                onClick={() => setPreviewPlatform(spec.name)}
              >
                {spec.icon} {spec.name}
              </button>
            ))}
          </div>

          <div className="og-preview-container">
            {previewPlatform === '카카오톡' && (
              <div className="og-preview-kakao">
                <div className="og-preview-kakao-card">
                  <div className="og-preview-kakao-image">
                    <img src={imagePreview || ogData.imageUrl} alt="미리보기" />
                  </div>
                  <div className="og-preview-kakao-content">
                    <p className="og-preview-kakao-title">{ogData.title.slice(0, 35)}</p>
                    <p className="og-preview-kakao-desc">{ogData.description.slice(0, 55)}</p>
                    <p className="og-preview-kakao-url">{ogData.url.replace('https://', '')}</p>
                  </div>
                </div>
              </div>
            )}

            {previewPlatform === 'Facebook' && (
              <div className="og-preview-facebook">
                <div className="og-preview-fb-card">
                  <div className="og-preview-fb-image">
                    <img src={imagePreview || ogData.imageUrl} alt="미리보기" />
                  </div>
                  <div className="og-preview-fb-content">
                    <p className="og-preview-fb-domain">{ogData.url.replace('https://', '').split('/')[0]}</p>
                    <p className="og-preview-fb-title">{ogData.title.slice(0, 60)}</p>
                    <p className="og-preview-fb-desc">{ogData.description.slice(0, 155)}</p>
                  </div>
                </div>
              </div>
            )}

            {previewPlatform === 'Twitter' && (
              <div className="og-preview-twitter">
                <div className="og-preview-tw-card">
                  <div className="og-preview-tw-image">
                    <img src={imagePreview || ogData.imageUrl} alt="미리보기" />
                  </div>
                  <div className="og-preview-tw-content">
                    <p className="og-preview-tw-title">{ogData.title.slice(0, 70)}</p>
                    <p className="og-preview-tw-desc">{ogData.description.slice(0, 200)}</p>
                    <p className="og-preview-tw-url">{ogData.url.replace('https://', '')}</p>
                  </div>
                </div>
              </div>
            )}

            {previewPlatform === '네이버 밴드' && (
              <div className="og-preview-band">
                <div className="og-preview-band-card">
                  <div className="og-preview-band-image">
                    <img src={imagePreview || ogData.imageUrl} alt="미리보기" />
                  </div>
                  <div className="og-preview-band-content">
                    <p className="og-preview-band-title">{ogData.title.slice(0, 40)}</p>
                    <p className="og-preview-band-desc">{ogData.description.slice(0, 80)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 생성된 메타태그 */}
        <section className="og-code-section">
          <h3>생성된 메타태그</h3>
          <pre className="og-code-block">
            {generateMetaTags()}
          </pre>
        </section>
      </div>
    </BaseLayout>
  );
}
