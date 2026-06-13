// src/pages/Karya.jsx
import { useState, useCallback, useEffect } from 'react';
import FeaturedStoryHero from '../components/FeaturedStoryHero';
import TagFilter from '../components/TagFilter';
import PostGrid from '../components/PostGrid';
import PostModal from '../components/PostModal';
import SearchModal from '../components/SearchModal';
import { usePosts } from '../hooks/usePosts';

export default function Karya() {
  const { posts, loading, error, hasMore, currentPage, totalPages, goToNextPage, goToPrevPage, goToPage, loadPosts, filterByLabel } = usePosts();
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTag, setActiveTag] = useState('All');

  useEffect(() => {
    loadPosts({ reset: true });
    
    // Setup search listener for Ctrl+K
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTagChange = useCallback((tag) => {
    setActiveTag(tag);
    filterByLabel(tag);
  }, [filterByLabel]);

  const featuredPost = posts.length > 0 ? posts[0] : null;

  return (
    <div>
      <FeaturedStoryHero
        featuredPost={featuredPost}
        onReadMore={setSelectedPost}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #f5a0bc, transparent)' }} />
              <p className="font-sans text-xs font-bold uppercase tracking-widest"
                style={{ color: '#c96b8a', letterSpacing: '0.18em' }}>
                Koleksi Sastra
              </p>
            </div>
            <h2 className="font-serif font-semibold"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                color: '#2e1a23',
                lineHeight: 1.2,
              }}>
              Semua Karya
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-all"
              style={{ borderColor: 'rgba(245,198,216,0.6)', color: '#c96b8a', background: 'rgba(245,198,216,0.1)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              Cari Karya
            </button>
            <p className="font-sans text-sm flex-shrink-0" style={{ color: '#9a6070' }}>
              {posts.length > 0 ? `${posts.length} karya dimuat` : ''}
            </p>
          </div>
        </div>

        {/* Genre filter */}
        <div className="mb-8">
          <TagFilter activeTag={activeTag} onTagChange={handleTagChange} />
        </div>

        {/* Error state */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl mb-8"
            style={{ background: 'rgba(255,200,213,0.2)', border: '1px solid rgba(255,150,180,0.3)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c96b8a" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div>
              <p className="font-sans text-sm font-medium" style={{ color: '#4a2a38' }}>Gagal memuat konten</p>
              <p className="font-sans text-xs mt-0.5" style={{ color: '#9a6070' }}>{error}</p>
            </div>
            <button onClick={() => loadPosts({ reset: true })} className="ml-auto btn-ghost text-xs py-1.5 px-4">
              Coba Lagi
            </button>
          </div>
        )}

        {/* Post grid */}
        <PostGrid
          posts={posts}
          loading={loading}
          hasMore={hasMore}
          currentPage={currentPage}
          totalPages={totalPages}
          goToNextPage={goToNextPage}
          goToPrevPage={goToPrevPage}
          goToPage={goToPage}
          onPostClick={setSelectedPost}
        />
      </main>

      {/* Article Reading Modal */}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}

      {/* Search Modal */}
      {searchOpen && (
        <SearchModal posts={posts} onClose={() => setSearchOpen(false)} onSelectPost={setSelectedPost} />
      )}
    </div>
  );
}
