import { motion } from 'framer-motion';
import SectionWrapper from '../common/SectionWrapper';
import { COMPARISON_DATA } from '../../data/constants';

export default function ComparisonTable() {
  return (
    <SectionWrapper dark>
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-cyan-400 text-sm font-medium mb-3 tracking-wider uppercase"
        >
          Role Comparison
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white"
        >
          User Mode vs Admin Mode
        </motion.h2>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-navy-700/50">
              <th className="text-left text-sm font-medium text-gray-500 pb-4 px-4 w-1/5">비교 항목</th>
              <th className="text-left text-sm font-medium text-cyan-400 pb-4 px-4 w-2/5">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-400/30 border border-cyan-400" />
                  사용자 모드
                </span>
              </th>
              <th className="text-left text-sm font-medium text-blue-400 pb-4 px-4 w-2/5">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-400/30 border border-blue-400" />
                  관리자 모드
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_DATA.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-navy-700/30"
              >
                <td className="py-4 px-4 text-sm font-medium text-gray-300">{row.category}</td>
                <td className="py-4 px-4 text-sm text-gray-400">{row.user}</td>
                <td className="py-4 px-4 text-sm text-gray-400">{row.admin}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {COMPARISON_DATA.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bg-navy-800/50 border border-navy-700/50 rounded-xl p-4"
          >
            <p className="text-sm font-semibold text-white mb-3">{row.category}</p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <p className="text-sm text-gray-400">{row.user}</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <p className="text-sm text-gray-400">{row.admin}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
