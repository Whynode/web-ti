"use client";

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Monitor, Wifi, Cpu, Camera, Users, Award, Network, Cloud, HardDrive, Play, Server, ShieldCheck } from "lucide-react"
import { FadeIn } from "@/components/ui/FadeIn"
import PlaceholderImage from "@/components/ui/PlaceholderImage"
import MarqueeTicker from "@/components/ui/MarqueeTicker"
import HomepageBlogSection from "@/components/homepage/HomepageBlogSection"

export default function Home() {
  const [artikel, setArtikel] = useState<{ pinned: unknown | null; latest: unknown[] }>({ pinned: null, latest: [] });

  useEffect(() => {
    async function fetchArtikel() {
      try {
        const res = await fetch('/api/artikel?homepage=true');
        if (res.ok) {
          const data = await res.json();
          setArtikel(data);
        }
      } catch (e) {
        console.error('Failed to fetch articles:', e);
      }
    }
    fetchArtikel();
  }, []);

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-gray-900 overflow-hidden">

      {/* 1. Hero Section (Cinematic Full-Background) */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/beranda-bg.webp"
          alt="Gedung SMKS Telematika Indramayu"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover object-center"
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120]/95 via-[#0B1120]/70 to-transparent z-10" />

        <div className="relative z-20 container mx-auto px-6 max-w-280">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-3/4 max-w-2xl pt-32 pb-24"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block bg-brand-pink-start text-white text-[9px] font-bold px-3 py-1 rounded-[10px] mb-6 uppercase tracking-widest shadow-lg shadow-brand-pink-start/20"
            >
              Sekolah Kejuruan IT Terbaik
            </motion.span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 font-serif text-white tracking-tight text-balance">
              Mencetak Engineer Masa Depan di Bidang Teknologi Informasi.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base text-white/80 mb-10 font-sans font-light leading-relaxed"
            >
              Fokus pada Kompetensi Keahlian Teknik Komputer & Jaringan (TKJ) dengan kurikulum padat praktik industri dan sertifikasi profesional.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/ppdb" className="bg-brand-pink-start hover:bg-[#d94f92] text-white px-6 py-3.5 rounded-[10px] font-bold transition-all shadow-xl shadow-brand-pink-start/20 flex items-center gap-2 text-xs tracking-wide uppercase">
                Daftar PPDB <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/program" className="text-white px-6 py-3.5 rounded-[10px] font-medium transition-all flex items-center gap-2 text-xs tracking-wide uppercase border-2 border-white/70 hover:bg-white/10">
                Jelajahi Program
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Two-Row Page Connector / Bridge */}
      <section className="relative z-30 w-full">
        <FadeIn>
          <div>
            <div className="bg-[#243560] border-b border-white/10 relative">
              <div className="flex">
                <div className="hidden md:flex flex-col items-center justify-center px-4 bg-gradient-to-b from-brand-pink-start to-brand-blue-start">
                  <span className="text-white text-[9px] font-bold uppercase tracking-[0.3em] writing-mode-vertical" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>FOKUS TKJ</span>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
                  {[
                    { num: '01', icon: <Network className="w-5 h-5" />, title: 'Administrasi Jaringan', desc: 'Routing & Switching (Mikrotik/Cisco)', link: '/program/mikrotik' },
                    { num: '02', icon: <Cloud className="w-5 h-5" />, title: 'Cloud & Server Admin', desc: 'Sistem Operasi Server & Komputasi Awan', link: '/program' },
                    { num: '03', icon: <HardDrive className="w-5 h-5" />, title: 'Teknisi Komputer', desc: 'Perakitan, Troubleshooting & Keamanan Siber', link: '/program' },
                  ].map((program, i) => (
                  <Link href={program.link} key={i} className="flex items-center gap-4 px-6 py-5 hover:bg-white/5 transition-colors group hover:scale-[1.02] cursor-pointer">
                    <div className="shrink-0 w-10 h-10 rounded-[10px] bg-brand-pink-start/20 border border-brand-pink-start/30 flex items-center justify-center text-brand-pink-start group-hover:scale-110 transition-transform">
                      {program.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-white text-xs font-bold font-serif leading-snug mb-1 group-hover:text-brand-pink-start transition-colors truncate">{program.title}</h4>
                      <p className="text-[9px] text-white/50 font-medium leading-snug truncate">{program.desc}</p>
                    </div>
                  </Link>
                ))}

                  <Link href="/about" className="flex items-center gap-4 px-6 py-5 hover:bg-white/5 transition-colors group">
                    <div className="w-10 h-10 rounded-[10px] bg-brand-pink-start flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-bold font-serif group-hover:text-brand-pink-start transition-colors">Tentang Kami</h4>
                      <p className="text-[10px] text-white/50 font-medium leading-snug">SMKunggulan IT terdepan<br/>di Indramayu</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-[#1e2a4a] border-b border-white/5">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0">
                <div className="px-6 py-4 md:py-0 md:w-auto shrink-0">
                  <h3 className="text-brand-pink-start text-sm font-bold font-serif leading-tight">Dapatkan Informasi<br className="hidden md:block" /> Pendaftaran</h3>
                </div>

                <div className="flex-1 flex flex-col md:flex-row items-stretch w-full">
                  <input type="text" placeholder="Nama Lengkap" className="flex-1 bg-transparent border-y md:border-y-0 md:border-x border-white/10 px-6 py-4 text-xs text-white placeholder:text-white/30 focus:outline-none focus:bg-white/5 transition-colors" />
                  <input type="email" placeholder="Email" className="flex-1 bg-transparent border-b md:border-b-0 md:border-r border-white/10 px-6 py-4 text-xs text-white placeholder:text-white/30 focus:outline-none focus:bg-white/5 transition-colors" />
                  <input type="text" placeholder="No. WhatsApp" className="flex-1 bg-transparent border-b md:border-b-0 md:border-r border-white/10 px-6 py-4 text-xs text-white placeholder:text-white/30 focus:outline-none focus:bg-white/5 transition-colors" />
                  <button className="bg-brand-pink-start hover:bg-brand-pink-end text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shrink-0 group">
                    KIRIM <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 3. Program Unggulan */}
      <section className="py-16 bg-[#FDFDFD] bg-grid-light">
        <FadeIn>
          <div className="container mx-auto px-6 max-w-280 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6"
            >
              <div className="max-w-md">
                <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-2 block">Kompetensi Keahlian</span>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-navy font-serif leading-tight">Teknik Komputer & <span className="text-brand-pink-start">Jaringan</span></h2>
              </div>
              <p className="text-xs text-brand-navy/60 max-w-sm leading-relaxed font-medium">
                Kurikulum dirancang padat dan berfokus pada praktik industri untuk menghasilkan Network Engineer dan SysAdmin handal.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {[
                  { icon: <Monitor className="w-4 h-4" />, title: 'Jaringan Dasar', desc: 'Topologi & Switching', link: '/program/jaringan-dasar' },
                  { icon: <Network className="w-4 h-4" />, title: 'Cloud & Server', desc: 'Sistem Operasi & Cloud', link: '/program' },
                  { icon: <ShieldCheck className="w-4 h-4" />, title: 'Pemrograman Dasar', desc: 'Logika & Algoritma', link: '/program' },
                  { icon: <Wifi className="w-4 h-4" />, title: 'Mikrotik', desc: 'MTCNA Prep', link: '/program/mikrotik' },
                  { icon: <Cpu className="w-4 h-4" />, title: 'Hardware', desc: 'Troubleshooting PC', link: '/program/hardware' },
                  { icon: <Camera className="w-4 h-4" />, title: 'Multimedia', desc: 'Desain & Video', link: '/program/multimedia' },
                  { icon: <Users className="w-4 h-4" />, title: 'Soft Skills', desc: 'Etika Profesional', link: '/program/soft-skills' },
                  { icon: <Award className="w-4 h-4" />, title: 'Sertifikasi', desc: 'Standar Industri', link: '/program/sertifikasi' },
                 ].map((item, i) => (
                  <div
                    key={i}
                     className="bg-white p-4 rounded-[10px] border border-gray-100 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/10 transition-all duration-300 ease-in-out group flex flex-col justify-between h-full"
                   >
                     <div className="w-8 h-8 rounded-[10px] bg-brand-pink-start/10 border border-brand-pink-start/20 flex items-center justify-center text-brand-pink-start mb-3">
                       {item.icon}
                     </div>
                     <div>
                       <h3 className="text-xs font-bold text-brand-navy mb-1 font-serif group-hover:text-brand-pink-start transition-colors">{item.title}</h3>
                       <p className="text-[10px] text-brand-navy/60 font-medium">{item.desc}</p>
                     </div>
                  </div>
                ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Marquee Divider */}
      <div className="border-y border-white/10 bg-[#0B1120]">
        <MarqueeTicker variant="dark" articles={(artikel.latest as { id: number; judul: string; slug: string }[]).map(a => ({ text: a.judul, link: `/berita/${a.slug}` }))} />
      </div>

      <HomepageBlogSection pinned={artikel.pinned as { id: number; judul: string; slug: string; konten: string; thumbnailUrl: string | null; tanggalPublish: Date; kategori: string; isPinned: boolean } | null} latest={artikel.latest as { id: number; judul: string; slug: string; konten: string; thumbnailUrl: string | null; tanggalPublish: Date; kategori: string; isPinned: boolean }[]} />

      {/* 4. Fasilitas */}
      <section className="py-16 bg-brand-navy relative overflow-hidden bg-grid-dark">
        <FadeIn>
          <div className="container mx-auto px-6 max-w-280 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-2 block">Infrastruktur</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">Fasilitas <span className="text-brand-pink-start">Sekolah</span></h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-[500px] md:h-[400px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="col-span-2 row-span-2 md:col-span-2 md:row-span-2 group rounded-[10px] overflow-hidden relative"
              >
                <PlaceholderImage className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" label="Lab Utama" />
                <div className="absolute inset-0 bg-linear-to-t from-brand-navy via-brand-navy/40 to-transparent p-4 flex flex-col justify-end">
                  <h3 className="text-white font-bold text-sm font-serif mb-0.5">Lab Komputer Utama (i7)</h3>
                  <p className="text-white/60 text-[10px]">Kapasitas 40 PC standar industri.</p>
                </div>
              </motion.div>

              {[
                { title: 'Ruang Server' },
                { title: 'Perpustakaan' },
                { title: 'Ruang Teori' },
                { title: 'Lab Mikrotik' },
                { title: 'Area Diskusi' },
                { title: 'Bengkel TKJ' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="group rounded-[10px] overflow-hidden relative"
                >
                  <PlaceholderImage className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100" label={item.title} />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-navy/90 to-transparent p-3 flex flex-col justify-end z-10 transition-all duration-300 group-hover:from-brand-pink-start/90">
                    <h3 className="text-white font-bold text-[10px] font-serif tracking-wide uppercase">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 5. Prestasi */}
      <section className="py-16 bg-[#FDFDFD] bg-grid-light border-y border-gray-200">
        <FadeIn>
          <div className="container mx-auto px-6 max-w-280">
            <div className="mb-8">
              <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-2 block">Pencapaian</span>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-navy font-serif leading-tight">Prestasi <span className="text-brand-pink-start">Gemilang</span></h2>
              <p className="text-xs text-brand-navy/60 max-w-xl mt-2 leading-relaxed">
                Siswa-siswi kami secara konsisten menorehkan prestasi di berbagai kompetisi IT bergengsi, membuktikan kualitas pendidikan yang unggul.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { 
                   year: '2023', 
                   title: 'Web Design', 
                   level: 'Kabupaten', 
                   rank: 'Juara 1', 
                   rankColor: 'bg-brand-pink-start text-white',
                   image: '/beranda-bg.webp',
                   desc: 'Kompetisi desain website tingkat kabupaten dengan tema inovasi digital.',
                   link: '/prestasi/web-design' 
                 },
                 { 
                   year: '2023', 
                   title: 'LKS IT Network', 
                   level: 'Provinsi', 
                   rank: 'Medali Perak', 
                   rankColor: 'bg-brand-navy/70 text-white',
                   image: '/beranda-bg.webp',
                   desc: 'Lomba keterampilan siswa bidang jaringan komputer.',
                   link: '/prestasi/lks-it-network' 
                 },
                 { 
                   year: '2022', 
                   title: 'MTCNA Mikrotik', 
                   level: 'Internasional', 
                   rank: '100+ Lulus', 
                   rankColor: 'bg-brand-blue-start text-white',
                   image: '/beranda-bg.webp',
                   desc: 'Sertifikasi Mikrotik Network Associate internasional.',
                   link: '/prestasi/mtcna-mikrotik' 
                 },
                 { 
                   year: '2023', 
                   title: 'Cyber Security', 
                   level: 'Provinsi', 
                   rank: 'Top 10', 
                   rankColor: 'bg-purple-600 text-white',
                   image: '/beranda-bg.webp',
                   desc: ' Kompetisi keamanan siber dan CTF tingkat provinsi.',
                   link: '/prestasi/cyber-security-ctf' 
                 },
                 { 
                   year: '2023', 
                   title: 'Olimpiade Jaringan', 
                   level: 'Nasional', 
                   rank: 'Juara 2', 
                   rankColor: 'bg-brand-yellow text-black',
                   image: '/beranda-bg.webp',
                   desc: 'Olimpiade sains bidang IT networking nasional.',
                   link: '/prestasi/olimpiade-jaringan' 
                 },
                 { 
                   year: '2024', 
                   title: 'Web Design Nasional', 
                   level: 'Nasional', 
                   rank: 'Juara 3', 
                   rankColor: 'bg-brand-pink-start text-white',
                   image: '/beranda-bg.webp',
                   desc: 'Festival desain web nasional apresiasi kreativitas siswa.',
                   link: '/prestasi/web-design-nasional' 
                 },
                 { 
                   year: '2024', 
                   title: 'LKS Cyber Security', 
                   level: 'Provinsi', 
                   rank: 'Juara 1', 
                   rankColor: 'bg-brand-pink-start text-white',
                   image: '/beranda-bg.webp',
                   desc: 'Lomba keamanan siber tingkat provinsi Jawa Barat.',
                   link: '/produksi/lks-cyber-security' 
                 },
                 { 
                   year: '2024', 
                   title: 'Network Engineer', 
                   level: 'Kabupaten', 
                   rank: 'Juara 1', 
                   rankColor: 'bg-brand-blue-start text-white',
                   image: '/beranda-bg.webp',
                   desc: 'Kompetisi rekayasa jaringan komputer tingkat kabupaten.',
                   link: '/produksi/network-engineer' 
                 },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="bg-white rounded-[10px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col"
                  >
                    {/* Image Area */}
                    <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Rank Badge */}
                      <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-md z-10 ${item.rankColor}`}>
                        {item.rank}
                      </span>
                    </div>

                    {/* Text Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <span className="text-xs font-medium text-brand-blue-start mb-2 uppercase tracking-wide">
                        TINGKAT {item.level} • {item.year}
                      </span>
                      <h3 className="text-lg font-bold text-gray-800 mb-2 leading-snug">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </FadeIn>
      </section>

      {/* 6. CTA PPDB */}
      <section className="py-16 bg-[#050505] border-t border-gray-800 relative">
        <FadeIn>
          <div className="container mx-auto px-6 max-w-280">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block bg-brand-pink-start text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 mb-6">Penerimaan Peserta Didik Baru</span>
              
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-serif leading-[0.95] tracking-tight mb-6">
                Masa Depan IT<br/>
                <span className="text-brand-pink-start">Dimulai Dari Sini.</span>
              </h2>
              
              <p className="text-white/50 text-sm leading-relaxed max-w-xl mx-auto mb-8">
                Bergabunglah dengan ratusan siswa lainnya dalam meraih kesuksesan di industri teknologi. Kuota pendaftaran tahun ajaran 2024/2025 sangat terbatas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/ppdb" 
                  className="bg-brand-pink-start text-white px-10 py-4 font-bold text-xs tracking-widest uppercase hover:bg-brand-yellow hover:text-black transition-all duration-300 ease-in-out flex items-center justify-center gap-2"
                >
                  Daftar PPDB Sekarang
                </Link>
                <Link 
                  href="/kontak" 
                  className="bg-transparent text-white px-10 py-4 font-bold text-xs tracking-widest uppercase border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out flex items-center justify-center gap-2"
                >
                  Hubungi Panitia
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

    </main>
  )
}
