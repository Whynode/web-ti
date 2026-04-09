'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Award,
  CheckCircle,
  GraduationCap,
  Wifi,
  Shield,
  Server,
  Network,
  Gauge,
  Lock,
  Wrench
} from 'lucide-react';
import Header from '@/components/layout/Header';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
} as const;

// Curriculum modules data with descriptions
const curriculumModules = [
  {
    number: '01',
    title: 'Initial Configuration',
    topics: [
      'Pengenalan RouterOS',
      'Konfigurasi Awal Router',
      'Akses via Winbox & Webfig',
      'Upgrade RouterOS',
      'Backup & Restore Konfigurasi'
    ]
  },
  {
    number: '02',
    title: 'DHCP Server',
    topics: [
      'DHCP Server Setup',
      'DHCP Leases Management',
      'DHCP Relay Agent',
      'Konfigurasi IP Pool',
      'DHCP Network Monitoring'
    ]
  },
  {
    number: '03',
    title: 'Bridging',
    topics: [
      'Konsep Bridge LAN',
      'Bridge Filter',
      'Switch Chip Configuration',
      'Port Bridge vs Bridge Port',
      'STP/RSTP Protocol'
    ]
  },
  {
    number: '04',
    title: 'Routing',
    topics: [
      'Static Routing',
      'Dynamic Routing (RIP, OSPF)',
      'Route Policy',
      'ECMP Load Balancing',
      'Route Filter & Distance'
    ]
  },
  {
    number: '05',
    title: 'Wireless',
    topics: [
      'Pengenalan Wireless',
      'AP & Client Mode',
      'Wireless Security',
      'WDS & Mesh',
      'Frekuensi & Channel'
    ]
  },
  {
    number: '06',
    title: 'Firewall',
    topics: [
      'Firewall Filter Rules',
      'NAT (Source/Destination NAT)',
      'Connection Tracking',
      'Firewall Mangle',
      'Layer 7 Protocol'
    ]
  },
  {
    number: '07',
    title: 'QoS',
    topics: [
      'Queue Types (SFQ, PCQ)',
      'Bandwidth Management',
      'Simple Queue vs Queue Tree',
      'Prioritas Traffic',
      'PCQ Rate Configuration'
    ]
  },
  {
    number: '08',
    title: 'Tunnels',
    topics: [
      'PPTP & L2TP',
      'IPsec Tunnel',
      'OVPN Configuration',
      'EoIP & GRE Tunnel',
      'ZeroTier Integration'
    ]
  },
  {
    number: '09',
    title: 'Misc Tools',
    topics: [
      'Tool Ping & Traceroute',
      'Bandwidth Test',
      'Traffic Monitoring',
      'Log Analysis',
      'Torch & Sniffer'
    ]
  }
];

