'use client';

import { motion } from 'motion/react';
import { Wallet, CheckCircle, XCircle, Clock, FileText, ExternalLink } from 'lucide-react';

interface Payment {
  id: string;
  memberName: string;
  amount: string;
  period: string;
  status: 'paid' | 'pending' | 'late';
  proofUrl?: string;
  timestamp: string;
}

interface PaymentHistoryProps {
  payments: Payment[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function PaymentHistory({ payments, onApprove, onReject }: PaymentHistoryProps) {
  return (
    <div className="bg-white rounded-[40px] border border-[#E4E3E0] overflow-hidden">
      <div className="p-8 border-b border-[#E4E3E0] flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-serif">Riwayat Pembayaran</h3>
          <p className="text-[#9E9E9E] text-sm">Monitor iuran anggota untuk setiap periode.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#9E9E9E] uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Lunas</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#9E9E9E] uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#9E9E9E] uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span>Telat</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F5F5F0]/50">
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#9E9E9E]">Anggota</th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#9E9E9E]">Periode</th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#9E9E9E]">Jumlah</th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#9E9E9E]">Status</th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#9E9E9E]">Bukti</th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#9E9E9E] text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b border-[#E4E3E0] last:border-0 hover:bg-[#F5F5F0]/30 transition-colors group">
                <td className="px-8 py-6">
                  <span className="font-bold">{payment.memberName}</span>
                </td>
                <td className="px-8 py-6 text-sm text-[#5A5A40] font-medium">
                  Periode {payment.period}
                </td>
                <td className="px-8 py-6 font-serif text-[#141414]">
                  {payment.amount}
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    {payment.status === 'paid' ? <CheckCircle size={16} className="text-green-500" /> :
                     payment.status === 'pending' ? <Clock size={16} className="text-amber-500" /> :
                     <XCircle size={16} className="text-red-500" />}
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      payment.status === 'paid' ? 'text-green-700' :
                      payment.status === 'pending' ? 'text-amber-700' :
                      'text-red-700'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  {payment.proofUrl ? (
                    <a 
                      href={payment.proofUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-[#F5F5F0] text-[#5A5A40] rounded-xl hover:bg-[#E4E3E0] transition-colors inline-flex items-center gap-2 text-xs font-bold"
                    >
                      <FileText size={14} />
                      Lihat Bukti
                    </a>
                  ) : (
                    <span className="text-xs text-[#9E9E9E] italic">Tidak ada bukti</span>
                  )}
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {payment.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => onApprove(payment.id)}
                          className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors"
                          title="Setujui"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button 
                          onClick={() => onReject(payment.id)}
                          className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                          title="Tolak"
                        >
                          <XCircle size={18} />
                        </button>
                      </>
                    )}
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
