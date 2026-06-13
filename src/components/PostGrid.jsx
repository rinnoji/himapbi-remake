// src/components/PostGrid.jsx
import PostCard from './PostCard';
import { GridSkeletons } from './LoadingSkeletons';

export default function PostGrid({ posts, loading, hasMore, onLoadMore, onPostClick }) {
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
          No stories found
        </h3>
        <p className="font-sans text-sm" style={{ color: '#9a6070' }}>
          Try a different genre filter or search term.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="posts-grid">
        {posts.map((post, i) => (
          <PostCard
            key={post.id}
            post={post}
            onClick={onPostClick}
            featured={i === 0}
          />
        ))}
      </div>

      {/* Load more */}
      {(hasMore || loading) && (
        <div className="flex justify-center mt-12">
          <button
            id="load-more-btn"
            onClick={onLoadMore}
            disabled={loading}
            className="btn-ghost flex items-center gap-2 px-8 py-3"
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Loading…
              </>
            ) : (
              <>
                Load More Stories
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12l7 7 7-7"/>
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
