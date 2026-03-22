"use client";

import Image from "next/image"
import { motion } from "framer-motion"
import { Cpu, Server, Wifi, Camera, BookOpen, MonitorPlay, Users, Coffee, CheckCircle } from "lucide-react"
import { MarqueeTicker } from "@/components/ui/MarqueeTicker"
import PlaceholderImage from "@/components/ui/PlaceholderImage"

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
};

export default function FasilitasContent() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] text-gray-900 pb-20">

      <section className="relative pt-32 pb-20 bg-brand-navy bg-grid-dark overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-4 block">Sarana & Prasarana</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-serif mb-6 leading-tight">Fasilitas <span className="text-brand-pink-start">Sekolah</span></h1>
            <p className="text-sm text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">Infrastruktur pembelajaran modern berstandar industri dirancang khusus untuk mendukung praktik dan riset peserta didik di bidang IT.</p>
          </motion.div>
        </div>
      </section>

      <MarqueeTicker variant="pink" />

      <section className="py-16 bg-[#FDFDFD] bg-grid-light">
        <div className="container mx-auto px-6 max-w-[1120px]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-center mb-12">
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[9px] mb-3 block">Laboratorium & Area Belajar</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy font-serif leading-tight">Ruang Praktik <span className="text-brand-pink-start">Unggulan</span></h2>
          </motion.div>

          <motion.div
             variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[250px]"
          >
             {[
              { title: 'Lab Komputer Utama', desc: '40 Unit PC Intel Core i7, RAM 16GB.', span: 'md:col-span-2 lg:col-span-2 row-span-2', icon: <Cpu className="w-5 h-5" /> },
              { title: 'Ruang Server & NOC', desc: 'Mini Data Center untuk praktik SysAdmin.', span: 'lg:col-span-1 row-span-1', icon: <Server className="w-5 h-5" /> },
              { title: 'Lab Jaringan (MikroTik/Cisco)', desc: 'Peralatan routing, switching, dan firewall fisik.', span: 'lg:col-span-1 row-span-1', icon: <Wifi className="w-5 h-5" /> },
              { title: 'Perpustakaan Digital', desc: 'Koleksi e-book IT terlengkap & area baca nyaman.', span: 'lg:col-span-1 row-span-1', icon: <BookOpen className="w-5 h-5" /> },
              { title: 'Ruang Kelas Multimedia', desc: 'Dilengkapi Smart TV interaktif dan AC.', span: 'md:col-span-2 lg:col-span-2 row-span-1', icon: <MonitorPlay className="w-5 h-5" /> },
              { title: 'Bengkel Hardware TKJ', desc: 'Area perakitan, soldering, dan troubleshooting.', span: 'lg:col-span-1 row-span-1', icon: <Camera className="w-5 h-5" /> },
              { title: 'Co-Working Space Siswa', desc: 'Area diskusi proyek, startup sekolah, dan tugas akhir.', span: 'md:col-span-2 lg:col-span-2 row-span-1', icon: <Users className="w-5 h-5" /> },
            ].map((fasilitas, i) => (
              <motion.div
                key={i} variants={itemVariants}
                className={`group rounded-[10px] overflow-hidden relative shadow-md bg-gradient-to-br from-brand-navy/5 to-brand-blue-start/5 flex flex-col items-center justify-center ${fasilitas.span}`}
              >
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-[10px] bg-white/50 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {fasilitas.icon}
                  </div>
                  <h3 className="text-brand-navy/60 font-bold text-sm md:text-base font-serif mb-2">{fasilitas.title}</h3>
                  <p className="text-brand-navy/40 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">{fasilitas.desc}</p>
                  <p className="text-brand-navy/40 text-xs mt-3 font-medium">Durung Ana Gambar</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-brand-navy bg-grid-dark relative">
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:w-1/3">
              <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[9px] mb-3 block">Kenyamanan & Keamanan</span>
              <h2 className="text-3xl font-bold text-white font-serif mb-6 leading-tight">Fasilitas <span className="text-brand-pink-start">Penunjang</span></h2>
              <p className="text-sm text-white/80 leading-relaxed font-medium mb-8">
                Kami peduli dengan kenyamanan seluruh warga sekolah. Oleh karena itu, area kampus dilengkapi fasilitas umum yang bersih, memadai, dan mendukung aktivitas sehari-hari.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="lg:w-2/3 grid grid-cols-2 gap-4 w-full"
            >
              {[
                { title: 'Masjid Sekolah', desc: 'Luas & nyaman untuk ibadah.', icon: <Users className="w-4 h-4" /> },
                { title: 'Kantin Sehat', desc: 'Menu higienis dengan harga terjangkau.', icon: <Coffee className="w-4 h-4" /> },
                { title: 'Lapangan Olahraga', desc: 'Futsal, Basket, dan Voli terpadu.', icon: <MonitorPlay className="w-4 h-4" /> },
                { title: 'Akses Wi-Fi High Speed', desc: 'Tersebar di seluruh area publik kampus.', icon: <Wifi className="w-4 h-4" /> },
                { title: 'Area Parkir Luas', desc: 'Dilengkapi CCTV & petugas keamanan 24/7.', icon: <Camera className="w-4 h-4" /> },
                { title: 'UKS (Unit Kesehatan)', desc: 'Pertolongan pertama & cek kesehatan rutin.', icon: <CheckCircle className="w-4 h-4" /> },
              ].map((item, i) => (
                <motion.div key={i} variants={itemVariants} className="bg-white/5 border border-white/10 p-4 rounded-[10px] flex items-start gap-4 hover:bg-white/10 transition-colors group">
                  <div className="w-10 h-10 rounded-[10px] bg-icon-pink-gradient border border-white/20 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs font-serif mb-1 group-hover:text-brand-pink-start transition-colors">{item.title}</h4>
                    <p className="text-[10px] text-white/60 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  )
}
