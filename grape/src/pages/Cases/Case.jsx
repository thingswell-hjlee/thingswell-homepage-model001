import React, { useState, useEffect } from 'react';
import welding from '../../assets/welding.jpg';
import ProductList from '../Products/ProductList';
import main from '../../assets/case_bus_seoul/main_4.jpg';
import headerImage from '../../assets/header_image/performance.jpg';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import ProductPage from '../../components/ProductPage/ProductPage';
import { setupTrackRecordRLS, createTrackRecordPolicies, checkUserAuthStatus, checkAndCreateMissingPolicies } from '../../utils/supabaseRLS';
import RecordEditor from '../../components/RecordEditor';

/**
 * TrackRecordPage 컴포넌트
 * 
 * 실적 데이터를 표시하고 관리하는 공통 컴포넌트입니다.
 * kindFilter prop을 통해 특정 카테고리의 실적만 필터링할 수 있습니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.kindFilter - 필터링할 실적 카테고리 (예: "스마트안전", "정보통신", "통합제어")
 * 
 * 사용법:
 * <TrackRecordPage kindFilter="스마트안전" />
 * <TrackRecordPage kindFilter="정보통신" />
 * <TrackRecordPage kindFilter="통합제어" />
 * <TrackRecordPage /> // 모든 실적 표시
 */

