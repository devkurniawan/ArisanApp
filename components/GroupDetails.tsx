'use client';

import { motion } from 'motion/react';
import { Users, Wallet, Trophy, Calendar, ShieldCheck, ArrowLeft, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import MemberManagement from './MemberManagement';
import PaymentHistory from './PaymentHistory';
import WinnerHistory from './WinnerHistory';

interface GroupDetailsProps {
  group: any;
  onBack: () => void;
}

export default function GroupDetails({ group, onBack }: GroupDetailsProps) {
  const [activeTab, setActiveTab] = useState('members');

  return (
    <div className="min-h-screen bg-[#F5F5F0] p-8 font-sans text-[#141414]">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="p-4 bg-white rounded-3xl border border-[#E4E3E0] text-[#5A5A40] hover:bg-[#F5F5F0] transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-4xl font-serif mb-2">{group.name}</h1>
            <div className="flex items-center gap-4 text-[#9E9E9E] text-sm">
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{group.members} Anggota</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet size={16} />
                <span>{group.contribution} / Periode</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-[#5A5A40] text-white rounded-full font-bold shadow-2xl shadow-[#5A5A40]/30 hover:bg-[#4A4A30] transition-all flex items-center gap-2">
            <Trophy size={20} />
            <span>Mulai Undian</span>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-4 mb-12 p-2 bg-white rounded-[40px] border border-[#E4E3E0] w-fit">
        <TabButton 
          active={activeTab === 'members'} 
          label="Anggota" 
          onClick={() => setActiveTab('members')} 
        />
        <TabButton 
          active={activeTab === 'payments'} 
          label="Pembayaran" 
          onClick={() => setActiveTab('payments')} 
        />
        <TabButton 
          active={activeTab === 'winners'} 
          label="Riwayat Pemenang" 
          onClick={() => setActiveTab('winners')} 
        />
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'members' && (
          <MemberManagement 
            members={[
              { id: '1', name: 'Kurniawan', email: 'dev.kurniawan.e@gmail.com', phone: '08123456789', status: 'active', joinedAt: '28 Mar 2026' },
              { id: '2', name: 'Budi Santoso', email: 'budi@example.com', phone: '08123456790', status: 'pending', joinedAt: '29 Mar 2026' },
            ]}
            onApprove={() => {}}
            onRemove={() => {}}
          />
        )}
        {activeTab === 'payments' && (
          <PaymentHistory 
            payments={[
              { id: '1', memberName: 'Kurniawan', amount: 'Rp 100.000', period: '1', status: 'paid', timestamp: '28 Mar 2026' },
              { id: '2', memberName: 'Budi Santoso', amount: 'Rp 100.000', period: '1', status: 'pending', timestamp: '29 Mar 2026', proofUrl: '#' },
            ]}
            onApprove={() => {}}
            onReject={() => {}}
          />
        )}
        {activeTab === 'winners' && (
          <WinnerHistory 
            winners={[
              { id: '1', memberName: 'Kurniawan', period: '1', date: '28 Mar 2026', amount: 'Rp 1.000.000' },
            ]}
          />
        )}
      </motion.div>
    </div>
  );
}

function TabButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-4 rounded-full font-bold text-sm transition-all ${
        active 
          ? 'bg-[#5A5A40] text-white shadow-lg shadow-[#5A5A40]/20' 
          : 'text-[#9E9E9E] hover:text-[#141414]'
      }`}
    >
      {label}
    </button>
  );
}
