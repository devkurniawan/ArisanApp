'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Wallet, Calendar, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const groupSchema = z.object({
  name: z.string().min(3, 'Nama grup minimal 3 karakter'),
  contribution: z.number().min(1000, 'Iuran minimal Rp 1.000'),
  frequency: z.enum(['weekly', 'monthly']),
  maxMembers: z.number().min(2, 'Anggota minimal 2 orang'),
  system: z.enum(['random', 'sequential', 'manual']),
});

type GroupFormValues = z.infer<typeof groupSchema>;

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GroupFormValues) => void;
}

export default function CreateGroupModal({ isOpen, onClose, onSubmit }: CreateGroupModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<GroupFormValues>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      frequency: 'monthly',
      system: 'random',
      maxMembers: 10,
    }
  });

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
            className="relative w-full max-w-2xl bg-white rounded-[48px] shadow-2xl p-12 overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-3 bg-[#F5F5F0] rounded-full text-[#9E9E9E] hover:text-[#141414] transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mb-12">
              <div className="w-16 h-16 bg-[#F5F5F0] rounded-3xl flex items-center justify-center text-[#5A5A40] mb-6">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-3xl font-serif">Buat Grup Arisan Baru</h2>
              <p className="text-[#9E9E9E]">Tentukan aturan main untuk kelompok arisan Anda.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Group Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#9E9E9E] ml-4">Nama Grup</label>
                  <input
                    {...register('name')}
                    placeholder="Contoh: Arisan Keluarga"
                    className="w-full px-8 py-4 bg-[#F5F5F0] rounded-3xl border-2 border-transparent focus:border-[#5A5A40]/30 outline-none transition-all"
                  />
                  {errors.name && <p className="text-xs text-red-500 ml-4">{errors.name.message}</p>}
                </div>

                {/* Contribution */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#9E9E9E] ml-4">Iuran (Rp)</label>
                  <input
                    type="number"
                    {...register('contribution', { valueAsNumber: true })}
                    placeholder="Contoh: 100000"
                    className="w-full px-8 py-4 bg-[#F5F5F0] rounded-3xl border-2 border-transparent focus:border-[#5A5A40]/30 outline-none transition-all"
                  />
                  {errors.contribution && <p className="text-xs text-red-500 ml-4">{errors.contribution.message}</p>}
                </div>

                {/* Frequency */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#9E9E9E] ml-4">Jadwal</label>
                  <select
                    {...register('frequency')}
                    className="w-full px-8 py-4 bg-[#F5F5F0] rounded-3xl border-2 border-transparent focus:border-[#5A5A40]/30 outline-none transition-all appearance-none"
                  >
                    <option value="weekly">Mingguan</option>
                    <option value="monthly">Bulanan</option>
                  </select>
                </div>

                {/* Max Members */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#9E9E9E] ml-4">Maks. Anggota</label>
                  <input
                    type="number"
                    {...register('maxMembers', { valueAsNumber: true })}
                    className="w-full px-8 py-4 bg-[#F5F5F0] rounded-3xl border-2 border-transparent focus:border-[#5A5A40]/30 outline-none transition-all"
                  />
                </div>

                {/* System */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#9E9E9E] ml-4">Sistem Pemenang</label>
                  <div className="grid grid-cols-3 gap-4">
                    <SystemOption 
                      active={true} 
                      label="Acak" 
                      onClick={() => {}} 
                    />
                    <SystemOption 
                      active={false} 
                      label="Urut" 
                      onClick={() => {}} 
                    />
                    <SystemOption 
                      active={false} 
                      label="Manual" 
                      onClick={() => {}} 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full py-5 bg-[#5A5A40] text-white rounded-full font-bold text-lg shadow-2xl shadow-[#5A5A40]/30 hover:bg-[#4A4A30] transition-all"
                >
                  Buat Grup Sekarang
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function SystemOption({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-4 rounded-2xl font-bold text-sm transition-all border-2 ${
        active 
          ? 'bg-[#5A5A40] text-white border-[#5A5A40]' 
          : 'bg-[#F5F5F0] text-[#9E9E9E] border-transparent hover:border-[#E4E3E0]'
      }`}
    >
      {label}
    </button>
  );
}
