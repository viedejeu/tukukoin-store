"use client";

import { useState, useEffect } from 'react';
import { getTestimonials, toggleApproval, deleteTestimonial, bulkDeleteTestimonials, type Testimonial } from '@/app/actions/testimonialActions';
import { MessageSquareQuote, CheckCircle2, XCircle, Trash2, Check, CheckSquare } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (error) {
      toast.error('Gagal memuat testimoni');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      await toggleApproval(id, !currentStatus);
      toast.success(currentStatus ? 'Testimoni disembunyikan' : 'Testimoni ditampilkan');
      fetchTestimonials();
    } catch (error) {
      toast.error('Gagal mengubah status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus testimoni ini secara permanen?')) return;
    try {
      await deleteTestimonial(id);
      toast.success('Testimoni dihapus');
      fetchTestimonials();
    } catch (error) {
      toast.error('Gagal menghapus');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Hapus ${selectedIds.length} testimoni?`)) return;
    
    setIsDeleting(true);
    try {
      await bulkDeleteTestimonials(selectedIds);
      toast.success(`${selectedIds.length} testimoni dihapus`);
      setSelectedIds([]);
      fetchTestimonials();
    } catch (error) {
      toast.error('Gagal menghapus');
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === testimonials.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(testimonials.map(t => t.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Manajemen Testimoni</h1>
          <p className="text-sm text-gray-400">Pilih testimoni mana yang layak tampil di halaman depan.</p>
        </div>
        
        {selectedIds.length > 0 && (
          <button 
            onClick={handleBulkDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors font-medium text-sm disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            Hapus {selectedIds.length} Terpilih
          </button>
        )}
      </div>

      <div className="bg-black-light border border-black-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black text-gray-400 text-sm border-b border-black-border">
              <tr>
                <th className="p-4 w-12">
                  <button onClick={toggleSelectAll} className="text-gray-400 hover:text-white">
                    <CheckSquare className={`w-5 h-5 ${selectedIds.length === testimonials.length && testimonials.length > 0 ? 'text-gold' : ''}`} />
                  </button>
                </th>
                <th className="p-4 font-medium">Pelanggan & Game</th>
                <th className="p-4 font-medium">Ulasan (Rating)</th>
                <th className="p-4 font-medium">Status Tayang</th>
                <th className="p-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black-border text-sm">
              {testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <button onClick={() => toggleSelect(t.id)} className="text-gray-400 hover:text-white">
                      <CheckSquare className={`w-5 h-5 ${selectedIds.includes(t.id) ? 'text-gold' : ''}`} />
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.game}</div>
                  </td>
                  <td className="p-4 max-w-[300px]">
                    <div className="flex text-yellow-400 mb-1 text-xs">
                      {'â˜…'.repeat(t.rating)}{'â˜†'.repeat(5 - t.rating)}
                    </div>
                    <div className="text-gray-300 line-clamp-2" title={t.message}>{t.message}</div>
                  </td>
                  <td className="p-4">
                    {t.isApproved ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Tampil di Web
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                        <XCircle className="w-3.5 h-3.5" />
                        Menunggu
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleToggle(t.id, t.isApproved)}
                        className={`p-2 rounded-lg transition-colors ${t.isApproved ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20' : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'}`}
                        title={t.isApproved ? "Sembunyikan" : "Tampilkan"}
                      >
                        {t.isApproved ? <XCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => handleDelete(t.id)}
                        className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"
                        title="Hapus Permanen"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    <MessageSquareQuote className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    Belum ada satupun ulasan masuk.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
