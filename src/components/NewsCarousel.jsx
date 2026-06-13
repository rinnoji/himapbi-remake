// src/components/NewsCarousel.jsx
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';

const NEWS_ITEMS = [
  {
    id: 1,
    title: 'Seminar Nasional Pendidikan Bahasa Inggris Berjalan Sukses',
    category: 'Berita',
    image: '/news_seminar.png',
    date: '20 Jan 2026',
    excerpt: 'Ratusan mahasiswa hadir untuk membahas masa depan pendidikan bahasa di era digital.',
  },
  {
    id: 2,
    title: 'Tim Debat HIMA PBI Raih Juara 1 Tingkat Universitas',
    category: 'Prestasi',
    image: '/news_debate.png',
    date: '15 Feb 2026',
    excerpt: 'Kemenangan membanggakan diraih oleh delegasi kita dalam kompetisi debat tahunan.',
  },
  {
    id: 3,
    title: 'Malam Literasi Memukau Pengunjung dengan Penampilan Menarik',
    category: 'Kegiatan',
    image: '/news_literary.png',
    date: '14 Feb 2026',
    excerpt: 'Penampilan puisi dan musikalisasi menyemarakkan malam apresiasi sastra.',
  },
];

export default function NewsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative max-w-5xl mx-auto my-8">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {NEWS_ITEMS.map((item) => (
            <div className="relative flex-[0_0_100%] min-w-0" key={item.id}>
              <div className="relative aspect-[16/9] md:aspect-[21/9]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute block w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                  <div className="flex gap-2 items-center mb-3">
                    <span className="px-2 py-1 rounded bg-rose-500 text-xs font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-sm font-medium text-gray-300">{item.date}</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-serif font-bold mb-2 font-[Cormorant Garamond, serif]">
                    {item.title}
                  </h2>
                  <p className="text-gray-200 text-sm md:text-base max-w-2xl line-clamp-2 font-sans">
                    {item.excerpt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur text-white transition-all"
        aria-label="Previous"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur text-white transition-all"
        aria-label="Next"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {NEWS_ITEMS.map((_, idx) => (
          <button
            key={idx}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              idx === selectedIndex ? 'bg-rose-400 w-6' : 'bg-white/50'
            }`}
            onClick={() => emblaApi && emblaApi.scrollTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
