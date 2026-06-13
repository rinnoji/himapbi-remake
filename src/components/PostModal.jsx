// src/components/PostModal.jsx
import { useEffect } from 'react';
import { formatDate, detectGenre, TAG_COLORS, readingTime } from '../utils/helpers';

export default function PostModal({ post, onClose }) {
  const genre = detectGenre(post.title, post.labels || []);
  const date = formatDate(post.published);
  const time = readingTime(post.content);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center animate-fade-in"
      style={{ background: 'rgba(46,26,35,0.6)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
    >
      <div
        className="w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[88vh] flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden animate-slide-up"
        style={{ background: 'rgba(255,250,253,0.97)', backdropFilter: 'blur(20px)' }}
      >
        {/* Modal Header */}
        <div className="flex-shrink-0 px-6 pt-6 pb-4 border-b"
          style={{ borderColor: 'rgba(245,198,216,0.3)' }}>
          {/* Pull indicator (mobile) */}
          <div className="w-10 h-1 rounded-full mx-auto mb-4 sm:hidden"
            style={{ background: 'rgba(245,198,216,0.6)' }} />

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-sans border ${TAG_COLORS[genre.color]}`}
                  style={{ fontSize: '0.7rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {genre.tag}
                </span>
                <span className="font-sans text-xs" style={{ color: '#b87a96' }}>{date}</span>
                <span className="font-sans text-xs" style={{ color: '#c8a0b4' }}>· {time}</span>
              </div>

              <h2 className="font-serif font-semibold"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.3rem, 4vw, 1.75rem)',
                  color: '#2e1a23',
                  lineHeight: 1.25,
                }}>
                {post.title}
              </h2>
            </div>

            <button
              id="modal-close-btn"
              onClick={onClose}
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'rgba(245,198,216,0.25)', color: '#c96b8a' }}
              aria-label="Close article"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Author row */}
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #f5c6d8, #e88ca8)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div>
              <p className="font-sans text-xs font-medium" style={{ color: '#4a2a38' }}>
                {post.author?.displayName?.replace('Himpunan Mahasiswa Pendidikan Bahasa Inggris UNISSULA', 'HIMA PBI UNISSULA') || 'HIMA PBI UNISSULA'}
              </p>
              <p className="font-sans text-xs" style={{ color: '#b87a96' }}>
                English Education Dept · UNISSULA
              </p>
            </div>

            {/* Share / Open original */}
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto btn-ghost text-xs py-1.5 px-4"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Original
            </a>
          </div>
        </div>

        {/* Decorative line */}
        <div className="flex-shrink-0 h-0.5 w-full"
          style={{ background: 'linear-gradient(90deg, transparent, #f5c6d8, #e88ca8, #f5c6d8, transparent)' }} />

        {/* Article Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8">
          <div
            className="post-body max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Labels */}
          {post.labels && post.labels.length > 0 && (
            <div className="mt-8 pt-6 border-t" style={{ borderColor: 'rgba(245,198,216,0.3)' }}>
              <p className="font-sans text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: '#b87a96' }}>Tags</p>
              <div className="flex flex-wrap gap-2">
                {post.labels.map(label => (
                  <span key={label}
                    className="px-3 py-1 rounded-full text-xs font-sans"
                    style={{
                      background: 'rgba(245,198,216,0.25)',
                      color: '#a04e6e',
                      border: '1px solid rgba(245,198,216,0.5)',
                    }}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-6 py-4 border-t flex items-center justify-between"
          style={{ borderColor: 'rgba(245,198,216,0.3)', background: 'rgba(255,245,250,0.8)' }}>
          <p className="font-sans text-xs" style={{ color: '#c8a0b4' }}>
            Press <kbd className="px-1 py-0.5 rounded text-xs" style={{ background: 'rgba(245,198,216,0.3)', fontFamily: 'monospace' }}>Esc</kbd> to close
          </p>
          <button onClick={onClose} className="btn-primary text-xs py-2 px-5">
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
}
