"use client";

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, ClipboardList, Send, FileText, UserPlus, FileCheck, CreditCard, MonitorPlay } from "lucide-react"
import { MarqueeTicker } from "@/components/ui/MarqueeTicker"
import PlaceholderImage from "@/components/ui/PlaceholderImage"

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
};

export default function PPDB() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] text-gray-900 pb-20">

      {/* 1. Header PPDB */}
      <section className="relative pt-32 pb-20 bg-brand-navy bg-grid-dark overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-4 block">Pendaftaran Siswa Baru 2024/2025</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white font-serif mb-6 leading-tight">Bergabunglah <span className="text-brand-pink-start">Bersama Kami</span></h1>
            <p className="text-sm text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">Jadilah bagian dari generasi emas digital. Siapkan diri Anda untuk berkarir di industri IT atau melanjutkan pendidikan tinggi terbaik.</p>
          </motion.div>
        </div>
      </section>

      <MarqueeTicker variant="pink" />

      {/* 2. Informasi Alur & Syarat (Dense Layout) */}
      <section className="py-20 bg-[#FDFDFD] bg-grid-light">
        <div className="container mx-auto px-6 max-w-[1120px]">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Alur Pendaftaran (Kiri) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="mb-10">
                <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[9px] mb-3 block">Prosedur</span>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-navy font-serif leading-tight">Alur <span className="text-brand-pink-start">Pendaftaran</span></h2>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[19px] before:w-[2px] before:bg-gray-100 before:z-0">
                {[
                  { step: '1', title: 'Pendaftaran Online', desc: 'Mengisi formulir pendaftaran melalui website resmi sekolah atau datang langsung ke sekretariat PPDB.', icon: <ClipboardList className="w-4 h-4 text-brand-pink-start" /> },
                  { step: '2', title: 'Pembayaran Biaya Formulir', desc: 'Melakukan pembayaran biaya formulir ke rekening resmi sekolah dan mengunggah bukti transfer.', icon: <CreditCard className="w-4 h-4 text-brand-pink-start" /> },
                  { step: '3', title: 'Melengkapi Berkas', desc: 'Menyiapkan FC Ijazah/SKL, KK, Akta Kelahiran, dan pas foto sesuai persyaratan administrasi.', icon: <FileText className="w-4 h-4 text-brand-pink-start" /> },
                  { step: '4', title: 'Tes Seleksi & Wawancara', desc: 'Mengikuti tes potensi akademik (TPA) dan wawancara minat bakat secara luring/daring.', icon: <UserPlus className="w-4 h-4 text-brand-pink-start" /> },
                  { step: '5', title: 'Pengumuman Kelulusan', desc: 'Melihat hasil seleksi melalui website atau papan pengumuman. Jika lulus, lanjut ke proses Daftar Ulang.', icon: <FileCheck className="w-4 h-4 text-brand-pink-start" /> },
                ].map((alur, i) => (
                  <div key={i} className="flex gap-6 relative z-10 group">
                    <div className="w-10 h-10 rounded-[10px] bg-[#FDFDFD] border-[3px] border-brand-pink-start flex items-center justify-center shrink-0 shadow-md group-hover:bg-brand-pink-start transition-colors">
                      <span className="font-bold text-brand-navy group-hover:text-white transition-colors text-xs font-serif">{alur.step}</span>
                    </div>
                    <div className="bg-white border border-gray-100 p-5 rounded-[1.2rem] flex-1 shadow-sm group-hover:shadow-md transition-shadow">
                      <h4 className="text-sm font-bold text-brand-navy font-serif mb-2 flex items-center gap-2">{alur.icon} {alur.title}</h4>
                      <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{alur.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form & Syarat (Kanan) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:w-1/2 flex flex-col gap-8"
            >
              {/* Box Syarat Minimalis */}
              <div className="bg-brand-navy p-8 rounded-[1.5rem] shadow-xl text-white">
                <h3 className="font-serif font-bold text-xl mb-6 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-brand-pink-start" /> Persyaratan Administrasi</h3>
                <ul className="space-y-3">
                  {['Lulusan SMP/MTs sederajat tahun berjalan atau maksimal 2 tahun sebelumnya.', 'Menyerahkan Fotocopy Ijazah/SKL yang dilegalisir (2 lembar).', 'Menyerahkan Fotocopy Kartu Keluarga (KK) dan Akta Kelahiran (2 lembar).', 'Pas foto berwarna ukuran 3x4 dan 4x6 (masing-masing 4 lembar).', 'Surat Keterangan Sehat dari dokter/puskesmas.', 'Mengisi formulir pendaftaran dan surat pernyataan bermaterai.'].map((syarat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-[10px] bg-brand-pink-start/20 text-brand-pink-start flex items-center justify-center shrink-0 mt-0.5"><CheckCircle className="w-3 h-3" /></div>
                      <p className="text-[11px] text-white/80 font-medium leading-relaxed">{syarat}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Form CTA Minimalis */}
              <div className="bg-white p-8 rounded-[1.5rem] border border-gray-100 shadow-xl">
                <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[9px] mb-3 block">Formulir Singkat</span>
                <h3 className="font-serif font-bold text-xl text-brand-navy mb-6">Mulai Pendaftaran Anda</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Nama Lengkap</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-[10px] px-4 py-3 text-xs focus:outline-none focus:border-brand-pink-start transition-colors" placeholder="Cth: Budi Santoso" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">NISN</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-[10px] px-4 py-3 text-xs focus:outline-none focus:border-brand-pink-start transition-colors" placeholder="10 Digit Angka" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Asal Sekolah</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-[10px] px-4 py-3 text-xs focus:outline-none focus:border-brand-pink-start transition-colors" placeholder="SMP/MTs..." />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">No. WhatsApp Aktif</label>
                    <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-[10px] px-4 py-3 text-xs focus:outline-none focus:border-brand-pink-start transition-colors" placeholder="08..." />
                  </div>
                  <button type="submit" className="w-full bg-brand-navy hover:bg-brand-pink-start text-white px-6 py-4 rounded-[10px] font-bold transition-all flex items-center justify-center gap-2 text-sm shadow-md mt-6">
                    Kirim Data Awal <Send className="w-4 h-4" />
                  </button>
                  <p className="text-[9px] text-gray-400 text-center mt-3">*Panitia akan menghubungi Anda via WhatsApp setelah data terkirim.</p>
                </form>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

    </main>
  )
}
