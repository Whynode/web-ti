"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Users, BookOpen, ChevronRight, Award, GraduationCap } from "lucide-react";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

type KelasData = {
  id: number;
  namaKelas: string;
  totalSiswa: number;
  waliKelas: string;
  deskripsi: string;
};

type StatsData = {
  totalSiswa: number;
  totalRombel: number;
  totalTingkat: number;
};

type Props = {
  kelas: KelasData[];
  stats: StatsData;
};

export default function KelasClient({ kelas, stats }: Props) {
  return (
    <main className="min-h-screen bg-grid-light bg-[#FDFDFD] text-gray-900 relative pb-20">

      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden bg-grid-dark">
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-4 block">Struktur Kelas</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-serif mb-6 leading-tight">Data <span className="text-brand-pink-start">Kelas</span></h1>
            <p className="text-sm text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">Informasi lengkap tentang struktur kelas dan organisasi kelas SMKS Telematika Indramayu.</p>
          </motion.div>
        </div>
      </section>

      <div className="bg-gradient-to-r from-brand-pink-start to-brand-blue-start py-3">
        <div className="container mx-auto px-6 max-w-[1120px]">
          <div className="flex items-center justify-center gap-8 text-white text-xs font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><Users className="w-3 h-3" /> Total Siswa: {stats.totalSiswa}</span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-2"><BookOpen className="w-3 h-3" /> Total Rombel: {stats.totalRombel}</span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-2"><Award className="w-3 h-3" /> {stats.totalTingkat} Tingkat</span>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-[1120px]">

          {kelas.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="bg-white rounded-[10px] border border-brand-navy/10 p-12 text-center"
            >
              <GraduationCap className="w-16 h-16 text-brand-navy/20 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brand-navy font-serif mb-2">Belum Ada Data Kelas</h3>
              <p className="text-sm text-brand-navy/60">Kelas akan ditampilkan di sini setelah admin menambahkan data.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kelas.map((kelasItem, index) => (
                <motion.div
                  key={kelasItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/kelas/${kelasItem.id}`}>
                    <div className="bg-white rounded-[10px] border border-brand-navy/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-pink-start/30 transition-all group cursor-pointer h-full flex flex-col">
                      <div className="h-32 bg-gradient-to-br from-brand-navy/5 to-brand-blue-start/5 flex items-center justify-center relative">
                        <GraduationCap className="w-12 h-12 text-brand-navy/20" />
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-brand-pink-start/10 text-brand-pink-start text-[10px] font-bold rounded-[10px]">
                            {kelasItem.totalSiswa} Siswa
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-brand-navy font-serif mb-1">{kelasItem.namaKelas}</h3>
                        <p className="text-xs text-brand-navy/60 mb-3">Wali Kelas: {kelasItem.waliKelas}</p>
                        <p className="text-xs text-brand-navy/60 leading-relaxed line-clamp-2 mb-4 flex-grow">{kelasItem.deskripsi}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-brand-navy/10">
                          <span className="text-[10px] text-brand-navy/40 font-medium uppercase tracking-wider">Rombongan Belajar</span>
                          <span className="flex items-center gap-1 text-brand-pink-start text-xs font-bold group-hover:gap-2 transition-all">
                            Lihat
                            <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

    </main>
  );
}
