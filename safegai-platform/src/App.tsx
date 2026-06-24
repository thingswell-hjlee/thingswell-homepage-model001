import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import PlatformOverview from './components/sections/PlatformOverview';
import RoleIntro from './components/sections/RoleIntro';
import UserDemo from './components/user/UserDemo';
import AdminDemo from './components/admin/AdminDemo';
import ComparisonTable from './components/sections/ComparisonTable';
import Architecture from './components/sections/Architecture';
import CoreFeatures from './components/sections/CoreFeatures';
import Contact from './components/sections/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-navy-900 text-gray-100">
      <Header />
      <main>
        <HeroSection />
        <PlatformOverview />
        <RoleIntro />
        <UserDemo />
        <AdminDemo />
        <ComparisonTable />
        <Architecture />
        <CoreFeatures />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
