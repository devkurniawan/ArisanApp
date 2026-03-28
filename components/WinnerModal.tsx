'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, ShieldCheck, Sparkles, PartyPopper } from 'lucide-react';
import { useState, useEffect } from 'react';

interface WinnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupName: string;
  members: string[];
}

export default function WinnerModal({ isOpen, onClose, groupName, members }: WinnerModalProps) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDrawing) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % members.length);
      }, 100);
      
      setTimeout(() => {
        clearInterval(interval);
        const randomWinner = members[Math.floor(Math.random() * members.length)];
        setWinner(randomWinner);
        setIsDrawing(false);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isDrawing, members]);

  const startDraw = () => {
    setIsDrawing(true);
    setWinner(null);
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
            className="relative w-full max-w-lg bg-white rounded-[48px] shadow-2xl p-12 overflow-hidden text-center"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-3 bg-[#F5F5F0] rounded-full text-[#9E9E9E] hover:text-[#141414] transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mb-12">
              <div className="w-16 h-16 bg-[#F5F5F0] rounded-3xl flex items-center justify-center text-[#5A5A40] mx-auto mb-6">
                <Trophy size={32} />
              </div>
              <h2 className="text-3xl font-serif">Undian Pemenang</h2>
              <p className="text-[#9E9E9E]">{groupName}</p>
            </div>

            <div className="relative h-48 flex items-center justify-center mb-12 bg-[#F5F5F0] rounded-[40px] border-2 border-dashed border-[#E4E3E0] overflow-hidden">
              {isDrawing ? (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-serif text-[#5A5A40]"
                >
                  {members[currentIndex]}
                </motion.div>
              ) : winner ? (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-4"
                >
                  <PartyPopper size={48} className="text-amber-500" />
                  <div className="text-4xl font-serif text-[#141414]">{winner}</div>
                  <p className="text-sm font-bold text-amber-600 uppercase tracking-widest">Selamat! Anda Menang</p>
                </motion.div>
              ) : (
                <div className="text-[#9E9E9E] font-medium italic">Siap untuk mengundi?</div>
              )}
            </div>

            <div className="space-y-4">
              {!winner && (
                <button
                  onClick={startDraw}
                  disabled={isDrawing}
                  className={`w-full py-5 rounded-full font-bold text-lg transition-all ${
                    isDrawing 
                      ? 'bg-[#F5F5F0] text-[#9E9E9E] cursor-not-allowed' 
                      : 'bg-[#5A5A40] text-white shadow-2xl shadow-[#5A5A40]/30 hover:bg-[#4A4A30]'
                  }`}
                >
                  {isDrawing ? 'Mengundi...' : 'Mulai Undian'}
                </button>
              )}
              
              {winner && (
                <button
                  onClick={onClose}
                  className="w-full py-5 bg-[#5A5A40] text-white rounded-full font-bold text-lg shadow-2xl shadow-[#5A5A40]/30 hover:bg-[#4A4A30] transition-all"
                >
                  Selesai
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
