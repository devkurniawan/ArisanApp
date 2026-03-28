'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, LogIn, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center p-6 font-sans text-[#141414]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white p-12 rounded-[40px] shadow-2xl shadow-[#5A5A40]/10 border border-[#E4E3E0]"
      >
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-[#F5F5F0] rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="text-[#5A5A40]" size={32} />
          </div>
          <h1 className="text-3xl font-serif mb-2">Selamat Datang</h1>
          <p className="text-[#9E9E9E]">Masuk untuk mengelola arisan Anda dengan aman.</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className={`w-full py-4 rounded-full font-medium flex items-center justify-center gap-3 transition-all ${
              isLoading 
                ? 'bg-[#F5F5F0] text-[#9E9E9E] cursor-not-allowed' 
                : 'bg-[#5A5A40] text-white hover:bg-[#4A4A30] shadow-lg shadow-[#5A5A40]/20'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-[#9E9E9E] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={20} />
                <span>Masuk dengan Google</span>
              </>
            )}
          </button>

          <Link
            href="/"
            className="w-full py-4 rounded-full font-medium text-[#5A5A40] border border-[#E4E3E0] flex items-center justify-center gap-2 hover:bg-[#F5F5F0] transition-all"
          >
            <ArrowLeft size={18} />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E4E3E0] text-center">
          <p className="text-xs text-[#9E9E9E] leading-relaxed">
            Dengan masuk, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi kami. 
            Data Anda akan dikelola secara transparan.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
