export const NAV_LINKS = [
  { label: 'Platform', href: '#platform' },
  { label: 'User', href: '#user' },
  { label: 'Admin', href: '#admin' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Technology', href: '#technology' },
  { label: 'Contact', href: '#contact' },
];

export const USER_MENUS = [
  {
    id: 'safety-status',
    title: '오늘의 안전 상태',
    titleEn: 'Today\'s Safety Status',
    icon: 'Shield',
    items: ['현재 현장 안전 등급', '위험 이벤트 발생 수', '미조치 알림 수', '장비 연결 상태'],
  },
  {
    id: 'realtime-alerts',
    title: '실시간 알림',
    titleEn: 'Real-time Alerts',
    icon: 'Bell',
    items: ['위험구역 진입', '쓰러짐 감지', '장시간 체류', '설비 이상', '화재·온도·환경 이상', '안전조치 미이행'],
  },
  {
    id: 'my-workspace',
    title: '내 작업장 보기',
    titleEn: 'My Workspace',
    icon: 'MapPin',
    items: ['담당 구역', '카메라 상태', '센서 상태', '출입 상태', '최근 이벤트'],
  },
  {
    id: 'action-request',
    title: '조치 요청 / 확인',
    titleEn: 'Action Request',
    icon: 'CheckCircle',
    items: ['알림 확인', '조치 완료', '관리자 보고', '사진 또는 메모 등록'],
  },
  {
    id: 'safety-guide',
    title: '안전 가이드',
    titleEn: 'Safety Guide',
    icon: 'BookOpen',
    items: ['위험 상황별 대응 가이드', '작업 전 체크리스트', '안전수칙', '비상 연락 안내'],
  },
  {
    id: 'alert-history',
    title: '내 알림 이력',
    titleEn: 'Alert History',
    icon: 'Clock',
    items: ['받은 알림', '확인한 알림', '조치 완료 이력', '미조치 이력'],
  },
];

export const ADMIN_MENUS = [
  {
    id: 'dashboard',
    title: '통합 대시보드',
    titleEn: 'Integrated Dashboard',
    icon: 'LayoutDashboard',
  },
  {
    id: 'monitoring',
    title: '실시간 관제',
    titleEn: 'Real-time Monitoring',
    icon: 'Monitor',
  },
  {
    id: 'events',
    title: '이벤트 관리',
    titleEn: 'Event Management',
    icon: 'AlertTriangle',
  },
  {
    id: 'sites',
    title: '현장 관리',
    titleEn: 'Site Management',
    icon: 'Building2',
  },
  {
    id: 'users',
    title: '사용자 관리',
    titleEn: 'User Management',
    icon: 'Users',
  },
  {
    id: 'rules',
    title: '룰 엔진 설정',
    titleEn: 'Rule Engine',
    icon: 'Settings',
  },
  {
    id: 'reports',
    title: '리포트 / 분석',
    titleEn: 'Reports & Analytics',
    icon: 'BarChart3',
  },
  {
    id: 'system',
    title: '시스템 설정',
    titleEn: 'System Settings',
    icon: 'Cog',
  },
];

export const ADMIN_EVENTS = [
  { time: '14:32', site: '건설현장 A', type: '위험구역 진입', risk: 'high', status: '미조치', assignee: '김안전' },
  { time: '14:28', site: '공장 B동', type: '쓰러짐 감지', risk: 'high', status: '조치중', assignee: '박관리' },
  { time: '14:15', site: '매장 C점', type: '장시간 체류', risk: 'medium', status: '처리완료', assignee: '이담당' },
  { time: '13:58', site: '작업장 D구역', type: '설비 이상', risk: 'medium', status: '처리완료', assignee: '최운영' },
  { time: '13:42', site: '건설현장 A', type: '안전장비 미착용', risk: 'low', status: '처리완료', assignee: '김안전' },
  { time: '13:30', site: '공장 B동', type: '환경센서 이상', risk: 'medium', status: '처리완료', assignee: '박관리' },
  { time: '13:15', site: '매장 C점', type: '출입 감지', risk: 'low', status: '처리완료', assignee: '이담당' },
  { time: '12:58', site: '작업장 D구역', type: '화재 감지', risk: 'high', status: '조치중', assignee: '최운영' },
];

export const ADMIN_RULES = [
  { id: 1, name: '위험구역 진입 감지', description: '설정된 위험구역 경계 초과 시 알림', enabled: true },
  { id: 2, name: '체류시간 초과 감지', description: '동일 구역 30분 이상 체류 시 알림', enabled: true },
  { id: 3, name: '쓰러짐 감지', description: 'AI 영상분석 기반 넘어짐 이벤트 감지', enabled: true },
  { id: 4, name: '안전장비 미착용', description: '헬멧, 안전조끼 미착용 감지', enabled: false },
  { id: 5, name: '야간 출입 감지', description: '업무시간 외 출입 감지 시 알림', enabled: true },
  { id: 6, name: '환경센서 임계값 초과', description: '온도, 습도, 가스 기준치 초과 시 알림', enabled: true },
];

export const CORE_FEATURES = [
  {
    title: '위험 이벤트 감지',
    titleEn: 'Risk Event Detection',
    description: 'AI CCTV와 센서를 통해 위험구역 진입, 쓰러짐, 배회, 장시간 체류, 미조치 상태 등을 감지합니다.',
    icon: 'Scan',
  },
  {
    title: '역할별 화면 제공',
    titleEn: 'Role-Based Interface',
    description: '현장 사용자와 관리자에게 필요한 기능을 구분하여 제공합니다.',
    icon: 'Users',
  },
  {
    title: '엣지 AI 처리',
    titleEn: 'Edge AI Processing',
    description: 'NVIDIA Jetson 기반 현장 게이트웨이에서 데이터를 빠르게 처리합니다.',
    icon: 'Cpu',
  },
  {
    title: '룰 엔진 기반 대응',
    titleEn: 'Rule Engine Response',
    description: '현장별 안전 기준에 따라 알림, 경고, 장비 제어, 관제 연동을 자동화합니다.',
    icon: 'Workflow',
  },
  {
    title: 'AWS 클라우드 연동',
    titleEn: 'AWS Cloud Integration',
    description: '데이터 저장, 원격 모니터링, 서비스 확장, 운영 이력 관리를 지원합니다.',
    icon: 'Cloud',
  },
  {
    title: '리포트 / 분석 지원',
    titleEn: 'Reports & Analytics',
    description: '위험 이벤트, 조치 이력, 반복 위험행동, 현장별 위험도를 분석합니다.',
    icon: 'BarChart3',
  },
];

export const COMPARISON_DATA = [
  {
    category: '사용 목적',
    user: '현장 알림 확인과 조치 중심',
    admin: '통합 관제, 분석, 설정, 이력 관리 중심',
  },
  {
    category: '주요 화면',
    user: '오늘의 안전 상태, 실시간 알림, 조치 요청, 안전 가이드',
    admin: '통합 대시보드, 이벤트 관리, 현장 관리, 룰 엔진, 리포트',
  },
  {
    category: '주요 기능',
    user: '알림 확인, 조치 완료, 가이드 확인, 현장 상태 확인',
    admin: '이벤트 분석, 사용자 권한 관리, 장비 관리, 룰 설정, 보고서 생성',
  },
  {
    category: '최적 디바이스',
    user: '모바일, 태블릿',
    admin: 'PC, 대형 모니터, 관제 화면',
  },
  {
    category: '핵심 가치',
    user: '빠른 대응',
    admin: '전체 상황 판단과 운영 최적화',
  },
];

export const USER_ALERTS = [
  {
    id: 1,
    type: '위험구역 진입 감지',
    location: '작업장 A구역',
    risk: 'high' as const,
    time: '2분 전',
    resolved: false,
  },
  {
    id: 2,
    type: '장시간 체류 감지',
    location: '창고 B구역',
    risk: 'medium' as const,
    time: '8분 전',
    resolved: false,
  },
  {
    id: 3,
    type: '환경센서 이상',
    location: '생산동 2층',
    risk: 'medium' as const,
    time: '15분 전',
    resolved: true,
  },
  {
    id: 4,
    type: '쓰러짐 감지',
    location: '외부 작업장',
    risk: 'high' as const,
    time: '22분 전',
    resolved: true,
  },
  {
    id: 5,
    type: '출입 감지',
    location: '정문 출입구',
    risk: 'low' as const,
    time: '35분 전',
    resolved: true,
  },
];
