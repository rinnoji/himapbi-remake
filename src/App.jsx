// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AnnouncementTicker from './components/AnnouncementTicker';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Agenda from './pages/Agenda';
import Karya from './pages/Karya';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col" style={{ background: '#fefdfb' }}>
        
        {/* Fixed Navigation */}
        <Navbar />

        {/* Announcement Ticker */}
        <div className="fixed top-0 left-0 right-0 z-40" style={{ marginTop: '64px' }}>
          <AnnouncementTicker />
        </div>

        {/* Page Content */}
        <div className="flex-1" style={{ marginTop: '108px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/karya" element={<Karya />} />
            <Route path="/tentang-kami" element={<About />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <div className="mt-auto">
          {/* Closing ornament */}
          <div className="ornament-divider max-w-xs mx-auto px-8 mb-4 pt-16">
            <span className="font-serif italic text-sm"
              style={{ color: '#d4a0bc', fontFamily: 'Cormorant Garamond, serif', whiteSpace: 'nowrap' }}>
              ✦ Arthavistara Nirvata ✦
            </span>
          </div>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
