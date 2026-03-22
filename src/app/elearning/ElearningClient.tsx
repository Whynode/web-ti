"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Play, BookOpen, ChevronRight, Clock, User, FileText } from "lucide-react";

type VideoModule = { title: string; tutor: string; duration: string; description: string };
type VideoCategory = { id: string; name: string; modules: VideoModule[] };
type EbookModule = { title: string; author: string; pages: string; description: string };
type EbookCategory = { id: string; name: string; modules: EbookModule[] };

const videoCategories: VideoCategory[] = [
  { id: "vc1", name: "Pengenalan Jaringan Komputer", modules: [
    { title: "Dasar-dasar Topologi Jaringan", tutor: "Guru Telematika", duration: "24:15", description: "Memahami konsep dasar topologi jaringan komputer dan penerapannya." },
    { title: "Model OSI 7 Layer", tutor: "Guru Telematika", duration: "31:40", description: "Penjelasan lengkap 7 layer model OSI dalam jaringan." },
    { title: "IP Addressing & Subnetting", tutor: "Guru Telematika", duration: "45:20", description: "Teknik pengalamatan IP dan cara melakukan subnetting." },
    { title: "Protokol TCP/IP", tutor: "Guru Telematika", duration: "28:50", description: "Memahami protokol inti dalam komunikasi data." },
    { title: "Switching & Routing Dasar", tutor: "Guru Telematika", duration: "35:10", description: "Perbedaan switch dan router dalam jaringan lokal." },
  ]},
  { id: "vc2", name: "Administrasi Server", modules: [
    { title: "Instalasi Windows Server", tutor: "Guru Telematika", duration: "38:00", description: "Langkah instalasi Windows Server dari awal hingga selesai." },
    { title: "Konfigurasi Active Directory", tutor: "Guru Telematika", duration: "42:30", description: "Membuat dan mengelola domain controller." },
    { title: "Manajemen User & Group Policy", tutor: "Guru Telematika", duration: "29:45", description: "Membuat kebijakan keamanan berbasis group policy." },
    { title: "File Server & Share Permissions", tutor: "Guru Telematika", duration: "33:20", description: "Mengatur akses file dan folder di jaringan." },
    { title: "Backup & Restore Server", tutor: "Guru Telematika", duration: "26:15", description: "Strategi backup data server dan cara restorasinya." },
  ]},
  { id: "vc3", name: "Keamanan Jaringan", modules: [
    { title: "Ancaman & Serangan Siber", tutor: "Guru Telematika", duration: "40:10", description: "Mengenali berbagai jenis ancaman di dunia siber." },
    { title: "Firewall Configuration", tutor: "Guru Telematika", duration: "35:55", description: "Konfigurasi firewall untuk mengamankan jaringan." },
    { title: "VPN & Remote Access", tutor: "Guru Telematika", duration: "31:20", description: "Membangun koneksi aman jarak jauh dengan VPN." },
    { title: "IDS/IPS Fundamentals", tutor: "Guru Telematika", duration: "27:40", description: "Sistem deteksi dan pencegahan intrusion." },
    { title: "Wireless Security", tutor: "Guru Telematika", duration: "22:50", description: "Mengamankan jaringan nirkabel dari ancaman." },
  ]},
  { id: "vc4", name: "Mikrotik Fundamental", modules: [
    { title: "Pengenalan RouterOS", tutor: "Guru Telematika", duration: "30:00", description: "Berkenalan dengan sistem operasi RouterOS." },
    { title: "Basic Routing & NAT", tutor: "Guru Telematika", duration: "44:20", description: "Konfigurasi routing dasar dan NAT di Mikrotik." },
    { title: "Hotspot & User Management", tutor: "Guru Telematika", duration: "38:15", description: "Membuat sistem hotspot dan manajemen pengguna." },
    { title: "Queue & Bandwidth Control", tutor: "Guru Telematika", duration: "32:45", description: "Mengatur pembagian bandwidth secara adil." },
    { title: "Queue Tree & PCQ", tutor: "Guru Telematika", duration: "41:30", description: "Teknik advanced bandwidth management." },
  ]},
  { id: "vc5", name: "Troubleshooting & Diagnosa", modules: [
    { title: "Metodologi Troubleshooting", tutor: "Guru Telematika", duration: "25:10", description: "Pendekatan sistematis dalam menyelesaikan masalah jaringan." },
    { title: "Menggunakan Network Tools", tutor: "Guru Telematika", duration: "29:30", description: "Memaksimalkan utility jaringan untuk diagnosa." },
    { title: "Analisa Packet dengan Wireshark", tutor: "Guru Telematika", duration: "47:20", description: "Teknik capture dan analisis paket data." },
    { title: "Troubleshooting Common Issues", tutor: "Guru Telematika", duration: "36:40", description: "Solusi untuk masalah jaringan yang sering terjadi." },
    { title: "Monitoring dengan Zabbix", tutor: "Guru Telematika", duration: "40:55", description: "Setup monitoring jaringan secara real-time." },
  ]},
];

