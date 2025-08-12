import React from 'react';
import { Link } from 'react-router-dom';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import './ForwardThreatDetection.css';

const ForwardThreatDetection = () => {
  return (
    <div className="ftd-page">
      <ProductHeader />
      <div className="ftd-container">
        <h2 className="ftd-title">전방 위협 요소 감지</h2>

        <section className="ftd-section">
          <h3><span className="num">1</span> 개요</h3>
          <p className="ftd-text">
            산업 현장의 차량·중장비·로봇 등과 작업자 사이에서 발생 가능한 충돌·끼임·낙하 등의 위험을 카메라와 IoT 센서,
            LVM/LLM 기반 분석으로 실시간 감지합니다. 위험도에 따라 단계별 경보를 제공하고, 음성 안내/웨어러블/앱으로 즉시 알림을 전달합니다.
          </p>
        </section>

        <section className="ftd-section">
          <h3><span className="num">2</span> 대상</h3>
          <ul className="ftd-list">
            <li>제조, 물류, 건설, 플랜트, 광산 등 이동체와 작업자가 혼재하는 공정</li>
            <li>지게차·크레인·굴삭기·컨베이어·AGV/AMR 운영 라인</li>
            <li>인체·차량·장비 간 근접/충돌 위험을 선제적으로 관리해야 하는 사업장</li>
          </ul>
        </section>

        <section className="ftd-section">
          <h3><span className="num">3</span> 주요 기능</h3>
          <ul className="ftd-list">
            <li>객체/인원/차량 인식 및 구역(안전/위험) 준수 감시</li>
            <li>상대 거리·속도 추정을 통한 근접/충돌 위험 예측 및 단계별 경보</li>
            <li>PPE(안전모·조끼 등) 착용 여부 확인, 위험 행동 탐지</li>
            <li>RAG 기반 규정 설명과 조치 가이드 자동 생성(음성/문자)</li>
            <li>이벤트 로그·영상 스냅샷 저장 및 리포트 출력</li>
          </ul>
        </section>

        <section className="ftd-section">
          <h3><span className="num">4</span> 기능구성 · 세부항목</h3>
          <div className="ftd-table-wrapper">
            <table className="ftd-table">
              <thead>
                <tr>
                  <th className="col-type">구분</th>
                  <th>세부 항목</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="col-type">감지</td>
                  <td>
                    객체/인원/차량 식별, 구역 준수 감지, 근접/충돌 위험도 산정, 위험 행동(난입·역주행·무단 통행) 탐지, PPE 착용 확인, 정지선 위반, 속도 위반
                  </td>
                </tr>
                <tr>
                  <td className="col-type">경보</td>
                  <td>
                    경고등/사이렌/스피커 방송, 웨어러블/모바일 푸시, 단계형(주의/경고/위험) 알림, 지연 시간 및 민감도 현장 맞춤 설정
                  </td>
                </tr>
                <tr>
                  <td className="col-type">관리</td>
                  <td>
                    이벤트 로그 및 스냅샷 저장, 대시보드 모니터링, 리포트 자동 생성, 이력 기반 위험 구역/시간대 분석, 장비·카메라 원격 점검
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ForwardThreatDetection;


