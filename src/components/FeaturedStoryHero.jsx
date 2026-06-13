// src/components/FeaturedStoryHero.jsx
import { getExcerpt, formatDate, detectGenre, TAG_COLORS } from '../utils/helpers';
import arthaLogo from '../assets/artha.jpeg';

export default function FeaturedStoryHero({ featuredPost, onReadMore }) {
  if (!featuredPost) return <HeroSkeleton />;

  const excerpt = getExcerpt(featuredPost.content, 220);
  const genre = detectGenre(featuredPost.title, featuredPost.labels || []);
  const date = formatDate(featuredPost.published);

  return (
    <section className="relative pt-24 pb-20 flex items-center bg-hero-gradient lotus-bg overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245,198,216,0.3) 0%, transparent 70%)',
          transform: 'translate(30%, -20%)',
        }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,160,188,0.2) 0%, transparent 70%)',
          transform: 'translate(-30%, 20%)',
        }} />

      {/* Floating lotus logo */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center pointer-events-none">
        <div className="lotus-float opacity-10">
          <img src={arthaLogo} alt="" className="w-96 h-96 object-contain" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Main tagline */}
          <h1 className="font-serif mb-4 animate-slide-up"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              color: '#2e1a23',
              letterSpacing: '-0.01em',
            }}>
            Where Words
            <br />
            <em style={{ color: '#c96b8a' }}>Bloom</em> Into Stories
          </h1>

          <p className="font-sans text-base mb-8 max-w-lg animate-slide-up"
            style={{ color: '#7a4a60', lineHeight: 1.7, animationDelay: '0.1s' }}>
            Kumpulan cerpen, puisi, dan karya tulis kreatif dari mahasiswa Pendidikan Bahasa Inggris UNISSULA.
          </p>

          {/* Featured post card with Quote style */}
          <div className="glass-card rounded-2xl p-6 mb-8 animate-slide-up relative"
            style={{ animationDelay: '0.2s', maxWidth: '560px' }}>
            
            {/* Quote icon watermark */}
            <div className="absolute top-4 right-6 opacity-10 text-8xl font-serif text-rose-800 pointer-events-none" style={{ fontFamily: 'Georgia, serif' }}>
              "
            </div>

            <div className="flex items-center gap-2 mb-3 relative z-10">
              <span className={`tag-pill text-xs ${TAG_COLORS[genre.color]}`}
                style={{ padding: '0.2rem 0.75rem', fontSize: '0.7rem' }}>
                {genre.tag}
              </span>
              <span className="font-sans text-xs" style={{ color: '#b87a96' }}>{date}</span>
            </div>
            
            <h2 className="font-serif font-semibold mb-3 relative z-10"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.6rem',
                color: '#2e1a23',
                lineHeight: 1.3,
              }}>
              {featuredPost.title}
            </h2>
            
            <p className="font-serif italic text-base line-clamp-3 mb-5 relative z-10"
              style={{ color: '#8a4f6a', lineHeight: 1.7, fontFamily: 'Cormorant Garamond, serif' }}>
              "{excerpt}"
            </p>
            
            <button
              onClick={() => onReadMore(featuredPost)}
              className="btn-primary text-sm relative z-10"
            >
              Baca Selengkapnya
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60V30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0Z"
            fill="rgba(254,253,251,0.8)" />
        </svg>
      </div>
    </section>
  );
}

function HeroSkeleton() {
  return (
    <section className="pt-24 pb-20 flex items-center bg-hero-gradient lotus-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl space-y-6">
          <div className="skeleton h-20 w-full rounded" />
          <div className="skeleton h-16 w-3/4 rounded" />
          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="skeleton h-4 w-24 rounded-full" />
            <div className="skeleton h-8 w-full rounded" />
            <div className="skeleton h-16 w-full rounded" />
            <div className="skeleton h-10 w-32 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