const ebookCategories: EbookCategory[] = [
  { id: "ec1", name: "Buku Teks Kurikulum", modules: [
    { title: "Dasar-dasar Jaringan Komputer", author: "Guru Telematika", pages: "248", description: "Buku pegangan resmi untuk mata pelajaran jaringan komputer." },
    { title: "Sistem Operasi Jaringan", author: "Guru Telematika", pages: "312", description: "Referensi lengkap administrasi sistem operasi jaringan." },
    { title: "Mikrotik Administrator Guide", author: "Guru Telematika", pages: "186", description: "Panduan praktikum Mikrotik bersertifikat MTCNA." },
    { title: "Keamanan Informasi Dasar", author: "Guru Telematika", pages: "224", description: "Konsep fundamental keamanan informasi dan cyber security." },
    { title: "Administrasi Server Linux", author: "Guru Telematika", pages: "275", description: "Panduan command line dan administrasi server berbasis Linux." },
  ]},
  { id: "ec2", name: "Panduan Sertifikasi", modules: [
    { title: "Persiapan Ujian MTCNA", author: "Guru Telematika", pages: "320", description: "Buku prep course sertifikasi MikroTik Certified Network Associate." },
    { title: "CCNA Study Guide", author: "Guru Telematika", pages: "450", description: "Panduan lengkap persiapan sertifikasi Cisco CCNA." },
    { title: "CompTIA Network+ Review", author: "Guru Telematika", pages: "380", description: "Ringkasan materi dan latihan soal CompTIA Network+." },
    { title: "CEH Certification Prep", author: "Guru Telematika", pages: "295", description: "Persiapan Certified Ethical Hacker certification." },
    { title: "Linux Professional LPIC-1", author: "Guru Telematika", pages: "340", description: "Panduan sertifikasi linux administrator level 1." },
  ]},
];

const VideoCard: React.FC<{ item: VideoModule; index: number; id?: number }> = ({ item, index, id }) => (
  <Link href={id ? `/elearning/${id}` : "/elearning/video"}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="bg-white rounded-[10px] border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/10 transition-all duration-300 ease-in-out cursor-pointer group h-full"
    >
      <div className="relative h-32 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-brand-pink-start/20 group-hover:bg-brand-pink-start/30 transition-colors duration-300 flex items-center justify-center">
          <div className="w-10 h-10 rounded-[10px] bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play className="w-4 h-4 text-white fill-current ml-0.5" />
          </div>
        </div>
        <span className="absolute bottom-2 left-2 right-2 text-[9px] text-white/60 text-center font-medium bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-[5px]">
          sedang dikembangkan arya
        </span>
        <div className="absolute top-2 right-2 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-[5px] flex items-center gap-1">
          <Clock className="w-3 h-3 text-white/80" />
          <span className="text-[10px] font-bold text-white/80">{item.duration}</span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-sm font-bold text-brand-navy mb-1 font-serif group-hover:text-brand-pink-start transition-colors leading-snug">
          {item.title}
        </h4>
        <div className="flex items-center gap-1.5 mb-2">
          <User className="w-3 h-3 text-brand-navy/40" />
          <span className="text-[11px] text-brand-navy/50 font-medium">{item.tutor}</span>
        </div>
        <p className="text-[11px] text-brand-navy/40 leading-relaxed line-clamp-2">{item.description}</p>
      </div>
    </motion.div>
  </Link>
); 

