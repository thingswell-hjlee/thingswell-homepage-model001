import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import '../Government_support/Government_support.css';

const RAGLLMTech = () => {
  return (
    <div className="ftd-page">
      <ProductHeader />
      <div className="ftd-container">
        <h2 className="ftd-title">RAG 기반 LLM 기술</h2>

        <section className="ftd-section">
          <h3><span className="num">1</span> 개요</h3>
          <p className="ftd-text">
            당사는 산업 현장의 복잡한 위험 상황을 실시간으로 이해하고 대응할 수 있도록, RAG(Retrieve-Augment-Generate) 기반 LLM(대형 언어 모델) 기술을 활용한
            대화형 안전 인지 시스템을 제공합니다. 이 솔루션은 상황 인지, 문맥 분석, 지식 검색을 결합하여 지능적인 경고, 보고, 대응 안내를 가능하게 하는 차세대 산업안전 솔루션입니다.
          </p>
        </section>

        <section className="ftd-section">
          <h3><span className="num">2</span> 핵심 기술 구성</h3>
          <div className="ftd-table-wrapper">
            <table className="ftd-table">
              <thead>
                <tr>
                  <th className="col-type">구성 요소</th>
                  <th>설명</th>
                  <th>주요 기능</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="col-type">LLM (Large Language Model)</td>
                  <td>GPT, phi, Llama 계열의 사내 최적화 모델</td>
                  <td>작업자 질의응답 및 위험 상황에 대한 자연어 설명</td>
                </tr>
                <tr>
                  <td className="col-type">RAG (Retrieve-Augment-Generate)</td>
                  <td>온디바이스 벡터 데이터베이스와 문서 검색 기술 기반의 응답 생성</td>
                  <td>현장 지침을 기반으로 한 설명 자동화 및 정확한 정보 제공</td>
                </tr>
                <tr>
                  <td className="col-type">온디바이스 추론</td>
                  <td>NVIDIA Jetson Orin 등 저전력 엣지 장비에서 작동</td>
                  <td>통신이 어려운 환경에서도 독립적으로 LLM 추론 수행</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="ftd-section">
          <h3><span className="num">3</span> 주요 기능 및 서비스 시나리오</h3>
          <ul className="ftd-list">
            <li>
              <strong>위험 상황 실시간 해석 및 안내</strong> — 예: "기계가 이상한 소리를 내요" 입력 시, 문맥 분석을 통해 "모터 과열 가능성이 있습니다. 즉시 전원을 차단하고 관리자를 호출해 주세요."와 같은 지침 제공
            </li>
            <li>
              <strong>현장 맞춤형 음성 안내 시스템</strong> — 레이더/ToF 감지 이벤트와 연동하여 "위험 구역에 접근 중입니다. 왼쪽으로 이동하세요." 등 상황맞춤 음성 경고 실시간 생성
            </li>
            <li>
              <strong>매뉴얼 기반 응급처치 안내</strong> — "사람이 쓰러졌어요"와 같은 긴급 상황에서 지침 매뉴얼을 검색해 단계별 응급조치 안내
            </li>
            <li>
              <strong>상황보고 자동화</strong> — "위험물 누출 발생" 보고를 기반으로, 사전 템플릿에 맞춘 위험 보고서를 자동 생성하여 절차 간소화
            </li>
          </ul>
        </section>

        <section className="ftd-section">
          <h3><span className="num">4</span> 기술적 차별성</h3>
          <div className="ftd-table-wrapper">
            <table className="ftd-table">
              <thead>
                <tr>
                  <th className="col-type">항목</th>
                  <th>자사 기술 (RAG + LLM)</th>
                  <th>기존 기술</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="col-type">질의 대응</td>
                  <td>문맥을 이해하고 지식 기반으로 설명 제공</td>
                  <td>고정 응답 중심으로 유연성 부족</td>
                </tr>
                <tr>
                  <td className="col-type">현장 지식 반영</td>
                  <td>내장 지침서/작업 매뉴얼을 RAG로 활용</td>
                  <td>시스템 외부 지식 의존</td>
                </tr>
                <tr>
                  <td className="col-type">통신 의존성</td>
                  <td>로컬 추론 가능 → 통신 제약 극복</td>
                  <td>클라우드 기반으로 통신 필수</td>
                </tr>
                <tr>
                  <td className="col-type">사용자 인터페이스</td>
                  <td>음성/텍스트 기반의 대화형 상호작용</td>
                  <td>버튼 위주의 제한적 인터페이스</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="ftd-section">
          <h3><span className="num">5</span> 기술 적용 분야</h3>
          <ul className="ftd-list">
            <li>건설 현장: 위험 행동 Q&A, 도급 근로자 안전교육 지원</li>
            <li>제조 공장: 설비 이상 징후 설명, 작업 매뉴얼 질의 대응</li>
            <li>야간 무인 작업장: 위험 탐지 후 상황 해석 및 대응 유도</li>
            <li>공공 시설/지하 공간: 긴급 상황 시 음성 대화로 대응 유도</li>
          </ul>
        </section>

        <section className="ftd-section">
          <h3><span className="num">6</span> 서비스 가능 항목</h3>
          <ul className="ftd-list">
            <li>RAG + LLM 통합 대화형 시스템 커스터마이징</li>
            <li>현장 안전 매뉴얼 기반 벡터 데이터베이스 구축</li>
            <li>Jetson Orin 등 온디바이스에 최적화된 모델 제공</li>
            <li>음성 입출력 UI 및 다국어 대응 시스템 개발</li>
            <li>실증 현장 시나리오 제작 및 POC(개념 증명) 테스트 지원</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default RAGLLMTech;


