import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Monitor, AlertTriangle, Building2, Users,
  Settings, BarChart3, Cog, ChevronRight,
} from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import RiskBadge from '../common/RiskBadge';
import { ADMIN_MENUS, ADMIN_EVENTS, ADMIN_RULES } from '../../data/constants';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Monitor, AlertTriangle, Building2, Users,
  Settings, BarChart3, Cog,
};

export default function AdminDemo() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [rules, setRules] = useState(ADMIN_RULES);
  const [selectedEvent, setSelectedEvent] = useState<typeof ADMIN_EVENTS[0] | null>(null);
  const [eventFilter, setEventFilter] = useState('all');

  const toggleRule = (id: number) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const filteredEvents = eventFilter === 'all'
    ? ADMIN_EVENTS
    : ADMIN_EVENTS.filter(e => e.risk === eventFilter);

  return (
    <SectionWrapper id="admin">
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-cyan-400 text-sm font-medium mb-3 tracking-wider uppercase"
        >
          Admin Control Center
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          관리자 화면
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          여러 현장의 위험 이벤트, 장비 상태, 사용자 조치 이력, 통계, 설정을 통합 관리하고 안전관리 의사결정을 지원합니다.
        </motion.p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {['본사 관리자', '안전관리자', '지자체 담당자', '관제센터 운영자', '시스템 관리자'].map(role => (
            <span key={role} className="text-xs px-3 py-1 rounded-full bg-navy-700/60 border border-navy-600/50 text-gray-400">
              {role}
            </span>
          ))}
        </div>
      </div>

      {/* Admin Interface Demo */}
      <div className="bg-navy-800/40 border border-navy-700/50 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[600px]">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-navy-900/80 border-b md:border-b-0 md:border-r border-navy-700/50 p-4">
            <div className="flex flex-col leading-tight mb-6 px-2">
              <span className="text-xs text-gray-500">Admin</span>
              <span className="text-sm font-bold text-cyan-400">SafeGAI Control</span>
            </div>
            <nav className="space-y-1">
              {ADMIN_MENUS.map((menu) => {
                const Icon = iconMap[menu.icon] || Settings;
                const isActive = activeMenu === menu.id;
                return (
                  <button
                    key={menu.id}
                    onClick={() => setActiveMenu(menu.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all ${
                      isActive
                        ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20'
                        : 'text-gray-400 hover:bg-navy-700/50 hover:text-gray-200'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="truncate">{menu.title}</span>
                    {isActive && <ChevronRight size={14} className="ml-auto" />}
                  </button>
                );
              })}
            </nav>
          </div>


          {/* Main Content */}
          <div className="flex-1 p-6 overflow-auto">
            {/* Dashboard */}
            {activeMenu === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <h3 className="text-lg font-semibold text-white mb-6">통합 대시보드</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                  <DashCard label="전체 현장" value="12" color="text-white" />
                  <DashCard label="정상" value="8" color="text-green-400" />
                  <DashCard label="주의" value="3" color="text-yellow-400" />
                  <DashCard label="위험" value="1" color="text-red-400" />
                  <DashCard label="오늘 이벤트" value="48" color="text-blue-400" />
                  <DashCard label="미조치" value="5" color="text-red-400" />
                </div>
                {/* Mini chart placeholder */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-navy-700/30 border border-navy-600/30 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-3">시간별 이벤트 추이</h4>
                    <div className="flex items-end gap-1 h-24">
                      {[3, 5, 2, 7, 4, 8, 6, 3, 9, 5, 4, 6].map((v, i) => (
                        <div key={i} className="flex-1 bg-cyan-400/30 rounded-t" style={{ height: `${v * 10}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="bg-navy-700/30 border border-navy-600/30 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-3">위험도별 분포</h4>
                    <div className="space-y-2">
                      <ProgressBar label="위험" value={15} max={100} color="bg-red-400" />
                      <ProgressBar label="주의" value={35} max={100} color="bg-yellow-400" />
                      <ProgressBar label="정상" value={50} max={100} color="bg-green-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}


            {/* Real-time Monitoring */}
            {activeMenu === 'monitoring' && (
              <motion.div key="monitoring" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <h3 className="text-lg font-semibold text-white mb-6">실시간 관제</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {['건설현장 A', '공장 B동', '매장 C점', '작업장 D구역'].map((site, i) => (
                    <div key={i} className={`p-3 rounded-xl border ${i === 0 ? 'border-red-400/30 bg-red-400/5' : i === 3 ? 'border-yellow-400/30 bg-yellow-400/5' : 'border-green-400/30 bg-green-400/5'}`}>
                      <div className={`w-2 h-2 rounded-full mb-2 ${i === 0 ? 'bg-red-400 animate-pulse' : i === 3 ? 'bg-yellow-400' : 'bg-green-400'}`} />
                      <p className="text-xs text-gray-300 font-medium">{site}</p>
                      <p className="text-xs text-gray-500 mt-1">{i === 0 ? '위험' : i === 3 ? '주의' : '정상'}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-navy-700/30 border border-navy-600/30 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">최근 이벤트</h4>
                  <div className="space-y-2">
                    {ADMIN_EVENTS.slice(0, 4).map((event, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-navy-700/30">
                        <div className="flex items-center gap-3">
                          <RiskBadge level={event.risk as 'high' | 'medium' | 'low'} />
                          <span className="text-sm text-gray-300">{event.type}</span>
                        </div>
                        <span className="text-xs text-gray-500">{event.site} · {event.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}


            {/* Event Management */}
            {activeMenu === 'events' && (
              <motion.div key="events" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">이벤트 관리</h3>
                  <div className="flex gap-2">
                    {[{ label: '전체', value: 'all' }, { label: '위험', value: 'high' }, { label: '주의', value: 'medium' }, { label: '정상', value: 'low' }].map(f => (
                      <button
                        key={f.value}
                        onClick={() => setEventFilter(f.value)}
                        className={`px-3 py-1 text-xs rounded-lg transition-all ${eventFilter === f.value ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30' : 'bg-navy-700/30 text-gray-400 border border-navy-600/30 hover:text-gray-200'}`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Event Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-navy-700/50">
                        <th className="text-left text-xs font-medium text-gray-500 pb-3 px-2">시간</th>
                        <th className="text-left text-xs font-medium text-gray-500 pb-3 px-2">현장명</th>
                        <th className="text-left text-xs font-medium text-gray-500 pb-3 px-2">이벤트 유형</th>
                        <th className="text-left text-xs font-medium text-gray-500 pb-3 px-2">위험도</th>
                        <th className="text-left text-xs font-medium text-gray-500 pb-3 px-2">처리 상태</th>
                        <th className="text-left text-xs font-medium text-gray-500 pb-3 px-2">담당자</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvents.map((event, i) => (
                        <tr
                          key={i}
                          onClick={() => setSelectedEvent(event)}
                          className="border-b border-navy-700/30 hover:bg-navy-700/20 cursor-pointer transition-colors"
                        >
                          <td className="py-3 px-2 text-sm text-gray-400">{event.time}</td>
                          <td className="py-3 px-2 text-sm text-gray-300">{event.site}</td>
                          <td className="py-3 px-2 text-sm text-gray-300">{event.type}</td>
                          <td className="py-3 px-2"><RiskBadge level={event.risk as 'high' | 'medium' | 'low'} /></td>
                          <td className="py-3 px-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${event.status === '미조치' ? 'bg-red-500/10 text-red-400' : event.status === '조치중' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-green-500/10 text-green-400'}`}>
                              {event.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-400">{event.assignee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Event Detail Panel */}
                {selectedEvent && (
                  <div className="mt-4 p-4 bg-navy-700/30 border border-navy-600/30 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-white">이벤트 상세</h4>
                      <button onClick={() => setSelectedEvent(null)} className="text-xs text-gray-500 hover:text-gray-300">닫기</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <DetailItem label="현장" value={selectedEvent.site} />
                      <DetailItem label="유형" value={selectedEvent.type} />
                      <DetailItem label="담당자" value={selectedEvent.assignee} />
                      <DetailItem label="상태" value={selectedEvent.status} />
                    </div>
                    <div className="mt-3 pt-3 border-t border-navy-600/30">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div><span className="text-gray-500">Edge Gateway:</span> <span className="text-green-400 ml-1">Online</span></div>
                        <div><span className="text-gray-500">AI CCTV:</span> <span className="text-green-400 ml-1">4/4 Online</span></div>
                        <div><span className="text-gray-500">IoT Sensor:</span> <span className="text-yellow-400 ml-1">12/13 Online</span></div>
                        <div><span className="text-gray-500">AWS Sync:</span> <span className="text-green-400 ml-1">Connected</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}


            {/* Site Management */}
            {activeMenu === 'sites' && (
              <motion.div key="sites" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <h3 className="text-lg font-semibold text-white mb-6">현장 관리</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: '건설현장 A', cameras: '4/4', sensors: '8/8', gateway: 'Online', aws: 'Connected', status: 'danger' },
                    { name: '공장 B동', cameras: '6/6', sensors: '12/12', gateway: 'Online', aws: 'Connected', status: 'normal' },
                    { name: '매장 C점', cameras: '2/2', sensors: '4/4', gateway: 'Online', aws: 'Connected', status: 'normal' },
                    { name: '작업장 D구역', cameras: '3/4', sensors: '10/13', gateway: 'Online', aws: 'Syncing', status: 'warning' },
                  ].map((site, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${site.status === 'danger' ? 'border-red-400/30 bg-red-400/5' : site.status === 'warning' ? 'border-yellow-400/30 bg-yellow-400/5' : 'border-navy-600/30 bg-navy-700/20'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-white">{site.name}</h4>
                        <div className={`w-2 h-2 rounded-full ${site.status === 'danger' ? 'bg-red-400 animate-pulse' : site.status === 'warning' ? 'bg-yellow-400' : 'bg-green-400'}`} />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><span className="text-gray-500">Camera:</span> <span className="text-gray-300 ml-1">{site.cameras}</span></div>
                        <div><span className="text-gray-500">Sensor:</span> <span className="text-gray-300 ml-1">{site.sensors}</span></div>
                        <div><span className="text-gray-500">Gateway:</span> <span className="text-green-400 ml-1">{site.gateway}</span></div>
                        <div><span className="text-gray-500">AWS:</span> <span className={`ml-1 ${site.aws === 'Connected' ? 'text-green-400' : 'text-yellow-400'}`}>{site.aws}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}


            {/* User Management */}
            {activeMenu === 'users' && (
              <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <h3 className="text-lg font-semibold text-white mb-6">사용자 관리</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-navy-700/50">
                        <th className="text-left text-xs font-medium text-gray-500 pb-3 px-2">이름</th>
                        <th className="text-left text-xs font-medium text-gray-500 pb-3 px-2">역할</th>
                        <th className="text-left text-xs font-medium text-gray-500 pb-3 px-2">담당 구역</th>
                        <th className="text-left text-xs font-medium text-gray-500 pb-3 px-2">알림 수신</th>
                        <th className="text-left text-xs font-medium text-gray-500 pb-3 px-2">상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: '김안전', role: '안전관리자', zone: '건설현장 A', notify: true, active: true },
                        { name: '박관리', role: '현장 운영자', zone: '공장 B동', notify: true, active: true },
                        { name: '이담당', role: '매장 관리자', zone: '매장 C점', notify: true, active: true },
                        { name: '최운영', role: '시설 담당자', zone: '작업장 D구역', notify: false, active: false },
                      ].map((user, i) => (
                        <tr key={i} className="border-b border-navy-700/30">
                          <td className="py-3 px-2 text-sm text-gray-300">{user.name}</td>
                          <td className="py-3 px-2 text-sm text-gray-400">{user.role}</td>
                          <td className="py-3 px-2 text-sm text-gray-400">{user.zone}</td>
                          <td className="py-3 px-2">
                            <span className={`text-xs ${user.notify ? 'text-green-400' : 'text-gray-500'}`}>
                              {user.notify ? 'ON' : 'OFF'}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${user.active ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-500'}`}>
                              {user.active ? '활성' : '비활성'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}


            {/* Rule Engine */}
            {activeMenu === 'rules' && (
              <motion.div key="rules" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <h3 className="text-lg font-semibold text-white mb-6">룰 엔진 설정</h3>
                <div className="space-y-3">
                  {rules.map(rule => (
                    <div key={rule.id} className="flex items-center justify-between p-4 bg-navy-700/30 border border-navy-600/30 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-gray-200">{rule.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{rule.description}</p>
                      </div>
                      <button
                        onClick={() => toggleRule(rule.id)}
                        className={`relative w-12 h-6 rounded-full transition-all ${rule.enabled ? 'bg-cyan-400' : 'bg-navy-600'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${rule.enabled ? 'left-7' : 'left-1'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}


            {/* Reports */}
            {activeMenu === 'reports' && (
              <motion.div key="reports" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <h3 className="text-lg font-semibold text-white mb-6">리포트 / 분석</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <DashCard label="일간 이벤트" value="48" color="text-blue-400" />
                  <DashCard label="조치 완료율" value="89%" color="text-green-400" />
                  <DashCard label="반복 위험" value="3건" color="text-yellow-400" />
                  <DashCard label="평균 대응시간" value="4.2분" color="text-cyan-400" />
                </div>
                <div className="bg-navy-700/30 border border-navy-600/30 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-4">주간 위험 발생 추이</h4>
                  <div className="flex items-end gap-2 h-32">
                    {[12, 8, 15, 9, 22, 18, 14].map((v, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-gradient-to-t from-cyan-500/40 to-blue-500/20 rounded-t" style={{ height: `${(v / 22) * 100}%` }} />
                        <span className="text-xs text-gray-500">{'월화수목금토일'[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* System Settings */}
            {activeMenu === 'system' && (
              <motion.div key="system" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <h3 className="text-lg font-semibold text-white mb-6">시스템 설정</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: '장비 등록', count: '24개 장비', status: 'normal' },
                    { label: '센서 등록', count: '37개 센서', status: 'normal' },
                    { label: '카메라 연동', count: '16/16 Online', status: 'normal' },
                    { label: '클라우드 연동', count: 'AWS Connected', status: 'normal' },
                    { label: '알림 채널', count: '3개 채널 활성', status: 'normal' },
                    { label: '백업 상태', count: '마지막: 1시간 전', status: 'warning' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-navy-700/30 border border-navy-600/30 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-gray-200">{item.label}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.count}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${item.status === 'normal' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}


function DashCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="p-3 bg-navy-700/30 border border-navy-600/30 rounded-xl text-center">
      <p className={`text-xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function ProgressBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 w-8">{label}</span>
      <div className="flex-1 h-2 bg-navy-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${(value / max) * 100}%` }} />
      </div>
      <span className="text-xs text-gray-400 w-8">{value}%</span>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm text-gray-300 font-medium">{value}</p>
    </div>
  );
}
