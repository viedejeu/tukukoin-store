"use client";

import { useState, useEffect } from "react";
import { getSeoConfig, saveSeoConfig, type SeoConfig } from "@/app/actions/seoActions";
import { Search, Save, LineChart, Globe, HelpCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function SeoDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<SeoConfig>({
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    googleAnalyticsId: "",
    facebookPixelId: "",
    googleSiteVerification: ""
  });

  useEffect(() => {
    getSeoConfig().then((data) => {
      setFormData(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSeoConfig(formData);
      toast.success("Pengaturan SEO berhasil disimpan!");
    } catch (error) {
      toast.error("Gagal menyimpan pengaturan SEO.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Dasbor SEO & Meta-Analytics</h1>
        <p className="text-sm text-gray-400">Kelola identitas website Anda di mata Google dan lacak pengunjung Anda tanpa perlu menyentuh kode.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* BAGIAN A: GOOGLE SEO */}
        <div className="bg-black-light border border-black-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black-border">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Identitas Mesin Pencari (Google SEO)</h2>
              <p className="text-xs text-gray-400">Informasi ini akan muncul saat seseorang mencari toko Anda di Google.</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-white mb-1">Judul Website (Meta Title)</label>
              <input
                type="text"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                className="w-full bg-black border border-black-border rounded-lg px-4 py-2.5 text-white focus:border-gold focus:outline-none transition-colors"
                placeholder="Contoh: TukuKoin - Top Up Game Termurah"
                required
              />
              <p className="mt-1.5 flex items-start gap-1.5 text-xs text-blue-400 bg-blue-500/10 p-2 rounded-md">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>Judul utama yang akan ditebalkan warna biru di hasil pencarian Google. Usahakan mengandung nama toko dan kata pencarian populer (misal: "Top Up Termurah").</span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-white mb-1">Deskripsi Pencarian (Meta Description)</label>
              <textarea
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleChange}
                rows={3}
                className="w-full bg-black border border-black-border rounded-lg px-4 py-2.5 text-white focus:border-gold focus:outline-none transition-colors"
                placeholder="Contoh: Beli chip Royal Dream, Higgs Domino, Diamond MLBB murah dan aman di sini..."
                required
              />
              <p className="mt-1.5 flex items-start gap-1.5 text-xs text-blue-400 bg-blue-500/10 p-2 rounded-md">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>Kalimat singkat (maksimal 160 huruf) yang menceritakan keunggulan web Anda. Ini akan muncul sebagai teks abu-abu tepat di bawah judul pada pencarian Google.</span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-white mb-1">Kata Kunci (Keywords)</label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleChange}
                className="w-full bg-black border border-black-border rounded-lg px-4 py-2.5 text-white focus:border-gold focus:outline-none transition-colors"
                placeholder="top up ml, higgs domino murah, royal dream terpercaya"
              />
              <p className="mt-1.5 flex items-start gap-1.5 text-xs text-blue-400 bg-blue-500/10 p-2 rounded-md">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>Kumpulan kata yang sekiranya akan diketik pelanggan di Google. Pisahkan dengan tanda koma (,).</span>
              </p>
            </div>
          </div>
        </div>

        {/* BAGIAN B: TRACKING & ADS */}
        <div className="bg-black-light border border-black-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black-border">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <LineChart className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Pelacakan & Iklan (Analytics & Ads)</h2>
              <p className="text-xs text-gray-400">Pantau lalu lintas kunjungan dan maksimalkan performa iklan berbayar Anda.</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-white mb-1">Google Analytics (GA4) ID</label>
              <input
                type="text"
                name="googleAnalyticsId"
                value={formData.googleAnalyticsId}
                onChange={handleChange}
                className="w-full bg-black border border-black-border rounded-lg px-4 py-2.5 text-white focus:border-gold focus:outline-none transition-colors"
                placeholder="Contoh: G-XXXXXXXXXX"
              />
              <p className="mt-1.5 flex items-start gap-1.5 text-xs text-green-400 bg-green-500/10 p-2 rounded-md">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>Masukkan kode berawalan 'G-' dari akun Google Analytics Anda untuk melacak jumlah kunjungan. Kosongkan jika belum punya.</span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-white mb-1">Facebook Pixel ID</label>
              <input
                type="text"
                name="facebookPixelId"
                value={formData.facebookPixelId}
                onChange={handleChange}
                className="w-full bg-black border border-black-border rounded-lg px-4 py-2.5 text-white focus:border-gold focus:outline-none transition-colors"
                placeholder="Contoh: 123456789012345"
              />
              <p className="mt-1.5 flex items-start gap-1.5 text-xs text-green-400 bg-green-500/10 p-2 rounded-md">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>Masukkan deretan angka Pixel dari Facebook Meta Business Manager. Wajib diisi jika Anda ingin menjalankan Facebook/Instagram Ads.</span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-white mb-1">Google Site Verification Code</label>
              <input
                type="text"
                name="googleSiteVerification"
                value={formData.googleSiteVerification}
                onChange={handleChange}
                className="w-full bg-black border border-black-border rounded-lg px-4 py-2.5 text-white focus:border-gold focus:outline-none transition-colors"
                placeholder="Contoh: abcdefghijklmnopqrstuvwxyz123456789"
              />
              <p className="mt-1.5 flex items-start gap-1.5 text-xs text-green-400 bg-green-500/10 p-2 rounded-md">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>Kode verifikasi (HTML Tag) agar website Anda resmi diklaim kepemilikannya di Google Search Console.</span>
              </p>
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-gold text-black hover:bg-gold-hover px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(255,95,0,0.3)] disabled:opacity-50"
          >
            {saving ? (
              <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            Simpan Konfigurasi SEO
          </button>
        </div>
      </form>
      
      {/* SIMULASI PENCARIAN GOOGLE */}
      <div className="bg-[#202124] border border-gray-700 rounded-xl p-6 mt-8 hidden sm:block">
         <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-gray-400" />
            <h3 className="text-gray-200 font-medium">Pratinjau di Google (Simulasi)</h3>
         </div>
         <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-1">
               <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-black font-bold text-xs">G</div>
               <div>
                  <div className="text-[#dadce0] text-sm">TukuKoin</div>
                  <div className="text-[#bdc1c6] text-xs">https://tukukoin.com</div>
               </div>
            </div>
            <div className="text-[#8ab4f8] text-xl cursor-pointer hover:underline mb-1 font-medium">
               {formData.metaTitle || "Judul Website Belum Diisi"}
            </div>
            <div className="text-[#bdc1c6] text-sm leading-snug">
               {formData.metaDescription || "Deskripsi pencarian belum diisi..."}
            </div>
         </div>
      </div>

    </div>
  );
}
