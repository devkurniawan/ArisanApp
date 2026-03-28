'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Wallet, ShieldCheck, Upload, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupName: string;
  amount: string;
  period: string;
  onSubmit: (data: any) => void;
}

export default function PaymentModal({ isOpen, onClose, groupName, amount, period, onSubmit }: PaymentModalProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[48px] shadow-2xl p-12 overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-3 bg-[#F5F5F0] rounded-full text-[#9E9E9E] hover:text-[#141414] transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mb-12">
              <div className="w-16 h-16 bg-[#F5F5F0] rounded-3xl flex items-center justify-center text-[#5A5A40] mb-6">
                <Wallet size={32} />
              </div>
              <h2 className="text-3xl font-serif">Konfirmasi Pembayaran</h2>
              <p className="text-[#9E9E9E]">Selesaikan iuran Anda untuk periode ini.</p>
            </div>

            <div className="p-8 bg-[#F5F5F0] rounded-[32px] mb-10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-[#9E9E9E] uppercase tracking-widest">Grup</span>
                <span className="font-serif text-lg">{groupName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-[#9E9E9E] uppercase tracking-widest">Periode</span>
                <span className="font-serif text-lg">{period}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-[#E4E3E0]">
                <span className="text-sm font-bold text-[#9E9E9E] uppercase tracking-widest">Total Iuran</span>
                <span className="text-2xl font-serif text-[#5A5A40]">{amount}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#9E9E9E] ml-4">Bukti Transfer</label>
                <button
                  onClick={handleUpload}
                  disabled={isUploading || isSuccess}
                  className={`w-full p-10 border-2 border-dashed rounded-[32px] flex flex-col items-center justify-center gap-4 transition-all ${
                    isSuccess 
                      ? 'bg-green-50 border-green-200 text-green-600' 
                      : 'bg-[#F5F5F0] border-[#E4E3E0] text-[#9E9E9E] hover:border-[#5A5A40]/30'
                  }`}
                >
                  {isSuccess ? (
                    <>
                      <CheckCircle2 size={40} />
                      <span className="font-bold">Bukti Terunggah</span>
                    </>
                  ) : isUploading ? (
                    <>
                      <div className="w-10 h-10 border-4 border-[#5A5A40] border-t-transparent rounded-full animate-spin" />
                      <span className="font-bold">Mengunggah...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={40} />
                      <div className="text-center">
                        <p className="font-bold text-[#141414]">Klik untuk Unggah</p>
                        <p className="text-xs">Format: JPG, PNG, PDF (Maks. 5MB)</p>
                      </div>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => onSubmit({})}
                disabled={!isSuccess}
                className={`w-full py-5 rounded-full font-bold text-lg transition-all ${
                  isSuccess 
                    ? 'bg-[#5A5A40] text-white shadow-2xl shadow-[#5A5A40]/30 hover:bg-[#4A4A30]' 
                    : 'bg-[#F5F5F0] text-[#9E9E9E] cursor-not-allowed'
                }`}
              >
                Konfirmasi Pembayaran
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
