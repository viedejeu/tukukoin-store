"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Gamepad2, LogOut, Settings, Menu, X, Home, BookOpen, Users, MessageSquareQuote, Globe, Crown } from "lucide-react";
import { usePathname } from "next/navigation";
import { logout, getSession } from "@/app/actions/authActions";
import { AuthPayload } from "@/lib/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [session, setSession] = useState<AuthPayload | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    getSession().then(res => setSession(res));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Helper function to check if link is active
  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex min-h-screen bg-black">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80  lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-black-light border-r border-black-border flex flex-col transform transition-transform duration-300 lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-black-border">
          <Link href="/admin" onClick={closeSidebar} className="text-xl font-extrabold tracking-tight">
            TUKUKOIN<span className="text-gold">.ADMIN</span>
          </Link>
          <button onClick={closeSidebar} className="p-1 text-gray-400 hover:text-white lg:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link 
            href="/admin" 
            onClick={closeSidebar}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive("/admin") 
                ? "bg-gold text-black font-bold shadow-[0_0_15px_rgba(255,95,0,0.2)]" 
                : "text-gray-400 hover:text-white hover:bg-black-border"
            }`}
          >
            <Home className="w-5 h-5" /> Dasbor
          </Link>
          
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-6 px-4">Leaderboard</div>
          <Link 
            href="/admin/leaderboard" 
            onClick={closeSidebar}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive("/admin/leaderboard") 
                ? "bg-gold text-black font-bold shadow-[0_0_15px_rgba(255,95,0,0.2)]" 
                : "text-gray-400 hover:text-white hover:bg-black-border"
            }`}
          >
            <Crown className="w-5 h-5" /> Leaderboard
          </Link>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-6 px-4">Konten</div>
          <Link 
            href="/admin/games" 
            onClick={closeSidebar}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive("/admin/games") 
                ? "bg-gold text-black font-bold shadow-[0_0_15px_rgba(255,95,0,0.2)]" 
                : "text-gray-400 hover:text-white hover:bg-black-border"
            }`}
          >
            <Gamepad2 className="w-5 h-5" /> Produk & Game
          </Link>
          <Link 
            href="/admin/articles" 
            onClick={closeSidebar}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive("/admin/articles") 
                ? "bg-gold text-black font-bold shadow-[0_0_15px_rgba(255,95,0,0.2)]" 
                : "text-gray-400 hover:text-white hover:bg-black-border"
            }`}
          >
            <BookOpen className="w-5 h-5" /> Artikel Blog
          </Link>
          <Link 
            href="/admin/testimonials" 
            onClick={closeSidebar}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive("/admin/testimonials") 
                ? "bg-gold text-black font-bold shadow-[0_0_15px_rgba(255,95,0,0.2)]" 
                : "text-gray-400 hover:text-white hover:bg-black-border"
            }`}
          >
            <MessageSquareQuote className="w-5 h-5" /> Testimoni
          </Link>
          <Link 
            href="/admin/seo" 
            onClick={closeSidebar}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive("/admin/seo") 
                ? "bg-gold text-black font-bold shadow-[0_0_15px_rgba(255,95,0,0.2)]" 
                : "text-gray-400 hover:text-white hover:bg-black-border"
            }`}
          >
            <Globe className="w-5 h-5" /> SEO & Analytics
          </Link>
          
          {session?.role === 'SUPER_ADMIN' && (
            <>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-6 px-4">Sistem</div>
              <Link 
                href="/admin/users" 
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive("/admin/users") 
                    ? "bg-gold text-black font-bold shadow-[0_0_15px_rgba(255,95,0,0.2)]" 
                    : "text-gray-400 hover:text-white hover:bg-black-border"
                }`}
              >
                <Users className="w-5 h-5" /> Pengguna Internal
              </Link>
              <Link 
                href="/admin/settings" 
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive("/admin/settings") 
                    ? "bg-gold text-black font-bold shadow-[0_0_15px_rgba(255,95,0,0.2)]" 
                    : "text-gray-400 hover:text-white hover:bg-black-border"
                }`}
              >
                <Settings className="w-5 h-5" /> Pengaturan Website
              </Link>
            </>
          )}
        </nav>
        
        <div className="p-4 border-t border-black-border space-y-2">
          <button onClick={() => logout()} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-500 hover:text-white hover:bg-red-500 transition-colors font-bold shadow-[0_0_15px_rgba(239,68,68,0)] hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] text-sm">
            <LogOut className="w-5 h-5" /> Keluar (Logout)
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-black-border bg-black-light flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar} 
              className="p-2 -ml-2 rounded-lg text-gray-400 hover:text-white hover:bg-black-border transition-colors lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="text-sm text-gray-400 hidden sm:block">
              Halo, <span className="font-semibold text-white">{session?.username || "Admin"}</span>
              {session?.role === 'SUPER_ADMIN' ? (
                <span className="ml-2 px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded font-bold border border-purple-500/30">SUPER ADMIN</span>
              ) : (
                <span className="ml-2 px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded font-bold border border-blue-500/30">EDITOR</span>
              )}
            </div>
          </div>
          {session?.role === 'SUPER_ADMIN' && (
            <Link href="/admin/settings" className="p-2 rounded-full hover:bg-black-border transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
            </Link>
          )}
        </header>
        
        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8 overflow-y-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar - Lively & Premium Style */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/90  border-t border-white/5 pb-safe shadow-[0_-20px_40px_rgba(0,0,0,0.7)]">
        <div className="flex items-center justify-around px-2 py-3">
          
          {/* Dashboard */}
          <Link href="/admin" className="relative group flex flex-col items-center justify-center w-16 h-12">
            {isActive("/admin") && (
              <div className="absolute -top-3 w-8 h-1 bg-gold rounded-full shadow-[0_0_12px_rgba(255,95,0,0.8)]"></div>
            )}
            <div className={`flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 ${isActive("/admin") ? 'bg-gradient-to-t from-gold/20 to-transparent -translate-y-2 scale-110' : 'hover:-translate-y-1'}`}>
              <Home className={`w-6 h-6 transition-all duration-300 ${isActive("/admin") ? 'text-gold drop-shadow-[0_0_8px_rgba(255,95,0,0.6)]' : 'text-gray-500 group-hover:text-gray-300'}`} style={{ fill: isActive("/admin") ? 'rgba(255, 95, 0, 0.4)' : 'none' }} />
              <span className={`text-[0.65rem] font-bold tracking-wide mt-1 transition-all duration-300 ${isActive("/admin") ? 'text-gold' : 'text-gray-500 group-hover:text-gray-300'}`}>Beranda</span>
            </div>
          </Link>
          
          {/* Produk & Game */}
          <Link href="/admin/games" className="relative group flex flex-col items-center justify-center w-16 h-12">
            {isActive("/admin/games") && (
              <div className="absolute -top-3 w-8 h-1 bg-gold rounded-full shadow-[0_0_12px_rgba(255,95,0,0.8)]"></div>
            )}
            <div className={`flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 ${isActive("/admin/games") ? 'bg-gradient-to-t from-gold/20 to-transparent -translate-y-2 scale-110' : 'hover:-translate-y-1'}`}>
              <Gamepad2 className={`w-6 h-6 transition-all duration-300 ${isActive("/admin/games") ? 'text-gold drop-shadow-[0_0_8px_rgba(255,95,0,0.6)]' : 'text-gray-500 group-hover:text-gray-300'}`} style={{ fill: isActive("/admin/games") ? 'rgba(255, 95, 0, 0.4)' : 'none' }} />
              <span className={`text-[0.65rem] font-bold tracking-wide mt-1 transition-all duration-300 ${isActive("/admin/games") ? 'text-gold' : 'text-gray-500 group-hover:text-gray-300'}`}>Produk</span>
            </div>
          </Link>
          
          {/* Artikel Blog */}
          <Link href="/admin/articles" className="relative group flex flex-col items-center justify-center w-16 h-12">
            {isActive("/admin/articles") && (
              <div className="absolute -top-3 w-8 h-1 bg-gold rounded-full shadow-[0_0_12px_rgba(255,95,0,0.8)]"></div>
            )}
            <div className={`flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 ${isActive("/admin/articles") ? 'bg-gradient-to-t from-gold/20 to-transparent -translate-y-2 scale-110' : 'hover:-translate-y-1'}`}>
              <BookOpen className={`w-6 h-6 transition-all duration-300 ${isActive("/admin/articles") ? 'text-gold drop-shadow-[0_0_8px_rgba(255,95,0,0.6)]' : 'text-gray-500 group-hover:text-gray-300'}`} style={{ fill: isActive("/admin/articles") ? 'rgba(255, 95, 0, 0.4)' : 'none' }} />
              <span className={`text-[0.65rem] font-bold tracking-wide mt-1 transition-all duration-300 ${isActive("/admin/articles") ? 'text-gold' : 'text-gray-500 group-hover:text-gray-300'}`}>Artikel</span>
            </div>
          </Link>

          {/* Testimoni */}
          <Link href="/admin/testimonials" className="relative group flex flex-col items-center justify-center w-16 h-12">
            {isActive("/admin/testimonials") && (
              <div className="absolute -top-3 w-8 h-1 bg-gold rounded-full shadow-[0_0_12px_rgba(255,95,0,0.8)]"></div>
            )}
            <div className={`flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 ${isActive("/admin/testimonials") ? 'bg-gradient-to-t from-gold/20 to-transparent -translate-y-2 scale-110' : 'hover:-translate-y-1'}`}>
              <MessageSquareQuote className={`w-6 h-6 transition-all duration-300 ${isActive("/admin/testimonials") ? 'text-gold drop-shadow-[0_0_8px_rgba(255,95,0,0.6)]' : 'text-gray-500 group-hover:text-gray-300'}`} style={{ fill: isActive("/admin/testimonials") ? 'rgba(255, 95, 0, 0.4)' : 'none' }} />
              <span className={`text-[0.65rem] font-bold tracking-wide mt-1 transition-all duration-300 ${isActive("/admin/testimonials") ? 'text-gold' : 'text-gray-500 group-hover:text-gray-300'}`}>Ulasan</span>
            </div>
          </Link>

          {/* Setting (Super Admin Only) */}
          {session?.role === 'SUPER_ADMIN' && (
            <Link href="/admin/settings" className="relative group flex flex-col items-center justify-center w-16 h-12">
              {isActive("/admin/settings") && (
                <div className="absolute -top-3 w-8 h-1 bg-gold rounded-full shadow-[0_0_12px_rgba(255,95,0,0.8)]"></div>
              )}
              <div className={`flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 ${isActive("/admin/settings") ? 'bg-gradient-to-t from-gold/20 to-transparent -translate-y-2 scale-110' : 'hover:-translate-y-1'}`}>
                <Settings className={`w-6 h-6 transition-all duration-300 ${isActive("/admin/settings") ? 'text-gold drop-shadow-[0_0_8px_rgba(255,95,0,0.6)]' : 'text-gray-500 group-hover:text-gray-300'}`} style={{ fill: isActive("/admin/settings") ? 'rgba(255, 95, 0, 0.4)' : 'none' }} />
                <span className={`text-[0.65rem] font-bold tracking-wide mt-1 transition-all duration-300 ${isActive("/admin/settings") ? 'text-gold' : 'text-gray-500 group-hover:text-gray-300'}`}>Setting</span>
              </div>
            </Link>
          )}
          
        </div>
      </nav>
    </div>
  );
}
