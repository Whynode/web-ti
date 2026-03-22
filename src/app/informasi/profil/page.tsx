"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Award, FileText, MapPin, Phone, Mail, Clock, Building, Users, BookOpen, CheckCircle } from "lucide-react";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function ProfilPage() {
  return (
    <main className="min-h-screen bg-grid-light bg-[#FDFDFD] text-gray-900 relative pb-20">

      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden bg-grid-dark">
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-4 block">Informasi Sekolah</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white font-serif mb-6 leading-tight">Profil <span className="text-brand-pink-start">Sekolah</span></h1>
            <p className="text-sm text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">Informasi lengkap tentang SMKS Telematika Indramayu termasuk legalitas, akreditasi, dan data resmi sekolah.</p>
          </motion.div>
        </div>
      </section>

      <div className="bg-gradient-to-r from-brand-pink-start to-brand-blue-start py-3">
        <div className="container mx-auto px-6 max-w-[1120px]">
          <div className="flex items-center justify-center gap-6 text-white text-xs font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><Building className="w-3 h-3" /> NPSN: 20215946</span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-2"><Award className="w-3 h-3" /> Akreditasi A</span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-3 h-3" /> Negeri</span>
          </div>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-[1120px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-[10px] border border-gray-200 p-8 shadow-sm">
                <h2 className="text-xl font-bold text-brand-navy font-serif mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center">
                    <Building className="w-5 h-5 text-brand-pink-start" />
                  </div>
                  Informasi Dasar
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Nama Sekolah</span>
                    <span className="text-sm font-bold text-gray-800 text-right max-w-[200px]">SMKS TELEMATIKA INDRAMAYU</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">NPSN</span>
                    <span className="text-sm font-bold text-gray-800">20215946</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Bentuk</span>
                    <span className="text-sm font-bold text-gray-800">SMK</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Status</span>
                    <span className="text-sm font-bold text-brand-pink-start">SWASTA</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Kurikulum</span>
                    <span className="text-sm font-bold text-gray-800">Lainnya</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Waktu Belajar</span>
                    <span className="text-sm font-bold text-gray-800">Sehari Penuh / 5 Hari</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[10px] border border-gray-200 p-8 shadow-sm">
                <h2 className="text-xl font-bold text-brand-navy font-serif mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[10px] bg-brand-blue-start/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-blue-start" />
                  </div>
                  Alamat & Kontak
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Jalan Raya Sindangkerta Lohbener</p>
                      <p className="text-xs text-gray-500">Sindangkerta, Kec. Lohbener</p>
                      <p className="text-xs text-gray-500">Kab. Indramayu, Prov. Jawa Barat</p>
                      <p className="text-xs font-bold text-gray-700 mt-1">Kode Pos: 45252</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-sm font-medium text-gray-800">271412</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-sm font-medium text-gray-800">smktelindramayu@ymail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-sm font-medium text-gray-800">smktelematikaindramayu.sch.id</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-[10px] border border-gray-200 p-8 shadow-sm">
                <h2 className="text-xl font-bold text-brand-navy font-serif mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-brand-pink-start" />
                  </div>
                  Legalitas
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-[10px] p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">SK Pendirian</p>
                    <p className="text-sm font-bold text-gray-800 mb-1">C-221.HT.01.02.TH 2003</p>
                    <p className="text-xs text-gray-500">Tanggal: 11 November 2003</p>
                  </div>
                  <div className="bg-gray-50 rounded-[10px] p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">SK Operasional</p>
                    <p className="text-sm font-bold text-gray-800 mb-1">420.32.SIP.093/Kep.26-Sekret</p>
                    <p className="text-xs text-gray-500">Tanggal: 22 Februari 2016</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-brand-navy to-[#243560] rounded-[10px] p-8 text-white">
                <h2 className="text-xl font-bold font-serif mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[10px] bg-white/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-brand-pink-start" />
                  </div>
                  Akreditasi
                </h2>
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 rounded-[10px] bg-brand-pink-start flex items-center justify-center">
                    <span className="text-3xl font-bold font-serif">A</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Akreditasi Utama</p>
                    <p className="text-xs text-white/70">No. SK: 1466/BAN-SM/SK/2022</p>
                    <p className="text-xs text-white/70">Masa Berlaku: 2022 - 2027</p>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/70">Akreditasi Dapodik</span>
                    <span className="font-bold">A (Nilai: 91)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/70">Tahun</span>
                    <span className="font-bold">2021</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[10px] border border-gray-200 p-8 shadow-sm">
                <h2 className="text-xl font-bold text-brand-navy font-serif mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-brand-pink-start" />
                  </div>
                  Pimpinan Sekolah
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-[10px]">
                    <div className="w-12 h-12 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-brand-pink-start">DS</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">Denny Umar Setiana, S.E., M.M.</p>
                      <p className="text-xs text-gray-500">Kepala Sekolah</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-[10px]">
                    <div className="w-12 h-12 rounded-[10px] bg-brand-blue-start/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-brand-blue-start">AZ</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">Ade Zainal Musthafa</p>
                      <p className="text-xs text-gray-500">Operator Sekolah</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  );
}
