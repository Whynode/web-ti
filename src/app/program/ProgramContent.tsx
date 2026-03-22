"use client";

import { motion } from "framer-motion"
import { Monitor, Server, ShieldCheck, Wifi, Cpu, Camera, Users, Award, Briefcase, GraduationCap, Code, HardDrive } from "lucide-react"
import { MarqueeTicker } from "@/components/ui/MarqueeTicker"

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
};

export default function ProgramContent() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] text-gray-900 pb-20">

      {/* 1. Header Program */}
      <section className="relative pt-32 pb-20 bg-brand-navy bg-grid-dark overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-4 block">Kompetensi Keahlian</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-serif mb-6 leading-tight">Teknik Komputer <span className="text-brand-pink-start">& Jaringan</span></h1>
            <p className="text-sm text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">Mencetak tenaga ahli IT tingkat menengah yang siap berkarir sebagai Network Engineer, System Administrator, dan Cyber Security Analyst.</p>
          </motion.div>
        </div>
      </section>

      <MarqueeTicker variant="pink" />

      {/* 2. Kurikulum Inti (Dense 8-Grid) */}
      <section className="py-16 bg-[#FDFDFD] bg-grid-light">
        <div className="container mx-auto px-6 max-w-[1120px]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-center mb-12">
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[9px] mb-3 block">Materi Pembelajaran</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy font-serif leading-tight">Kurikulum <span className="text-brand-pink-start">Inti TKJ</span></h2>
          </motion.div>

          <motion.div
            variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4"
          >
            {[
              { icon: <Monitor className="w-4 h-4" />, title: 'Infrastruktur Jaringan', desc: 'Desain LAN/WAN, routing protocol (OSPF, BGP), VLAN, dan manajemen bandwidth menggunakan Mikrotik/Cisco.' },
              { icon: <Server className="w-4 h-4" />, title: 'Administrasi Server', desc: 'Instalasi & konfigurasi OS Jaringan (Linux Debian/Ubuntu, Windows Server), Web Server, DNS, Mail, DHCP.' },
              { icon: <ShieldCheck className="w-4 h-4" />, title: 'Keamanan Jaringan', desc: 'Konfigurasi Firewall, VPN, Proxy, IDS/IPS, dan teknik dasar pentesting (Network Defense).' },
              { icon: <Wifi className="w-4 h-4" />, title: 'Jaringan Nirkabel', desc: 'Perencanaan, survei situs, dan implementasi jaringan WiFi enterprise/hotspot.' },
              { icon: <Cpu className="w-4 h-4" />, title: 'Sistem Komputer', desc: 'Perakitan PC, troubleshooting hardware/software, dan arsitektur mikrokontroler.' },
              { icon: <HardDrive className="w-4 h-4" />, title: 'Hardware Dasar', desc: 'Pengenalan komponen komputer, perakitan, dan troubleshooting hardware.' },
              { icon: <Code className="w-4 h-4" />, title: 'Pemrograman Dasar', desc: 'Algoritma, pemrograman dasar (C++/Python), dan scripting administrasi server.' },
              { icon: <Camera className="w-4 h-4" />, title: 'Desain Multimedia', desc: 'Penguasaan tool desain grafis, editing video, dan animasi 2D/3D dasar.' },
              { icon: <Users className="w-4 h-4" />, title: 'Produk Kreatif (PKK)', desc: 'Pengembangan jiwa technopreneurship dan simulasi startup IT skala kecil.' },
            ].map((item, i) => (
              <motion.div
                key={i} variants={itemVariants}
                className="bg-white p-5 rounded-[10px] border border-brand-navy/10 hover:border-brand-pink-start/30 hover:shadow-lg transition-all group flex flex-col justify-between h-[180px]"
              >
                <div className="w-8 h-8 rounded-[10px] bg-[#FDFDFD] border border-gray-100 flex items-center justify-center text-brand-navy group-hover:bg-brand-pink-start group-hover:text-white transition-colors mb-3">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-brand-navy mb-1.5 font-serif">{item.title}</h3>
                  <p className="text-[10px] text-brand-navy/60 font-medium leading-relaxed line-clamp-3">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Sertifikasi & Prospek Karir */}
      <section className="pt-16 pb-16 bg-brand-navy bg-grid-dark relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Sertifikasi */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:w-1/2">
              <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[9px] mb-3 block">Validasi Kompetensi</span>
              <h2 className="text-3xl font-bold text-white font-serif mb-6 leading-tight">Sertifikasi <span className="text-brand-pink-start">Industri</span></h2>
              <p className="text-sm text-white/80 leading-relaxed font-medium mb-8">
                Untuk memastikan lulusan kami siap kerja, SMKS Telematika memfasilitasi ujian sertifikasi berstandar nasional maupun internasional sebelum siswa lulus.
              </p>
              <div className="space-y-4">
                {[
                  { title: 'MTCNA (MikroTik Certified Network Associate)', org: 'MikroTik Academy' },
                  { title: 'Sertifikasi Kompetensi Keahlian (UKK)', org: 'BSNP / Kemendikbud' },
                  { title: 'Cisco IT Essentials (Opsional)', org: 'Cisco Networking Academy' },
                ].map((cert, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-brand-pink-start shrink-0" />
                    <div>
                      <p className="text-white font-bold text-sm">{cert.title}</p>
                      <p className="text-white/50 text-xs">{cert.org}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Prospek Karir */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:w-1/2">
              <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[9px] mb-3 block">Prospek Karir</span>
              <h2 className="text-3xl font-bold text-white font-serif mb-6 leading-tight">Lulusan <span className="text-brand-pink-start">Siap Kerja</span></h2>
              <p className="text-sm text-white/80 leading-relaxed font-medium mb-8">
                Lulusan SMKS Telematika memiliki kompetensi yang langsung dibutuhkan industri IT. Berikut jalur karier yang bisa ditempuh:
              </p>
              <div className="space-y-3">
                {[
                  { title: 'Network Engineer', salary: 'Rp 3.000.000 - Rp 8.000.000+', icon: <Wifi className="w-4 h-4" /> },
                  { title: 'System Administrator', salary: 'Rp 4.000.000 - Rp 10.000.000+', icon: <Server className="w-4 h-4" /> },
                  { title: 'IT Support / Helpdesk', salary: 'Rp 2.500.000 - Rp 5.000.000+', icon: <Cpu className="w-4 h-4" /> },
                  { title: 'Cyber Security Analyst', salary: 'Rp 5.000.000 - Rp 12.000.000+', icon: <ShieldCheck className="w-4 h-4" /> },
                  { title: 'Web Developer / Full Stack', salary: 'Rp 3.500.000 - Rp 10.000.000+', icon: <Code className="w-4 h-4" /> },
                ].map((job, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white/5 border border-white/10 p-4 rounded-[10px] hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-[10px] bg-brand-pink-start/20 flex items-center justify-center text-brand-pink-start">
                          {job.icon}
                        </div>
                        <h3 className="text-white font-bold text-sm">{job.title}</h3>
                      </div>
                      <span className="text-brand-pink-start text-xs font-medium">{job.salary}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
