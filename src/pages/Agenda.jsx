// src/pages/Agenda.jsx
import NewsCarousel from '../components/NewsCarousel';
import UpcomingEvents from '../components/UpcomingEvents';
import PastEvents from '../components/PastEvents';

export default function Agenda() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2e1a23] font-[Cormorant Garamond, serif]">
          Agenda & Berita
        </h1>
        <p className="text-[#9a6070] mt-4 max-w-2xl mx-auto">
          Ikuti terus perkembangan terbaru, kegiatan mendatang, dan rekam jejak program kerja HIMA PBI UNISSULA.
        </p>
      </div>

      <NewsCarousel />

      <div className="ornament-divider max-w-sm mx-auto px-8 mt-16 mb-8">
        <span className="font-serif italic text-sm text-[#d4a0bc] font-[Cormorant Garamond, serif] whitespace-nowrap">
          ✦ Kegiatan Mendatang ✦
        </span>
      </div>

      <UpcomingEvents />
      <PastEvents />
    </div>
  );
}
