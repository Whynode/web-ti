"use client";

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Tag, User, Search, ArrowRight, ChevronRight, Clock, Heart, MessageCircle } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
};

type Props = {
  artikel: {
    id: number;
    judul: string;
    slug: string;
    konten: string;
    thumbnailUrl: string | null;
    tanggalPublish: Date;
    likesCount: number;
    _count: {
      komentar: number;
    };
  }[];
};

export default function BeritaClient({ artikel }: Props) {
  const displayArtikel = artikel;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getCategoryFromContent = (konten: string): string => {
    const lower = konten.toLowerCase();
    if (lower.includes("ppdb") || lower.includes("pendaftaran")) return "Pengumuman";
    if (lower.includes("kunjungan") || lower.includes("kegiatan")) return "kegiatan";
    if (lower.includes("workshop") || lower.includes("pelajaran")) return "Akademik";
    if (lower.includes("juara") || lower.includes("prestasi")) return "Prestasi";
    if (lower.includes("bkk") || lower.includes("lowongan")) return "BKK";
    return "Pengumuman";
  };

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-gray-900 pb-20">

      <section className="relative pt-32 pb-20 bg-brand-navy bg-grid-dark overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-4 block">Informasi Terkini</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white font-serif mb-6 leading-tight">Berita <span className="text-brand-pink-start">& Agenda</span></h1>
            <p className="text-sm text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">Pembaruan terbaru seputar kegiatan akademik, prestasi siswa, pengumuman sekolah, dan perkembangan dunia IT.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#FDFDFD] bg-grid-light">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}
          >
            <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
              <div className="relative w-full md:flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Cari berita..." 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-pink-start/50 bg-white"
                />
              </div>
              <div className="w-full md:w-64">
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-pink-start/50 bg-white text-gray-700 appearance-none cursor-pointer">
                  <option value="semua">Semua Kategori</option>
                  <option value="pengumuman">Pengumuman Sekolah</option>
                  <option value="kegiatan"> Kegiatan Siswa</option>
                  <option value="akademik">Akademik & Ujian</option>
                  <option value="prestasi">Prestasi IT</option>
                  <option value="bkk">Bursa Kerja Khusus (BKK)</option>
                </select>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-brand-navy font-serif mb-8">Artikel <span className="text-brand-pink-start">Terbaru</span></h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayArtikel.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 text-sm">Belum ada berita. Tambahkan berita dari admin.</p>
                  </div>
                ) : (
                  displayArtikel.map((berita, i) => {
                    return (
                      <motion.div key={berita.id} variants={itemVariants} className="bg-white rounded-[1.2rem] border border-gray-100 overflow-hidden hover:shadow-lg hover:border-brand-pink-start/30 transition-all group flex flex-col h-full">
                        <Link href={`/berita/${berita.slug}`}>
                          <div className="aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <div className="absolute top-3 left-3 z-10 bg-brand-pink-start text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-[10px] shadow-md">
                              {getCategoryFromContent(berita.konten)}
                            </div>
                            {berita.thumbnailUrl ? (
                              <Image 
                                src={berita.thumbnailUrl} 
                                alt={berita.judul} 
                                fill
                                className="object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/beranda-bg.webp";
                                }}
                              />
                            ) : (
                              <div className="text-center">
                                <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-xs text-gray-400 font-medium">Belum Ada Gambar</span>
                              </div>
                            )}
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-center justify-between text-[10px] text-gray-500 font-medium mb-3">
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-brand-pink-start" /> 
                                  {formatDate(berita.tanggalPublish)}
                                </span>
                                <span className="flex items-center gap-1"><User className="w-3 h-3 text-brand-navy" /> HUMAS</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1">
                                  <Heart className="w-3 h-3 text-brand-pink-start" />
                                  <span>{berita.likesCount || 0}</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <MessageCircle className="w-3 h-3 text-brand-blue-start" />
                                  <span>{berita._count.komentar || 0}</span>
                                </span>
                              </div>
                            </div>
                            <h3 className="font-bold text-brand-navy text-sm font-serif mb-3 leading-snug group-hover:text-brand-pink-start transition-colors line-clamp-2">
                              {berita.judul}
                            </h3>
                            <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed mb-4 flex-1">
                              {berita.konten.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').substring(0, 150)}...
                            </p>
                            <span className="text-[10px] font-bold text-brand-navy group-hover:text-brand-pink-start transition-colors uppercase tracking-widest flex items-center gap-1 mt-auto">Baca Selengkapnya <ArrowRight className="w-3 h-3" /></span>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>
        </div>
      </section>

    </main>
  )
}