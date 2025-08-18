import React from 'react';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import './Soulution.css';
import server from '../../assets/server.jpg';

const MultimodalAwareness = () => {
  return (
    <div className="gs-page">
      <ProductHeader />
      <div className="gs-container">
        <h2 className="gs-title">멀티모달 상황인지 기술</h2>
        <section className="gs-section">
          <h3><span className="num">1</span> 개요</h3>
          <p className="gs-text">
            당사는 산업 현장의 안전을 실시간으로 확보하기 위해 RGB 카메라, Time-of-Flight(ToF) 센서, UWB Radar 센서를 융합한 멀티모달 상황인지 기술을 개발 및 상용화하고 있습니다.
            이 기술은 기존 단일 센서 기반 감지의 한계를 극복하여, 조도 변화, 차폐, 분진 등 다양한 환경에서도 정확한 위험 인지 및 대응을 가능하게 합니다.
          </p>
        </section>

        <section className="gs-section">
          <h3><span className="num">2</span> 핵심 기술 구성</h3>
          <div className="gs-table-wrapper">
            <table className="gs-table">
              <thead>
                <tr>
                  <th className="col-type">기술 구성요소</th>
                  <th>주요 기능</th>
                  <th>활용 목적</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="col-type">RGB 카메라</td>
                  <td>객체 탐지 (YOLOv11), 행동 인식 (MediaPipe 등)</td>
                  <td>작업자 인식, 행위 감시</td>
                </tr>
                <tr>
                  <td className="col-type">ToF(Time-of-Flight) 센서</td>
                  <td>거리/깊이 측정, 영역 내 접근 감지</td>
                  <td>거리 기반 접근 감지, 위험 거리 탐지</td>
                </tr>
                <tr>
                  <td className="col-type">UWB Radar(초광대역)</td>
                  <td>움직임 감지, 방향/속도 추정</td>
                  <td>차폐 환경의 비가시 영역 감지</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="gs-section">
          <h3><span className="num">3</span> 적용 가능한 주요 서비스</h3>
          <ul className="gs-list">
            <li>
              <strong>작업자 행동 감지 및 위험 경고 시스템</strong> — 쓰러짐/추락/과도한 움직임/이상 행동을 자동 감지해 사고를 예방하고,
              감지 즉시 음성·화면·모바일 앱 등 다양한 채널로 경고 알림을 제공합니다.
            </li>
            <li>
              <strong>차량 및 중장비 접근 위험 감지</strong> — Radar 기반으로 방향·접근 속도를 정확히 감지하고,
              작업자의 사각지대 접근 시 즉시 경고를 발생시켜 충돌 사고를 방지합니다.
            </li>
            <li>
              <strong>어두운 환경 및 차폐 구간 감시 강화</strong> — ToF·Radar 융합으로 카메라 한계를 극복하여,
              밀폐 공간/야간/터널 등 낮은 조도 환경에서도 정확한 위험 감지를 수행합니다.
            </li>
            <li>
              <strong>스마트 PPE 연동</strong> — BLE 기반 스마트 PPE와 연동하여 개인별 환경 변화를 모니터링하고,
              유해가스·온도 변화 등 이상 감지 시 즉시 알림을 전송합니다.
            </li>
          </ul>
        </section>

        <section className="gs-section">
          <h3><span className="num">4</span> 기술적 차별성</h3>
          <div className="gs-table-wrapper">
            <table className="gs-table">
              <thead>
                <tr>
                  <th className="col-type">항목</th>
                  <th>자사 기술 (멀티모달 융합)</th>
                  <th>기존 기술 (단일 센서)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="col-type">조도 영향</td>
                  <td>낮음 (Radar/ToF 병용으로 빛에 무관)</td>
                  <td>높음 (RGB 단독 사용 시)</td>
                </tr>
                <tr>
                  <td className="col-type">감지 정확도</td>
                  <td>3개 센서 융합으로 상황별 최적화</td>
                  <td>단일 센서 성능에 따라 제한</td>
                </tr>
                <tr>
                  <td className="col-type">실시간성</td>
                  <td>온디바이스 AI (Jetson Orin 등) 기반</td>
                  <td>클라우드 의존 ↑, 지연 가능</td>
                </tr>
                <tr>
                  <td className="col-type">통신 불가 지역 대응</td>
                  <td>엣지 컴퓨팅 기반 독립 동작</td>
                  <td>통신 장애 시 기능 제한</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MultimodalAwareness;


