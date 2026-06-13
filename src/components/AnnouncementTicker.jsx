// src/components/AnnouncementTicker.jsx
import { useEffect, useRef, useState } from 'react';
import { ANNOUNCEMENTS } from '../data/events';

export default function AnnouncementTicker() {
  const trackRef = useRef(null);

  return (
    <div className="relative overflow-hidden py-2.5 px-0"
      style={{
        background: 'linear-gradient(90deg, #f5c6d8 0%, #fce4ee 50%, #f5c6d8 100%)',
        borderBottom: '1px solid rgba(245,198,216,0.6)',
      }}>
      {/* Left label */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center px-4 gap-2"
        style={{ background: 'linear-gradient(90deg, #f9b8c9, #f9b8c9ee, transparent)' }}>
        <span className="font-sans text-xs font-bold uppercase tracking-widest"
          style={{ color: '#a04e6e', letterSpacing: '0.15em', whiteSpace: 'nowrap' }}>
          📣 Pengumuman
        </span>
        <div className="w-px h-4" style={{ background: 'rgba(160,78,110,0.3)' }} />
      </div>

      {/* Scrolling track */}
      <div className="overflow-hidden ml-36">
        <div
          ref={trackRef}
          className="flex gap-16 whitespace-nowrap"
          style={{
            animation: 'tickerScroll 40s linear infinite',
            willChange: 'transform',
          }}
        >
          {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((a, i) => (
            <span
              key={`${a.id}-${i}`}
              className="font-sans text-sm font-medium inline-block"
              style={{ color: '#7a3a55' }}
            >
              {a.text}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
