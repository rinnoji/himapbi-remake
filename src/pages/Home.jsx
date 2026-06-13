// src/pages/Home.jsx
import HeroSection from '../components/HeroSection';
import StatsBar from '../components/StatsBar';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="pt-24">
      <HeroSection
        onSeeEvents={() => navigate('/agenda')}
        onReadStories={() => navigate('/karya')}
      />
      <StatsBar />
      {/* Short welcome section or vision */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2e1a23] mb-6 font-[Cormorant Garamond, serif]">
          Selamat Datang di HIMA PBI UNISSULA
        </h2>
        <p className="text-[#6b3f55] leading-relaxed text-lg mb-8">
          Kami adalah ruang tumbuh dan berkreasi bagi mahasiswa Pendidikan Bahasa Inggris Universitas Islam Sultan Agung. Melalui Kabinet Arthavistara Nirvata, kami berkomitmen untuk memperluas makna dan membawa ketenangan dalam setiap langkah organisasi.
        </p>
        <button
          onClick={() => navigate('/tentang-kami')}
          className="btn-ghost"
        >
          Pelajari Lebih Lanjut Tentang Kami
        </button>
      </section>
    </div>
  );
}
