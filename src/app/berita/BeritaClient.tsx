"use client";

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Tag, User, Search, ArrowRight, ChevronRight, Clock } from "lucide-react"
import { MarqueeTicker } from "@/components/ui/MarqueeTicker"

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
};

const defaultArtikel = [
  { cat: 'Pengumuman', title: 'Penerimaan Peserta Didik Baru (PPDB) 2024 Resmi Dibuka', date: '10 Mar 2024', author: 'Humas' },
  { cat: 'Kegiatan', title: 'Kunjungan Industri ke Perusahaan Teknologi Terkemuka di Jakarta', date: '25 Feb 2024', author: 'Kesiswaan' },
  { cat: 'Akademik', title: 'Workshop Mikrotik MTCNA Bersama Instruktur Tersertifikasi', date: '15 Jan 2024', author: 'Kaprog TKJ' },
  { cat: 'Prestasi', title: 'Tim Cyber Security SMKS Telematika Masuk Top 10 CTF Nasional', date: '05 Jan 2024', author: 'Pembina IT' },
  { cat: 'BKK', title: 'Job Fair dan Rekrutmen Langsung PT Telkom Akses', date: '20 Des 2023', author: 'Ketua BKK' },
  { cat: 'Pengumuman', title: 'Jadwal Pelaksanaan Ujian Kompetensi Keahlian (UKK) 2024', date: '10 Des 2023', author: 'Kurikulum' },
];

type Props = {
  artikel: {
    id: number;
    judul: string;
    slug: string;
    konten: string;
    thumbnailUrl: string | null;
    tanggalPublish: Date;
  }[];
};

export default function BeritaClient({ artikel }: Props) {
  const displayArtikel = artikel.length > 0 ? artikel : defaultArtikel;

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
    if (lower.includes("kunjungan") || lower.includes("kegiatan")) return "Kegiatan";
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

      <MarqueeTicker variant="pink" />

      <section className="py-20 bg-[#FDFDFD] bg-grid-light">
        <div className="container mx-auto px-6 max-w-[1120px]">
          <div className="flex flex-col lg:flex-row gap-8">

            <motion.div
              variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}
              className="lg:w-2/3"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-brand-navy font-serif">Artikel <span className="text-brand-pink-start">Terbaru</span></h2>
                <div className="relative w-48 md:w-64">
                  <input type="text" placeholder="Cari berita..." className="w-full bg-white border border-gray-200 rounded-[10px] pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-brand-pink-start transition-colors" />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayArtikel.map((berita, i) => {
                  const articleSlug = 'slug' in berita ? berita.slug : '';
                  const isRealArticle = 'slug' in berita;
                  
                  return (
                    <motion.div key={i} variants={itemVariants} className="bg-white rounded-[1.2rem] border border-gray-100 overflow-hidden hover:shadow-lg hover:border-brand-pink-start/30 transition-all group flex flex-col h-full">
                      <Link href={isRealArticle ? `/berita/${articleSlug}` : '#'}>
                        <div className="aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <div className="absolute top-3 left-3 z-10 bg-brand-pink-start text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-[10px] shadow-md">
                            {'slug' in berita ? getCategoryFromContent(berita.konten) : berita.cat}
                          </div>
                          <div className="text-center">
                            <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs text-gray-400 font-medium">Durung Ana Gambar</span>
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-3 text-[10px] text-gray-500 font-medium mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-brand-pink-start" /> 
                              {'slug' in berita ? formatDate(berita.tanggalPublish) : berita.date}
                            </span>
                            <span className="flex items-center gap-1"><User className="w-3 h-3 text-brand-navy" /> {'slug' in berita ? 'Humas' : berita.author}</span>
                          </div>
                          <h3 className="font-bold text-brand-navy text-sm font-serif mb-3 leading-snug group-hover:text-brand-pink-start transition-colors line-clamp-2">
                            {'slug' in berita ? berita.judul : berita.title}
                          </h3>
                          <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed mb-4 flex-1">
                            {'konten' in berita ? berita.konten.substring(0, 150) + "..." : "Informasi lengkap mengenai jadwal pelaksanaan, persyaratan teknis, dan persiapan yang harus dilakukan oleh seluruh peserta."}
                          </p>
                          <span className="text-[10px] font-bold text-brand-navy group-hover:text-brand-pink-start transition-colors uppercase tracking-widest flex items-center gap-1 mt-auto">Baca Selengkapnya <ArrowRight className="w-3 h-3" /></span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex justify-center items-center gap-2 mt-12">
                <button className="w-8 h-8 rounded-[10px] bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 hover:text-brand-navy transition-colors text-xs font-bold disabled:opacity-50" disabled>&laquo;</button>
                <button className="w-8 h-8 rounded-[10px] bg-brand-pink-start text-white flex items-center justify-center shadow-md text-xs font-bold">1</button>
                <button className="w-8 h-8 rounded-[10px] bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 hover:text-brand-navy transition-colors text-xs font-bold">2</button>
                <button className="w-8 h-8 rounded-[10px] bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 hover:text-brand-navy transition-colors text-xs font-bold">3</button>
                <button className="w-8 h-8 rounded-[10px] bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 hover:text-brand-navy transition-colors text-xs font-bold">&raquo;</button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:w-1/3 flex flex-col gap-6"
            >
              <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm">
                <h4 className="font-bold text-brand-navy font-serif mb-4 flex items-center gap-2 border-b border-gray-100 pb-3"><Tag className="w-4 h-4 text-brand-pink-start" /> Kategori Berita</h4>
                <ul className="space-y-3">
                  {['Semua Berita', 'Pengumuman Sekolah', 'Kegiatan Siswa', 'Prestasi IT', 'Bursa Kerja Khusus (BKK)', 'Akademik & Ujian'].map((kat, i) => (
                    <li key={i}>
                      <Link href="#" className="text-[11px] text-gray-600 font-medium hover:text-brand-pink-start hover:translate-x-1 transition-transform flex items-center justify-between group">
                        <span>{kat}</span>
                        <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-brand-pink-start" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-brand-navy p-6 rounded-[1.5rem] shadow-sm flex flex-col justify-between">
                <h4 className="font-serif font-bold text-white mb-6 border-b border-white/10 pb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-brand-pink-start" /> Agenda Terdekat</h4>
                <div className="space-y-4">
                  {[
                    { date: '15 Mar', title: 'Ujian Kompetensi Keahlian TKJ' },
                    { date: '22 Mar', title: 'Job Fair & Bursa Kerja Khusus' },
                    { date: '01 Apr', title: 'Pembagian Raport Tengah Semester' },
                  ].map((event, i) => (
                    <div key={i} className="flex gap-4 items-start group cursor-pointer border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <div className="w-10 h-10 rounded-[10px] bg-white/5 border border-white/10 flex flex-col items-center justify-center shrink-0 group-hover:border-brand-pink-start group-hover:bg-brand-pink-start/20 transition-colors">
                        <span className="font-bold text-xs text-brand-pink-start leading-none mb-0.5">{event.date.split(' ')[0]}</span>
                        <span className="text-[8px] font-bold text-white/80 uppercase tracking-widest">{event.date.split(' ')[1]}</span>
                      </div>
                      <div>
                        <h5 className="font-bold text-white text-xs leading-snug group-hover:text-brand-pink-start transition-colors">{event.title}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

    </main>
  )
}
