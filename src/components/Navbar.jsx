// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import arthaLogo from '../assets/artha.jpeg';

export default function Navbar({ onSearchOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Keyboard shortcut: Ctrl/Cmd + K → open search
  useEffect(() => {
    if (!onSearchOpen) return;
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onSearchOpen();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onSearchOpen]);

  const navItems = [
    { label: 'Beranda', path: '/' },
    { label: 'Agenda', path: '/agenda' },
    { label: 'Karya & Cerpen', path: '/karya' },
    { label: 'Tentang Kami', path: '/tentang-kami' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'navbar-glass shadow-sm py-3' : 'bg-[#fefdfb]/90 backdrop-blur py-5'
      }`}
      style={{ borderBottom: scrolled ? 'none' : '1px solid rgba(245,198,216,0.3)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <img
              src={arthaLogo}
              alt="Arthavistara Nirvata Logo"
              className="w-10 h-10 object-cover rounded-full border-2 transition-all duration-300 group-hover:scale-110"
              style={{ borderColor: '#f5a0bc' }}
            />
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: '0 0 16px rgba(245,160,188,0.5)' }} />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-sans font-medium tracking-widest uppercase"
              style={{ color: '#c96b8a', letterSpacing: '0.12em' }}>
              HIMA PBI UNISSULA
            </p>
            <p className="font-serif font-semibold leading-none"
              style={{ color: '#4a2a38', fontSize: '1rem', fontFamily: 'Cormorant Garamond, serif' }}>
              Arthavistara Nirvata
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `font-sans text-sm font-medium transition-all duration-200 relative group ${
                  isActive ? 'text-[#c96b8a]' : 'text-[#4a2a38] hover:text-[#c96b8a]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 rounded-full ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    style={{ background: 'linear-gradient(90deg, #f5a0bc, #e88ca8)' }} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: '#c96b8a' }}
            onClick={() => setMenuOpen(m => !m)}
            aria-label="Open menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden animate-slide-down navbar-glass border-t px-4 pb-4 pt-2"
          style={{ borderColor: 'rgba(245,198,216,0.3)' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block w-full text-left py-3 font-sans text-sm font-medium border-b last:border-b-0 ${
                  isActive ? 'text-[#c96b8a]' : 'text-[#4a2a38]'
                }`
              }
              style={{ borderColor: 'rgba(245,198,216,0.2)' }}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
