import React from 'react';
import { Link } from 'react-router-dom';
import ProductHeader from '../../components/ProductPage/ProductHeader';
import './Government_support.css';
import ProductInfo from '../../components/ProductPage/ProductInfo';
import government from '../../assets/header_image/government_support.png';
import BaseLayout from '../../components/Layout/BaseLayout';

const Government_support = () => {
  return (
    <div className="gs-page">
      <ProductHeader image={government} alt="government" />
      <BaseLayout>
        <div className="container">
          <ProductInfo productName="스마트안전장비 지원사업 (산업안전보건공단)" productTitle="스마트안전장비 지원사업 (산업안전보건공단)" breadcrumbs={["Home", "정부지원사업", "스마트안전장비 지원사업"]} />
        </div>
        <div className="gs-container">
          <section className="gs-section">
            <h3><span className="num">1</span> 개요</h3>
            <p className="gs-text">
              산업변화와 기술발전에 따른 다양한 산업재해를 예방하기 위해 재정 및 기술여건이 취약한 중소사업장의 스마트 안전장비 도입에 보조금을 지원하는 사업입니다.
              AI, IoT, 영상분석 등 디지털 기술을 활용하여 현장의 위험요인을 실시간 감지하고 안전사고를 사전에 차단합니다.
            </p>
          </section>

          <section className="gs-section">
            <h3><span className="num">2</span> 대상</h3>
            <ul className="gs-list">
              <li>상시근로자 수 50명 미만 사업장의 사업주 (건설업의 경우 현장 제외, 본사 신청 가능)</li>
              <li>중소기업기본법상 소기업 규모 기준 이하 기업의 사업주 (중소기업확인서 제출)</li>
              <li>산업안전보건법 시행령 별표 21에 따른 설비를 보유하거나 임대업을 영위하는 사업장</li>
            </ul>
          </section>

          <section className="gs-section">
            <h3><span className="num">3</span> 지원조건</h3>
            <ul className="gs-list">
              <li>보조금은 선정·계약·설치·검수 절차를 거쳐 지급됩니다.</li>
              <li>동일 설비의 타 보조금 중복 지원은 제한됩니다.</li>
              <li>세부 지원비율과 한도는 공단 공고 기준을 따릅니다.</li>
            </ul>
          </section>

          <section className="gs-section">
            <h3><span className="num">4</span> 지원품목 · 지원한도 · 지원범위</h3>
            <div className="gs-table-wrapper">
              <table className="gs-table">
                <thead>
                  <tr>
                    <th className="col-type">구분</th>
                    <th>취급항목</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="col-type">안전 (30종)</td>
                    <td>
                      지게차·중장비 인명감지 시스템, 이동체 근접경보, 충돌방지 솔루션, 위험구역 접근 통제, 추락·끼임 방지장치,
                      영상기반 작업자 보호(PPE 착용 여부 확인), 안전난간/안전문, 컨베이어 안전장치, 가시설 및 보행자 보호설비 등
                    </td>
                  </tr>
                  <tr>
                    <td className="col-type">보건 (7종)</td>
                    <td>
                      스마트 소음·분진·유해가스 측정기, 환기·집진 시스템 보강, 근골격계 부담작업 보조기구, 국소배기장치 개선 등
                    </td>
                  </tr>
                  <tr>
                    <td className="col-type">기타</td>
                    <td>
                      세부 품목, 지원한도 및 자부담 비율은 연도별 공단 공고 기준을 따르며, 사전 진단 및 현장 여건에 따라 조정될 수 있습니다.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="gs-section">
            <h3><span className="num">5</span> 사업진행과정</h3>
            <div className="gs-steps">
              <div className="gs-step">
                <div className="gs-step-title">보조금 신청</div>
                <div className="gs-step-desc">사업 공고 확인 · 온라인 접수</div>
              </div>
              <div className="gs-step">
                <div className="gs-step-title">자격요건 확인</div>
                <div className="gs-step-desc">서류 검토 · 현장진단</div>
              </div>
              <div className="gs-step">
                <div className="gs-step-title">지원대상 선정</div>
                <div className="gs-step-desc">심사 · 결과 통보</div>
              </div>
              <div className="gs-step">
                <div className="gs-step-title">계약/설치</div>
                <div className="gs-step-desc">장비 계약 · 설치/구축</div>
              </div>
              <div className="gs-step">
                <div className="gs-step-title">검수/정산</div>
                <div className="gs-step-desc">설치 확인 · 서류 제출</div>
              </div>
              <div className="gs-step">
                <div className="gs-step-title">보조금 지급</div>
                <div className="gs-step-desc">최종 검토 후 지급</div>
              </div>
            </div>
          </section>

          <div className="gs-cta">
            <Link className="gs-button" to="/contact">문의하기</Link>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default Government_support;