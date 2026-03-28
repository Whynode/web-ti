"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Briefcase, 
  Building2, 
  Users, 
  FileText, 
  TrendingUp, 
  Award,
  MapPin,
  Clock,
  ChevronRight,
  GraduationCap,
  Handshake,
  ArrowRight,
  CheckCircle,
  Mail,
  Phone
} from "lucide-react";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

type Mitra = {
  id: string;
  namaPerusahaan: string;
  logoUrl: string | null;
};

type LowonganBKK = {
  id: number;
  judul: string;
  lokasi: string;
  tipePekerjaan: string;
  deskripsi: string;
  status: string;
  posterUrl: string | null;
  createdAt: Date;
  mitra: Mitra;
};

type StatsBKK = {
  totalPenempatan: number;
  mitraIndustri: number;
  lowonganAktif: number;
  tahunBerdiri: number;
};

type Props = {
  lowongan: LowonganBKK[];
  stats: StatsBKK;
  mitra: Mitra[];
};

export default function BKKClient({ lowongan, stats, mitra }: Props) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-gray-900">

      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-pink-start/20 rounded-[10px] blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-blue-start/20 rounded-[10px] blur-3xl" />
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-pink-start/20 text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-6 rounded-[10px]">
              <Handshake className="w-4 h-4" /> Bursa Kerja Khusus
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white font-serif mb-6 leading-tight">
              BKK <span className="text-brand-pink-start">SMKS Telematika</span>
            </h1>
            <p className="text-sm md:text-base text-white/80 max-w-2xl mx-auto font-medium leading-relaxed mb-8">
              Menjembatani lulusan SMK dengan dunia industri melalui informasi lowongan kerja, pelatihan, dan magang di perusahaan mitra terpercaya.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#lowongan" className="bg-brand-pink-start hover:bg-[#d94f92] text-white font-bold px-8 py-4 rounded-[10px] transition-all shadow-lg shadow-brand-pink-start/30 flex items-center gap-2">
                Lihat Lowongan <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#tracer" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-[10px] transition-all flex items-center gap-2">
                Tracer Study <FileText className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#FDFDFD] bg-grid-light">
        <div className="container mx-auto px-6 max-w-[1120px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-center mb-8"
          >
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-2 block">Statistik BKK</span>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy font-serif">Performa <span className="text-brand-pink-start">Kami</span></h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Penempatan", value: stats.totalPenempatan, icon: <Users className="w-5 h-5" /> },
              { label: "Mitra Industri", value: stats.mitraIndustri, icon: <Building2 className="w-5 h-5" /> },
              { label: "Lowongan Aktif", value: stats.lowonganAktif, icon: <Briefcase className="w-5 h-5" /> },
              { label: "Tahun Berdiri", value: stats.tahunBerdiri, icon: <Clock className="w-5 h-5" /> },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[10px] border border-gray-100 p-5 text-center hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/10 transition-all duration-300 ease-in-out"
              >
                <div className="w-10 h-10 rounded-[10px] bg-brand-pink-start/10 border border-brand-pink-start/20 flex items-center justify-center mx-auto mb-3 text-brand-pink-start">
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold font-serif text-brand-navy mb-1">{stat.value}</p>
                <p className="text-[10px] text-brand-navy/50 uppercase tracking-wider font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="visi" className="py-20 bg-brand-navy bg-grid-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <PlaceholderImage className="w-full h-full object-cover" label="BKK Visi" />
        </div>
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-4 block">Tentang BKK</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-6 leading-tight">
                Visi & Misi <span className="text-brand-pink-start">BKK</span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-[10px] bg-brand-pink-start/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6 text-brand-pink-start" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif mb-2">Visi</h3>
                    <p className="text-sm text-white/70 font-medium leading-relaxed">
                      Menjadi lembaga penempatan kerja yang profesional dan terpercaya dalam menjembatani lulusan SMK dengan dunia industri.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white font-serif">Misi</h3>
                  {[
                    "Menyediakan informasi lowongan kerja yang akurat dan terkini",
                    "Melakukan linkage & match dengan dunia industri",
                    "Mengadakan pelatihan dan pengembangan kompetensi lulusan",
                    "Memfasilitasi proses rekrutmen dan penempatan kerja",
                  ].map((misi, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-pink-start mt-0.5 shrink-0" />
                      <p className="text-sm text-white/70 font-medium">{misi}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-[10px] p-8 border border-white/10"
            >
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-[10px] bg-brand-pink-start/20 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-brand-pink-start" />
                </div>
                <h3 className="text-2xl font-bold text-white font-serif">Keunggulan BKK Kami</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Info Lowongan", desc: "Real-time" },
                  { label: "Mitra Industri", desc: "28+ Perusahaan" },
                  { label: "Psikotes", desc: "Gratis" },
                  { label: "Interviews", desc: "On-campus" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 rounded-[10px] p-4 text-center hover:bg-white/10 transition-colors"
                  >
                    <p className="text-lg font-bold text-brand-pink-start mb-1">{item.desc}</p>
                    <p className="text-xs text-white/60">{item.label}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-center gap-4 text-white/70 text-sm">
                  <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> bkk@smktelematika.sch.id</span>
                  <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> (0234) 123456</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="lowongan" className="py-20 bg-[#FDFDFD] bg-grid-light">
        <div className="container mx-auto px-6 max-w-[1120px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-center mb-16"
          >
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-4 block">Kesempatan Karir</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy font-serif">Lowongan <span className="text-brand-pink-start">Kerja</span></h2>
          </motion.div>

          {lowongan.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {lowongan.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link href={`/bkk/${job.id}`} className="block h-full">
                    <div className="h-full bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:shadow-brand-navy/10 hover:-translate-y-1 transition-all duration-300 group">
                      {/* Company Logo - Top */}
                      <div className="flex items-center justify-between mb-3">
                        {job.mitra.logoUrl ? (
                          <Image
                            src={job.mitra.logoUrl}
                            alt={job.mitra.namaPerusahaan}
                            width={36}
                            height={36}
                            className="rounded-lg object-contain"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                          job.status === "BUKA" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          {job.status}
                        </span>
                      </div>
                      
                      {/* Job Title */}
                      <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-brand-pink-start transition-colors">
                        {job.judul}
                      </h3>
                      
                      {/* Company Name */}
                      <p className="text-xs text-gray-500 mb-3 truncate">
                        {job.mitra.namaPerusahaan}
                      </p>
                      
                      {/* Badges */}
                      <div className="flex flex-wrap gap-1 mt-auto">
                        <span className="px-2 py-0.5 text-[9px] font-medium bg-gray-100 text-gray-600 rounded">
                          {job.tipePekerjaan}
                        </span>
                        <span className="px-2 py-0.5 text-[9px] font-medium bg-gray-100 text-gray-600 rounded flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5" />
                          {job.lokasi || "-"}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">Belum ada lowongan kerja yang tersedia saat ini.</p>
            </div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="#" className="inline-flex items-center gap-2 bg-brand-navy hover:bg-[#243560] text-white font-bold px-8 py-4 rounded-[10px] transition-all shadow-lg">
              Lihat Semua Lowongan <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-[1120px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-center mb-8"
          >
            <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-2 block">Kolaborasi</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif">Mitra <span className="text-brand-pink-start">Industri</span></h2>
          </motion.div>

          {mitra.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {mitra.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl border border-gray-100 p-3 flex items-center justify-center w-full h-24 sm:h-28 shadow-sm hover:shadow-md hover:border-brand-pink-start/30 transition-all"
                >
                  {m.logoUrl ? (
                    <Image
                      src={m.logoUrl}
                      alt={m.namaPerusahaan}
                      width={100}
                      height={60}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <Building2 className="w-8 h-8 text-gray-300 mx-auto mb-1" />
                      <span className="text-[8px] text-gray-400">{m.namaPerusahaan}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Building2 className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 text-sm">Belum ada mitra industri</p>
            </div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-gray-500 text-sm">Bergabung dengan {stats.mitraIndustri}+ perusahaan mitra</p>
          </motion.div>
        </div>
      </section>

      <section id="tracer" className="py-20 bg-[#FDFDFD] bg-grid-light">
        <div className="container mx-auto px-6 max-w-[1120px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-4 block">Tracer Study</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy font-serif mb-6 leading-tight">
                Telusuri <span className="text-brand-pink-start">Jejak</span> Lulusan
              </h2>
              <p className="text-sm text-gray-600 font-medium leading-relaxed mb-8">
                Bantu kami meningkatkan kualitas pendidikan dengan mengisi data tracer study. Informasi Anda sangat berharga untuk pengembangan kurikulum dan koneksi dengan industri.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { label: "Mengukur outcomes pendidikan", icon: <GraduationCap className="w-5 h-5" /> },
                  { label: "Evaluasi relevansi kurikulum", icon: <FileText className="w-5 h-5" /> },
                  { label: "Memperluas jaringan industri", icon: <Building2 className="w-5 h-5" /> },
                  { label: "Meningkatkan kualitas pembelajaran", icon: <TrendingUp className="w-5 h-5" /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center text-brand-pink-start">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
              <Link href="#" className="inline-flex items-center gap-2 bg-brand-pink-start hover:bg-[#d94f92] text-white font-bold px-8 py-4 rounded-[10px] transition-all shadow-lg shadow-brand-pink-start/30">
                Isi Tracer Study <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-brand-navy to-[#243560] rounded-[10px] p-8 text-white shadow-2xl"
            >
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-[10px] bg-brand-pink-start/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-brand-pink-start" />
                </div>
                <h3 className="text-2xl font-bold font-serif">Stats Tracer Study</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "85%", label: "Terdistribusi", color: "text-brand-pink-start" },
                  { value: "72%", label: "Bekerja Sesuai Bidang", color: "text-green-400" },
                  { value: "6 bulan", label: "Rata-rata Tunggu", color: "text-amber-400" },
                  { value: "2.5jt", label: "Rata-rata Gaji Awal", color: "text-blue-400" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 rounded-[10px] p-4 text-center"
                  >
                    <p className={`text-2xl font-bold font-serif ${stat.color} mb-1`}>{stat.value}</p>
                    <p className="text-xs text-white/60">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  );
}
