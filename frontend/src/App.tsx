import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Plans from './pages/Plans';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ClientLogin from './pages/ClientLogin';
import ClientPortal from './pages/ClientPortal';
import WhyInvest from './pages/WhyInvest';
import MarketAnalysis from './pages/MarketAnalysis';
import Trading from './pages/Trading';
import Register from './pages/Register';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public marketing pages */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/plans" element={<PublicLayout><Plans /></PublicLayout>} />
        <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/why-invest" element={<PublicLayout><WhyInvest /></PublicLayout>} />
        <Route path="/market-analysis" element={<PublicLayout><MarketAnalysis /></PublicLayout>} />
        <Route path="/trading" element={<PublicLayout><Trading /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />

        {/* Auth pages */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/client-login" element={<ClientLogin />} />

        {/* Dashboard pages (no navbar/footer) */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/client" element={<ClientPortal />} />
      </Routes>
    </Router>
  );
}

export default App;
