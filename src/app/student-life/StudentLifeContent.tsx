"use client";

import { motion } from "framer-motion"
import { Users, Code, PenTool, MonitorPlay, Heart, Trophy, MapPin, Target } from "lucide-react"
import PlaceholderImage from "@/components/ui/PlaceholderImage"

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
};

export default function StudentLifeContent() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] text-gray-900 pb-20">

      <section className="relative pt-32 pb-20 bg-brand-navy bg-grid-dark overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-4 block">Aktivitas & Ekstrakurikuler</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white font-serif mb-6 leading-tight">Student <span className="text-brand-pink-start">Life</span></h1>
            <p className="text-sm text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">Lebih dari sekadar belajar di kelas. Kami menyediakan wadah bagi siswa untuk mengeksplorasi minat, bakat, dan mengasah jiwa kepemimpinan.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#FDFDFD] bg-grid-light">
        <div className="container mx-auto px-6 max-w-[1120px]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-center mb-12">
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[9px] mb-3 block">Kepemimpinan</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy font-serif leading-tight">Organisasi <span className="text-brand-pink-start">Siswa</span></h2>
          </motion.div>

          <motion.div
            variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
             {[
               { icon: <Users className="w-5 h-5" />, title: 'OSIS', desc: 'Organisasi Siswa Intra Sekolah, wadah pembinaan kepemimpinan dan manajemen kegiatan siswa tingkat sekolah.' },
               { icon: <Target className="w-5 h-5" />, title: 'Pramuka', desc: 'Membangun karakter disiplin, kemandirian, dan semangat gotong royong melalui kegiatan kepramukaan.' },
               { icon: <Heart className="w-5 h-5" />, title: 'PMR', desc: 'Palang Merah Remaja, melatih kepedulian sosial dan keterampilan pertolongan pertama pada kecelakaan.' },
             ].map((org, i) => (
               <motion.div key={i} variants={itemVariants} className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm flex flex-col items-center text-center hover:border-brand-pink-start/30 hover:shadow-lg transition-all group">
                 <div className="w-12 h-12 rounded-[10px] bg-icon-pink-gradient border border-white/20 flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-110 transition-transform">
                   {org.icon}
                 </div>
                 <h3 className="text-sm font-bold text-brand-navy mb-2 font-serif group-hover:text-brand-pink-start transition-colors">{org.title}</h3>
                 <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{org.desc}</p>
               </motion.div>
             ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-brand-navy bg-grid-dark relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:w-1/3 sticky top-32">
              <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[9px] mb-3 block">Minat & Bakat</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-6 leading-tight">Unit Kegiatan <span className="text-brand-pink-start">Siswa (UKS)</span></h2>
              <p className="text-xs text-white/70 leading-relaxed font-medium mb-8">
                Pilih ekstrakurikuler yang sesuai dengan passion Anda. Kami mendukung penuh pengembangan bakat siswa baik di bidang akademik maupun non-akademik.
              </p>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { title: 'Klub Programming', icon: <Code className="w-4 h-4" /> },
                { title: 'Desain Grafis', icon: <PenTool className="w-4 h-4" /> },
                { title: 'E-Sports', icon: <MonitorPlay className="w-4 h-4" /> },
                { title: 'English Club', icon: <Users className="w-4 h-4" /> },
                { title: 'Futsal', icon: <Trophy className="w-4 h-4" /> },
                { title: 'Paskibra', icon: <MapPin className="w-4 h-4" /> },
              ].map((ekskul, i) => (
                <motion.div key={i} variants={itemVariants} className="bg-white/5 border border-white/10 p-5 rounded-[1.2rem] hover:bg-white/10 transition-colors flex flex-col justify-center items-center text-center gap-3 h-[120px] group">
                  <div className="w-8 h-8 rounded-[10px] bg-icon-pink-gradient flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform text-white">
                    {ekskul.icon}
                  </div>
                  <h4 className="font-bold text-white text-[11px] font-serif group-hover:text-brand-pink-start transition-colors">{ekskul.title}</h4>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  )
}
