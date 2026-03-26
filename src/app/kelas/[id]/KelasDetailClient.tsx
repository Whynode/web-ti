"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  ChevronLeft, 
  User, 
  Crown, 
  Users, 
  Star,
  Award,
  Wallet,
  GraduationCap
} from "lucide-react";

type StrukturKelas = {
 waliKelas: { nama: string; posisi: string; avatar: string; fotoUrl: string | null };
 ketuaKelas: { nama: string; posisi: string; avatar: string; fotoUrl: string | null };
	wakil: { nama: string; posisi: string; avatar: string; fotoUrl: string | null };
	sekretaris: { nama: string; posisi: string; avatar: string; fotoUrl: string | null };
	bendahara: { nama: string; posisi: string; avatar: string; fotoUrl: string | null };
};

type Props = {
  data: {
    id: number;
    namaKelas: string;
    deskripsi: string | null;
    totalSiswa: number;
  waliKelas: { nama: string; posisi: string; avatar: string; fotoUrl: string | null };
    struktur: StrukturKelas;
    siswa: { id: number; nama: string; peran: string; fotoUrl: string | null }[];
  };
};

function AvatarDisplay({ nama, avatar, fotoUrl, className = "" }: { nama: string; avatar: string; fotoUrl: string | null; className?: string }) {
  if (fotoUrl) {
    return (
      <Image 
        src={fotoUrl} 
        alt={nama} 
        width={80}
        height={80}
        className={`w-full h-full object-cover ${className}`}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/beranda-bg.webp";
        }}
      />
    );
  }
  return (
    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-navy/20 to-brand-blue-start/20 ${className}`}>
      <span className="text-lg font-bold text-brand-navy">{avatar}</span>
    </div>
  );
}

export default function KelasDetailClient({ data }: Props) {
  const regularSiswa = data.siswa.filter(s => s.peran === "SISWA");

  return (
    <main className="min-h-screen bg-grid-light bg-[#FDFDFD] text-gray-900 relative">

      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden bg-grid-dark">
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10">
          <Link href="/kelas" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Kembali ke Daftar Kelas</span>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-2 block">Struktur Kelas</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-serif">{data.namaKelas}</h1>
            {data.deskripsi && (
              <p className="text-sm text-white/70 mt-2 max-w-2xl">{data.deskripsi}</p>
            )}
          </motion.div>
        </div>
      </section>

      <div className="bg-gradient-to-r from-brand-pink-start to-brand-blue-start py-3">
        <div className="container mx-auto px-6 max-w-[1120px]">
          <div className="flex items-center justify-center gap-8 text-white text-xs font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><Users className="w-3 h-3" /> {data.totalSiswa} Siswa</span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-2"><User className="w-3 h-3" /> Wali Kelas: {data.waliKelas.nama}</span>
          </div>
        </div>
      </div>

      <section className="py-16 relative z-10">
        <div className="container mx-auto px-6 max-w-[1120px]">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-white rounded-[10px] border border-brand-navy/10 p-8 shadow-sm mb-12"
          >
            <h2 className="text-xl font-bold text-brand-navy font-serif mb-8 flex items-center gap-3 justify-center">
              <User className="w-6 h-6 text-brand-pink-start" />
              Struktur Organisasi Kelas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-br from-brand-navy to-[#243560] rounded-[10px] p-5 text-white text-center"
              >
                <div className="w-20 h-20 rounded-[10px] overflow-hidden mx-auto mb-3">
                  <AvatarDisplay nama={data.waliKelas.nama} avatar={data.waliKelas.avatar} fotoUrl={data.waliKelas.fotoUrl} />
                </div>
                <span className="inline-block px-2 py-0.5 bg-brand-pink-start text-white text-[10px] font-bold rounded-[10px] uppercase mb-2">Wali Kelas</span>
                <h3 className="text-sm font-bold text-center">{data.waliKelas.nama}</h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="relative bg-brand-pink-start/10 border border-brand-pink-start/30 rounded-[10px] p-5 text-center"
              >
                <div className="w-20 h-20 rounded-[10px] overflow-hidden mx-auto mb-3">
                  <AvatarDisplay nama={data.struktur.ketuaKelas.nama} avatar={data.struktur.ketuaKelas.avatar} fotoUrl={data.struktur.ketuaKelas.fotoUrl} />
                </div>
                <span className="inline-block px-2 py-0.5 bg-brand-pink-start text-white text-[10px] font-bold rounded-[10px] uppercase mb-2">Ketua</span>
                <h3 className="text-sm font-bold text-center">{data.struktur.ketuaKelas.nama}</h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative bg-brand-blue-start/10 border border-brand-blue-start/30 rounded-[10px] p-5 text-center"
              >
                <div className="w-20 h-20 rounded-[10px] overflow-hidden mx-auto mb-3">
                  <AvatarDisplay nama={data.struktur.wakil.nama} avatar={data.struktur.wakil.avatar} fotoUrl={data.struktur.wakil.fotoUrl} />
                </div>
                <span className="inline-block px-2 py-0.5 bg-brand-blue-start text-white text-[10px] font-bold rounded-[10px] uppercase mb-2">Wakel</span>
                <h3 className="text-sm font-bold text-center">{data.struktur.wakil.nama}</h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="relative bg-brand-yellow/10 border border-brand-yellow/30 rounded-[10px] p-5 text-center"
              >
                <div className="w-20 h-20 rounded-[10px] overflow-hidden mx-auto mb-3">
                  <AvatarDisplay nama={data.struktur.sekretaris.nama} avatar={data.struktur.sekretaris.avatar} fotoUrl={data.struktur.sekretaris.fotoUrl} />
                </div>
                <span className="inline-block px-2 py-0.5 bg-brand-yellow text-brand-navy text-[10px] font-bold rounded-[10px] uppercase mb-2">Sekretaris</span>
                <h3 className="text-sm font-bold text-center">{data.struktur.sekretaris.nama}</h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative bg-brand-navy/5 border border-brand-navy/20 rounded-[10px] p-5 text-center"
              >
                <div className="w-20 h-20 rounded-[10px] overflow-hidden mx-auto mb-3">
                  <AvatarDisplay nama={data.struktur.bendahara.nama} avatar={data.struktur.bendahara.avatar} fotoUrl={data.struktur.bendahara.fotoUrl} />
                </div>
                <span className="inline-block px-2 py-0.5 bg-brand-navy text-white text-[10px] font-bold rounded-[10px] uppercase mb-2">Bendahara</span>
                <h3 className="text-sm font-bold text-center">{data.struktur.bendahara.nama}</h3>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[10px] border border-brand-navy/10 p-8 shadow-sm"
          >
            <h2 className="text-xl font-bold text-brand-navy font-serif mb-8 flex items-center gap-3">
              <Users className="w-6 h-6 text-brand-pink-start" />
              Daftar Siswa ({regularSiswa.length} Orang)
            </h2>

            {regularSiswa.length === 0 ? (
              <div className="text-center py-12">
                <GraduationCap className="w-16 h-16 text-brand-navy/20 mx-auto mb-4" />
                <p className="text-sm text-brand-navy/60">Belum ada data siswa dalam kelas ini.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {regularSiswa.map((siswa, i) => (
                  <motion.div
                    key={siswa.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02 }}
                    className="bg-brand-navy/5 rounded-[10px] overflow-hidden hover:bg-brand-pink-start/5 transition-colors group"
                  >
                    <div className="aspect-[3/4] relative">
                      {siswa.fotoUrl ? (
                        <Image 
                          src={siswa.fotoUrl || ""} 
                          alt={siswa.nama}
                          width={160}
                          height={213}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/beranda-bg.webp";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-navy/10 to-brand-blue-start/10 flex items-center justify-center">
                          <User className="w-12 h-12 text-brand-navy/20" />
                        </div>
                      )}
                    </div>
                    <div className="p-3 text-center">
                      <p className="text-xs font-medium text-brand-navy/80 truncate">{siswa.nama}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

        </div>
      </section>

    </main>
  );
}
