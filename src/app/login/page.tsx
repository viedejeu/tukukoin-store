"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/actions/authActions";
import { Lock, ArrowRight, ShieldAlert, User } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsLoading(true);
    try {
      const res = await login(username, password);
      if (res.success) {
        toast.success("Berhasil masuk!");
        router.push("/admin");
      } else {
        toast.error(res.error || "Gagal masuk");
        setPassword("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4 selection:bg-gold selection:text-black">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Ambient glow removed */}
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Logo/Brand */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block text-3xl font-extrabold tracking-tight mb-2 hover:scale-105 transition-transform">
            TUKUKOIN<span className="text-gold">.ADMIN</span>
          </Link>
          <p className="text-gray-400 text-sm">Masuk untuk mengelola sistem Top-Up</p>
        </div>

        {/* Login Card */}
        <div className="bg-black-light border border-black-border p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          {/* Top border accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
          
          <div className="flex items-center gap-3 text-white font-semibold mb-6">
            <div className="p-2 bg-gold/10 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-gold" />
            </div>
            Area Terbatas
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <input 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-background border border-black-border rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all placeholder:text-gray-600"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Kata Sandi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                  className="w-full bg-background border border-black-border rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all placeholder:text-gray-600"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading || !password}
              className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-yellow-500 text-black py-3.5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(255,95,0,0.15)] hover:shadow-[0_0_30px_rgba(255,95,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                "Memverifikasi..."
              ) : (
                <>
                  Buka Dashboard 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-400 transition-colors">
            &larr; Kembali ke halaman utama
          </Link>
        </div>

      </div>
    </main>
  );
}
