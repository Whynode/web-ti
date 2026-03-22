"use client";

import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send, Globe, MessageSquare } from "lucide-react"
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

export default function KontakContent() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] text-gray-900 pb-20">

      <section className="relative pt-32 pb-20 bg-brand-navy bg-grid-dark overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-4 block">Layanan Informasi</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white font-serif mb-6 leading-tight">Hubungi <span className="text-brand-pink-start">Kami</span></h1>
            <p className="text-sm text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">Punya pertanyaan seputar akademik, PPDB, atau kemitraan industri? Kami siap membantu. Hubungi saluran resmi SMKS Telematika Indramayu.</p>
          </motion.div>
        </div>
      </section>

      <MarqueeTicker variant="pink" />

      <section className="py-20 bg-[#FDFDFD] bg-grid-light">
        <div className="container mx-auto px-6 max-w-[1120px]">
          <div className="flex flex-col lg:flex-row gap-12">

            <motion.div
              variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}
              className="lg:w-1/2 flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Alamat Sekolah', detail: 'Jl. Raya Jatibarang-Balongan No. 12, Indramayu, Jawa Barat 45283', icon: <MapPin className="w-5 h-5 text-brand-pink-start" /> },
                  { title: 'Telepon & WA', detail: '(0234) 123456\n+62 812-3456-7890 (Admin PPDB)', icon: <Phone className="w-5 h-5 text-brand-pink-start" /> },
                  { title: 'Email Resmi', detail: 'info@smkstelematika.sch.id\nppdb@smkstelematika.sch.id', icon: <Mail className="w-5 h-5 text-brand-pink-start" /> },
                  { title: 'Jam Operasional', detail: 'Senin - Jumat: 07:00 - 15:30 WIB\nSabtu: 08:00 - 12:00 WIB', icon: <Clock className="w-5 h-5 text-brand-pink-start" /> },
                ].map((info, i) => (
                  <motion.div key={i} variants={itemVariants} className="bg-white p-5 rounded-[1.2rem] border border-gray-100 hover:shadow-md transition-shadow flex flex-col gap-3 group">
                    <div className="w-10 h-10 rounded-[10px] bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-brand-pink-start/10 transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-navy text-xs font-serif mb-1">{info.title}</h4>
                      <p className="text-[10px] text-gray-500 font-medium whitespace-pre-line leading-relaxed">{info.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className="bg-gray-100 rounded-[1.5rem] border border-gray-200 overflow-hidden h-[300px] relative shadow-inner group">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-2 z-10 bg-[#FDFDFD]/80 backdrop-blur-sm group-hover:bg-transparent transition-all duration-500">
                  <Globe className="w-8 h-8 text-brand-pink-start opacity-50" />
                  <span className="text-xs font-bold font-serif text-brand-navy">Google Maps Placeholder</span>
                </div>
                <PlaceholderImage className="w-full h-full object-cover grayscale" label="Peta Lokasi" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="bg-white p-8 md:p-10 rounded-[1.5rem] border border-gray-100 shadow-xl h-full flex flex-col">
                <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[9px] mb-3 block">Bantuan Cepat</span>
                <h3 className="font-serif font-bold text-2xl text-brand-navy mb-2">Tinggalkan Pesan</h3>
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed mb-8">Isi form di bawah ini dan tim humas kami akan merespon pertanyaan Anda melalui email secepatnya.</p>

                <form className="space-y-4 flex-1 flex flex-col" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Nama Lengkap *</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-[10px] px-4 py-3 text-xs focus:outline-none focus:border-brand-pink-start transition-colors" required placeholder="Cth: Budi Santoso" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Email Aktif *</label>
                      <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-[10px] px-4 py-3 text-xs focus:outline-none focus:border-brand-pink-start transition-colors" required placeholder="budi@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Subjek Pertanyaan</label>
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-[10px] px-4 py-3 text-xs focus:outline-none focus:border-brand-pink-start transition-colors text-gray-600 appearance-none">
                      <option value="">Pilih Kategori...</option>
                      <option value="ppdb">Pendaftaran / PPDB</option>
                      <option value="akademik">Info Akademik & Kurikulum</option>
                      <option value="kemitraan">Kemitraan Industri / Prakerin</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Pesan Anda *</label>
                    <textarea rows={5} className="w-full h-full min-h-[120px] bg-gray-50 border border-gray-200 rounded-[10px] px-4 py-3 text-xs focus:outline-none focus:border-brand-pink-start transition-colors resize-none" required placeholder="Tuliskan pertanyaan detail Anda di sini..."></textarea>
                  </div>

                  <button type="submit" className="w-full bg-brand-navy hover:bg-brand-pink-start text-white px-6 py-4 rounded-[10px] font-bold transition-all flex items-center justify-center gap-2 text-sm shadow-md mt-6 group">
                    Kirim Pesan <MessageSquare className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  )
}
