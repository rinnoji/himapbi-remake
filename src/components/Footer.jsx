// src/components/Footer.jsx
import arthaLogo from '../assets/artha.jpeg';

export default function Footer({ onAboutRef }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer ref={onAboutRef} className="bg-footer-gradient text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b"
          style={{ borderColor: 'rgba(245,198,216,0.15)' }}>

          {/* Column 1: Brand & About */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src={arthaLogo}
                alt="Arthavistara Nirvata Logo"
                className="w-14 h-14 rounded-full object-cover border-2"
                style={{ borderColor: 'rgba(245,198,216,0.4)' }}
              />
              <div>
                <p className="font-sans text-xs font-semibold tracking-widest uppercase"
                  style={{ color: 'rgba(245,198,216,0.7)', letterSpacing: '0.15em' }}>
                  HIMA PBI UNISSULA
                </p>
                <p className="font-serif font-semibold"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#f5c6d8' }}>
                  Arthavistara Nirvata
                </p>
              </div>
            </div>
            <p className="font-sans text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.75 }}>
              The student association of the English Education Department at UNISSULA, dedicated to nurturing creativity, literature, and academic excellence.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                {
                  href: 'https://www.instagram.com/himapbiunissula/',
                  label: 'Instagram',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  ),
                },
                {
                  href: 'https://himapbiunissula.blogspot.com/',
                  label: 'Blog',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                  ),
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: 'rgba(245,198,216,0.12)',
                    border: '1px solid rgba(245,198,216,0.2)',
                    color: 'rgba(245,198,216,0.8)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(245,198,216,0.25)';
                    e.currentTarget.style.borderColor = 'rgba(245,198,216,0.5)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(245,198,216,0.12)';
                    e.currentTarget.style.borderColor = 'rgba(245,198,216,0.2)';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: 'rgba(245,198,216,0.7)', letterSpacing: '0.18em' }}>
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'All Stories', tag: 'All' },
                { label: 'Sci-Fi & Cyberpunk', tag: 'Sci-Fi' },
                { label: 'Steampunk', tag: 'Steampunk' },
                { label: 'Poetry', tag: 'Poetry' },
                { label: 'Romance', tag: 'Romance' },
                { label: 'Campus News', tag: 'Campus' },
              ].map(({ label }) => (
                <li key={label}>
                  <a href="#stories"
                    className="font-sans text-sm flex items-center gap-2 transition-all duration-200 group"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#f5c6d8'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    <span className="w-4 h-px transition-all duration-200"
                      style={{ background: 'rgba(245,198,216,0.4)' }} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact / Location */}
          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: 'rgba(245,198,216,0.7)', letterSpacing: '0.18em' }}>
              Find Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: 'rgba(245,198,216,0.12)', border: '1px solid rgba(245,198,216,0.2)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(245,198,216,0.8)" strokeWidth="1.8">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="font-sans text-xs font-semibold mb-1" style={{ color: 'rgba(245,198,216,0.9)' }}>Campus</p>
                  <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    Universitas Islam Sultan Agung<br />
                    Jl. Kaligawe Raya No. Km.4<br />
                    Semarang, Jawa Tengah 50112
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center"
                  style={{ background: 'rgba(245,198,216,0.12)', border: '1px solid rgba(245,198,216,0.2)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(245,198,216,0.8)" strokeWidth="1.8">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </div>
                <div>
                  <p className="font-sans text-xs font-semibold mb-1" style={{ color: 'rgba(245,198,216,0.9)' }}>Instagram</p>
                  <a href="https://www.instagram.com/himapbiunissula/" target="_blank" rel="noopener noreferrer"
                    className="font-sans text-xs transition-colors"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#f5c6d8'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                  >
                    @himapbiunissula
                  </a>
                </div>
              </div>

              {/* Dept name */}
              <div className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(245,198,216,0.1)' }}>
                <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Himpunan Mahasiswa Pendidikan Bahasa Inggris (HIMA PBI) — serving the English Education Department students of UNISSULA.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(245,198,216,0.4)" strokeWidth="1.5">
              <path d="M12 2a7 7 0 0 1 7 7 7 7 0 0 1-1.5 4.33L21 17l-2 2-3.67-3.5A7 7 0 0 1 5 9a7 7 0 0 1 7-7z"/>
            </svg>
            <p className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              © {currentYear} HIMA PBI UNISSULA · Arthavistara Nirvata Cabinet
            </p>
          </div>
          <p className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Powered by Blogger API v3
          </p>
        </div>
      </div>
    </footer>
  );
}
