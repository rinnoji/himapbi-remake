// src/pages/About.jsx
import { useEffect } from 'react';

const CABINET_TIMELINE = [
  {
    title: 'Pelantikan & Sumpah Jabatan',
    date: 'Maret 2025',
    description: 'Kabinet Arthavistara Nirvata resmi dilantik untuk periode 2025/2026. Sumpah jabatan diambil oleh Dekan Fakultas bersama jajaran pengurus.',
    image: '/about_inauguration.png',
  },
  {
    title: 'Rapat Kerja HIMA PBI',
    date: 'April 2025',
    description: 'Penyusunan program kerja satu periode dari berbagai departemen: R&D, Sosial Masyarakat, Hubungan Luar, dan Seni Budaya.',
    image: null,
  },
  {
    title: 'Bonding Night (Makrab)',
    date: 'Juni 2025',
    description: 'Malam keakraban seluruh pengurus dan anggota baru HIMA PBI. Kegiatan ini bertujuan mempererat kekeluargaan dan solidaritas.',
    image: '/about_farewell.png',
  },
];

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2e1a23] font-[Cormorant Garamond, serif] mb-4">
          Tentang Kami
        </h1>
        <p className="text-[#9a6070] text-lg max-w-2xl mx-auto">
          Mengenal lebih dekat perjalanan, visi, dan nilai-nilai yang dibawa oleh Kabinet Arthavistara Nirvata HIMA PBI UNISSULA.
        </p>
      </div>

      {/* Vision & Mission */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="glass-card rounded-2xl p-8 md:p-12 text-center" style={{ background: 'linear-gradient(135deg, rgba(255,253,251,0.9), rgba(245,198,216,0.15))' }}>
          <h2 className="font-serif text-3xl font-bold text-[#c96b8a] mb-6 font-[Cormorant Garamond, serif]">
            Visi Kami
          </h2>
          <p className="text-[#4a2a38] text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
            "Menjadikan HIMA PBI UNISSULA sebagai ruang harmonis dan dinamis yang memperluas kebermanfaatan (Arthavistara) dengan dilandasi ketenangan jiwa dan integritas (Nirvata) bagi seluruh civitas akademika."
          </p>
        </div>
      </section>

      {/* Cabinet Timeline */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, transparent, #f5a0bc)' }} />
          <h2 className="font-serif text-3xl font-bold text-[#2e1a23] font-[Cormorant Garamond, serif] text-center">
            Perjalanan Kabinet
          </h2>
          <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, #f5a0bc, transparent)' }} />
        </div>

        <div className="space-y-12 md:space-y-24">
          {CABINET_TIMELINE.map((item, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row gap-8 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              {/* Timeline content */}
              <div className="flex-1 md:w-1/2 text-center md:text-left">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[#c96b8a] bg-[#f5c6d8]/20 mb-3">
                  {item.date}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2e1a23] font-[Cormorant Garamond, serif] mb-4">
                  {item.title}
                </h3>
                <p className="text-[#6b3f55] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Timeline image */}
              <div className="flex-1 md:w-1/2 w-full">
                {item.image ? (
                  <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video md:aspect-[4/3]">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none" />
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden shadow-sm aspect-video md:aspect-[4/3] bg-gradient-to-br from-[#fefdfb] to-[#f5c6d8]/30 flex items-center justify-center border border-[#f5c6d8]/50">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d4a0bc" strokeWidth="1">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
