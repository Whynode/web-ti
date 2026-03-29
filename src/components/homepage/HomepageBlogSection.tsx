"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Pin } from "lucide-react";

type Artikel = {
  id: number;
  judul: string;
  slug: string;
  konten: string;
  thumbnailUrl: string | null;
  tanggalPublish: Date;
  kategori: string;
  isPinned: boolean;
};

type Props = {
  pinned: Artikel | null;
  latest: Artikel[];
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
};

export default function HomepageBlogSection({ pinned, latest }: Props) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="bg-[#FDFDFD] bg-grid-light">
      <div className="container mx-auto px-6 max-w-280 py-16">
        {pinned && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-brand-pink-start text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-[10px] flex items-center gap-1">
                <Pin className="w-3 h-3" /> Artikel Utama
              </span>
            </div>
            <Link href={`/berita/${pinned.slug}`} className="group">
              <div className="relative bg-brand-navy rounded-[10px] overflow-hidden shadow-xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-pink-start to-brand-blue-start z-10" />
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 relative aspect-[16/9] md:aspect-auto md:min-h-[280px]">
                    {pinned.thumbnailUrl ? (
                      <Image
                        src={pinned.thumbnailUrl}
                        alt={pinned.judul}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-navy to-brand-blue-start flex items-center justify-center">
                        <span className="text-white/30 text-4xl font-serif">TKJ</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-navy/80 via-brand-navy/40 to-transparent" />
                  </div>
                  <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-[10px] text-white/60 mb-4">
                      <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded">
                        <Calendar className="w-3 h-3" />
                        {formatDate(pinned.tanggalPublish)}
                      </span>
                      <span className="bg-brand-pink-start/20 text-brand-pink-start px-2 py-1 rounded font-bold uppercase">
                        {pinned.kategori || "Umum"}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white font-serif mb-3 leading-tight group-hover:text-brand-pink-start transition-colors">
                      {pinned.judul}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-3 mb-4 leading-relaxed">
                      {pinned.konten.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').substring(0, 200)}...
                    </p>
                    <span className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                      Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {latest.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-navy font-serif">
                Artikel <span className="text-brand-pink-start">Terbaru</span>
              </h2>
              <Link href="/berita" className="text-xs font-bold text-brand-navy hover:text-brand-pink-start transition-colors uppercase tracking-widest flex items-center gap-1">
                Lihat Semua <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {latest.map((berita) => (
                <motion.div
                  key={berita.id}
                  variants={itemVariants}
                  className="bg-white rounded-[10px] border border-gray-100 overflow-hidden hover:shadow-lg hover:border-brand-pink-start/30 transition-all group flex flex-col h-full"
                >
                  <Link href={`/berita/${berita.slug}`}>
                    <div className="aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="absolute top-3 left-3 z-10 bg-brand-navy text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-[10px] shadow-md">
                        {berita.kategori || "Umum"}
                      </div>
                      {berita.thumbnailUrl ? (
                        <Image 
                          src={berita.thumbnailUrl} 
                          alt={berita.judul} 
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/beranda-bg.webp";
                          }}
                        />
                      ) : (
                        <div className="text-center p-4">
                          <svg className="w-10 h-10 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-brand-pink-start" /> 
                          {formatDate(berita.tanggalPublish)}
                        </span>
                      </div>
                      <h3 className="font-bold text-brand-navy text-sm font-serif mb-2 leading-snug group-hover:text-brand-pink-start transition-colors line-clamp-2">
                        {berita.judul}
                      </h3>
                      <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed mb-3 flex-1">
                        {berita.konten.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').substring(0, 100)}...
                      </p>
                      <span className="text-[10px] font-bold text-brand-navy group-hover:text-brand-pink-start transition-colors uppercase tracking-widest flex items-center gap-1 mt-auto">Baca <ArrowRight className="w-3 h-3" /></span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {latest.length === 0 && !pinned && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">Belum ada artikel. Tambahkan artikel dari admin.</p>
          </div>
        )}
      </div>
    </section>
  );
}