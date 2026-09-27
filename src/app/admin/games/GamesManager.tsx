"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, X, UploadCloud, Save, CheckCircle2, ArrowUp, ArrowDown } from "lucide-react";
import { Game } from "@/data/games";
import { addGame, updateGame, deleteGame, bulkDeleteGames, reorderGame } from "@/app/actions/gamesActions";
import toast from 'react-hot-toast';
import RichTextEditor from "@/components/RichTextEditor";

export default function GamesManager({ initialGames }: { initialGames: Game[] }) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const router = useRouter();

  const emptyGame: Game = {
    id: "",
    name: "",
    slug: "",
    description: "",
    image: "",
    developer: "",
    isAvailable: true,
      seoContent: "",
    currency: "",
    externalUrl: ""
  };
  const [formData, setFormData] = useState<Game>(emptyGame);

  const handleOpenModal = (game?: Game) => {
    if (game) {
      setEditingId(game.id);
      setFormData(game);
    } else {
      setEditingId(null);
      setFormData({ ...emptyGame, id: `g${Date.now()}` }); // Generate simple ID
    }
    setIsModalOpen(true);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      const data = await res.json();
      
      if (res.ok && data.url) {
        setFormData({ ...formData, image: data.url });
        toast.success("Gambar berhasil diunggah!");
      } else {
        toast.error(data.error || "Gagal mengunggah");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat mengunggah.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Auto-generate slug from name if empty
      const finalData = { 
        ...formData, 
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      };

      if (editingId) {
        await updateGame(editingId, finalData);
        setGames(games.map(g => g.id === editingId ? finalData : g));
        toast.success("Game berhasil diperbarui");
      } else {
        await addGame(finalData);
        setGames([...games, finalData]);
        toast.success("Game berhasil ditambahkan");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan data.");
    } finally {
      setIsSaving(false);
    }
  };

  
  const handleReorder = async (gameId: string, direction: 'up' | 'down') => {
    try {
      const res = await reorderGame(gameId, direction);
      if (res.success) {
        toast.success("Urutan berhasil diperbarui!");
        router.refresh();
      } else {
        toast.error(res.message || "Gagal mengubah urutan.");
      }
    } catch (error) {
      toast.error("Kesalahan sistem.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus game ini?")) {
      try {
        await deleteGame(id);
        setGames(games.filter(g => g.id !== id));
        setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        toast.success("Game berhasil dihapus");
      } catch (error) {
        console.error(error);
        toast.error("Gagal menghapus game");
      }
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(games.map(g => g.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.length} game terpilih?`)) {
      try {
        await bulkDeleteGames(selectedIds);
        setGames(games.filter(g => !selectedIds.includes(g.id)));
        setSelectedIds([]);
        toast.success(`${selectedIds.length} game berhasil dihapus`);
      } catch (error) {
        console.error(error);
        toast.error("Gagal menghapus game massal");
      }
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4 gap-3">
        {selectedIds.length > 0 && (
          <button 
            onClick={handleBulkDelete}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2.5 rounded-lg font-bold text-sm transition-all border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
          >
            <Trash2 className="w-4 h-4" /> Hapus Terpilih ({selectedIds.length})
          </button>
        )}
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-gold hover:bg-yellow-500 text-black px-4 py-2.5 rounded-lg font-bold text-sm transition-all shadow-[0_0_15px_rgba(255,95,0,0.2)]"
        >
          <Plus className="w-4 h-4" /> Tambah Game Baru
        </button>
      </div>

      <div className="bg-black-light border border-black-border rounded-xl overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-black-border/50 text-gray-400">
            <tr>
              <th className="px-6 py-4 font-medium text-left w-12">
                <input 
                  type="checkbox" 
                  checked={games.length > 0 && selectedIds.length === games.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-600 text-gold focus:ring-gold bg-black-dark w-4 h-4 cursor-pointer"
                />
              </th>
              <th className="px-6 py-4 font-medium text-left">Aksi</th>
              <th className="px-6 py-4 font-medium text-left">Game</th>
              <th className="px-6 py-4 font-medium text-left">Penerbit</th>
              <th className="px-6 py-4 font-medium text-left">Status</th>
              <th className="px-6 py-4 font-medium text-left">Mata Uang</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black-border">
            {games.map((game) => (
              <tr key={game.id} className="hover:bg-black-border/30 transition-colors">
                <td className="px-6 py-4">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.includes(game.id)}
                    onChange={() => handleSelectOne(game.id)}
                    className="rounded border-gray-600 text-gold focus:ring-gold bg-black-dark w-4 h-4 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleOpenModal(game)} className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-colors" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(game.id)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors" title="Hapus">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-white flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={game.image} alt={game.name} className="w-10 h-10 rounded-lg object-cover border border-black-border" />
                  <span className="whitespace-nowrap">{game.name}</span>
                </td>
                <td className="px-6 py-4 text-gray-400 whitespace-nowrap">{game.developer}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {game.isAvailable ? (
                    <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded-md text-xs font-medium border border-green-500/20">Tersedia</span>
                  ) : (
                    <span className="bg-gray-500/10 text-gray-400 px-2 py-1 rounded-md text-xs font-medium border border-gray-500/20">Segera Hadir</span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-400 whitespace-nowrap">{game.currency}</td>
              </tr>
            ))}
            {games.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                  Belum ada game. Klik &quot;Tambah Game Baru&quot; untuk mulai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 ">
          <div className="bg-[#0A0A0A] border border-black-border rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="sticky top-0 bg-[#0A0A0A] border-b border-black-border px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-white">{editingId ? "Edit Game" : "Tambah Game Baru"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto">
              
              {/* Gambar Cover */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex justify-between items-center">
                  <span>Ikon / Logo Game</span>
                  {formData.image && <span className="text-xs text-green-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Terpasang</span>}
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  {formData.image && (
                    <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden border border-black-border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className={`relative flex-1 border-2 border-dashed ${isUploading ? 'border-gold bg-gold/5' : 'border-black-border hover:border-gray-500'} rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors w-full h-24`}>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleUpload}
                      disabled={isUploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <div className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <UploadCloud className={`w-5 h-5 ${isUploading ? 'text-gold animate-bounce' : ''}`} />
                      {isUploading ? 'Mengunggah...' : (formData.image ? 'Ganti Gambar' : 'Klik untuk Unggah Gambar')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Nama Game</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Contoh: Royal Dream"
                    className="w-full bg-background border border-black-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Slug (Otomatis jika kosong)</label>
                  <input 
                    type="text" 
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                    placeholder="royal-dream"
                    className="w-full bg-background border border-black-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold text-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Deskripsi Singkat</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={2}
                  className="w-full bg-background border border-black-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Penerbit (Developer)</label>
                  <input 
                    type="text" 
                    value={formData.developer}
                    onChange={(e) => setFormData({...formData, developer: e.target.value})}
                    placeholder="Contoh: Higgs Games"
                    className="w-full bg-background border border-black-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Nama Mata Uang (Cth: Diamond)</label>
                  <input 
                    type="text" 
                    value={formData.currency}
                    onChange={(e) => setFormData({...formData, currency: e.target.value})}
                    className="w-full bg-background border border-black-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Kategori Etalase</label>
                <select 
                  value={formData.category || "Game Populer"}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-background border border-black-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                >
                  <option value="Game Populer">Game Populer</option>
                  <option value="Voucher Game">Voucher Game</option>
                  <option value="Pulsa & Data">Pulsa & Data</option>
                  <option value="E-Wallet">E-Wallet</option>
                  <option value="Tagihan & Utilitas">Tagihan & Utilitas</option>
                </select>
              </div>

              <div className="space-y-2 border border-black-border p-4 rounded-lg bg-black-border/20">
                <label className="text-sm font-bold text-gold">Tautan Web Tujuan (Opsional)</label>
                <p className="text-xs text-gray-400 mb-2">Jika diisi, saat game diklik, user akan langsung dialihkan ke URL ini (misal: web Anda yang lain) dan tidak membuka form top up default.</p>
                <input 
                  type="text" 
                  value={formData.externalUrl || ""}
                  onChange={(e) => setFormData({...formData, externalUrl: e.target.value})}
                  placeholder="https://tukukoin.com/..."
                  className="w-full bg-background border border-black-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                />
              </div>

              
              <div className="space-y-2 mt-4 border-t border-black-border pt-4">
                <label className="text-sm font-bold text-gray-300">Teks Siluman (SEO Content Block)</label>
                <p className="text-xs text-gray-400 mb-2">Tulis teks 500+ kata (Sejarah game, trik, kata kunci panjang) untuk dimakan robot Google. Teks ini akan otomatis dilipat (Expandable) di halaman pembeli agar tidak mengganggu transaksi.</p>
                <RichTextEditor 
                  content={formData.seoContent || ""}
                  onChange={(val) => setFormData({...formData, seoContent: val})}
                />
              </div>

              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({...formData, isAvailable: e.target.checked})}
                  className="w-5 h-5 accent-gold cursor-pointer"
                />
                <label htmlFor="isAvailable" className="text-sm font-medium text-white cursor-pointer">
                  Tampilkan game ini sebagai &quot;Tersedia&quot;
                  <p className="text-xs text-gray-500">Hapus centang untuk menampilkan label &quot;Segera Hadir&quot;.</p>
                </label>
              </div>

            </div>
            
            <div className="sticky bottom-0 bg-[#0A0A0A] border-t border-black-border px-6 py-4 flex items-center justify-end gap-3 z-10">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-lg font-medium text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving || isUploading}
                className="flex items-center gap-2 bg-gold hover:bg-yellow-500 text-black px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-[0_0_15px_rgba(255,95,0,0.2)] disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> 
                {isSaving ? "Menyimpan..." : "Simpan Game"}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
