'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Users, Wallet, Trophy, LayoutDashboard, PlusCircle, LogOut, ChevronRight, Search, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import GroupCard from '@/components/GroupCard';
import GroupDetails from '@/components/GroupDetails';
import CreateGroupModal from '@/components/CreateGroupModal';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { profile, logout, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#5A5A40] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  if (selectedGroup) {
    return <GroupDetails group={selectedGroup} onBack={() => setSelectedGroup(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex font-sans text-[#141414]">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} />

      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-16">
          <div>
            <h1 className="text-4xl font-serif mb-2">Selamat Datang, <span className="italic">{profile?.displayName || 'Kurniawan'}</span></h1>
            <p className="text-[#9E9E9E] text-lg font-medium">Pantau aktivitas arisan Anda hari ini.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] group-hover:text-[#5A5A40] transition-colors" size={20} />
              <input 
                placeholder="Cari grup..." 
                className="pl-12 pr-6 py-4 bg-white rounded-full border border-[#E4E3E0] focus:border-[#5A5A40]/30 outline-none transition-all w-64"
              />
            </div>
            <button className="p-4 bg-white rounded-full border border-[#E4E3E0] text-[#9E9E9E] hover:text-[#5A5A40] transition-colors relative">
              <Bell size={24} />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="px-8 py-4 bg-[#5A5A40] text-white rounded-full font-bold shadow-2xl shadow-[#5A5A40]/30 hover:bg-[#4A4A30] transition-all flex items-center gap-3"
            >
              <PlusCircle size={22} />
              <span>Buat Grup</span>
            </button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <StatCard label="Total Grup" value="3" icon={<LayoutDashboard size={28} />} />
              <StatCard label="Menunggu Bayar" value="Rp 500.000" icon={<Wallet size={28} />} />
              <StatCard label="Total Pemenang" value="12" icon={<Trophy size={28} />} />
            </div>

            {/* Groups Section */}
            <section className="mb-16">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif">Grup Arisan Aktif</h2>
                <button 
                  onClick={() => setActiveTab('groups')}
                  className="text-[#5A5A40] font-bold hover:underline flex items-center gap-2"
                >
                  Lihat Semua <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockGroups.map((group) => (
                  <GroupCard 
                    key={group.id} 
                    {...group} 
                    onClick={() => setSelectedGroup(group)} 
                  />
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif">Aktivitas Terbaru</h2>
              </div>
              
              <div className="bg-white rounded-[40px] border border-[#E4E3E0] overflow-hidden shadow-sm">
                <ActivityItem 
                  title="Pembayaran Diterima" 
                  desc="Budi membayar iuran Arisan Keluarga (Periode 5)" 
                  time="2 jam yang lalu" 
                  status="success"
                />
                <ActivityItem 
                  title="Pemenang Baru" 
                  desc="Siti memenangkan Arisan Kantor (Periode 3)" 
                  time="5 jam yang lalu" 
                  status="winner"
                />
                <ActivityItem 
                  title="Grup Baru Dibuat" 
                  desc="Anda membuat grup Arisan Teman SMA" 
                  time="Kemarin" 
                  status="neutral"
                />
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'groups' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {mockGroups.map((group) => (
              <GroupCard 
                key={group.id} 
                {...group} 
                onClick={() => setSelectedGroup(group)} 
              />
            ))}
          </motion.div>
        )}
      </main>

      <CreateGroupModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSubmit={(data) => {
          console.log(data);
          setIsCreateModalOpen(false);
        }} 
      />
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-10 rounded-[40px] border border-[#E4E3E0] flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
      <div>
        <p className="text-[#9E9E9E] text-xs font-bold mb-2 uppercase tracking-[0.2em]">{label}</p>
        <p className="text-3xl font-serif">{value}</p>
      </div>
      <div className="p-5 bg-[#F5F5F0] rounded-[24px] text-[#5A5A40]">
        {icon}
      </div>
    </div>
  );
}

function ActivityItem({ title, desc, time, status }: { title: string; desc: string; time: string; status: 'success' | 'winner' | 'neutral' }) {
  return (
    <div className="p-8 border-b border-[#E4E3E0] last:border-0 flex items-center justify-between hover:bg-[#F5F5F0]/50 transition-all cursor-pointer group">
      <div className="flex items-center gap-6">
        <div className={`w-3 h-3 rounded-full ${
          status === 'success' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 
          status === 'winner' ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]' : 
          'bg-[#9E9E9E]'
        }`} />
        <div>
          <h4 className="text-lg font-bold group-hover:text-[#5A5A40] transition-colors">{title}</h4>
          <p className="text-[#9E9E9E] font-medium">{desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-sm font-bold text-[#9E9E9E] uppercase tracking-widest">{time}</span>
        <div className="p-2 bg-transparent group-hover:bg-white rounded-full transition-all">
          <ChevronRight size={20} className="text-[#E4E3E0] group-hover:text-[#5A5A40]" />
        </div>
      </div>
    </div>
  );
}