const EbookCard: React.FC<{ item: EbookModule; index: number; id?: number }> = ({ item, index, id }) => (
  <Link href={id ? `/elearning/${id}` : "/elearning/ebook"}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="bg-white rounded-[10px] border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/10 transition-all duration-300 ease-in-out cursor-pointer group flex flex-col h-full"
    >
      <div className="relative h-36 bg-gradient-to-br from-brand-yellow/10 via-brand-yellow/5 to-white flex items-center justify-center p-4 overflow-hidden">
        <div className="relative z-10 bg-white rounded-[10px] shadow-sm p-3 w-full h-full flex flex-col items-center justify-center border border-brand-yellow/20">
          <FileText className="w-6 h-6 text-brand-yellow mb-1.5" />
          <span className="text-[9px] font-bold text-brand-navy/50 uppercase tracking-wider">E-Book</span>
        </div>
        <span className="absolute bottom-2 left-2 right-2 text-[9px] text-brand-navy/50 text-center font-medium bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-[5px]">
          sedang dikembangkan arya
        </span>
        <div className="absolute bottom-2 right-2 bg-brand-navy/80 backdrop-blur-sm px-2 py-0.5 rounded-[5px] flex items-center gap-1">
          <BookOpen className="w-3 h-3 text-white" />
          <span className="text-[10px] font-bold text-white">{item.pages} hal</span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h4 className="text-sm font-bold text-brand-navy mb-1 font-serif group-hover:text-brand-pink-start transition-colors leading-snug line-clamp-2">
          {item.title}
        </h4>
        <div className="flex items-center gap-1.5 mb-2">
          <User className="w-3 h-3 text-brand-navy/40" />
          <span className="text-[11px] text-brand-navy/50 font-medium">{item.author}</span>
        </div>
        <p className="text-[11px] text-brand-navy/40 leading-relaxed line-clamp-2 mt-auto">{item.description}</p>
      </div>
    </motion.div>
  </Link>
);

type Props = {
  materi: {
    id: number;
    judul: string;
    tipeMedia: string;
    linkUrl: string;
    kelasTarget: string;
  }[];
};

