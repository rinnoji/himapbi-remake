// src/components/LoadingSkeletons.jsx

export function CardSkeleton({ featured = false }) {
  return (
    <div className={`glass-card rounded-2xl overflow-hidden ${featured ? 'featured-card' : ''}`}>
      <div className="h-1.5 skeleton" />
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-2">
          <div className="skeleton h-5 w-16 rounded-full" />
          <div className="skeleton h-3 w-24 rounded" />
        </div>
        <div className="skeleton h-6 w-full rounded" />
        <div className="skeleton h-4 w-4/5 rounded" />
        <div className="space-y-2">
          <div className="skeleton h-3 w-full rounded" />
          <div className="skeleton h-3 w-full rounded" />
          <div className="skeleton h-3 w-3/4 rounded" />
        </div>
        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(245,198,216,0.3)' }}>
          <div className="flex items-center gap-2">
            <div className="skeleton w-6 h-6 rounded-full" />
            <div className="skeleton h-3 w-20 rounded" />
          </div>
          <div className="skeleton h-3 w-10 rounded" />
        </div>
      </div>
    </div>
  );
}

export function GridSkeletons({ count = 6 }) {
  return (
    <div className="posts-grid">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} featured={i === 0} />
      ))}
    </div>
  );
}
