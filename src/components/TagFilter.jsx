// src/components/TagFilter.jsx
import { ALL_GENRES } from '../utils/helpers';

export default function TagFilter({ activeTag = 'All', onTagChange }) {
  return (
    <div className="relative">
      {/* Fade edges for scroll hint */}
      <div className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to left, rgba(254,253,251,1), transparent)' }} />
      <div className="absolute left-0 top-0 bottom-0 w-12 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to right, rgba(254,253,251,1), transparent)' }} />

      <div className="flex gap-2 overflow-x-auto pb-1 px-2 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {ALL_GENRES.map((genre) => (
          <button
            key={genre}
            id={`tag-filter-${genre.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            onClick={() => onTagChange(genre)}
            className={`tag-pill flex-shrink-0 ${activeTag === genre ? 'active' : ''}`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}
