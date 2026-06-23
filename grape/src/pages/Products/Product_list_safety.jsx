import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import welding from '../../assets/welding.jpg';
import grinding from '../../assets/grinding.jpg';
import construction from '../../assets/construction.jpg';
import ProductList from './ProductList';
import main1 from '../../assets/product_safety/main.jpg';
import main2 from '../../assets/main_3.png';
import main3 from '../../assets/product_twedg_04/main.png';
import safetyHeaderImage from '../../assets/header_image/product.jpg';
import { getProducts, createProduct, updateProduct, deleteProduct, toggleProductActive } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

import { checkTableExists, checkUserAuthStatus } from '../../utils/supabaseRLS';
import { deleteAllPostFiles } from '../../utils/imageUpload';
import ProductPage from '../../components/ProductPage/ProductPage';
import RecordEditor from '../../components/RecordEditor';


export default function ProductListSafetyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [editingExistingRecord, setEditingExistingRecord] = useState(null);
  const [newRecord, setNewRecord] = useState({
    title: '',
    desc: '',
    overview_title: '',
    date: '',
    orderer: '',
    type: '',
    kind: '스마트안전',
    images: []
  });
  const [submitting, setSubmitting] = useState(false);
  
  const { user, isAuthenticated, canEditContent } = useAuth();

  useEffect(() => {
    fetchProducts();
    checkUserAuthStatus();
  }, []);

  // URL 파라미터 확인하여 상세 모드 설정
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const detailId = searchParams.get('detail');
    
    if (detailId) {
      const record = products.find(p => p.rawData && p.rawData.id === parseInt(detailId));
      if (record) {
        setSelectedRecord(record.rawData);
        setViewMode('detail');
      }
    } else {
      setViewMode('list');
      setSelectedRecord(null);
    }
  }, [location.search, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data, error } = await getProducts({ kind: '스마트안전', order: 'date', ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      const formattedProducts = (data || []).map(product => {
        let imageUrl = null;
        if (product.images) {
          try {
            const images = JSON.parse(product.images);
            if (images && images.length > 0 && images[0]) {
              imageUrl = images[0];
            }
          } catch (error) {
            console.error('이미지 파싱 오류:', error);
          }
        }
        
        return {
          name: product.title,
          title: product.overview_title || product.desc,
          img: imageUrl,
          onClick: () => handleRecordClick(product),
          category: product.type,
          organization: product.orderer,
          date: product.date,
          rawData: product
        };
      });

      setProducts(formattedProducts);
    } catch (err) {
      console.error('Product 데이터를 가져오는 중 오류 발생:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecord = async (formData) => {
    const { isAuthenticated } = await checkUserAuthStatus();
    if (!isAuthenticated) {
      alert('제품을 추가하려면 로그인이 필요합니다.');
      return;
    }
    
    if (editingExistingRecord) {
      try {
        setSubmitting(true);
        
        const { data, error } = await updateProduct(editingExistingRecord.id, {
          title: formData.title,
          desc: formData.desc,
          overview_title: formData.overview_title,
          date: formData.date,
          orderer: formData.orderer,
          type: formData.type,
          kind: formData.kind,
          images: formData.images && formData.images.length > 0 ? JSON.stringify(formData.images) : null,
          keyFeatures: formData.keyFeatures ? JSON.stringify(formData.keyFeatures) : null,
          specifications: formData.specifications && formData.specifications.length > 0 ? JSON.stringify(formData.specifications) : null,
          certifications: formData.certifications && formData.certifications.length > 0 ? JSON.stringify(formData.certifications) : null,
          downloads: formData.downloads && formData.downloads.length > 0 ? JSON.stringify(formData.downloads) : null,
          videos: formData.videos && formData.videos.length > 0 ? JSON.stringify(formData.videos) : null
        });

        if (error) {
          throw new Error(error.message);
        }

        alert('제품이 성공적으로 수정되었습니다!');
        setShowAddModal(false);
        setEditingExistingRecord(null);
        setNewRecord({ title: '', desc: '', overview_title: '', date: '', orderer: '', type: '', kind: '스마트안전', images: [] });
        fetchProducts();
        
      } catch (error) {
        console.error('제품 수정 중 오류 발생:', error);
        alert('제품 수정 중 오류가 발생했습니다: ' + error.message);
      } finally {
        setSubmitting(false);
      }
    } else {
      if (!formData.title || !formData.overview_title || !formData.desc || !formData.date || !formData.orderer || !formData.type || !formData.kind) {
        alert('모든 필드를 입력해주세요.');
        return;
      }

      try {
        setSubmitting(true);
        
        const { data, error } = await createProduct({
          title: formData.title,
          desc: formData.desc,
          overview_title: formData.overview_title,
          date: formData.date,
          orderer: formData.orderer,
          type: formData.type,
          kind: formData.kind,
          images: formData.images && formData.images.length > 0 ? JSON.stringify(formData.images) : null,
          keyFeatures: formData.keyFeatures ? JSON.stringify(formData.keyFeatures) : null,
          specifications: formData.specifications && formData.specifications.length > 0 ? JSON.stringify(formData.specifications) : null,
          certifications: formData.certifications && formData.certifications.length > 0 ? JSON.stringify(formData.certifications) : null,
          downloads: formData.downloads && formData.downloads.length > 0 ? JSON.stringify(formData.downloads) : null,
          videos: formData.videos && formData.videos.length > 0 ? JSON.stringify(formData.videos) : null
        });

        if (error) {
          throw new Error(error.message);
        }

        alert('제품이 성공적으로 추가되었습니다!');
        setShowAddModal(false);
        setNewRecord({ title: '', desc: '', overview_title: '', date: '', orderer: '', type: '', kind: '스마트안전장비', images: [] });
        fetchProducts();
        
      } catch (error) {
        console.error('제품 추가 중 오류 발생:', error);
        alert('제품 추가 중 오류가 발생했습니다: ' + error.message);
      } finally {
        setSubmitting(false);
      }
    }
  };



  const handleRecordClick = (record) => {
    const currentSearch = new URLSearchParams(location.search);
    currentSearch.set('detail', record.id);
    navigate(`${location.pathname}?${currentSearch.toString()}`, { replace: false });
  };

  const handleBackToList = () => {
    const currentSearch = new URLSearchParams(location.search);
    currentSearch.delete('detail');
    navigate(`${location.pathname}?${currentSearch.toString()}`, { replace: false });
  };

  const handleEditRecord = async (record) => {
    const { isAuthenticated } = await checkUserAuthStatus();
    if (!isAuthenticated) {
      alert('제품을 편집하려면 로그인이 필요합니다.');
      return;
    }
    
    setEditingExistingRecord(record);
    setShowAddModal(true);
  };

  const handleDeleteRecord = async (record) => {
    const { isAuthenticated } = await checkUserAuthStatus();
    if (!isAuthenticated) {
      alert('제품을 삭제하려면 로그인이 필요합니다.');
      return;
    }

    if (!window.confirm('이 제품을 삭제하시겠습니까?\n\n⚠️ 주의: 관련된 모든 이미지와 파일도 함께 삭제됩니다.')) return;

    try {
      // 1. 먼저 관련된 모든 이미지와 파일 삭제 (실패해도 계속 진행)
      try {
        await deleteAllPostFiles(record, 'Product');
        console.log('파일 삭제 완료');
      } catch (fileError) {
        console.error('파일 삭제 중 오류 (데이터베이스 삭제는 계속 진행):', fileError);
      }
      
      // 2. 데이터베이스에서 레코드 삭제
      const { error } = await deleteProduct(record.id);
      if (error) throw new Error(error.message);
      
      alert('제품이 삭제되었습니다.');
      fetchProducts();
    } catch (err) {
      console.error('삭제 중 오류 발생:', err);
      alert('삭제 중 오류가 발생했습니다: ' + err.message);
    }
  };

  const handleToggleActive = async (record, newActiveStatus) => {
    try {
      const { isAuthenticated } = await checkUserAuthStatus();
      if (!isAuthenticated) {
        alert('활성화 상태를 변경하려면 로그인이 필요합니다.');
        return;
      }

      const { error } = await toggleProductActive(record.id, newActiveStatus);

      if (error) {
        console.error('활성화 상태 변경 오류:', error);
        alert('활성화 상태 변경 중 오류가 발생했습니다: ' + error.message);
        return;
      }

      console.log('활성화 상태 변경 성공:', { id: record.id, is_active: newActiveStatus });
      alert(`제품이 ${newActiveStatus ? '활성화' : '비활성화'}되었습니다.`);
      
      fetchProducts();
      
    } catch (error) {
      console.error('활성화 상태 변경 중 오류 발생:', error);
      alert('활성화 상태 변경 중 오류가 발생했습니다: ' + error.message);
    }
  };

  if (loading) {
    return <div>데이터를 불러오는 중...</div>;
  }

  if (error) {
    return <div>오류가 발생했습니다: {error}</div>;
  }

  if (viewMode === 'detail' && selectedRecord) {
    return (
      <div>
        <div>
          <ProductPage
            productData={{
              name: selectedRecord.title || '제목 없음',
              title: selectedRecord.overview_title || selectedRecord.desc || '개요 없음',
              overview_title: selectedRecord.overview_title || selectedRecord.desc || '개요 없음',
              overview: selectedRecord.overview || selectedRecord.desc || '내용 없음',
              images: selectedRecord.images ? JSON.parse(selectedRecord.images) : [],
              keyFeatures: selectedRecord.keyFeatures ? JSON.parse(selectedRecord.keyFeatures).features.filter(f => f.trim() !== '') : [],
              keyFeaturesImages: selectedRecord.keyFeatures ? JSON.parse(selectedRecord.keyFeatures).images || [] : [],
              specifications: selectedRecord.specifications ? JSON.parse(selectedRecord.specifications) : [],
              certifications: selectedRecord.certifications ? JSON.parse(selectedRecord.certifications) : [],
              downloads: selectedRecord.downloads ? JSON.parse(selectedRecord.downloads) : [],
              videos: selectedRecord.videos ? JSON.parse(selectedRecord.videos) : [],
              breadcrumbs: ["Home", "제품", selectedRecord.kind || '스마트안전', selectedRecord.title || '제목 없음']
            }}
            isRecordPage={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      {showAddModal && (
        <RecordEditor
          isModal={true}
          mode="product"
          tableName="Product"
          editData={editingExistingRecord}
          submitting={submitting}
          onSave={handleAddRecord}
          onCancel={() => {
            setShowAddModal(false);
            setEditingExistingRecord(null);
          }}
        />
      )}

      <ProductList
        products={products}
        title="스마트안전"
        // subtitle="스마트 안전장비 제품들을 확인하세요"
        breadcrumbs={["Home", "제품", "스마트안전"]}
        longVertical
        headerImage={safetyHeaderImage}
        onEditRecord={handleEditRecord}
        canEdit={canEditContent()}
        canDelete={canEditContent()}
        onDeleteRecord={handleDeleteRecord}
        onToggleActive={handleToggleActive}
        hideSearchAndView={false}
        hideViewToggle={true}
        addButton={canEditContent() && (
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              padding: 'var(--spacing-sm) var(--spacing-md)',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              outline: 'none',
              borderRadius: 'var(--border-radius-md)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer',
              transition: 'background-color var(--transition-slow)',
              whiteSpace: 'nowrap',
              height: '40px',
              minWidth: '80px',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#0056b3';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--color-primary)';
            }}
          >
            + 제품 추가
          </button>
        )}
      />
    </div>
  );
}
