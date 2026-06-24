export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-navy-700/50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex flex-col leading-tight mb-4">
              <span className="text-sm text-gray-400 font-medium">Thingswell</span>
              <span className="text-lg font-bold text-cyan-400">SafeGAI Platform</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Physical AI Smart Safety Platform<br />
              현장의 위험을 데이터로 연결하고,<br />
              엣지 AI와 생성형 AI로 안전 의사결정을 고도화합니다.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#platform" className="hover:text-cyan-400 transition-colors">Platform Overview</a></li>
              <li><a href="#user" className="hover:text-cyan-400 transition-colors">User Interface</a></li>
              <li><a href="#admin" className="hover:text-cyan-400 transition-colors">Admin Control</a></li>
              <li><a href="#architecture" className="hover:text-cyan-400 transition-colors">Architecture</a></li>
              <li><a href="#technology" className="hover:text-cyan-400 transition-colors">Technology</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>(주)싱스웰 / Thingswell</li>
              <li>Physical AI Smart Safety Platform</li>
              <li>
                <a href="https://safegai.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  safegai.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © 2025 (주)싱스웰 Thingswell. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-cyan-400/30 bg-navy-800/50 text-xs text-cyan-400">
              safegai.com
            </span>
            <span className="text-xs text-gray-500">공식 플랫폼</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
