import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ProductPage from '../../components/ProductPage/ProductPage';
import useTranslation from '../../hooks/useTranslation';
import { getTrackRecordById } from '../../lib/api';

// TODO: 제품/사례 데이터의 완전한 영문 지원은 API 데이터에 ko/en 필드 분리 또는 language 컬럼 추가 필요.

export default function Case_detail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data, error } = await getTrackRecordById(id);

        if (error) {
          setError(error.message || t('casePage.loadError'));
          return;
        }

        if (!data) {
          setError(t('casePage.notFound'));
          return;
        }

        setProduct(data);
      } catch (err) {
        console.error(err);
        setError(err.message || t('casePage.unknownError'));
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh', padding: '2rem' }}>
      <div style={{ textAlign: 'center', color: '#666' }}>
        <div style={{ fontSize: '1.1rem' }}>{t('common.loading')}</div>
      </div>
    </div>
  );

  if (error) {
    const currentLang = location.pathname.startsWith('/en') ? 'en' : 'ko';
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh', padding: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ fontSize: '1.1rem', color: '#d32f2f', marginBottom: '1rem' }}>{t('common.error')}: {error}</div>
          <button
            onClick={() => navigate(`/${currentLang}/cases`)}
            style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            {t('common.back')}
          </button>
        </div>
      </div>
    );
  }

  // 안전하게 JSON 파싱
  const images = product.images ? (() => { try { return JSON.parse(product.images); } catch { return []; } })() : [];
  const keyFeaturesObj = product.keyFeatures ? (() => { try { return JSON.parse(product.keyFeatures); } catch { return {}; } })() : {};
  const keyFeatures = keyFeaturesObj.features || [];
  const keyFeaturesImages = keyFeaturesObj.images || [];
  const specifications = product.specifications ? (() => { try { return JSON.parse(product.specifications); } catch { return []; } })() : [];
  const certifications = product.certifications ? (() => { try { return JSON.parse(product.certifications); } catch { return []; } })() : [];
  const downloads = product.downloads ? (() => { try { return JSON.parse(product.downloads); } catch { return []; } })() : [];
  const videos = product.videos ? (() => { try { return JSON.parse(product.videos); } catch { return []; } })() : [];

  const productData = {
    name: product.title || t('casePage.noTitle'),
    title: product.overview_title || product.desc || t('casePage.noOverview'),
    overview_title: product.overview_title || product.desc || t('casePage.noOverview'),
    overview: product.overview || product.desc || t('casePage.noContent'),
    images,
    keyFeatures,
    keyFeaturesImages,
    specifications,
    certifications,
    downloads,
    videos,
    breadcrumbs: ['Home', t('casePage.cases'), product.kind, product.title || t('casePage.detail')]
  };

  return (
    <div>
      <ProductPage productData={productData} isRecordPage={true} />
    </div>
  );
}
