'use client';

import { motion } from 'motion/react';
import { Trophy, Calendar, User, ArrowRight } from 'lucide-react';

interface WinnerRecord {
  id: string;
  memberName: string;
  period: string;
  date: string;
  amount: string;
}

interface WinnerHistoryProps {
  winners: WinnerRecord[];
}

export default function WinnerHistory({ winners }: WinnerHistoryProps) {
  return (
    <div className="bg-white rounded-[40px] border border-[#E4E3E0] overflow-hidden">
      <div className="p-8 border-b border-[#E4E3E0]">
        <h3 className="text-2xl font-serif">Riwayat Pemenang</h3>
        <p className="text-[#9E9E9E] text-sm">Daftar anggota yang telah memenangkan arisan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {winners.map((winner, index) => (
          <motion.div
            key={winner.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-[#F5F5F0] rounded-[32px] border border-transparent hover:border-[#5A5A40]/20 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm">
                <Trophy size={24} />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-[#9E9E9E] uppercase tracking-widest">Periode</p>
                <p className="text-lg font-serif italic">{winner.period}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <User size={14} className="text-[#5A5A40]" />
                <span className="font-bold text-[#141414]">{winner.memberName}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#9E9E9E]">
                <Calendar size={14} />
                <span>{winner.date}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E4E3E0] flex justify-between items-center">
              <p className="text-sm font-bold text-[#5A5A40]">{winner.amount}</p>
              <ArrowRight size={16} className="text-[#E4E3E0] group-hover:text-[#5A5A40] transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
