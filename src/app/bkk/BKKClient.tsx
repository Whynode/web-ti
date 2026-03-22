"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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
import { MarqueeTicker } from "@/components/ui/MarqueeTicker";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

type LowonganBKK = {
  id: number;
  posisi: string;
  perusahaan: string;
  lokasi: string;
  tipePekerjaan: string;
  deskripsi: string;
  persyaratan: string;
  batasLamaran: Date;
};

type StatsBKK = {
  totalPenempatan: number;
  mitraIndustri: number;
  lowonganAktif: number;
  tahunBerdiri: number;
};

const mitraIndustri = [
  { id: 1, nama: "Telkom Indonesia" },
  { id: 2, nama: "Cisco Indonesia" },
  { id: 3, nama: "MikroTik" },
  { id: 4, nama: "PT Astra International" },
  { id: 5, nama: "Digital Village" },
  { id: 6, nama: "Indosat Ooredoo" },
  { id: 7, nama: "XL Axiata" },
  { id: 8, nama: "D-Link Indonesia" },
];

type Props = {
  lowongan: LowonganBKK[];
  stats: StatsBKK;
};

export default function BKKClient({ lowongan, stats }: Props) {
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

      <MarqueeTicker variant="pink" />

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowongan.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-[10px] border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/10 transition-all duration-300 ease-in-out group"
                >
                  <Link href={`/bkk/${job.id}`} className="block p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-[10px] bg-brand-navy/5 flex items-center justify-center shrink-0">
                        <div className="text-center">
                          <Building2 className="w-5 h-5 text-brand-navy/30 mx-auto mb-0.5" />
                          <span className="text-[7px] text-brand-navy/40 block">Durung Ana</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-brand-navy font-serif group-hover:text-brand-pink-start transition-colors">{job.posisi}</h3>
                        <p className="text-xs text-brand-navy/50 truncate">{job.perusahaan}</p>
                      </div>
                    </div>
                    <p className="text-xs text-brand-navy/60 font-medium leading-relaxed mb-3 line-clamp-2">{job.deskripsi}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {job.persyaratan.split("\n").slice(0, 2).map((req, j) => (
                        <span key={j} className="px-2 py-0.5 bg-brand-pink-start/5 text-brand-pink-start text-[9px] font-bold rounded-[5px]">
                          {req}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-1.5 text-[11px] text-brand-navy/50 mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> {job.lokasi}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" /> Deadline: {formatDate(job.batasLamaran)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className={`px-2 py-0.5 text-[9px] font-bold rounded-[5px] ${
                        job.tipePekerjaan === "Full Time" ? "bg-brand-pink-start/10 text-brand-pink-start" : "bg-brand-blue-start/10 text-brand-blue-start"
                      }`}>
                        {job.tipePekerjaan}
                      </span>
                      <span className="flex items-center gap-1 text-brand-pink-start text-xs font-bold group-hover:gap-2 transition-all duration-300">
                        Lihat Detail <ChevronRight className="w-3 h-3" />
                      </span>
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

      <section className="py-20 bg-brand-navy bg-grid-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <PlaceholderImage className="w-full h-full object-cover" label="Mitra Industri" />
        </div>
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-center mb-16"
          >
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-4 block">Kolaborasi</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">Mitra <span className="text-brand-pink-start">Industri</span></h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {mitraIndustri.map((mitra, i) => (
              <motion.div
                key={mitra.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-[10px] p-4 flex flex-col items-center justify-center aspect-square hover:bg-white/20 transition-all cursor-pointer group"
              >
                <Building2 className="w-8 h-8 text-white/40 group-hover:text-white/60 transition-colors mb-2" />
                <span className="text-[8px] text-white/50 group-hover:text-white/70 transition-colors text-center leading-tight">{mitra.nama}</span>
                <span className="text-[7px] text-white/30 mt-1">Durung Ana Gambar</span>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-white/60 text-sm mb-4">Bergabung dengan 28+ perusahaan mitra</p>
            <Link href="#" className="inline-flex items-center gap-2 text-brand-pink-start font-bold hover:gap-3 transition-all">
              Lihat Semua Mitra <ChevronRight className="w-4 h-4" />
            </Link>
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

      <MarqueeTicker variant="pink" />

    </main>
  );
}
