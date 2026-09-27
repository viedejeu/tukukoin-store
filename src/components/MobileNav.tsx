"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close menu when route changes
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="md:hidden p-2 text-gray-300 hover:text-gold transition-colors z-[60] relative"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay & Menu */}
      <div 
        className={`fixed inset-0 bg-black/90  z-[55] md:hidden transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      >
        <div 
          className={`fixed top-16 left-0 right-0 bg-[#0a0a0a] border-b border-white/5 p-4 shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/" onClick={() => setIsOpen(false)} className={`block p-4 rounded-xl transition-all ${pathname === '/' ? 'bg-gold/10 text-gold font-bold border border-gold/20' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/blog" onClick={() => setIsOpen(false)} className={`block p-4 rounded-xl transition-all ${pathname === '/blog' ? 'bg-gold/10 text-gold font-bold border border-gold/20' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>
                Artikel
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setIsOpen(false)} className={`block p-4 rounded-xl transition-all ${pathname === '/about' ? 'bg-gold/10 text-gold font-bold border border-gold/20' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>
                Tentang
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setIsOpen(false)} className={`block p-4 rounded-xl transition-all ${pathname === '/contact' ? 'bg-gold/10 text-gold font-bold border border-gold/20' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>
                Kontak
              </Link>
            </li>
            <li>
              <Link href="/tools" onClick={() => setIsOpen(false)} className={`block p-4 rounded-xl transition-all ${pathname === '/tools' || pathname.startsWith('/tools/') ? 'bg-gold/10 text-gold font-bold border border-gold/20' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>
                Tools & Kalkulator
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
