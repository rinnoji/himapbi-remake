// src/components/PostGrid.jsx
import PostCard from './PostCard';
import { GridSkeletons } from './LoadingSkeletons';

export default function PostGrid({ 
  posts, loading, 
  onPostClick,
  // Pagination props
  currentPage,
  totalPages,
  hasMore,
  goToNextPage,
  goToPrevPage,
  goToPage
}) {
  if (loading && posts.length === 0) {
    return <GridSkeletons count={6} />;
  }

  if (!loading && posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-full mb-6 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #fce4ee, #f5c6d8)' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c96b8a" strokeWidth="1.5">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/>
          </svg>
        </div>
        <h3 className="font-serif font-semibold text-xl mb-2"
          style={{ fontFamily: 'Cormorant Garamond, serif', color: '#4a2a38' }}>
          Tidak ada karya ditemukan
        </h3>
        <p className="font-sans text-sm" style={{ color: '#9a6070' }}>
          Silakan coba filter genre atau pencarian lain.
        </p>
      </div>
    );
  }

  // Render page numbers (1, 2, 3...)
  // We render buttons for up to `totalPages`, and maybe one more if `hasMore` is true.
  const pageNumbers = [];
  const maxRenderedPages = hasMore ? totalPages + 1 : totalPages;
  for (let i = 0; i < maxRenderedPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="posts-grid relative min-h-[400px]">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-xl">
             <svg className="animate-spin text-rose-500" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
             </svg>
          </div>
        )}
        {posts.map((post, i) => (
          <PostCard
            key={post.id}
            post={post}
            onClick={onPostClick}
            featured={i === 0 && currentPage === 0} // Only make it big if it's the very first post of page 1
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {pageNumbers.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          {/* Prev Button */}
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 0 || loading}
            className="w-10 h-10 rounded-full flex items-center justify-center border transition-all"
            style={{ 
              borderColor: currentPage === 0 ? 'rgba(245,198,216,0.2)' : 'rgba(245,198,216,0.8)',
              color: currentPage === 0 ? '#d4a0bc' : '#a04e6e',
              background: currentPage === 0 ? 'transparent' : 'rgba(245,198,216,0.1)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>

          {/* Page Numbers */}
          {pageNumbers.map((index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              disabled={loading}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-sans text-sm font-semibold transition-all ${
                index === currentPage 
                  ? 'bg-rose-400 text-white shadow-md' 
                  : 'bg-transparent text-[#7a4a60] hover:bg-rose-50 border border-transparent hover:border-rose-200'
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={goToNextPage}
            disabled={!hasMore || loading}
            className="w-10 h-10 rounded-full flex items-center justify-center border transition-all"
            style={{ 
              borderColor: !hasMore ? 'rgba(245,198,216,0.2)' : 'rgba(245,198,216,0.8)',
              color: !hasMore ? '#d4a0bc' : '#a04e6e',
              background: !hasMore ? 'transparent' : 'rgba(245,198,216,0.1)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
