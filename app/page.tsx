'use client';

import { motion } from 'motion/react';
import { Users, Wallet, Trophy, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#141414] font-sans">
      {/* Hero Section */}
      <header className="px-6 py-20 md:py-32 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-8xl font-serif font-light tracking-tight leading-tight mb-6">
            Arisan <span className="italic">Modern</span>.
          </h1>
          <p className="text-lg md:text-xl text-[#5A5A40] max-w-2xl mx-auto mb-10 leading-relaxed">
            Kelola arisan kelompok Anda dengan transparansi penuh. Monitor pembayaran, 
            pemenang, dan jadwal secara otomatis dalam satu platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-[#5A5A40] text-white rounded-full font-medium hover:bg-[#4A4A30] transition-colors flex items-center gap-2"
            >
              Mulai Sekarang <ArrowRight size={18} />
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 border border-[#5A5A40] text-[#5A5A40] rounded-full font-medium hover:bg-white transition-colors"
            >
              Pelajari Fitur
            </Link>
          </div>
        </motion.div>
      </header>

      {/* Features Grid */}
      <section id="features" className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Users className="text-[#5A5A40]" size={32} />}
              title="Manajemen Anggota"
              description="Kelola data anggota dengan mudah. Tambah, edit, dan pantau status keaktifan setiap peserta."
            />
            <FeatureCard
              icon={<Wallet className="text-[#5A5A40]" size={32} />}
              title="Monitoring Pembayaran"
              description="Catat iuran secara manual atau upload bukti transfer. Status pembayaran terpantau secara real-time."
            />
            <FeatureCard
              icon={<Trophy className="text-[#5A5A40]" size={32} />}
              title="Pemilihan Pemenang"
              description="Sistem pengundian acak yang transparan dengan riwayat pemenang yang tercatat rapi."
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-6 py-20 bg-[#F5F5F0]">
        <div className="max-w-4xl mx-auto text-center">
          <ShieldCheck className="mx-auto text-[#5A5A40] mb-6" size={48} />
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Aman & Transparan</h2>
          <p className="text-[#5A5A40] text-lg leading-relaxed">
            Kami mengutamakan kepercayaan dalam setiap kelompok arisan. 
            Semua data tersimpan dengan aman dan dapat diakses oleh admin maupun anggota untuk transparansi penuh.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-[#E4E3E0] text-center text-[#9E9E9E] text-sm">
        <p>© 2026 Arisan App. Dibuat untuk kemudahan komunitas.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 rounded-3xl bg-[#F5F5F0] border border-transparent hover:border-[#5A5A40]/20 transition-all"
    >
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-serif mb-4">{title}</h3>
      <p className="text-[#5A5A40] leading-relaxed">{description}</p>
    </motion.div>
  );
}
