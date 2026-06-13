// src/components/StatsBar.jsx
// Quick-stats highlight strip between Hero and Events

const STATS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    value: '120+',
    label: 'Anggota Aktif',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    value: '50+',
    label: 'Karya Dipublikasi',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    value: '10+',
    label: 'Program Kerja 2025/2026',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    value: '5+',
    label: 'Prestasi Kompetisi',
  },
];

export default function StatsBar() {
  return (
    <div className="relative z-10 -mt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="glass-card rounded-2xl px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 divide-x-0 md:divide-x"
          style={{ divideColor: 'rgba(245,198,216,0.3)' }}>
          {STATS.map(({ icon, value, label }, i) => (
            <div key={i}
              className={`flex flex-col items-center text-center px-4 py-2 ${i > 0 ? 'md:border-l' : ''}`}
              style={{ borderColor: 'rgba(245,198,216,0.3)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #fce4ee, #f5c6d8)', color: '#c96b8a' }}>
                {icon}
              </div>
              <p className="font-serif font-bold"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.6rem',
                  color: '#c96b8a',
                  lineHeight: 1,
                }}>
                {value}
              </p>
              <p className="font-sans text-xs mt-1 leading-snug" style={{ color: '#9a6070' }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
