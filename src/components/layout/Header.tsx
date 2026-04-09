"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  const isHomepage = pathname === "/";

  const getHeaderStyle = () => {
    if (isScrolled) return "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3";
    if (!isHomepage) return "bg-brand-navy py-4 border-b border-white/5";
    return "bg-transparent py-5";
  };

  const getTextColor = () => {
    if (isScrolled) return "text-gray-900";
    if (!isHomepage) return "text-white";
    return "text-white";
  };

  const getNavTextColor = () => {
    if (isScrolled) return "text-gray-600 hover:text-brand-pink-start";
    return "text-white/90 hover:text-white";
  };

  const handleDropdownEnter = (name: string) => {
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setTimeout(() => searchInputRef.current?.focus(), 100);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderStyle()}`}>
        <div className="w-full max-w-[1400px] px-6 lg:px-12 mx-auto flex items-center justify-between">

          <Link href="/" className="flex items-center gap-3 z-50">
            <div className={`relative w-10 h-10 rounded-[10px] overflow-hidden transition-colors ${isScrolled ? 'bg-brand-pink-start shadow-md' : 'bg-white'} ${isScrolled ? 'text-white' : 'text-brand-pink-start'}`}>
              <Image
                src="/logo-telematika.webp"
                alt="Logo SMK Telematika Indramayu"
                width={40}
                height={40}
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif font-bold text-xl leading-none tracking-tight ${getTextColor()}`}>
                Telematika
              </span>
              <span className={`text-[9px] font-bold tracking-[0.2em] uppercase mt-1 ${isScrolled ? 'text-brand-blue-start' : 'text-brand-pink-start'}`}>
                Indramayu
              </span>
            </div>
          </Link>

            <nav className="hidden lg:flex">
            <div className="flex items-center gap-8 font-sans text-[12px] font-bold tracking-wide uppercase">
              <Link href="/" className={`transition-colors ${getNavTextColor()}`}>Beranda</Link>
              <Link href="/about" className={`transition-colors ${getNavTextColor()}`}>Profil</Link>

              {/* Dropdown Fasilitas - Click to /fasilitas, Hover for dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("fasilitas")}
                onMouseLeave={handleDropdownLeave}
              >
                <Link href="/fasilitas" className={`flex items-center gap-1 transition-colors py-2 ${getNavTextColor()}`}>
                  <span>Fasilitas</span> <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === "fasilitas" ? "rotate-180" : ""}`} />
                </Link>
                <AnimatePresence>
                  {activeDropdown === "fasilitas" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 pt-2 min-w-[160px]"
                    >
                      <div className="bg-white rounded-[10px] shadow-lg border border-gray-100 overflow-hidden py-1">
                        <Link href="/bkk" className="block px-4 py-2 text-xs text-brand-navy/70 font-medium hover:bg-brand-navy/5 hover:text-brand-pink-start transition-colors">BKK</Link>
                        <Link href="/kelas" className="block px-4 py-2 text-xs text-brand-navy/70 font-medium hover:bg-brand-navy/5 hover:text-brand-pink-start transition-colors">Kelas</Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dropdown Informasi - Click to /informasi, Hover for dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("informasi")}
                onMouseLeave={handleDropdownLeave}
              >
                <Link href="/informasi" className={`flex items-center gap-1 transition-colors py-2 ${getNavTextColor()}`}>
                  <span>Informasi</span> <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === "informasi" ? "rotate-180" : ""}`} />
                </Link>
                <AnimatePresence>
                  {activeDropdown === "informasi" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 pt-2 min-w-[180px]"
                    >
                      <div className="bg-white rounded-[10px] shadow-lg border border-gray-100 overflow-hidden py-1">
                        <Link href="/galeri" className="block px-4 py-2 text-xs text-brand-navy/70 font-medium hover:bg-brand-navy/5 hover:text-brand-pink-start transition-colors">Galeri Sekolah</Link>
                        <Link href="/berita" className="block px-4 py-2 text-xs text-brand-navy/70 font-medium hover:bg-brand-navy/5 hover:text-brand-pink-start transition-colors">Berita Sekolah</Link>
                        <Link href="/student-life" className="block px-4 py-2 text-xs text-brand-navy/70 font-medium hover:bg-brand-navy/5 hover:text-brand-pink-start transition-colors">Student Life</Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/program" className={`transition-colors ${getNavTextColor()}`}>Program</Link>
              <Link href="/program/mikrotik" className={`transition-colors text-brand-pink-start hover:text-white ${getNavTextColor()}`}>MikroTik</Link>
              <Link href="/kontak" className={`transition-colors ${getNavTextColor()}`}>Hubungi Kami</Link>
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-5 z-50">
            <div className="relative">
              {isSearchOpen && (
                <form onSubmit={handleSearch} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => !searchQuery && setIsSearchOpen(false)}
                    placeholder="Cari..."
                    className="w-48 px-3 py-1.5 text-sm rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-pink-start/50"
                  />
                </form>
              )}
              <button 
                onClick={toggleSearch}
                className={`transition-colors hover:text-brand-pink-start ${getTextColor()}`}
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
            <Link href="/ppdb" className="bg-brand-pink-start hover:bg-[#d94f92] text-white text-[12px] font-bold px-6 py-2.5 rounded-[10px] transition-all shadow-md shadow-brand-pink-start/20 uppercase tracking-wide">
              Daftar PPDB
            </Link>
          </div>

          <button
            className={`lg:hidden z-50 p-2 -mr-2 ${getTextColor()}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col h-screen overflow-y-auto pb-10"
          >
            <nav className="flex flex-col gap-5 font-serif text-xl font-bold text-brand-navy">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>Beranda</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/informasi" onClick={() => setMobileMenuOpen(false)}>Informasi</Link>
              <Link href="/program" onClick={() => setMobileMenuOpen(false)}>Program</Link>
              <Link href="/program/mikrotik" onClick={() => setMobileMenuOpen(false)} className="text-brand-pink-start">MikroTik</Link>
              <Link href="/fasilitas" onClick={() => setMobileMenuOpen(false)}>Fasilitas</Link>
              <Link href="/bkk" onClick={() => setMobileMenuOpen(false)}>BKK</Link>
              <Link href="/kelas" onClick={() => setMobileMenuOpen(false)}>Kelas</Link>
              <Link href="/student-life" onClick={() => setMobileMenuOpen(false)}>Student Life</Link>
              <Link href="/galeri" onClick={() => setMobileMenuOpen(false)}>Galeri</Link>
              <Link href="/berita" onClick={() => setMobileMenuOpen(false)}>Berita</Link>
              <Link href="/kontak" onClick={() => setMobileMenuOpen(false)}>Kontak</Link>
            </nav>
            <div className="mt-8 flex flex-col gap-4 border-t border-gray-100 pt-8">
              <Link href="/ppdb" onClick={() => setMobileMenuOpen(false)} className="bg-brand-pink-start text-white text-center text-sm font-bold uppercase tracking-widest py-4 rounded-[10px] shadow-lg shadow-brand-pink-start/20">
                Daftar PPDB Sekarang
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
