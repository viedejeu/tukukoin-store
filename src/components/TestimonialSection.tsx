"use client";

import { useState } from 'react';
import { Star, MessageSquareQuote, CheckCircle2, X } from 'lucide-react';
import { addTestimonial, type Testimonial } from '@/app/actions/testimonialActions';
import Image from 'next/image';

export default function TestimonialsSection({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    game: 'Royal Dream',
    rating: 5,
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addTestimonial(formData);
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        setFormData({ name: '', game: 'Royal Dream', rating: 5, message: '' });
      }, 3000);
    } catch (error) {
      alert('Gagal mengirim testimoni');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Duplikat array agar animasi marquee (berjalan) tidak terputus
  const marqueeItems = [...initialTestimonials, ...initialTestimonials, ...initialTestimonials];

  return (
    <section className="py-12 border-b border-black-border relative overflow-hidden">
      {/* Background decoration */}
      {/* Ambient glow removed */}

      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 text-sm text-gold font-semibold mb-2">
            <MessageSquareQuote className="w-4 h-4" /> Apa Kata Mereka?
          </div>
          <h2 className="text-3xl font-bold">Ulasan <span className="text-gold">Pelanggan</span></h2>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gold text-black hover:bg-gold-hover px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(255,95,0,0.3)] hover:scale-105 shrink-0"
        >
          Tulis Ulasan Anda
        </button>
      </div>

      {initialTestimonials.length > 0 ? (
        <div className="relative z-10 w-full group py-4">
          {/* Gradient edges for smooth fade effect */}
          <div className="absolute top-0 bottom-0 left-0 w-12 md:w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 md:w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

          {/* Marquee Container */}
          <div className="flex animate-marquee gap-4 md:gap-6 whitespace-normal min-w-full group-hover:[animation-play-state:paused]">
            {marqueeItems.map((t, i) => (
              <div 
                key={`${t.id}-${i}`} 
                className="bg-black-light border border-black-border rounded-2xl p-6 relative flex flex-col shrink-0 w-[280px] md:w-[350px] hover:border-gold/50 transition-colors cursor-default"
              >
                <MessageSquareQuote className="w-8 h-8 text-gold/10 absolute top-4 right-4" />
                
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className={`w-4 h-4 ${index < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                  ))}
                </div>
                
                <p className="text-sm text-gray-300 font-medium italic mb-5 leading-relaxed line-clamp-4 flex-1">
                  "{t.message}"
                </p>
                
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-black-border">
                  <div className="w-10 h-10 bg-black border border-gold/30 rounded-full flex items-center justify-center text-gold font-bold text-lg shrink-0">
                    {t.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-white flex items-center gap-1.5 text-sm">
                      <span className="truncate">{t.name.substring(0, 3)}***</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    </div>
                    <div className="text-[10px] sm:text-xs text-gold font-semibold truncate">{t.game}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-10 bg-black-light border border-black-border rounded-2xl relative z-10">
          <MessageSquareQuote className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 font-medium">Belum ada ulasan yang ditampilkan.</p>
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 ">
          <div className="bg-black-light border border-black-border rounded-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-4 border-b border-black-border flex justify-between items-center">
              <h3 className="font-bold text-lg text-white">Tulis Ulasan Anda</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {submitSuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Terima Kasih!</h4>
                  <p className="text-gray-400 text-sm">Ulasan Anda telah dikirim dan menunggu persetujuan admin untuk ditampilkan.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Nama Anda</label>
                    <input 
                      type="text" 
                      required
                      maxLength={20}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black border border-black-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-gold transition-colors"
                      placeholder="Masukkan nama"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Game yang di-Top Up</label>
                    <select 
                      value={formData.game}
                      onChange={(e) => setFormData({...formData, game: e.target.value})}
                      className="w-full bg-black border border-black-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-gold transition-colors"
                    >
                      <option>Royal Dream</option>
                      <option>Higgs Domino</option>
                      <option>Mobile Legends</option>
                      <option>Free Fire</option>
                      <option>PUBG Mobile</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Rating Bintang</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({...formData, rating: star})}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star className={`w-8 h-8 ${formData.rating >= star ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]' : 'text-gray-600'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Pesan Ulasan</label>
                    <textarea 
                      required
                      maxLength={150}
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-black border border-black-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-gold transition-colors resize-none"
                      placeholder="Ceritakan pengalaman transaksimu..."
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold text-black hover:bg-gold-hover py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
