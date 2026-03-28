"use client";

import { useState } from "react";
import { motion } from "framer-motion"
import Image from "next/image";

type Galeri = {
  id: string;
  judul: string;
  kategori: string;
  imageUrl: string;
  createdAt: Date;
};

type Props = {
  galeriList: Galeri[];
};

const KATEGORI = [
  { key: "SEMUA", label: "Semua" },
  { key: "FASILITAS", label: "Fasilitas" },
  { key: "KEGIATAN SISWA", label: " Kegiatan Siswa" },
  { key: "PRESTASI", label: "Prestasi" },
  { key: "KELULUSAN", label: "Kelulusan" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
};

export default function GaleriContent({ galeriList }: Props) {
  const [activeFilter, setActiveFilter] = useState("SEMUA");

  const displayedGaleri = activeFilter === "SEMUA" 
    ? galeriList 
    : galeriList.filter(foto => foto.kategori === activeFilter);

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-gray-900 pb-20">

      <section className="relative pt-32 pb-20 bg-brand-navy bg-grid-dark overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-4 block">Album Kenangan & Kegiatan</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white font-serif mb-6 leading-tight">Galeri <span className="text-brand-pink-start">Sekolah</span></h1>
            <p className="text-sm text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">Kumpulan momen berharga, dokumentasi praktik belajar, dan dinamika kehidupan siswa-siswi SMKS Telematika Indramayu.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#FDFDFD] bg-grid-light">
        <div className="container mx-auto px-6 max-w-[1120px]">

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="flex flex-wrap gap-3 justify-center mb-12">
            {KATEGORI.map((filter) => (
              <button 
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-5 py-2 rounded-[10px] text-[10px] font-bold uppercase tracking-widest transition-colors ${activeFilter === filter.key ? 'bg-brand-navy text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-brand-pink-start hover:text-brand-pink-start'}`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>

          {displayedGaleri.length > 0 ? (
            <motion.div
              variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            >
              {displayedGaleri.map((foto) => (
                <motion.div
                  key={foto.id} variants={itemVariants}
                  className="group rounded-[1.2rem] overflow-hidden relative shadow-sm break-inside-avoid cursor-pointer border border-gray-100"
                >
                  <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                    {foto.imageUrl ? (
                      <Image
                        src={foto.imageUrl}
                        alt={foto.judul}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center">
                        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                    <h3 className="text-white font-bold text-sm font-serif translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">{foto.judul}</h3>
                    <p className="text-white/70 text-xs mt-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">{foto.kategori}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 font-medium">Belum ada foto galeri</p>
            </div>
          )}

          {displayedGaleri.length > 0 && (
            <div className="flex justify-center mt-12">
              <button className="bg-white border border-gray-200 text-brand-navy px-8 py-3 rounded-[10px] text-xs font-bold uppercase tracking-widest hover:border-brand-pink-start hover:text-brand-pink-start transition-colors">
                Muat Lebih Banyak
              </button>
            </div>
          )}
        </div>
      </section>

    </main>
  )
}
