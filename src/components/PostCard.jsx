// src/components/PostCard.jsx
import { getExcerpt, formatDate, detectGenre, TAG_COLORS, readingTime } from '../utils/helpers';

export default function PostCard({ post, onClick, featured = false }) {
  const excerpt = getExcerpt(post.content, featured ? 240 : 160);
  const genre = detectGenre(post.title, post.labels || []);
  const date = formatDate(post.published);
  const time = readingTime(post.content);

  return (
    <article
      id={`post-card-${post.id}`}
      className={`post-card glass-card rounded-2xl overflow-hidden cursor-pointer flex flex-col ${featured ? 'featured-card' : ''}`}
      onClick={() => onClick(post)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(post)}
      aria-label={`Read: ${post.title}`}
    >
      {/* Gradient header bar */}
      <div className="h-1.5 w-full flex-shrink-0"
        style={{ background: 'linear-gradient(90deg, #f5c6d8, #e88ca8, #d4769c)' }} />

      <div className="p-6 flex flex-col flex-1">
        {/* Genre + Date + Reading time */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-sans border ${TAG_COLORS[genre.color]}`}
            style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {genre.tag}
          </span>
          <span className="font-sans text-xs" style={{ color: '#b87a96' }}>{date}</span>
          <span className="font-sans text-xs" style={{ color: '#c8a0b4' }}>· {time}</span>
        </div>

        {/* Title */}
        <h2
          className={`font-serif font-semibold mb-3 transition-colors duration-200 ${featured ? 'line-clamp-2' : 'line-clamp-3'}`}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: featured ? '1.5rem' : '1.2rem',
            lineHeight: 1.3,
            color: '#2e1a23',
          }}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p
          className={`font-sans text-sm flex-1 mb-4 ${featured ? 'line-clamp-4' : 'line-clamp-3'}`}
          style={{ color: '#6b3f55', lineHeight: 1.7 }}
        >
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t"
          style={{ borderColor: 'rgba(245,198,216,0.3)' }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #f5c6d8, #e88ca8)' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <span className="font-sans text-xs truncate max-w-[120px]" style={{ color: '#9a6070' }}>
              {post.author?.displayName?.replace('Himpunan Mahasiswa Pendidikan Bahasa Inggris UNISSULA', 'HIMA PBI') || 'HIMA PBI'}
            </span>
          </div>

          <span className="flex items-center gap-1 font-sans text-xs font-medium transition-colors duration-200"
            style={{ color: '#c96b8a' }}>
            Read
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}