export default function ElearningClient({ materi }: Props) {
  const videoCount = videoCategories.reduce((acc, cat) => acc + cat.modules.length, 0);
  const ebookCount = ebookCategories.reduce((acc, cat) => acc + cat.modules.length, 0);
  const dbVideoCount = materi.filter((m) => m.tipeMedia === "VIDEO").length;
  const dbEbookCount = materi.filter((m) => m.tipeMedia === "PDF").length;

  return (
    <main className="min-h-screen bg-grid-light bg-[#FDFDFD] text-gray-900 relative">

      <section className="relative bg-brand-navy pt-32 pb-20 overflow-hidden bg-grid-dark">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink-start/20 rounded-[10px] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue-start/20 rounded-[10px] blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="inline-block bg-brand-pink-start/20 text-brand-pink-start text-[10px] font-bold px-4 py-1.5 rounded-[10px] uppercase tracking-widest mb-6">
                Portal Pembelajaran Digital
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif leading-tight mb-6">
                E-Learning <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink-start to-[#d94f92]">
                  SMKS Telematika
                </span>
              </h1>
              <p className="text-sm text-white/70 font-medium leading-relaxed max-w-lg mb-8">
                Platform pembelajaran interaktif berbasis video dan e-book untuk mendukung kegiatan belajar mengajar. Akses materi kapan saja dan di mana saja.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-3 rounded-[10px]">
                  <div className="w-8 h-8 rounded-[10px] bg-brand-pink-start/30 flex items-center justify-center">
                    <Play className="w-4 h-4 text-brand-pink-start" />
                  </div>
                  <div>
                    <span className="text-white text-xs font-bold block leading-none">Video</span>
                    <span className="text-white/60 text-[10px]">Modul Interaktif</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-3 rounded-[10px]">
                  <div className="w-8 h-8 rounded-[10px] bg-brand-blue-start/30 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-brand-blue-start" />
                  </div>
                  <div>
                    <span className="text-white text-xs font-bold block leading-none">E-Book</span>
                    <span className="text-white/60 text-[10px]">Referensi Lengkap</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="hidden lg:block">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[10px] p-6 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-[10px] p-4 text-center">
                      <span className="text-3xl font-bold text-white font-serif">{videoCount + dbVideoCount}</span>
                      <p className="text-[10px] text-white/60 uppercase tracking-wider mt-1">Total Video</p>
                    </div>
                    <div className="bg-white/10 rounded-[10px] p-4 text-center">
                      <span className="text-3xl font-bold text-brand-pink-start font-serif">{ebookCount + dbEbookCount}</span>
                      <p className="text-[10px] text-white/60 uppercase tracking-wider mt-1">Total E-Book</p>
                    </div>
                    <div className="bg-white/10 rounded-[10px] p-4 text-center">
                      <span className="text-3xl font-bold text-white font-serif">10</span>
                      <p className="text-[10px] text-white/60 uppercase tracking-wider mt-1">Kategori</p>
                    </div>
                    <div className="bg-white/10 rounded-[10px] p-4 text-center">
                      <span className="text-3xl font-bold text-brand-blue-start font-serif">24/7</span>
                      <p className="text-[10px] text-white/60 uppercase tracking-wider mt-1">Akses</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-brand-pink-start to-brand-blue-start py-4">
        <div className="container mx-auto px-6 max-w-[1120px]">
          <div className="flex items-center justify-center gap-8 text-white text-xs font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><Play className="w-3 h-3" /> Pembelajaran Berbasis Video</span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-2"><BookOpen className="w-3 h-3" /> Perpustakaan E-Book</span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> Akses 24 Jam</span>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 max-w-[1120px] py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-6 bg-brand-pink-start rounded-[10px]" />
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e2a4a] font-serif">
              E-Learning <span className="text-brand-pink-start">Berbasis Video</span>
            </h2>
          </div>
          <p className="text-xs text-gray-500 font-medium ml-4 mb-10 max-w-xl">
            Koleksi video pembelajaran interaktif dari tutor berpengalaman. Sempurna untuk belajar teori dan praktik langsung.
          </p>
        </motion.div>

        {videoCategories.map((cat, catIndex) => (
          <section key={cat.id} className="mb-14">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-6"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center text-brand-pink-start font-bold text-sm font-serif">
                  {catIndex + 1}
                </span>
                <h3 className="text-lg font-bold text-[#1e2a4a] font-serif">{cat.name}</h3>
              </div>
              <button className="flex items-center gap-1 text-brand-pink-start text-xs font-bold hover:gap-2 transition-all">
                Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {cat.modules.map((m, idx) => (
                <VideoCard key={idx} item={m} index={idx} />
              ))}
            </div>
          </section>
        ))}

        {materi.filter((m) => m.tipeMedia === "VIDEO").length > 0 && (
          <section className="mb-14">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center text-brand-pink-start font-bold text-sm font-serif">
                  +
                </span>
                <h3 className="text-lg font-bold text-[#1e2a4a] font-serif">Materi Video dari Database</h3>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {materi.filter((m) => m.tipeMedia === "VIDEO").map((m, idx) => (
                <VideoCard key={m.id} item={{ title: m.judul, tutor: m.kelasTarget, duration: "-:--", description: "Klik untuk melihat video" }} index={idx} id={m.id} />
              ))}
            </div>
          </section>
        )}
      </section>

      <div className="bg-gradient-to-r from-[#1e2a4a] via-[#243560] to-[#1e2a4a] py-1" />

      <section className="container mx-auto px-6 max-w-[1120px] py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-6 bg-brand-blue-start rounded-[10px]" />
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e2a4a] font-serif">
              E-Learning <span className="text-brand-blue-start">Khusus E-Book</span>
            </h2>
          </div>
          <p className="text-xs text-gray-500 font-medium ml-4 mb-10 max-w-xl">
            Perpustakaan digital lengkap dengan referensi teori, panduan sertifikasi, dan pengembangan diri.
          </p>
        </motion.div>

        {ebookCategories.map((cat, catIndex) => (
          <section key={cat.id} className="mb-14">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-6"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-[10px] bg-brand-blue-start/10 flex items-center justify-center text-brand-blue-start font-bold text-sm font-serif">
                  {catIndex + 1}
                </span>
                <h3 className="text-lg font-bold text-[#1e2a4a] font-serif">{cat.name}</h3>
              </div>
              <button className="flex items-center gap-1 text-brand-blue-start text-xs font-bold hover:gap-2 transition-all">
                Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {cat.modules.map((m, idx) => (
                <EbookCard key={idx} item={m} index={idx} />
              ))}
            </div>
          </section>
        ))}

        {materi.filter((m) => m.tipeMedia === "PDF").length > 0 && (
          <section className="mb-14">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-[10px] bg-brand-blue-start/10 flex items-center justify-center text-brand-blue-start font-bold text-sm font-serif">
                  +
                </span>
                <h3 className="text-lg font-bold text-[#1e2a4a] font-serif">Materi E-Book dari Database</h3>
              </div>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {materi.filter((m) => m.tipeMedia === "PDF").map((m, idx) => (
                <EbookCard key={m.id} item={{ title: m.judul, author: m.kelasTarget, pages: "-", description: "Klik untuk melihat e-book" }} index={idx} id={m.id} />
              ))}
            </div>
          </section>
        )}
      </section>

      <section className="bg-gradient-to-r from-brand-pink-start to-brand-blue-start py-16">
        <div className="container mx-auto px-6 max-w-[1120px] text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white font-serif mb-4">
              Siap Memulai Perjalanan Belajarmu?
            </h2>
            <p className="text-white/80 text-sm font-medium mb-8 max-w-lg mx-auto">
              Akses seluruh materi pembelajaran sekarang juga dan tingkatkan kompetensimu di bidang IT.
            </p>
            <button className="bg-white text-brand-pink-start px-8 py-4 rounded-[10px] font-bold text-xs uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
              Mulai Belajar Sekarang
            </button>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
