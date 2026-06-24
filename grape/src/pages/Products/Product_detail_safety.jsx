import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ProductPage from '../../components/ProductPage/ProductPage';
import useTranslation from '../../hooks/useTranslation';
import { getProductById } from '../../lib/api';

export default function Product_detail_safety() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data, error } = await getProductById(id);

        if (error) {
          setError(error.message || '제품을 불러오는 중 오류가 발생했습니다.');
          return;
        }

        if (!data) {
          setError('해당 제품을 찾을 수 없습니다.');
          return;
        }

        setProduct(data);
      } catch (err) {
        console.error(err);
        setError(err.message || '알 수 없는 오류가 발생했습니다.');
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
            onClick={() => navigate(`/${currentLang}/products/safety`)}
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
    name: product.title || '제목 없음',
    title: product.overview_title || product.desc || '개요 없음',
    overview_title: product.overview_title || product.desc || '개요 없음',
    overview: product.overview || product.desc || '내용 없음',
    images,
    keyFeatures,
    keyFeaturesImages,
    specifications,
    certifications,
    downloads,
    videos,
    breadcrumbs: ['Home', '제품', product.kind || '스마트안전', product.title || '제목 없음']
  };

  return (
    <div>
      <ProductPage productData={productData} isRecordPage={false} />
    </div>
  );
}
