import React from 'react';
import SolutionDetailPage from './SolutionDetailPage';
import welding from '../../assets/welding.jpg';
import falldown from '../../assets/falldown.jpg';
import fire from '../../assets/fire.jpg';
import Collision from '../../assets/collision.jpg';
import Collapse from '../../assets/collapse.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import construction from '../../assets/construction.jpg';
import grinding from '../../assets/grinding.jpg';
import server from '../../assets/server.jpg';

const Soulution = () => {
  // 데이터
  const solutionData = {
    subtitle: "Industrial safety solutions",
    title: "제조 안전 솔루션",
    description: "RAG 기반의 대규모 비전 모델(LVM), 대규모 언어 모델(LLM), 실시간 센싱 시스템의 멀티모달 데이터를 통합한 작업자 안전 솔루션",
  };

  const applicationCardsData = [
    {
      image: Collision,
      imageAlt: "전방 위협 요소 감지",
      label: "Forward threat detection",
      title: "전방 위협 요소 감지"
    },
    {
      image: fire,
      imageAlt: "후방 위협 요소 감지",
      label: "Backward threat detection",
      title: "후방 위협 요소 감지"
    },
    {
      image: server,
      imageAlt: "작업자 알람 및 AI 음성 대화",
      label: "Worker alert and AI voice conversation",
      title: "작업자 알람 및 AI 음성 대화"
    },
    {
      image: server,
      imageAlt: "원격관리시스템",
      label: "Remote management system",
      title: "원격 관리 시스템"
    },
  ];

  const featureDescriptions = [
    {
      image: manufacturing,
      title: "RAG 기반 멀티모달 데이터 통합 처리",
      description: "RAG 기반의 대규모 비전 모델(LVM), 대규모 언어 모델(LLM), 실시간 센싱 시스템의 멀티모달 데이터를 통합하여 작업자 안전 솔루션을 구축합니다.",
      subtitle: "Real-time monitoring"
    },
    {
      image: welding,
      title: "IoT 센서 기술 활용",
      description: "IoT 센서와 영상 분석 기술을 활용하여 작업자의 안전을 최우선으로 보호합니다. 다양한 센서를 통해 환경 데이터를 수집하고, 실시간으로 위험 상황을 감지하여 즉시 대응할 수 있습니다.",
      subtitle: "Real-time monitoring"
    },
    {
      image: fire,
      title: "빅데이터 분석 시스템",
      description: "빅데이터 분석을 통한 사고 예방 시스템을 구축합니다. 과거 사고 데이터와 현재 상황을 비교 분석하여 위험도를 예측하고, 사전 예방 조치를 제안합니다.",
      subtitle: "Real-time monitoring"
    },
    {
      youtubeUrl: "https://www.youtube.com/watch?v=gZ1h4kgTC28&ab_channel=intenseye",
      title: "실시간 안전 모니터링 데모",
      description: "실제 산업 현장에서 적용되는 AI 기반 안전 모니터링 시스템의 데모 영상입니다. 실시간으로 작업자의 행동을 분석하고 위험 상황을 감지하는 과정을 확인할 수 있습니다.",
      subtitle: "Real-time monitoring"
    }
  ];

  const formData = { title: '문의하기', subtitle: '궁금한 점이 있으시면 언제든 문의해주세요' };

  const applicationCardsData2 = [
    {
      image: manufacturing,
      imageAlt: "제조업 공장",
      label: "Manufacturing",
      title: "제조업 공장"
    },
    {
      image: construction,
      imageAlt: "건설 현장",
      label: "Construction",
      title: "건설 현장"
    },
    {
      image: grinding,
      imageAlt: "위험작업 현장",
      label: "Dangerous Work",
      title: "위험작업 현장"
    }
  ];

  const blocks = [
    { type: 'applicationCards', data: applicationCardsData2, props: { boxName: '적용분야', subtitle: 'Application field' } },
    { type: 'applicationCards', data: applicationCardsData, props: { boxName: '작업자 안전 보호', subtitle: 'Worker safety protection' } },
    { type: 'features', data: featureDescriptions },
  ];

  return (
    <SolutionDetailPage
      solutionData={solutionData}
      solutionVariant="default"
      blocks={blocks}
      formData={formData}
    />
  );
};

export default Soulution; 