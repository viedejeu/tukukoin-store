"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Save, CheckCircle2 } from "lucide-react";
import { Sultan } from "@/data/sultans";
import { getSultans, saveSultan, deleteSultan } from "@/app/actions/sultanActions";
import toast from 'react-hot-toast';

export default function LeaderboardManager() {
  const [sultans, setSultans] = useState<Sultan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const emptySultan: Sultan = {
    id: "",
    rank: 0,
    name: "",
    maskedPhone: "",
    amount: 0,
    favoriteGame: "Mobile Legends"
  };

  const [formData, setFormData] = useState<Sultan>(emptySultan);

  useEffect(() => {
    loadSultans();
  }, []);

  const loadSultans = async () => {
    const data = await getSultans();
    setSultans(data);
    setIsLoading(false);
  };

  const handleOpenModal = (sultan?: Sultan) => {
    if (sultan) {
      setFormData(sultan);
    } else {
      setFormData(emptySultan);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const res = await saveSultan(formData);
      if (res.success) {
        toast.success("Berhasil menyimpan data Leaderboard!");
        setIsModalOpen(false);
        loadSultans();
      } else {
        toast.error("Gagal menyimpan data.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      await deleteSultan(id);
      toast.success("Data dihapus!");
      loadSultans();
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Manajemen Leaderboard</h1>
          <p className="text-sm text-gray-400 mt-1">Kelola data pancingan (decoy) atau data asli top spender bulan ini.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-gold hover:bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Data
        </button>
      </div>

      <div className="bg-black-light border border-black-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-black-dark/50 border-b border-black-border">
              <tr>
                <th className="px-6 py-4 font-medium text-left">Peringkat</th>
                <th className="px-6 py-4 font-medium text-left">Nama / ID</th>
                <th className="px-6 py-4 font-medium text-left">Total Belanja</th>
                <th className="px-6 py-4 font-medium text-left">Game Favorit</th>
                <th className="px-6 py-4 font-medium text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black-border">
              {sultans.map((s) => (
                <tr key={s.id} className="hover:bg-black-border/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-yellow-500">#{s.rank}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-white">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.maskedPhone}</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-gold">Rp {s.amount.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4">{s.favoriteGame}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleOpenModal(s)} className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {sultans.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Belum ada data Leaderboard.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80  overflow-y-auto">
          <div className="bg-black-light border border-black-border rounded-2xl w-full max-w-xl my-8 relative flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-black-border flex-shrink-0">
              <h2 className="text-xl font-bold text-white">{formData.id ? 'Edit Data' : 'Tambah Data'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-grow custom-scrollbar">
              <form id="sultanForm" onSubmit={handleSave} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Nickname (Nama Keren)</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    placeholder="Contoh: RRQ_Lemon"
                    className="w-full bg-background border border-black-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Nomor HP (Samarkan)</label>
                  <input 
                    type="text" 
                    value={formData.maskedPhone}
                    onChange={(e) => setFormData({...formData, maskedPhone: e.target.value})}
                    required
                    placeholder="Contoh: 0812****8899"
                    className="w-full bg-background border border-black-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Total Belanja (Angka)</label>
                  <input 
                    type="number" 
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                    required
                    placeholder="Contoh: 15500000"
                    className="w-full bg-background border border-black-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Game Favorit</label>
                  <input 
                    type="text" 
                    value={formData.favoriteGame}
                    onChange={(e) => setFormData({...formData, favoriteGame: e.target.value})}
                    required
                    placeholder="Contoh: Mobile Legends"
                    className="w-full bg-background border border-black-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-black-border flex justify-end gap-3 flex-shrink-0 bg-black-light rounded-b-2xl">
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Batal
              </button>
              <button 
                type="submit"
                form="sultanForm"
                disabled={isSaving}
                className="bg-gold hover:bg-yellow-500 text-black px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Menyimpan...' : (
                  <>
                    <Save className="w-4 h-4" />
                    Simpan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
