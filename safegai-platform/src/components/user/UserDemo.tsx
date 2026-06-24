import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Bell, MapPin, CheckCircle, BookOpen, Clock, X, Check,
} from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import RiskBadge from '../common/RiskBadge';
import { USER_MENUS, USER_ALERTS } from '../../data/constants';

const iconMap: Record<string, React.ElementType> = {
  Shield, Bell, MapPin, CheckCircle, BookOpen, Clock,
};

export default function UserDemo() {
  const [alerts, setAlerts] = useState(USER_ALERTS);
  const [selectedAlert, setSelectedAlert] = useState<typeof USER_ALERTS[0] | null>(null);
  const [activeMenu, setActiveMenu] = useState('safety-status');

  const handleResolve = (id: number) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
    setSelectedAlert(null);
  };

  const unresolvedCount = alerts.filter(a => !a.resolved).length;
  const totalEvents = alerts.length;

  return (
    <SectionWrapper id="user" dark>
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-cyan-400 text-sm font-medium mb-3 tracking-wider uppercase"
        >
          Field User Interface
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          사용자 화면
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          현장 사용자가 복잡한 설정 없이 현재 위험 상태, 알림, 조치 요청, 작업 현황을 빠르게 확인하고 대응할 수 있습니다.
        </motion.p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {['현장 작업자', '안전요원', '매장 관리자', '시설 담당자', '현장 운영자'].map(role => (
            <span key={role} className="text-xs px-3 py-1 rounded-full bg-navy-700/60 border border-navy-600/50 text-gray-400">
              {role}
            </span>
          ))}
        </div>
      </div>

      {/* User Interface Demo */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Menu */}
        <div className="lg:col-span-1">
          <div className="bg-navy-800/60 backdrop-blur-sm border border-navy-700/50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 px-2">사용자 메뉴</h3>
            <nav className="space-y-1">
              {USER_MENUS.map((menu) => {
                const Icon = iconMap[menu.icon] || Shield;
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
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Right: Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Status Cards */}
          {activeMenu === 'safety-status' && (
            <motion.div
              key="safety-status"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <StatusCard
                  label="현재 상태"
                  value="주의"
                  color="text-yellow-400"
                  bg="bg-yellow-400/10"
                  border="border-yellow-400/20"
                />
                <StatusCard
                  label="발생 이벤트"
                  value={`${totalEvents}건`}
                  color="text-blue-400"
                  bg="bg-blue-400/10"
                  border="border-blue-400/20"
                />
                <StatusCard
                  label="미조치 알림"
                  value={`${unresolvedCount}건`}
                  color="text-red-400"
                  bg="bg-red-400/10"
                  border="border-red-400/20"
                />
                <StatusCard
                  label="장비 연결"
                  value="정상"
                  color="text-green-400"
                  bg="bg-green-400/10"
                  border="border-green-400/20"
                />
              </div>

              {/* Safety Level Indicator */}
              <div className="bg-navy-800/60 border border-navy-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold">현장 안전 등급</h4>
                  <RiskBadge level="medium" size="md" />
                </div>
                <div className="w-full h-3 bg-navy-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '65%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-yellow-500 rounded-full"
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>정상</span>
                  <span>주의</span>
                  <span>위험</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Realtime Alerts */}
          {activeMenu === 'realtime-alerts' && (
            <motion.div
              key="realtime-alerts"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <h4 className="text-white font-semibold mb-4">실시간 위험 알림</h4>
              {alerts.map(alert => (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert)}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    alert.resolved
                      ? 'bg-navy-800/40 border-navy-700/30 opacity-60'
                      : 'bg-navy-800/60 border-navy-700/50 hover:border-cyan-400/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      alert.risk === 'high' ? 'bg-red-400 animate-pulse' : alert.risk === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-200">{alert.type}</p>
                      <p className="text-xs text-gray-500">{alert.location} · {alert.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <RiskBadge level={alert.risk} />
                    {alert.resolved && (
                      <span className="text-xs text-green-400 flex items-center gap-1">
                        <Check size={12} /> 처리완료
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* My Workspace */}
          {activeMenu === 'my-workspace' && (
            <motion.div
              key="my-workspace"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-white font-semibold mb-4">내 작업장 현황</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <WorkspaceCard title="담당 구역" value="A구역 · B구역" status="active" />
                <WorkspaceCard title="카메라 상태" value="4/4 Online" status="active" />
                <WorkspaceCard title="센서 상태" value="12/13 Online" status="warning" />
                <WorkspaceCard title="출입 상태" value="정상 운영중" status="active" />
              </div>
              <div className="mt-6 bg-navy-800/60 border border-navy-700/50 rounded-xl p-4">
                <h5 className="text-sm font-medium text-gray-300 mb-3">최근 이벤트</h5>
                <div className="space-y-2">
                  {alerts.slice(0, 3).map(a => (
                    <div key={a.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{a.type}</span>
                      <span className="text-gray-500 text-xs">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Request */}
          {activeMenu === 'action-request' && (
            <motion.div
              key="action-request"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-white font-semibold mb-4">조치 요청 / 확인</h4>
              <div className="space-y-3">
                {alerts.filter(a => !a.resolved).map(alert => (
                  <div key={alert.id} className="flex items-center justify-between p-4 bg-navy-800/60 border border-navy-700/50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-gray-200">{alert.type}</p>
                      <p className="text-xs text-gray-500">{alert.location}</p>
                    </div>
                    <button
                      onClick={() => handleResolve(alert.id)}
                      className="px-4 py-2 bg-cyan-500/20 text-cyan-400 text-sm font-medium rounded-lg border border-cyan-400/30 hover:bg-cyan-500/30 transition-all"
                    >
                      조치 완료
                    </button>
                  </div>
                ))}
                {alerts.filter(a => !a.resolved).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="mx-auto mb-2 text-green-400" size={32} />
                    <p className="text-sm">모든 알림이 처리되었습니다.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Safety Guide */}
          {activeMenu === 'safety-guide' && (
            <motion.div
              key="safety-guide"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-white font-semibold mb-4">안전 가이드</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: '고소작업 안전 체크리스트', items: 5 },
                  { title: '사다리 작업 안전수칙', items: 8 },
                  { title: '비상상황 대응 절차', items: 6 },
                  { title: '위험물 취급 가이드', items: 4 },
                ].map((guide, i) => (
                  <div key={i} className="p-4 bg-navy-800/60 border border-navy-700/50 rounded-xl hover:border-cyan-400/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen size={16} className="text-cyan-400" />
                      <span className="text-sm font-medium text-gray-200">{guide.title}</span>
                    </div>
                    <p className="text-xs text-gray-500">{guide.items}개 항목</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Alert History */}
          {activeMenu === 'alert-history' && (
            <motion.div
              key="alert-history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-white font-semibold mb-4">내 알림 이력</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <MiniStat label="받은 알림" value={totalEvents.toString()} />
                <MiniStat label="확인한 알림" value={alerts.filter(a => a.resolved).length.toString()} />
                <MiniStat label="조치 완료" value={alerts.filter(a => a.resolved).length.toString()} />
                <MiniStat label="미조치" value={unresolvedCount.toString()} />
              </div>
              <div className="space-y-2">
                {alerts.map(a => (
                  <div key={a.id} className="flex items-center justify-between p-3 bg-navy-800/40 border border-navy-700/30 rounded-lg text-sm">
                    <span className="text-gray-300">{a.type}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-xs">{a.time}</span>
                      {a.resolved ? (
                        <span className="text-xs text-green-400">완료</span>
                      ) : (
                        <span className="text-xs text-red-400">미조치</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Alert Detail Modal */}
      <AnimatePresence>
        {selectedAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAlert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-navy-800 border border-navy-700/50 rounded-2xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">알림 상세</h3>
                <button onClick={() => setSelectedAlert(null)} className="p-1 hover:bg-navy-700 rounded-lg transition-colors">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">이벤트 유형</p>
                  <p className="text-sm text-white font-medium">{selectedAlert.type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">발생 위치</p>
                  <p className="text-sm text-white">{selectedAlert.location}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">위험도</p>
                    <RiskBadge level={selectedAlert.risk} size="md" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">발생 시간</p>
                    <p className="text-sm text-gray-300">{selectedAlert.time}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">처리 상태</p>
                  <p className={`text-sm font-medium ${selectedAlert.resolved ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedAlert.resolved ? '처리 완료' : '미조치'}
                  </p>
                </div>
              </div>

              {!selectedAlert.resolved && (
                <button
                  onClick={() => handleResolve(selectedAlert.id)}
                  className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all"
                >
                  조치 완료
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}

function StatusCard({ label, value, color, bg, border }: { label: string; value: string; color: string; bg: string; border: string }) {
  return (
    <div className={`p-4 rounded-xl ${bg} border ${border}`}>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function WorkspaceCard({ title, value, status }: { title: string; value: string; status: 'active' | 'warning' | 'error' }) {
  const dot = status === 'active' ? 'bg-green-400' : status === 'warning' ? 'bg-yellow-400' : 'bg-red-400';
  return (
    <div className="p-4 bg-navy-800/60 border border-navy-700/50 rounded-xl">
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-2 h-2 rounded-full ${dot}`} />
        <span className="text-xs text-gray-500">{title}</span>
      </div>
      <p className="text-sm font-medium text-gray-200">{value}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-navy-800/40 border border-navy-700/30 rounded-lg text-center">
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}