export default function MikrotikAcademyPage() {
  return (
    <>
      <Header />
      
      <main className="flex flex-col">
        
        {/* ============================================ */}
        {/* SECTION 1: HERO SECTION */}
        {/* ============================================ */}
        <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center bg-[#0B1120]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/ban-mikrotik.webp"
              alt="MikroTik Academy Background"
              fill
              className="object-cover object-right"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/85 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-16 lg:py-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Hero Content */}
              <motion.div variants={fadeInUp} className="max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full mb-4">
                  <Award className="w-3.5 h-3.5 text-brand-pink-start" />
                  <span className="text-[10px] font-semibold text-white uppercase tracking-widest">
                    Official MikroTik Academy
                  </span>
                </div>
                
                <h1 className="text-4xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-[1.15] mb-4">
                  Mikrotik <span className="text-brand-pink-start">Academy</span>
                </h1>
                
                <p className="text-sm lg:text-base text-white/70 mb-8 leading-relaxed max-w-lg">
                  Raih masa depan cerah sebagai Network Engineer profesional dengan sertifikasi internasional dari MikroTik Academy di SMKS Telematika Indramayu.
                </p>
                
                <Link
                  href="/ppdb"
                  className="inline-flex items-center gap-2 bg-brand-pink-start hover:bg-[#d94f92] text-white text-xs font-bold px-6 py-3 rounded-lg transition-all shadow-lg shadow-brand-pink-start/20 uppercase tracking-wide"
                >
                  Daftar Sekarang <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 2: SAMBUTAN KEPALA SEKOLAH */}
        {/* ============================================ */}
        <section className="py-16 lg:py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start"
            >
              {/* Photo Placeholder */}
              <motion.div variants={fadeInUp} className="w-full lg:w-1/3">
                <div className="w-full h-64 lg:h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Gambar akan diisi manual</span>
                </div>
              </motion.div>

              {/* Sambutan Text */}
              <motion.div variants={fadeInUp} className="flex-1">
                <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4">
                  Sambutan Kepala Sekolah
                </h2>
                <div className="space-y-4 text-slate-600 text-sm lg:text-base leading-relaxed">
                  <p>
                    <strong className="text-brand-pink-start">MikroTik Academy</strong> adalah program kolaborasi resmi antara SMKS Telematika Indramayu dengan MikroTik Latvia untuk mencetak tenaga ahli jaringan komputer bersertifikat internasional.
                  </p>
                  <p>
                    Kami merasa sangat bangga menjadi mitra resmi MikroTik Academy pertama dan satu-satunya di wilayah Indramayu. Program ini merupakan bukti komitmen kami dalam memberikan pendidikan berkualitas tinggi yang sesuai dengan standar industri teknologi informasi global.
                  </p>
                  <p>
                    Melalui kurikulum yang terstruktur dan pelatihan intensif dengan perangkat nyata, kami optimis lulusan kami akan memiliki kompetensi yang diakui secara internasional dan siap menghadapi tantangan di dunia kerja.
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <CheckCircle className="w-5 h-5 text-brand-pink-start" />
                    <span className="text-slate-700 font-medium">Mitra Resmi MikroTik Academy</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 3: TENTANG MIKROTIK ACADEMY */}
        {/* ============================================ */}
        <section className="py-16 lg:py-20 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.div variants={fadeInUp}>
                <div className="inline-flex items-center gap-2 bg-brand-pink-start/10 border border-brand-pink-start/20 px-3 py-1 rounded-full mb-4">
                  <GraduationCap className="w-3.5 h-3.5 text-brand-pink-start" />
                  <span className="text-[10px] font-bold text-brand-pink-start uppercase tracking-widest">Tentang Program</span>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                  Apa itu <span className="text-brand-pink-start">MikroTik Academy</span>?
                </h2>
              </motion.div>
            </motion.div>

            {/* Description Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-pink-start/10 flex items-center justify-center mb-4">
                  <Server className="w-7 h-7 text-brand-pink-start" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Apa itu MikroTik Academy?</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  MikroTik Academy adalah program pendidikan resmi yang dikelola oleh MikroTik Latvia untuk mencetak Network Engineer profesional yang menguasai teknologi router, wireless, dan keamanan jaringan menggunakan perangkat MikroTik RouterOS.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-blue-start/10 flex items-center justify-center mb-4">
                  <Network className="w-7 h-7 text-brand-blue-start" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Sistem Pembelajaran</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Pembelajaran dilakukan secara intensif dengan metode teori dan praktik langsung menggunakan perangkat routerboard asli. Siswa akan mempelajari konfigurasi router, manajemen bandwidth, wireless networking, hingga keamanan jaringan tingkat lanjut.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-4">
                  <Award className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Sertifikasi Internasional</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Lulusan program ini berhak mengikuti ujian sertifikasi MTCNA (MikroTik Certified Network Associate) yang diakui secara global. Sertifikasi ini membuka peluang karir yang luas di berbagai perusahaan jaringan dan ISP di seluruh dunia.
                </p>
              </motion.div>
            </div>

            {/* Keunggulan List */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white border border-slate-200 rounded-2xl p-8"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-6 text-center">Keunggulan Program</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Instruktur bersertifikat MTCRE & MTCINE',
                  'Akses laboratorium dengan perangkat MikroTik nyata',
                  'Lisensi RouterOS Level 4 untuk setiap siswa',
                  'Simulasi ujian sertifikasi resmi',
                  'Peluang magang di perusahaan jaringan',
                  'Sertifikat penyelesaian program',
                  'Persiapan intensif ujian MTCNA',
                  'Networking dengan komunitas profesional'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-pink-start flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 4: SERTIFIKAT MIKROTIK */}
        {/* ============================================ */}
        <section className="py-16 lg:py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-10"
            >
              <motion.div variants={fadeInUp}>
                <div className="inline-flex items-center gap-2 bg-brand-pink-start/10 border border-brand-pink-start/20 px-3 py-1 rounded-full mb-4">
                  <Award className="w-3.5 h-3.5 text-brand-pink-start" />
                  <span className="text-[10px] font-bold text-brand-pink-start uppercase tracking-widest">Sertifikasi</span>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                  Sertifikat <span className="text-brand-pink-start">MikroTik Academy</span>
                </h2>
              </motion.div>
            </motion.div>

            {/* Certificate Image - Placeholder (file not found in public/mik-cer) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="w-full max-w-2xl mx-auto"
            >
              <div className="relative w-full aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <span className="text-gray-400 text-sm">Sertifikat MikroTik Academy - Akan diisi manual</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 5: KURIKULUM MTCNA GRID (9 MODUL) */}
        {/* ============================================ */}
        <section className="py-16 lg:py-20 px-6 bg-[#0B1120]">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.div variants={fadeInUp}>
                <div className="inline-flex items-center gap-2 bg-brand-pink-start/10 border border-brand-pink-start/20 px-3 py-1 rounded-full mb-4">
                  <GraduationCap className="w-3.5 h-3.5 text-brand-pink-start" />
                  <span className="text-[10px] font-bold text-brand-pink-start uppercase tracking-widest">Kurikulum</span>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                  Modul <span className="text-brand-pink-start">MTCNA</span>
                </h2>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <p className="text-white/70 text-sm max-w-xl mx-auto">
                  9 modul pembelajaran lengkap yang mencakup seluruh aspek jaringan MikroTik
                </p>
              </motion.div>
            </motion.div>

            {/* 9 Module Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {curriculumModules.map((module, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-brand-pink-start/30 transition-all duration-300 group"
                >
                  {/* Module Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-pink-start/10 border border-brand-pink-start/20 flex items-center justify-center text-brand-pink-start font-bold text-xs flex-shrink-0">
                      {module.number}
                    </div>
                    <h3 className="text-white font-semibold text-sm pt-1">
                      {module.title}
                    </h3>
                  </div>
                  
                  {/* Topics List */}
                  <ul className="space-y-2">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-pink-start flex-shrink-0 mt-0.5" />
                        <span className="text-white/60 text-xs leading-relaxed">
                          {topic}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 6: PROFIL INSTRUKTUR */}
        {/* ============================================ */}
        <section className="py-16 lg:py-20 px-6 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-10"
            >
              <motion.div variants={fadeInUp}>
                <div className="inline-flex items-center gap-2 bg-brand-pink-start/10 border border-brand-pink-start/20 px-3 py-1 rounded-full mb-4">
                  <Award className="w-3.5 h-3.5 text-brand-pink-start" />
                  <span className="text-[10px] font-bold text-brand-pink-start uppercase tracking-widest">Instruktur</span>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
                  Profil <span className="text-brand-pink-start">Instruktur</span>
                </h2>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Photo Placeholder */}
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 lg:w-48 lg:h-48 bg-gray-200 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Gambar akan diisi manual</span>
                  </div>
                </div>

                {/* Instructor Info */}
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3">
                    FATHONI
                  </h3>
                  
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 bg-brand-pink-start/10 border border-brand-pink-start/20 text-brand-pink-start text-xs font-semibold px-3 py-1 rounded-full">
                      <Award className="w-3.5 h-3.5" />
                      MTCNA
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-brand-blue-start/10 border border-brand-blue-start/20 text-brand-blue-start text-xs font-semibold px-3 py-1 rounded-full">
                      <Network className="w-3.5 h-3.5" />
                      MTCRE
                    </span>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    Instruktur profesional dengan pengalaman di bidang jaringan komputer. Spesialis dalam konfigurasi MikroTik RouterOS, jaringan wireless, dan keamanan jaringan. Memiliki sertifikasi internasional dan aktif dalam implementasi proyek jaringan untuk berbagai perusahaan.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Separate Section for Instructor Certificates - Same width as main card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mt-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Certificate 1 - Portrait */}
                <div className="aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-sm text-center px-4">Gambar akan diisi manual</span>
                </div>
                {/* Certificate 2 - Portrait */}
                <div className="aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-sm text-center px-4">Gambar akan diisi manual</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mt-10"
            >
              <Link
                href="/ppdb"
                className="inline-flex items-center gap-2 bg-brand-pink-start hover:bg-[#d94f92] text-white text-xs font-bold px-8 py-3 rounded-lg transition-all shadow-lg shadow-brand-pink-start/20 uppercase tracking-wide"
              >
                Daftar PPDB Sekarang <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
    </>
  );
}
