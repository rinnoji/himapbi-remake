// src/components/SearchModal.jsx
import { useState, useEffect, useRef } from 'react';
import { stripHtml, detectGenre, TAG_COLORS, formatDate } from '../utils/helpers';

export default function SearchModal({ posts, onClose, onSelectPost }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  // Focus on open
  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Real-time filtering (debounced 200ms)
  useEffect(() => {
    const id = setTimeout(() => {
      if (!query.trim()) { setResults([]); return; }
      const q = query.toLowerCase();
      setResults(
        posts.filter(p =>
          p.title.toLowerCase().includes(q) ||
          stripHtml(p.content).toLowerCase().includes(q) ||
          (p.labels || []).some(l => l.toLowerCase().includes(q))
        ).slice(0, 8)
      );
    }, 200);
    return () => clearTimeout(id);
  }, [query, posts]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-16 px-4 animate-fade-in"
      style={{ background: 'rgba(46,26,35,0.5)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-xl rounded-2xl overflow-hidden animate-slide-down"
        style={{
          background: 'rgba(255,250,253,0.97)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(245,198,216,0.4)',
          boxShadow: '0 24px 64px rgba(200,100,140,0.2)',
        }}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b"
          style={{ borderColor: 'rgba(245,198,216,0.3)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c96b8a" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            id="search-input"
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search stories, poetry, genres…"
            className="flex-1 bg-transparent font-sans text-base outline-none"
            style={{ color: '#2e1a23' }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="transition-colors" style={{ color: '#c8a0b4' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
          <kbd className="hidden sm:inline-flex px-2 py-0.5 rounded text-xs font-mono"
            style={{ background: 'rgba(245,198,216,0.3)', color: '#b87a96', border: '1px solid rgba(245,198,216,0.4)' }}>
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {!query && (
            <div className="px-4 py-8 text-center">
              <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #fce4ee, #f5c6d8)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c96b8a" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <p className="font-sans text-sm font-medium" style={{ color: '#4a2a38' }}>Start typing to search</p>
              <p className="font-sans text-xs mt-1" style={{ color: '#b87a96' }}>
                {posts.length} stories loaded
              </p>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="font-sans text-sm font-medium" style={{ color: '#4a2a38' }}>
                No results for &ldquo;{query}&rdquo;
              </p>
              <p className="font-sans text-xs mt-1" style={{ color: '#b87a96' }}>
                Try different keywords or genre names.
              </p>
            </div>
          )}

          {results.map((post, i) => {
            const genre = detectGenre(post.title, post.labels || []);
            return (
              <button
                key={post.id}
                id={`search-result-${i}`}
                onClick={() => { onSelectPost(post); onClose(); }}
                className="w-full text-left px-4 py-3 transition-colors border-b last:border-b-0 flex items-start gap-3 group"
                style={{
                  borderColor: 'rgba(245,198,216,0.2)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,198,216,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: 'linear-gradient(135deg, #f5c6d8, #e88ca8)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full border font-sans ${TAG_COLORS[genre.color]}`}
                      style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      {genre.tag}
                    </span>
                    <span className="font-sans text-xs" style={{ color: '#c8a0b4' }}>{formatDate(post.published)}</span>
                  </div>
                  <p className="font-serif font-medium truncate"
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#2e1a23' }}>
                    {post.title}
                  </p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c96b8a" strokeWidth="2"
                  className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            );
          })}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2 border-t flex items-center gap-4"
          style={{ borderColor: 'rgba(245,198,216,0.3)', background: 'rgba(255,245,250,0.8)' }}>
          <p className="font-sans text-xs" style={{ color: '#c8a0b4' }}>
            <kbd className="px-1 rounded font-mono" style={{ background: 'rgba(245,198,216,0.4)' }}>↵</kbd> to select
          </p>
          <p className="font-sans text-xs" style={{ color: '#c8a0b4' }}>
            <kbd className="px-1 rounded font-mono" style={{ background: 'rgba(245,198,216,0.4)' }}>Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}
