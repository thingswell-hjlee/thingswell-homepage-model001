import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';

export default function Contact() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    interest: '',
    demo: '전체 플랫폼',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const openModal = () => {
    setSubmitted(false);
    setModalOpen(true);
  };

  return (
    <SectionWrapper id="contact">
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-cyan-400 text-sm font-medium mb-3 tracking-wider uppercase"
        >
          Contact Us
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-6"
        >
          SafeGAI Platform 도입 상담
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          SafeGAI Platform은 현장 사용자와 관리자를 위한 역할 기반 스마트 안전 운영 화면을 제공합니다.
          공공안전, 건설안전, 산업안전, 장애인 작업장 안전, 스마트상점 안전관리에 맞춰 구성할 수 있습니다.
        </motion.p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={openModal}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20"
        >
          사용자 화면 데모 요청
        </button>
        <button
          onClick={openModal}
          className="px-6 py-3 bg-navy-700/80 border border-navy-600 text-gray-200 font-medium rounded-lg hover:border-cyan-400/50 hover:text-cyan-400 transition-all"
        >
          관리자 화면 데모 요청
        </button>
        <button
          onClick={openModal}
          className="px-6 py-3 bg-transparent border border-gray-600 text-gray-400 font-medium rounded-lg hover:border-gray-400 hover:text-gray-200 transition-all"
        >
          플랫폼 구축 상담
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-navy-800 border border-navy-700/50 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">플랫폼 문의</h3>
                <button onClick={() => setModalOpen(false)} className="p-1 hover:bg-navy-700 rounded-lg transition-colors">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <FormField label="이름" value={formData.name} onChange={v => setFormData(p => ({ ...p, name: v }))} required />
                  <FormField label="회사명" value={formData.company} onChange={v => setFormData(p => ({ ...p, company: v }))} />
                  <FormField label="연락처" value={formData.phone} onChange={v => setFormData(p => ({ ...p, phone: v }))} />
                  <FormField label="이메일" value={formData.email} onChange={v => setFormData(p => ({ ...p, email: v }))} type="email" required />
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">관심 분야</label>
                    <select
                      value={formData.interest}
                      onChange={e => setFormData(p => ({ ...p, interest: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-navy-700/50 border border-navy-600/50 rounded-lg text-sm text-gray-200 focus:border-cyan-400/50 focus:outline-none"
                    >
                      <option value="">선택해주세요</option>
                      <option value="public">공공안전</option>
                      <option value="construction">건설안전</option>
                      <option value="industrial">산업안전</option>
                      <option value="disability">장애인 작업장 안전</option>
                      <option value="store">스마트상점 안전</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">요청 데모</label>
                    <div className="flex gap-3">
                      {['사용자 화면', '관리자 화면', '전체 플랫폼'].map(opt => (
                        <label key={opt} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                          <input
                            type="radio"
                            name="demo"
                            checked={formData.demo === opt}
                            onChange={() => setFormData(p => ({ ...p, demo: opt }))}
                            className="accent-cyan-400"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">문의 내용</label>
                    <textarea
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-2.5 bg-navy-700/50 border border-navy-600/50 rounded-lg text-sm text-gray-200 focus:border-cyan-400/50 focus:outline-none resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all"
                  >
                    문의 접수
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">문의가 접수되었습니다</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    데모 문의가 접수된 것처럼 표시되는 프론트엔드 화면입니다.<br />
                    실제 전송 기능은 추후 백엔드 또는 이메일 시스템과 연동할 수 있습니다.
                  </p>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="mt-6 px-6 py-2 bg-navy-700 text-gray-300 rounded-lg hover:bg-navy-600 transition-colors"
                  >
                    닫기
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}

function FormField({ label, value, onChange, type = 'text', required = false }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm text-gray-400 mb-1 block">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-2.5 bg-navy-700/50 border border-navy-600/50 rounded-lg text-sm text-gray-200 focus:border-cyan-400/50 focus:outline-none"
      />
    </div>
  );
}
