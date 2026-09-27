import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import MobileNav from "@/components/MobileNav";
import { Suspense } from "react";
import { getConfig } from "@/app/actions/configActions";

export default async function Navbar() {
  const config = await getConfig();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black-border bg-[#000000] ">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          {config.logoUrl ? (
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(255,95,0,0.2)] transition-transform duration-300 group-hover:scale-110">
              <Image 
                src={config.logoUrl}
                alt={`${config.siteName} Logo`} 
                fill
                className="object-cover" 
              />
            </div>
          ) : (
            <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center font-bold text-background transition-transform duration-300 group-hover:rotate-6">
              {config.siteName.charAt(0)}
            </div>
          )}
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-lg tracking-tight text-foreground group-hover:text-gold transition-colors">{config.siteName}</span>
            <span className="text-[0.6rem] tracking-[0.2em] text-gray-400">{config.siteTagline}</span>
          </div>
        </Link>

        <Suspense fallback={<div className="hidden md:flex relative max-w-xs w-full mx-8 h-10"></div>}><SearchBar /></Suspense>

        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <li>
            <Link href="/" className="hover:text-gold transition-colors">Beranda</Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-gold transition-colors">Artikel</Link>
          </li>
          <li>
            <Link href="/tools" className="hover:text-gold transition-colors text-gold font-bold">Tools</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gold transition-colors">Tentang</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gold transition-colors">Kontak</Link>
          </li>
        </ul>

        <div className="flex md:hidden items-center gap-2">
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}