export default function TrackRecordPage({ kindFilter = null }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' 또는 'detail'
  const [editingExistingRecord, setEditingExistingRecord] = useState(null);
  const [newRecord, setNewRecord] = useState({
    title: '',
    overview_title: '',
    desc: '',
    date: '',
    orderer: '',
    type: '',
    kind: '',
    images: []
  });
  const [submitting, setSubmitting] = useState(false);
  
  const { user, isAuthenticated, canEditContent } = useAuth();

  // kindFilter에 따른 제목과 설명 매핑
  const getPageInfo = (kind) => {
    const pageInfoMap = {
      '정보통신': {
        title: '정보통신 실적',
        subtitle: '정보통신 시스템 구축 실적들을 확인하세요'
      },
      '통합제어': {
        title: '통합제어 실적',
        subtitle: '통합제어 시스템 구축 실적들을 확인하세요'
      },
      '스마트안전': {
        title: '스마트안전 실적',
        subtitle: '스마트안전 솔루션 실적들을 확인하세요'
      },
      'AI': {
        title: 'AI 실적',
        subtitle: 'AI 관련 실적들을 확인하세요'
      }
    };
    
    return pageInfoMap[kind] || {
      title: '실적',
      subtitle: '실적들을 확인하세요'
    };
  };

  useEffect(() => {
    fetchTrackRecords();
    // RLS 정책 및 인증 상태 확인
    setupTrackRecordRLS();
    checkUserAuthStatus();
    checkAndCreateMissingPolicies();
  }, []);

  const fetchTrackRecords = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('Track_record')
        .select('*')
        .order('date', { ascending: false });
      
      // kindFilter가 있으면 해당 kind만 필터링
      if (kindFilter) {
        query = query.eq('kind', kindFilter);
      }
      
      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // 원시 데이터 확인을 위한 로깅
      console.log('Track_record 원시 데이터:', data);

      // 데이터를 ProductList 컴포넌트에서 사용하는 형식으로 변환
      const formattedProducts = data.map(record => {
        // 이미지 URL 처리
        let imageUrl = null; // 기본값을 null로 설정
        if (record.images) {
          try {
            const images = JSON.parse(record.images);
            if (images && images.length > 0 && images[0]) {
              imageUrl = images[0]; // 첫 번째 이미지 사용
            }
          } catch (error) {
            console.error('이미지 파싱 오류:', error);
          }
        }
        
        return {
          name: record.title,
          title: record.overview_title || record.desc,
          img: imageUrl,
          onClick: () => handleRecordClick(record),
          category: record.type,
          organization: record.orderer,
          date: record.date,
          rawData: record, // 원본 데이터 보존
          hasImage: !!imageUrl // 이미지 유무 플래그 추가
        };
      });

      setProducts(formattedProducts);
    } catch (err) {
      console.error('Track_record 데이터를 가져오는 중 오류 발생:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecord = async (formData) => {
    // 인증 상태 확인
    const { isAuthenticated } = await checkUserAuthStatus();
    if (!isAuthenticated) {
      alert('실적을 추가하려면 로그인이 필요합니다.');
      return;
    }
    
    // 편집 모드인지 확인
    if (editingExistingRecord) {
      // 편집 모드: 기존 레코드 업데이트
      try {
        setSubmitting(true);
        
        const { data, error } = await supabase
          .from('Track_record')
          .update({
            title: formData.title,
            desc: formData.desc,
            overview_title: formData.overview_title,
            date: formData.date,
            orderer: formData.orderer,
            type: formData.type,
            kind: formData.kind,
            images: formData.images && formData.images.length > 0 ? JSON.stringify(formData.images) : null
          })
          .eq('id', editingExistingRecord.id)
          .select();

        if (error) {
          console.error('Supabase 오류 상세:', error);
          
          if (error.message.includes('row-level security policy')) {
            console.log('RLS 정책이 필요합니다. 다음 정책을 Supabase 대시보드에서 실행하세요:');
            createTrackRecordPolicies();
            alert('보안 정책 설정이 필요합니다. 개발자에게 문의하세요.');
          } else {
            throw error;
          }
          return;
        }

        console.log('실적 수정 성공:', data);
        alert('실적이 성공적으로 수정되었습니다!');
        
        // 모달 닫기 및 데이터 초기화
        setShowAddModal(false);
        setEditingExistingRecord(null);
        setNewRecord({ title: '', overview_title: '', desc: '', date: '', orderer: '', type: '', kind: '', images: [] });
        
        // 실적 목록 새로고침
        fetchTrackRecords();
        
      } catch (error) {
        console.error('실적 수정 중 오류 발생:', error);
        alert('실적 수정 중 오류가 발생했습니다: ' + error.message);
      } finally {
        setSubmitting(false);
      }
    } else {
      // 추가 모드: 새 레코드 추가
      // 기본 정보 검증
      if (!formData.title || !formData.overview_title || !formData.desc || !formData.date || !formData.orderer || !formData.type || !formData.kind) {
        alert('모든 필드를 입력해주세요.');
        return;
      }

      try {
        setSubmitting(true);
        
        // 데이터베이스에 저장
        const { data, error } = await supabase
          .from('Track_record')
          .insert({
            title: formData.title,
            desc: formData.desc,
            overview_title: formData.overview_title,
            date: formData.date,
            orderer: formData.orderer,
            type: formData.type,
            kind: formData.kind,
            images: formData.images && formData.images.length > 0 ? JSON.stringify(formData.images) : null
          })
          .select();

        if (error) {
          console.error('Supabase 오류 상세:', error);
          
          // RLS 오류인 경우 정책 생성 안내
          if (error.message.includes('row-level security policy')) {
            console.log('RLS 정책이 필요합니다. 다음 정책을 Supabase 대시보드에서 실행하세요:');
            createTrackRecordPolicies();
            alert('보안 정책 설정이 필요합니다. 개발자에게 문의하세요.');
          } else {
            throw error;
          }
          return;
        }

        console.log('실적 추가 성공:', data);
        alert('실적이 성공적으로 추가되었습니다!');
        
        // 모달 닫기 및 데이터 초기화
        setShowAddModal(false);
        setNewRecord({ title: '', overview_title: '', desc: '', date: '', orderer: '', type: '', kind: '', images: [] });
        
        // 실적 목록 새로고침
        fetchTrackRecords();
        
      } catch (error) {
        console.error('실적 추가 중 오류 발생:', error);
        alert('실적 추가 중 오류가 발생했습니다: ' + error.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    // 목록 페이지로 돌아가기
    setViewMode('list');
    setSelectedRecord(null);
  };

  const handleEditRecord = async (record) => {
    // 인증 상태 확인
    const { isAuthenticated } = await checkUserAuthStatus();
    if (!isAuthenticated) {
      alert('실적을 편집하려면 로그인이 필요합니다.');
      return;
    }
    
    // 편집 모드로 설정
    setEditingExistingRecord(record);
    setShowAddModal(true);
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
              breadcrumbs: ["Home", "실적", selectedRecord.kind || "상세"]
            }}
            isRecordPage={true}
          />
        </div>
      </div>
    );
  }

  // 목록 보기 모드
  return (
    <div>
      {/* 추가 모달 */}
      {showAddModal && (
        <RecordEditor
          isModal={true}
          mode="record"
          tableName="Track_record"
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
        title={getPageInfo(kindFilter).title}
        subtitle={getPageInfo(kindFilter).subtitle}
        breadcrumbs={["Home", "Cases"]}
        longVertical
        headerImage={headerImage}
        onEditRecord={handleEditRecord}
        canEdit={canEditContent()}
        hideToolbar={false}
        hideSearchAndView={true}
        itemsPerPage={9999}
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
            + 실적 추가
          </button>
        )}
      />
    </div>
  );
}
