"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X, UploadCloud, Save, CheckCircle2 } from "lucide-react";
import { Article } from "@/data/articles";
import { Game } from "@/data/games";
import { addArticle, updateArticle, deleteArticle, bulkDeleteArticles, testGoogleIndexing } from "@/app/actions/articlesActions";
import RichTextEditor from "@/components/RichTextEditor";
import toast from 'react-hot-toast';

export default function ArticlesManager({ initialArticles, games }: { initialArticles: Article[], games: Game[] }) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isTestingPing, setIsTestingPing] = useState(false);

  
  const handleTestPing = async () => {
    setIsTestingPing(true);
    const id = toast.loading('Mengetes Koneksi Google Indexing API...');
    try {
      const res = await testGoogleIndexing();
      if (res.success) {
        toast.success(res.message, { id, duration: 5000 });
      } else {
        toast.error(res.message, { id, duration: 8000 });
      }
    } catch (e: any) {
      toast.error('Error saat tes: ' + e.message, { id });
    } finally {
      setIsTestingPing(false);
    }
  };

  const emptyArticle: Article = {
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    date: new Date().toISOString().split('T')[0],
    author: "Admin TukuKoin",
    seoDescription: "",
    metaKeywords: "",
  };
  const [formData, setFormData] = useState<Article>(emptyArticle);

  const handleOpenModal = (article?: Article) => {
    setMessage("");
    if (article) {
      setEditingId(article.id);
      setFormData({
        ...emptyArticle,
        ...article
      });
    } else {
      setEditingId(null);
      setFormData({ ...emptyArticle, id: `a${Date.now()}` }); 
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
    setMessage("");
    try {
      const finalData = { 
        ...formData, 
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      };

      if (editingId) {
        await updateArticle(editingId, finalData);
        setArticles(articles.map(a => a.id === editingId ? finalData : a));
        toast.success("Artikel berhasil diperbarui");
      } else {
        await addArticle(finalData);
        setArticles([finalData, ...articles]);
        toast.success("Artikel berhasil diterbitkan");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan data.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      try {
        await deleteArticle(id);
        setArticles(articles.filter(a => a.id !== id));
        setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        toast.success("Artikel berhasil dihapus");
      } catch (error) {
        console.error(error);
        toast.error("Gagal menghapus artikel");
      }
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(articles.map(a => a.id));
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
    if (confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.length} artikel terpilih?`)) {
      try {
        await bulkDeleteArticles(selectedIds);
        setArticles(articles.filter(a => !selectedIds.includes(a.id)));
        setSelectedIds([]);
        toast.success(`${selectedIds.length} artikel berhasil dihapus`);
      } catch (error) {
        console.error(error);
        toast.error("Gagal menghapus artikel massal");
      }
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4 gap-3">
        <button
          onClick={handleTestPing}
          disabled={isTestingPing}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2.5 rounded-lg font-bold text-sm transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] disabled:opacity-50"
        >
          {isTestingPing ? <UploadCloud className="w-4 h-4 animate-pulse" /> : <CheckCircle2 className="w-4 h-4" />}
          Test Koneksi Google VIP
        </button>
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
          <Plus className="w-4 h-4" /> Tulis Artikel
        </button>
      </div>

      <div className="bg-black-light border border-black-border rounded-xl overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-black-border/50 text-gray-400">
            <tr>
              <th className="px-6 py-4 font-medium text-left w-12">
                <input 
                  type="checkbox" 
                  checked={articles.length > 0 && selectedIds.length === articles.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-600 text-gold focus:ring-gold bg-black-dark w-4 h-4 cursor-pointer"
                />
              </th>
              <th className="px-6 py-4 font-medium text-left">Aksi</th>
              <th className="px-6 py-4 font-medium text-left">Judul</th>
              <th className="px-6 py-4 font-medium text-left">Penulis</th>
              <th className="px-6 py-4 font-medium text-left">Tanggal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black-border">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-black-border/30 transition-colors">
                <td className="px-6 py-4">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.includes(article.id)}
                    onChange={() => handleSelectOne(article.id)}
                    className="rounded border-gray-600 text-gold focus:ring-gold bg-black-dark w-4 h-4 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleOpenModal(article)} className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-colors" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(article.id)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors" title="Hapus">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-white max-w-[250px] truncate">{article.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-gold/10 text-gold px-2 py-1 rounded-md text-xs font-medium border border-gold/20">{article.author}</span>
                </td>
                <td className="px-6 py-4 text-gray-400 whitespace-nowrap">{article.date}</td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                  Belum ada artikel. Klik &quot;Tulis Artikel&quot; untuk mulai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 ">
          <div className="bg-[#0A0A0A] border border-black-border rounded-t-2xl sm:rounded-2xl w-full max-w-4xl max-h-[95vh] flex flex-col shadow-2xl">
            <div className="bg-[#0A0A0A] border-b border-black-border px-6 py-4 flex items-center justify-between z-10 shrink-0 rounded-t-2xl">
              <h2 className="text-xl font-bold text-white">{editingId ? "Edit Artikel" : "Tulis Artikel Baru"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-8">
              
              <div className="space-y-6">
                {/* Gambar Sampul */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex justify-between items-center">
                    <span>Gambar Sampul (Thumbnail)</span>
                    {formData.image && <span className="text-xs text-green-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Terpasang</span>}
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    {formData.image && (
                      <div className="w-32 h-20 shrink-0 rounded-xl overflow-hidden border border-black-border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className={`relative flex-1 border-2 border-dashed ${isUploading ? 'border-gold bg-gold/5' : 'border-black-border hover:border-gray-500'} rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors w-full h-20`}>
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
                    <label className="text-sm font-medium text-gray-300">Judul Artikel</label>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Contoh: Cara Dapat Koin Gratis"
                      className="w-full bg-background border border-black-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Slug (Otomatis jika kosong)</label>
                    <input 
                      type="text" 
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                      placeholder="cara-dapat-koin-gratis"
                      className="w-full bg-background border border-black-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex justify-between">
                    <span>Isi Artikel Lengkap (Rich Text)</span>
                  </label>
                  <RichTextEditor 
                    content={formData.content} 
                    onChange={(html) => setFormData({...formData, content: html})} 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Penulis</label>
                    <input 
                      type="text" 
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      className="w-full bg-background border border-black-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Tanggal Terbit</label>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full bg-background border border-black-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>
              </div>

              {/* SEO Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-black-border"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#0A0A0A] px-4 text-sm font-bold text-gray-400">Pengaturan SEO (Opsional)</span>
                </div>
              </div>

              {/* SEO Section */}
              <div className="space-y-6">
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex justify-between">
                    <span>Kutipan / Meta Description</span>
                    <span className={`text-xs ${(formData.seoDescription || formData.excerpt)?.length > 160 ? 'text-red-500' : 'text-gray-500'}`}>
                      {(formData.seoDescription || formData.excerpt)?.length || 0} / 160
                    </span>
                  </label>
                  <textarea 
                    value={formData.seoDescription || formData.excerpt || ""}
                    onChange={(e) => setFormData({...formData, seoDescription: e.target.value, excerpt: e.target.value})}
                    rows={3}
                    placeholder="Ringkasan singkat yang muncul di kartu artikel dan Google..."
                    className="w-full bg-background border border-black-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Meta Keywords (Pisahkan dengan koma)</label>
                    <input 
                      type="text" 
                      value={formData.metaKeywords || ""}
                      onChange={(e) => setFormData({...formData, metaKeywords: e.target.value})}
                      placeholder="top up chip, royal dream murah, agen resmi"
                      className="w-full bg-background border border-black-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
  
                  <div className="space-y-2 border border-gold/30 p-4 rounded-xl bg-gold/5">
                    <label className="text-sm font-bold text-gold flex items-center gap-2">
                      Jebakan Batman (Injektor Produk)
                    </label>
                    <p className="text-xs text-gray-400 mb-2">Pilih produk di bawah ini untuk memunculkan tombol Top Up otomatis di bawah artikel (Mesin Uang SEO).</p>
                    <select 
                      value={formData.relatedGameId || ""}
                      onChange={(e) => setFormData({...formData, relatedGameId: e.target.value})}
                      className="w-full bg-background border border-black-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                    >
                      <option value="">-- Tidak ada produk terkait --</option>
                      {games.map(game => (
                        <option key={game.id} value={game.id}>{game.name}</option>
                      ))}
                    </select>
                  </div>

                </div>

              {message && <div className="text-red-500 text-sm font-medium mt-4">{message}</div>}

            </div>
            
            <div className="bg-[#0A0A0A] border-t border-black-border px-6 py-4 flex items-center justify-end gap-3 z-10 shrink-0 rounded-b-2xl">
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
                {isSaving ? "Menyimpan..." : "Terbitkan Artikel"}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
