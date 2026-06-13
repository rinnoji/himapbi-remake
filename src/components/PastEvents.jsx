// src/components/PastEvents.jsx
import { useState } from 'react';
import { PAST_EVENTS, EVENT_COLORS } from '../data/events';

function formatPastDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

const CAT_ICONS = {
  'Organisasi':   '👥',
  'Kompetisi':    '🏆',
  'Workshop':     '✍️',
  'Seni & Budaya': '🎭',
  'Seminar':      '🎓',
  'Akademik':     '📚',
};

export default function PastEvents() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? PAST_EVENTS : PAST_EVENTS.slice(0, 4);

  return (
    <section className="py-16 lg:py-20 lotus-bg"
      style={{ background: 'linear-gradient(180deg, rgba(252,232,240,0.3) 0%, rgba(255,253,251,0.8) 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #f5a0bc, transparent)' }} />
              <p className="font-sans text-xs font-bold uppercase tracking-widest"
                style={{ color: '#c96b8a', letterSpacing: '0.18em' }}>
                Rekam Jejak
              </p>
            </div>
            <h2 className="font-serif font-semibold"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                color: '#2e1a23',
                lineHeight: 1.2,
              }}>
              Kegiatan Yang Sudah Berlangsung
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="font-sans text-xs px-3 py-1 rounded-full"
              style={{ background: 'rgba(245,198,216,0.3)', color: '#c96b8a', border: '1px solid rgba(245,198,216,0.5)' }}>
              {PAST_EVENTS.length} kegiatan
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {displayed.map((event, idx) => {
            const colors = EVENT_COLORS[event.color];
            return (
              <div
                key={event.id}
                id={`past-event-${event.id}`}
                className="glass-card rounded-2xl overflow-hidden group transition-all duration-300"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {/* Color header strip */}
                <div className="relative h-14 flex items-center px-5 gap-3"
                  style={{ background: `linear-gradient(135deg, ${colors.badge}, ${colors.bg})` }}>
                  <span className="text-2xl">{event.icon || CAT_ICONS[event.category] || '📌'}</span>
                  <div className="flex-1 min-w-0">
                    <span className="font-sans text-xs font-bold uppercase"
                      style={{ color: colors.badgeText, letterSpacing: '0.1em' }}>
                      {event.category}
                    </span>
                  </div>
                  {/* "Selesai" badge */}
                  <span className="flex items-center gap-1 font-sans text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.7)', color: '#6b7280' }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                    Selesai
                  </span>
                </div>

                <div className="p-5">
                  {/* Title */}
                  <h3 className="font-serif font-semibold mb-2"
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1.1rem',
                      color: '#2e1a23',
                      lineHeight: 1.3,
                    }}>
                    {event.title}
                  </h3>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
                    <span className="flex items-center gap-1.5 font-sans text-xs" style={{ color: '#9a6070' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      {formatPastDate(event.date)}
                    </span>
                    <span className="flex items-center gap-1.5 font-sans text-xs" style={{ color: '#9a6070' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      {event.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-sm leading-relaxed line-clamp-2 mb-3"
                    style={{ color: '#6b3f55' }}>
                    {event.description}
                  </p>

                  {/* Highlight pill */}
                  {event.highlight && (
                    <div className="flex items-center gap-2 pt-3 border-t"
                      style={{ borderColor: 'rgba(245,198,216,0.3)' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                      <span className="font-sans text-xs font-semibold"
                        style={{ color: colors.badgeText }}>
                        {event.highlight}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Show more / less */}
        {PAST_EVENTS.length > 4 && (
          <div className="flex justify-center mt-8">
            <button
              id="toggle-past-events-btn"
              onClick={() => setShowAll(s => !s)}
              className="btn-ghost flex items-center gap-2"
            >
              {showAll ? (
                <>
                  Tampilkan Lebih Sedikit
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>
                </>
              ) : (
                <>
                  Lihat Semua Kegiatan ({PAST_EVENTS.length - 4} lainnya)
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
