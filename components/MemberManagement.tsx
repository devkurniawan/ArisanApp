'use client';

import { motion } from 'motion/react';
import { Users, UserPlus, Trash2, CheckCircle, XCircle, Mail, Phone } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'pending' | 'inactive';
  joinedAt: string;
}

interface MemberManagementProps {
  members: Member[];
  onApprove: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function MemberManagement({ members, onApprove, onRemove }: MemberManagementProps) {
  return (
    <div className="bg-white rounded-[40px] border border-[#E4E3E0] overflow-hidden">
      <div className="p-8 border-b border-[#E4E3E0] flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-serif">Daftar Anggota</h3>
          <p className="text-[#9E9E9E] text-sm">Kelola siapa saja yang bergabung dalam grup ini.</p>
        </div>
        <button className="px-6 py-3 bg-[#F5F5F0] text-[#5A5A40] rounded-full font-bold flex items-center gap-2 hover:bg-[#E4E3E0] transition-all">
          <UserPlus size={20} />
          <span>Undang</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F5F5F0]/50">
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#9E9E9E]">Nama</th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#9E9E9E]">Kontak</th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#9E9E9E]">Status</th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#9E9E9E]">Bergabung</th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#9E9E9E] text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b border-[#E4E3E0] last:border-0 hover:bg-[#F5F5F0]/30 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#5A5A40] text-white flex items-center justify-center font-bold">
                      {member.name[0]}
                    </div>
                    <span className="font-bold">{member.name}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-[#9E9E9E]">
                      <Mail size={12} />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#9E9E9E]">
                      <Phone size={12} />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    member.status === 'active' ? 'bg-green-100 text-green-700' :
                    member.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-sm text-[#9E9E9E]">
                  {member.joinedAt}
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {member.status === 'pending' && (
                      <button 
                        onClick={() => onApprove(member.id)}
                        className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors"
                        title="Setujui"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => onRemove(member.id)}
                      className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
