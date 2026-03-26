"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  GraduationCap,
  BarChart3,
  Building2,
  Monitor,
  Home,
  Cpu,
  Wifi,
  Zap,
  ShieldCheck,
  UserCheck,
  Building,
  User,
  MapPin,
  Mail
} from "lucide-react";
import { MarqueeTicker } from "@/components/ui/MarqueeTicker";

type Guru = {
  id: number;
  nama: string;
  posisi: string;
  mapel: string;
  fotoUrl: string | null;
};

type Props = {
  guruList: Guru[];
  kepalaSekolah: Guru | undefined;
  guruLainnya: Guru[];
};

export default function InformasiClient({ guruList, kepalaSekolah, guruLainnya }: Props) {
  return (
    <main className="min-h-screen bg-brand-navy/5 text-brand-navy">

      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-3 block">Informasi Lengkap</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white font-serif mb-4 leading-tight">Informasi <span className="text-brand-pink-start">Sekolah</span></h1>
            <p className="text-sm text-white/70 max-w-2xl mx-auto font-medium leading-relaxed">Data akademik, pendidik & tendik, sarana prasana, dan info yayasan SMKS Telematika Indramayu.</p>
          </motion.div>
        </div>
      </section>

      <MarqueeTicker variant="pink" />

      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-12 bg-white"
      >
        <div className="container mx-auto px-6 max-w-[1120px]">

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-2 block">Statistik</span>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy font-serif">Data <span className="text-brand-pink-start">Akademik</span></h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: "Total Siswa", value: guruList.length > 0 ? guruList.length * 4 : "60", icon: <Users className="w-5 h-5" /> },
              { label: "Rombongan Belajar", value: "3", icon: <BookOpen className="w-5 h-5" /> },
              { label: "Rasio Siswa/Rombel", value: "20", icon: <TrendingUp className="w-5 h-5" /> },
              { label: "Daya Tampung", value: "20", icon: <GraduationCap className="w-5 h-5" /> },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-brand-navy/5 rounded-[10px] border border-brand-navy/10 p-5 text-center hover:border-brand-pink-start/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-[10px] bg-brand-pink-start/10 border border-brand-pink-start/20 flex items-center justify-center mx-auto mb-3 text-brand-pink-start">
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold font-serif text-brand-navy mb-1">{stat.value}</p>
                <p className="text-[10px] text-brand-navy/50 uppercase tracking-wider font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[10px] border border-brand-navy/10 p-6"
            >
              <h3 className="text-base font-bold text-brand-navy font-serif mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-brand-pink-start" />
                </div>
                Distribusi Siswa
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-medium text-brand-navy/70">Total Siswa</span>
                    <span className="font-bold text-brand-navy">{guruList.length > 0 ? guruList.length * 4 : 60} siswa</span>
                  </div>
                  <div className="h-2 bg-brand-navy/10 rounded-[5px] overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-brand-pink-start to-brand-blue-start rounded-[5px]" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-brand-navy/5 rounded-[10px] p-4 text-center"
                  >
                    <p className="text-2xl font-bold font-serif text-brand-navy mb-0.5">30</p>
                    <p className="text-[10px] text-brand-navy/50 uppercase tracking-wider">Laki-laki</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="bg-brand-pink-start/5 rounded-[10px] p-4 text-center"
                  >
                    <p className="text-2xl font-bold font-serif text-brand-pink-start mb-0.5">30</p>
                    <p className="text-[10px] text-brand-navy/50 uppercase tracking-wider">Perempuan</p>
                  </motion.div>
                </div>
              </div>

              <h4 className="text-sm font-bold text-brand-navy mt-5 mb-3">Per Tingkat</h4>
              <div className="space-y-2">
                {[
                  { tingkat: "Kelas X", laki: 10, perempuan: 10, total: 20 },
                  { tingkat: "Kelas XI", laki: 10, perempuan: 10, total: 20 },
                  { tingkat: "Kelas XII", laki: 10, perempuan: 10, total: 20 },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-brand-navy/5 rounded-[10px]"
                  >
                    <div className="w-20 text-xs font-bold text-brand-navy/70">{item.tingkat}</div>
                    <div className="flex-1">
                      <div className="h-1.5 bg-brand-navy/10 rounded-[5px] overflow-hidden flex">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(item.laki / item.total) * 50}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                          className="h-full bg-brand-blue-start" 
                        />
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(item.perempuan / item.total) * 50}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="h-full bg-brand-pink-start" 
                        />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand-navy/70 w-12 text-right">{item.total}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-[10px] border border-brand-navy/10 p-5">
                <h3 className="text-sm font-bold text-brand-navy font-serif mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-[10px] bg-brand-blue-start/10 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-brand-blue-start" />
                  </div>
                  Rombongan Belajar
                </h3>
                <div className="space-y-2">
                  {[
                    { tingkat: "Kelas X", rombel: "X A" },
                    { tingkat: "Kelas XI", rombel: "XI A" },
                    { tingkat: "Kelas XII", rombel: "XII A" },
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between p-3 bg-brand-navy/5 rounded-[10px] hover:bg-brand-pink-start/5 transition-colors"
                    >
                      <span className="text-xs font-medium text-brand-navy/70">{item.tingkat}</span>
                      <span className="text-xl font-bold font-serif text-brand-pink-start">{item.rombel}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-brand-navy rounded-[10px] p-5 text-white">
                <h3 className="text-sm font-bold font-serif mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-[10px] bg-white/10 flex items-center justify-center">
                    <Award className="w-4 h-4 text-brand-pink-start" />
                  </div>
                  Rasio & Persentase
                </h3>
                <div className="space-y-2">
                  {[
                    { label: "Rasio Siswa/Guru", value: guruList.length > 0 ? Math.round((guruList.length * 4) / guruList.length) : "4" },
                    { label: "Rasio Rombel/Ruang", value: "1" },
                    { label: "Guru Bersertifikat", value: "71.43%" },
                    { label: "Guru Sesuai Klasifikasi", value: "85.71%" },
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex justify-between items-center py-2 border-b border-white/10 last:border-0"
                    >
                      <span className="text-xs text-white/60">{item.label}</span>
                      <span className="text-base font-bold text-brand-pink-start">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[10px] border border-brand-navy/10 p-6"
          >
            <h3 className="text-sm font-bold text-brand-navy font-serif mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-brand-pink-start" />
              </div>
              Distribusi Siswa per Usia
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { usia: "15 tahun", total: 20 },
                { usia: "16 tahun", total: 20 },
                { usia: "17 tahun", total: 20 },
                { usia: "18 tahun", total: 0 },
                { usia: "> 18 tahun", total: 0 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-brand-navy/5 rounded-[10px] p-4 text-center hover:border-brand-pink-start/30 border border-transparent transition-all duration-300 cursor-pointer"
                >
                  <p className="text-2xl font-bold font-serif text-brand-pink-start mb-0.5">{item.total}</p>
                  <p className="text-[10px] text-brand-navy/50">{item.usia}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12 bg-white"
      >
        <div className="container mx-auto px-6 max-w-[1120px]">

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-2 block">Infrastruktur</span>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy font-serif">Sarana <span className="text-brand-pink-start">&</span> Prasarana</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
          >
            {[
              { label: "Ruang Kelas", value: "13", icon: <Home className="w-5 h-5" />, status: "Baik" },
              { label: "Lab Komputer", value: "3", icon: <Monitor className="w-5 h-5" />, status: "Baik" },
              { label: "Perpustakaan", value: "1", icon: <BookOpen className="w-5 h-5" />, status: "Baik" },
              { label: "Ruang Praktik", value: "2", icon: <Cpu className="w-5 h-5" />, status: "Baik" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-brand-navy/5 rounded-[10px] border border-brand-navy/10 p-5 text-center hover:border-brand-pink-start/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-[10px] bg-brand-pink-start/10 border border-brand-pink-start/20 flex items-center justify-center mx-auto mb-3 text-brand-pink-start">
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold font-serif text-brand-navy mb-0.5">{stat.value}</p>
                <p className="text-[10px] text-brand-navy/50 uppercase tracking-wider mb-2">{stat.label}</p>
                <span className="inline-block px-2 py-0.5 bg-brand-pink-start/10 text-brand-pink-start text-[9px] font-bold rounded-[5px] uppercase">{stat.status}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[10px] border border-brand-navy/10 p-5"
            >
              <h3 className="text-sm font-bold text-brand-navy font-serif mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center">
                  <Home className="w-4 h-4 text-brand-pink-start" />
                </div>
                Kondisi Ruang Kelas
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Baik", jumlah: 13, color: "bg-brand-pink-start" },
                  { label: "Rusak Ringan", jumlah: 0, color: "bg-brand-yellow" },
                  { label: "Rusak Sedang", jumlah: 0, color: "bg-brand-blue-start" },
                  { label: "Rusak Berat", jumlah: 0, color: "bg-red-500" },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-brand-navy/5 rounded-[10px]"
                  >
                    <div className="flex items-center gap-2 w-28">
                      <div className={`w-3 h-3 rounded-[3px] ${item.color}`} />
                      <span className="text-xs font-medium text-brand-navy/70">{item.label}</span>
                    </div>
                    <div className="flex-1 h-1.5 bg-brand-navy/10 rounded-[5px] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: item.jumlah === 13 ? "100%" : "0%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className={`h-full ${item.color} rounded-[5px]`}
                      />
                    </div>
                    <span className="text-base font-bold text-brand-navy w-6 text-right">{item.jumlah}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[10px] border border-brand-navy/10 p-5"
            >
              <h3 className="text-sm font-bold text-brand-navy font-serif mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-[10px] bg-brand-blue-start/10 flex items-center justify-center">
                  <Monitor className="w-4 h-4 text-brand-blue-start" />
                </div>
                Laboratorium
              </h3>
              <div className="space-y-2">
                {[
                  { nama: "Lab. Komputer 1", kondisi: "Baik", pc: "40 unit" },
                  { nama: "Lab. Komputer 2", kondisi: "Baik", pc: "40 unit" },
                  { nama: "Lab. Jaringan (Mikrotik)", kondisi: "Baik", pc: "20 unit" },
                ].map((lab, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-3 bg-brand-navy/5 rounded-[10px] hover:bg-brand-blue-start/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[10px] bg-brand-blue-start/10 flex items-center justify-center">
                        <Monitor className="w-5 h-5 text-brand-blue-start" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-brand-navy">{lab.nama}</p>
                        <p className="text-[10px] text-brand-navy/50">{lab.pc}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-brand-pink-start/10 text-brand-pink-start text-[9px] font-bold rounded-[5px] uppercase">{lab.kondisi}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[10px] border border-brand-navy/10 p-5"
          >
            <h3 className="text-sm font-bold text-brand-navy font-serif mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-brand-pink-start" />
              Detail Fasilitas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: <Zap className="w-4 h-4" />, label: "Listrik PLN", value: "5.500 Watt" },
                { icon: <Wifi className="w-4 h-4" />, label: "Internet", value: "200 Mb" },
                { icon: <ShieldCheck className="w-4 h-4" />, label: "Keamanan", value: "CCTV" },
                { icon: <Users className="w-4 h-4" />, label: "Luas Tanah", value: "2.940 m²" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-brand-navy/5 rounded-[10px] p-4 text-center hover:border-brand-pink-start/30 border border-transparent transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-[10px] bg-brand-pink-start/10 border border-brand-pink-start/20 flex items-center justify-center mx-auto mb-2 text-brand-pink-start">
                    {item.icon}
                  </div>
                  <p className="text-[10px] text-brand-navy/50 mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-brand-navy">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12 bg-brand-navy"
      >
        <div className="container mx-auto px-6 max-w-[1120px]">

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-2 block">Tenaga Pendidik</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">Pendidik <span className="text-brand-pink-start">&</span> Tendik</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
          >
            {[
              { label: "Total PTK", value: guruList.length.toString(), icon: <Users className="w-4 h-4" /> },
              { label: "Total Guru", value: guruList.length.toString(), icon: <BookOpen className="w-4 h-4" /> },
              { label: "Guru GTY", value: guruList.length.toString(), icon: <UserCheck className="w-4 h-4" /> },
              { label: "Tersertifikasi", value: "71%", icon: <Award className="w-4 h-4" /> },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/10 border border-white/10 rounded-[10px] p-4 text-center hover:bg-white/20 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-[10px] bg-brand-pink-start/20 border border-brand-pink-start/30 flex items-center justify-center mx-auto mb-2 text-brand-pink-start">
                  {stat.icon}
                </div>
                <p className="text-xl font-bold font-serif text-white mb-0.5">{stat.value}</p>
                <p className="text-[9px] text-white/60 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-[10px] p-6"
            >
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="w-40 h-52 rounded-[10px] overflow-hidden shrink-0 bg-brand-navy/50 flex items-center justify-center relative">
                  <span className="text-4xl font-bold text-white/20 absolute z-0">KS</span>
                  {kepalaSekolah?.fotoUrl && (
                    <Image src={kepalaSekolah?.fotoUrl || ""} alt="Kepala Sekolah" className="w-full h-full object-cover relative z-10" width={160} height={208} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  )}
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <span className="inline-block px-3 py-1 bg-brand-pink-start/20 text-brand-pink-start text-[10px] font-bold uppercase tracking-widest rounded-[5px] mb-3">Sambutan Kepala Sekolah</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white font-serif mb-3">{kepalaSekolah?.nama || "Denny Umar Setiana, S.E., M.M."}</h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-4 max-w-xl">"Di era Revolusi Industri 4.0 dan Society 5.0, penguasaan teknologi informasi bukan lagi sebuah pilihan, melainkan keharusan. SMKS Telematika Indramayu hadir untuk mencetak generasi emas IT yang kompeten dan berakhlak mulia."</p>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    <span className="px-3 py-1 bg-white/10 text-white/80 text-xs font-bold rounded-[5px]">S2</span>
                    <span className="px-3 py-1 bg-brand-pink-start/20 text-brand-pink-start text-xs font-bold rounded-[5px]">Tersertifikasi</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="bg-white/5 border border-white/10 rounded-[10px] p-6">
              <h3 className="text-base font-bold text-white font-serif mb-5 flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-pink-start" />
                Pendidik & Tendik
              </h3>

              {guruLainnya.length === 0 ? (
                <div className="text-center py-8 text-white/40">
                  <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Belum ada data guru lainnya.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {guruLainnya.map((guru, index) => {
                    const isTendik = guru.posisi.toLowerCase().includes("operator") || guru.posisi.toLowerCase().includes("tendik");
                    const initials = guru.nama.split(" ").map((n) => n[0]).slice(0, 2).join("");
                    
                    return (
                      <motion.div
                        key={guru.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.03 }}
                        className={`group rounded-[10px] overflow-hidden border transition-all duration-300 ${
                          isTendik 
                            ? "border-brand-blue-start/30 bg-brand-blue-start/5 hover:border-brand-blue-start/50" 
                            : "border-brand-navy/20 bg-white hover:border-brand-pink-start/40"
                        }`}
                      >
                        <div className="aspect-[3/4] relative bg-brand-navy/10 flex items-center justify-center overflow-hidden">
                          <span className="text-2xl font-bold text-brand-navy/30 absolute z-0">{initials}</span>
                          {guru.fotoUrl && (
                            <Image src={guru.fotoUrl} alt={guru.nama} className="w-full h-full object-cover relative z-10" width={160} height={208} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          )}
                          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 ${
                            isTendik ? "bg-brand-blue-start/80" : "bg-brand-pink-start/80"
                          }`} />
                        </div>
                        <div className="p-3 text-center">
                          <h3 className="text-sm font-semibold text-slate-800 leading-tight">
                            {guru.nama}
                          </h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 mb-1.5">
                            {guru.posisi}
                          </p>
                          {guru.mapel && guru.mapel !== "-" && (
                            <p className="text-xs text-slate-500 font-medium leading-tight line-clamp-2">{guru.mapel}</p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              <div className="flex justify-center mt-8">
                <Link href="/guru" className="px-6 py-3 bg-brand-pink-start text-white text-[11px] font-bold uppercase tracking-widest rounded-[10px] hover:bg-brand-pink-end transition-colors shadow-md flex items-center gap-2">
                  Lihat Semua Guru <User className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12 bg-white"
      >
        <div className="container mx-auto px-6 max-w-[1120px]">

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-2 block">Organisasi</span>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy font-serif">Info <span className="text-brand-pink-start">Yayasan</span></h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-[10px] border border-brand-navy/10 p-5 mb-4">
              <h3 className="text-lg font-bold text-brand-navy font-serif mb-4 flex items-center gap-2">
                <div className="w-9 h-9 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center">
                  <Building className="w-4 h-4 text-brand-pink-start" />
                </div>
                Yayasan Pendidikan Telematika Indramayu
              </h3>

              <div className="space-y-3">
                {[
                  { icon: <MapPin className="w-4 h-4" />, label: "Alamat", value: "Jl. Raya Sindangkerta, Sindangkerta, Kec. Lohbener, Kab. Indramayu, Prov. Jawa Barat" },
                  { icon: <User className="w-4 h-4" />, label: "Pimpinan Yayasan", value: "Ir. Eko Siswoyo" },
                  { icon: <Mail className="w-4 h-4" />, label: "Email", value: "yayasantelematika@ymail.com" },
                  { icon: <BookOpen className="w-4 h-4" />, label: "No. Pendirian", value: "-" },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 p-3 bg-brand-navy/5 rounded-[10px]"
                  >
                    <div className="w-8 h-8 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-brand-pink-start">{item.icon}</span>
                    </div>
                    <div>
                      <p className="text-[9px] text-brand-navy/50 uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-xs font-medium text-brand-navy">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-brand-navy rounded-[10px] p-5 text-white border border-white/10"
            >
              <h3 className="text-sm font-bold font-serif mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-pink-start" />
                Units yang Dinaungi
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/5 rounded-[10px] p-4 text-center hover:bg-white/10 transition-colors"
                >
                  <p className="text-2xl font-bold font-serif text-brand-pink-start mb-0.5">1</p>
                  <p className="text-[10px] text-white/60">SMKS Telematika Indramayu</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/5 rounded-[10px] p-4 text-center hover:bg-white/10 transition-colors"
                >
                  <p className="text-2xl font-bold font-serif text-brand-pink-start mb-0.5">TK</p>
                  <p className="text-[10px] text-white/60">Units Pendidikan Anak Usia Dini</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <MarqueeTicker variant="pink" />

    </main>
  );
}
