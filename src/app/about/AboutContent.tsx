"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  History, 
  Target,
  Building2,
  Calendar,
  Users,
  Award,
  Globe,
  BookOpen,
  GraduationCap
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
};

export default function AboutContent() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] text-gray-900 pb-16">

      <section className="relative pt-32 pb-20 bg-brand-navy bg-grid-dark overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-3 block">Mengenal Lebih Dekat</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white font-serif mb-4 leading-tight">Profil <span className="text-brand-pink-start">Kami</span></h1>
            <p className="text-sm text-white/70 max-w-2xl mx-auto font-medium leading-relaxed">Sejarah, Visi Misi, dan dedikasi kami dalam mencetak generasi emas IT yang kompeten, berakhlak mulia, dan siap bersaing di industri global.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-[#FDFDFD] bg-grid-light">
        <div className="container mx-auto px-6 max-w-[1120px]">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="md:w-1/3"
            >
              <div className="rounded-[10px] overflow-hidden border-4 border-white shadow-xl bg-brand-navy/5 aspect-[3/4] relative">
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-navy/5 to-brand-navy/10">
                  <svg className="w-16 h-16 text-brand-navy/20 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-xs text-brand-navy/40 font-medium text-center px-4">Durung Ana Gambar</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="md:w-2/3"
            >
              <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-2 block">Sambutan Pimpinan</span>
              <h2 className="text-xl md:text-2xl font-bold text-brand-navy font-serif mb-4 leading-tight">Bersama Membangun <br/><span className="text-brand-pink-start">Masa Depan Digital</span></h2>
              <div className="prose prose-sm text-brand-navy/60 font-medium leading-relaxed mb-6">
                <p>Assalamu'alaikum Warahmatullahi Wabarakatuh,</p>
                <p>Puji syukur kehadirat Allah SWT atas segala limpahan rahmat-Nya. Di era Revolusi Industri 4.0 dan Society 5.0, penguasaan teknologi informasi bukan lagi sebuah pilihan, melainkan keharusan.</p>
                <p>SMKS Telematika Indramayu hadir sebagai jawaban atas tantangan tersebut. Kami berkomitmen menyelenggarakan pendidikan vokasi berkualitas tinggi di bidang Teknik Komputer dan Jaringan. Dengan fasilitas modern, kurikulum tersinkronisasi industri, dan tenaga pendidik profesional, kami optimismo dapat mengantarkan peserta didik meraih kesuksesan.</p>
                <p>Wassalamu'alaikum Warahmatullahi Wabarakatuh.</p>
              </div>
              <div>
                <h4 className="font-bold text-brand-navy text-sm font-serif">Denny Umar Setiana, S.E., M.M.</h4>
                <p className="text-[10px] text-brand-navy/50 uppercase tracking-widest font-bold">Kepala Sekolah SMKS Telematika Indramayu</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-navy bg-grid-dark relative">
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10">
          <div className="flex flex-col lg:flex-row gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="lg:w-1/3 bg-white p-6 rounded-[10px] shadow-lg flex flex-col justify-center"
            >
              <div className="w-12 h-12 rounded-[10px] bg-brand-pink-start flex items-center justify-center mb-4 text-white">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-brand-navy font-serif mb-3">Visi Kami</h3>
              <p className="text-xs text-brand-navy/60 font-medium leading-relaxed">
                "Menjadi lembaga pendidikan kejuruan IT terkemuka yang menghasilkan lulusan kompeten, berkarakter, berjiwa wirausaha, dan berwawasan lingkungan."
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                { title: 'Pendidikan Berkualitas', desc: 'Menyelenggarakan pembelajaran berbasis kompetensi (CBE) dan Teaching Factory (TEFA).' },
                { title: 'Karakter Mulia', desc: 'Menanamkan nilai-nilai keagamaan, kedisiplinan, dan etika profesi.' },
                { title: 'Kemitraan Industri', desc: 'Meningkatkan kerjasama (Link and Match) dengan Dunia Usaha/Dunia Industri (DU/DI).' },
                { title: 'Kewirausahaan IT', desc: 'Membekali keterampilan technopreneurship agar lulusan mandiri.' },
              ].map((misi, i) => (
                <motion.div key={i} variants={itemVariants} className="bg-white/5 border border-white/10 p-5 rounded-[10px] hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 rounded-[10px] bg-brand-pink-start text-white flex items-center justify-center text-[10px] font-bold shrink-0">{i+1}</div>
                    <h4 className="text-white font-bold text-sm font-serif">{misi.title}</h4>
                  </div>
                  <p className="text-[11px] text-white/60 font-medium leading-relaxed pl-9">{misi.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#FDFDFD] bg-grid-light">
        <div className="container mx-auto px-6 max-w-[1120px]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-2 block">Perjalanan</span>
            <h2 className="text-2xl font-bold text-brand-navy font-serif">Sejarah <span className="text-brand-pink-start">Sekolah</span></h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              { year: '2008', title: 'Pendirian Yayasan', desc: 'Yayasan Pendidikan IT Indramayu resmi didirikan oleh para praktisi pendidikan.' },
              { year: '2010', title: 'Izin Operasional', desc: 'Mendapat izin operasional dan membuka angkatan pertama jurusan TKJ.' },
              { year: '2015', title: 'Akreditasi A', desc: 'Meraih akreditasi A (Sangat Baik) dari BAN-S/M.' },
              { year: '2023', title: 'Pusat Keunggulan', desc: 'Ditetapkan sebagai SMK Pusat Keunggulan (Center of Excellence) sektor IT.' },
            ].map((item, i) => (
              <motion.div
                key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex gap-6 mb-6 group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-[10px] bg-brand-pink-start text-white flex items-center justify-center text-xs font-bold font-serif group-hover:scale-110 transition-all duration-300 z-10 relative shadow-md">
                    <History className="w-4 h-4" />
                  </div>
                  {i !== 3 && <div className="w-px h-full bg-brand-navy/10 -mt-1 group-hover:bg-brand-pink-start/30 transition-colors duration-300"></div>}
                </div>
                <div className="bg-white border border-gray-100 p-5 rounded-[10px] flex-1 shadow-sm group-hover:shadow-md group-hover:border-brand-pink-start/30 transition-all duration-300 -mt-1">
                  <span className="text-[10px] font-bold text-brand-pink-start uppercase tracking-widest block mb-1">{item.year}</span>
                  <h4 className="text-sm font-bold text-brand-navy font-serif mb-1">{item.title}</h4>
                  <p className="text-[11px] text-brand-navy/50 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#FDFDFD]">
        <div className="container mx-auto px-6 max-w-[1120px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="bg-white rounded-[10px] border border-gray-100 p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-brand-pink-start" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-brand-navy font-serif">Profil <span className="text-brand-pink-start">Sekolah</span></h2>
                <p className="text-xs text-brand-navy/50">Informasi lengkap tentang SMKS Telematika Indramayu</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-brand-navy/5 rounded-[10px]">
                  <div className="w-8 h-8 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-brand-pink-start" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-navy/50 uppercase tracking-wider font-bold mb-0.5">Nama Sekolah</p>
                    <p className="text-sm font-bold text-brand-navy">SMKS Telematika Indramayu</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-brand-navy/5 rounded-[10px]">
                  <div className="w-8 h-8 rounded-[10px] bg-brand-blue-start/10 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-brand-blue-start" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-navy/50 uppercase tracking-wider font-bold mb-0.5">Alamat</p>
                    <p className="text-sm font-medium text-brand-navy/80">Jalan Raya Sindangkerta Lohbener, Indramayu, Jawa Barat</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-brand-navy/5 rounded-[10px]">
                  <div className="w-8 h-8 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-brand-pink-start" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-navy/50 uppercase tracking-wider font-bold mb-0.5">NPSN</p>
                    <p className="text-sm font-bold text-brand-navy">20215946</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-brand-navy/5 rounded-[10px]">
                  <div className="w-8 h-8 rounded-[10px] bg-brand-yellow/20 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-brand-yellow" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-navy/50 uppercase tracking-wider font-bold mb-0.5">Akreditasi</p>
                    <p className="text-sm font-bold text-brand-navy">A (2022-2027)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-brand-navy/5 rounded-[10px]">
                  <div className="w-8 h-8 rounded-[10px] bg-brand-navy/10 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-brand-navy" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-navy/50 uppercase tracking-wider font-bold mb-0.5">Total Siswa</p>
                    <p className="text-sm font-bold text-brand-navy">60 Siswa</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-brand-navy/5 rounded-[10px]">
                  <div className="w-8 h-8 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-brand-pink-start" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-navy/50 uppercase tracking-wider font-bold mb-0.5">Rombongan Belajar</p>
                    <p className="text-sm font-bold text-brand-navy">3 Rombel (X A, XI A, XII A)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-brand-navy/5 rounded-[10px]">
                  <div className="w-8 h-8 rounded-[10px] bg-brand-blue-start/10 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4 text-brand-blue-start" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-navy/50 uppercase tracking-wider font-bold mb-0.5">Jurusan</p>
                    <p className="text-sm font-bold text-brand-navy">Teknik Komputer dan Jaringan (TKJ)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-brand-navy/5 rounded-[10px]">
                  <div className="w-8 h-8 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-brand-pink-start" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-navy/50 uppercase tracking-wider font-bold mb-0.5">Website</p>
                    <p className="text-sm font-medium text-brand-pink-start">smktelematikaindramayu.sch.id</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
