// src/components/UpcomingEvents.jsx
import { useState } from 'react';
import { UPCOMING_EVENTS, EVENT_COLORS } from '../data/events';

function formatEventDate(dateStr, endDateStr) {
  const opts = { day: 'numeric', month: 'long', year: 'numeric' };
  const start = new Date(dateStr).toLocaleDateString('id-ID', opts);
  if (!endDateStr) return start;
  const end = new Date(endDateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  return `${start} – ${end}`;
}

function getDaysUntil(dateStr) {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  if (diff < 0) return null;
  if (diff === 0) return 'Hari ini!';
  if (diff === 1) return 'Besok';
  return `${diff} hari lagi`;
}

function CategoryBadge({ category }) {
  const catColors = {
    'Organisasi':   'bg-pink-50 text-pink-600 border-pink-200',
    'Kompetisi':    'bg-violet-50 text-violet-600 border-violet-200',
    'Workshop':     'bg-amber-50 text-amber-600 border-amber-200',
    'Seni & Budaya': 'bg-rose-50 text-rose-500 border-rose-200',
    'Seminar':      'bg-sky-50 text-sky-600 border-sky-200',
    'Akademik':     'bg-emerald-50 text-emerald-600 border-emerald-200',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border font-sans ${catColors[category] || 'bg-gray-50 text-gray-600 border-gray-200'}`}
      style={{ fontSize: '0.68rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
      {category}
    </span>
  );
}

export default function UpcomingEvents() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #f5a0bc, transparent)' }} />
              <p className="font-sans text-xs font-bold uppercase tracking-widest"
                style={{ color: '#c96b8a', letterSpacing: '0.18em' }}>
                Agenda Mendatang
              </p>
            </div>
            <h2 className="font-serif font-semibold"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                color: '#2e1a23',
                lineHeight: 1.2,
              }}>
              Upcoming Events
            </h2>
          </div>
          <a
            href="https://www.instagram.com/himapbiunissula/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-sm flex-shrink-0"
          >
            Lihat Semua di Instagram
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>

        {/* Timeline layout */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, #f5c6d8, rgba(245,198,216,0.2))' }} />

          <div className="space-y-6">
            {UPCOMING_EVENTS.map((event, index) => {
              const colors = EVENT_COLORS[event.color];
              const daysUntil = getDaysUntil(event.date);
              const isExpanded = expanded === event.id;

              return (
                <div key={event.id} id={`upcoming-event-${event.id}`} className="md:pl-16 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-3.5 top-6 w-5 h-5 rounded-full hidden md:flex items-center justify-center z-10 text-xs"
                    style={{ background: colors.bg, border: `2px solid ${colors.border}`, boxShadow: `0 0 0 4px white` }}>
                    <span>{event.icon}</span>
                  </div>

                  <div
                    className="glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                    onClick={() => setExpanded(isExpanded ? null : event.id)}
                    style={{ borderColor: isExpanded ? colors.border : undefined }}
                  >
                    {/* Top accent bar */}
                    <div className="h-1" style={{ background: `linear-gradient(90deg, ${colors.border}, ${colors.bg})` }} />

                    <div className="p-5 sm:p-6">
                      <div className="flex items-start gap-4">
                        {/* Date badge (desktop) */}
                        <div className="flex-shrink-0 hidden sm:flex flex-col items-center justify-center w-16 h-16 rounded-xl text-center"
                          style={{ background: colors.badge }}>
                          <span className="font-sans text-xs font-bold uppercase"
                            style={{ color: colors.text, letterSpacing: '0.08em' }}>
                            {new Date(event.date).toLocaleDateString('id-ID', { month: 'short' })}
                          </span>
                          <span className="font-serif font-bold leading-none"
                            style={{ fontSize: '1.75rem', color: colors.text, fontFamily: 'Cormorant Garamond, serif' }}>
                            {new Date(event.date).getDate()}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <CategoryBadge category={event.category} />
                            {daysUntil && (
                              <span className="inline-flex items-center gap-1 font-sans text-xs font-semibold px-2 py-0.5 rounded-full"
                                style={{ background: colors.badge, color: colors.text }}>
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                                  style={{ background: colors.text }} />
                                {daysUntil}
                              </span>
                            )}
                          </div>

                          <h3 className="font-serif font-semibold mb-1"
                            style={{
                              fontFamily: 'Cormorant Garamond, serif',
                              fontSize: '1.2rem',
                              color: '#2e1a23',
                              lineHeight: 1.3,
                            }}>
                            {event.title}
                          </h3>

                          {/* Meta info */}
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                            <span className="flex items-center gap-1.5 font-sans text-xs" style={{ color: '#9a6070' }}>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                              </svg>
                              {formatEventDate(event.date, event.endDate)}
                            </span>
                            <span className="flex items-center gap-1.5 font-sans text-xs" style={{ color: '#9a6070' }}>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                              </svg>
                              {event.time}
                            </span>
                            <span className="flex items-center gap-1.5 font-sans text-xs" style={{ color: '#9a6070' }}>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                              </svg>
                              {event.location}
                            </span>
                          </div>

                          {/* Expanded description */}
                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t space-y-4 animate-slide-down"
                              style={{ borderColor: 'rgba(245,198,216,0.3)' }}>
                              <p className="font-sans text-sm leading-relaxed" style={{ color: '#6b3f55' }}>
                                {event.description}
                              </p>
                              <div className="flex items-center gap-3">
                                {event.registOpen && (
                                  <a
                                    href={event.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary text-xs py-2 px-5"
                                    onClick={e => e.stopPropagation()}
                                  >
                                    Daftar Sekarang
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                      <path d="m9 18 6-6-6-6"/>
                                    </svg>
                                  </a>
                                )}
                                <a
                                  href={event.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn-ghost text-xs py-2 px-4"
                                  onClick={e => e.stopPropagation()}
                                >
                                  Info Lengkap
                                </a>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Expand toggle */}
                        <button
                          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                          style={{ background: colors.badge, color: colors.text }}
                          onClick={e => { e.stopPropagation(); setExpanded(isExpanded ? null : event.id); }}
                          aria-label={isExpanded ? 'Collapse' : 'Expand'}
                        >
                          <svg
                            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }}
                          >
                            <path d="m6 9 6 6 6-6"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
