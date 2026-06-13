// src/components/HeroSection.jsx
import arthaLogo from '../assets/artha.jpeg';

export default function HeroSection({ onReadStories, onSeeEvents }) {
  return (
    <section className="relative min-h-[92vh] flex items-center bg-hero-gradient lotus-bg overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245,198,216,0.28) 0%, transparent 70%)',
          transform: 'translate(30%, -20%)',
        }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,160,188,0.18) 0%, transparent 70%)',
          transform: 'translate(-30%, 20%)',
        }} />

      {/* Floating lotus logo — decorative background */}
      <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none select-none"
        style={{ opacity: 0.08 }}>
        <img src={arthaLogo} alt="" className="w-[560px] h-[560px] object-contain lotus-float" />
      </div>

      {/* Semi-visible lotus (right side, medium screens) */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex xl:hidden items-center justify-center pointer-events-none">
        <img src={arthaLogo} alt="" className="w-72 h-72 object-contain lotus-float"
          style={{ opacity: 0.12 }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-32 w-full">
        <div className="max-w-3xl">

          {/* Cabinet tagline */}
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <img src={arthaLogo} alt="Logo Arthavistara Nirvata"
              className="w-9 h-9 object-cover rounded-full border-2 flex-shrink-0"
              style={{ borderColor: '#f5a0bc' }} />
            <div className="flex flex-col">
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: '#c96b8a', lineHeight: 1 }}>
                Kabinet Arthavistara Nirvata
              </span>
              <span className="font-sans text-xs" style={{ color: '#b87a96' }}>
                HIMA PBI UNISSULA 2025/2026
              </span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="font-serif mb-5 animate-slide-up"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.8rem, 6.5vw, 5rem)',
              fontWeight: 600,
              lineHeight: 1.05,
              color: '#2e1a23',
              letterSpacing: '-0.01em',
            }}>
            Himpunan Mahasiswa
            <br />
            <span className="relative inline-block">
              Pendidikan Bahasa
              <br />
              <em style={{ color: '#c96b8a' }}>Inggris</em>
              <span style={{ color: '#4a2a38' }}> UNISSULA</span>
            </span>
          </h1>

          {/* Sub headline */}
          <p className="font-sans text-base sm:text-lg mb-3 max-w-xl animate-slide-up"
            style={{ color: '#7a4a60', lineHeight: 1.7, animationDelay: '0.08s' }}>
            Ruang tumbuh bagi mahasiswa Pendidikan Bahasa Inggris dalam berkarya, berorganisasi, dan mengembangkan potensi akademik & literasi.
          </p>

          {/* Quote ornament */}
          <p className="font-serif italic text-sm mb-8 animate-slide-up"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              color: '#d4a0bc',
              animationDelay: '0.12s',
            }}>
            "Artha · Vistara · Nirvata — Makna · Perluasan · Ketenangan"
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.16s' }}>
            <button
              id="hero-see-events-btn"
              onClick={onSeeEvents}
              className="btn-primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Lihat Agenda Kegiatan
            </button>
            <button
              id="hero-read-stories-btn"
              onClick={onReadStories}
              className="btn-ghost"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              Baca Karya & Cerpen
            </button>
          </div>

          {/* Social proof row */}
          <div className="flex items-center gap-6 mt-10 animate-fade-in" style={{ animationDelay: '0.25s' }}>
            <a href="https://www.instagram.com/himapbiunissula/"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-sans text-sm transition-all duration-200 group"
              style={{ color: '#c96b8a' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <span className="group-hover:underline">@himapbiunissula</span>
            </a>
            <div className="w-px h-4" style={{ background: 'rgba(212,160,188,0.4)' }} />
            <a href="https://himapbiunissula.blogspot.com/"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-sans text-sm transition-all duration-200 group"
              style={{ color: '#c96b8a' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/>
              </svg>
              <span className="group-hover:underline">Blog Resmi</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 80V40C240 10 480 70 720 40C960 10 1200 70 1440 40V80H0Z"
            fill="rgba(254,253,251,0.95)" />
        </svg>
      </div>
    </section>
  );
}
