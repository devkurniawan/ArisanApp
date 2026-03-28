'use client';

import { motion } from 'motion/react';
import { Users, Wallet, Trophy, ChevronRight, Calendar } from 'lucide-react';

interface GroupCardProps {
  name: string;
  members: number;
  contribution: string;
  nextDraw: string;
  status: 'active' | 'pending' | 'completed';
  onClick?: () => void;
}

export default function GroupCard({ name, members, contribution, nextDraw, status, onClick }: GroupCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-700',
    pending: 'bg-amber-100 text-amber-700',
    completed: 'bg-blue-100 text-blue-700',
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-white p-8 rounded-[32px] border border-[#E4E3E0] hover:border-[#5A5A40]/30 transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${statusColors[status]}`}>
          {status}
        </div>
        <ChevronRight size={20} className="text-[#E4E3E0] group-hover:text-[#5A5A40] transition-colors" />
      </div>

      <h3 className="text-2xl font-serif mb-6 group-hover:text-[#5A5A40] transition-colors">{name}</h3>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-[#5A5A40]">
          <div className="p-2 bg-[#F5F5F0] rounded-xl">
            <Users size={18} />
          </div>
          <span className="text-sm font-medium">{members} Anggota</span>
        </div>

        <div className="flex items-center gap-3 text-[#5A5A40]">
          <div className="p-2 bg-[#F5F5F0] rounded-xl">
            <Wallet size={18} />
          </div>
          <span className="text-sm font-medium">{contribution} / Periode</span>
        </div>

        <div className="flex items-center gap-3 text-[#5A5A40]">
          <div className="p-2 bg-[#F5F5F0] rounded-xl">
            <Calendar size={18} />
          </div>
          <span className="text-sm font-medium">Next: {nextDraw}</span>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[#F5F5F0]">
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-[#E4E3E0] flex items-center justify-center text-[10px] font-bold text-[#9E9E9E]">
              {String.fromCharCode(64 + i)}
            </div>
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-white bg-[#F5F5F0] flex items-center justify-center text-[10px] font-bold text-[#5A5A40]">
            +{members - 4}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
