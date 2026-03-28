'use client';

import { motion } from 'motion/react';
import { LayoutDashboard, Users, Wallet, Trophy, LogOut, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ activeTab, onTabChange, onLogout }: SidebarProps) {
  return (
    <aside className="w-72 bg-white border-r border-[#E4E3E0] flex flex-col p-8 sticky top-0 h-screen">
      <div className="mb-16 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#5A5A40] rounded-2xl flex items-center justify-center text-white">
          <ShieldCheck size={24} />
        </div>
        <h2 className="text-2xl font-serif italic tracking-tight">Arisan App</h2>
      </div>

      <nav className="flex-1 space-y-3">
        <SidebarItem 
          icon={<LayoutDashboard size={22} />} 
          label="Ringkasan" 
          active={activeTab === 'overview'} 
          onClick={() => onTabChange('overview')} 
        />
        <SidebarItem 
          icon={<Users size={22} />} 
          label="Grup Saya" 
          active={activeTab === 'groups'} 
          onClick={() => onTabChange('groups')} 
        />
        <SidebarItem 
          icon={<Wallet size={22} />} 
          label="Pembayaran" 
          active={activeTab === 'payments'} 
          onClick={() => onTabChange('payments')} 
        />
        <SidebarItem 
          icon={<Trophy size={22} />} 
          label="Pemenang" 
          active={activeTab === 'winners'} 
          onClick={() => onTabChange('winners')} 
        />
      </nav>

      <div className="mt-auto pt-8 border-t border-[#E4E3E0]">
        <div className="p-6 bg-[#F5F5F0] rounded-3xl mb-8">
          <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mb-2">Akun Anda</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5A5A40] text-white flex items-center justify-center font-bold">
              K
            </div>
            <div>
              <p className="text-sm font-bold truncate max-w-[120px]">Kurniawan</p>
              <p className="text-[10px] text-[#9E9E9E] font-medium">Admin</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 text-[#9E9E9E] hover:text-[#141414] transition-colors w-full px-4 py-2 font-medium"
        >
          <LogOut size={20} />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-3xl transition-all duration-300 ${
        active 
          ? 'bg-[#5A5A40] text-white shadow-xl shadow-[#5A5A40]/20' 
          : 'text-[#9E9E9E] hover:bg-[#F5F5F0] hover:text-[#141414]'
      }`}
    >
      <div className={`${active ? 'text-white' : 'text-[#5A5A40]'}`}>
        {icon}
      </div>
      <span className="font-bold text-sm tracking-wide">{label}</span>
    </button>
  );
}
