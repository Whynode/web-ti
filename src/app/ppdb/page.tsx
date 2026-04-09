'use client'

import { useActionState, useState, useEffect } from 'react'
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, ClipboardList, Send, FileText, UserPlus, FileCheck, CreditCard } from "lucide-react"
import { daftarPPDB, FormState } from "@/actions/ppdb"

const initialState: FormState = {}

export default function PPDB() {
  const [state, action, isPending] = useActionState(daftarPPDB, initialState)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formKey, setFormKey] = useState(0)

  useEffect(() => {
    if (state.success) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setFormKey(prev => prev + 1)
      }, 8000)
    }
  }, [state.success])

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-gray-900 pb-20">

      {/* 1. Header PPDB */}
      <section className="relative pt-32 pb-20 bg-brand-navy bg-grid-dark overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[10px] mb-4 block">Pendaftaran Siswa Baru 2025/2026</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white font-serif mb-6 leading-tight">Bergabunglah <span className="text-brand-pink-start">Bersama Kami</span></h1>
            <p className="text-sm text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">SMK Telematika Indramayu siap menjadi langkah awal kariermu di dunia teknologi.</p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full border-y border-white/10 bg-[#0B1120] relative z-40" />

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
                  { step: '1', title: 'Pendaftaran Online', desc: 'Mengisi formulir pendaftaran melalui website resmi sekolah.', icon: <ClipboardList className="w-4 h-4 text-brand-pink-start" /> },
                  { step: '2', title: 'Verifikasi Data', desc: 'Panitia akan memverifikasi data dan menghubungi via WhatsApp.', icon: <FileText className="w-4 h-4 text-brand-pink-start" /> },
                  { step: '3', title: 'Tes Seleksi', desc: 'Mengikuti tes potensi akademik dan wawancara.', icon: <UserPlus className="w-4 h-4 text-brand-pink-start" /> },
                  { step: '4', title: 'Pengumuman', desc: 'Meliihat hasil seleksi melalui website.', icon: <FileCheck className="w-4 h-4 text-brand-pink-start" /> },
                  { step: '5', title: 'Daftar Ulang', desc: 'Jika lulus, lakukan daftar ulang di sekretariat.', icon: <CreditCard className="w-4 h-4 text-brand-pink-start" /> },
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

            {/* Form PPDB (Kanan) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:w-1/2"
            >
              {/* Box Syarat Minimalis */}
              <div className="bg-brand-navy p-8 rounded-[1.5rem] shadow-xl text-white mb-8">
                <h3 className="font-serif font-bold text-xl mb-6 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-brand-pink-start" /> Persyaratan Administrasi</h3>
                <ul className="space-y-3">
                  {['Lulusan SMP/MTs tahun 2024/2025.', 'Menyerahkan Fotocopy Ijazah/SKL (2 lembar).', 'Menyerahkan Fotocopy KK dan Akta Kelahiran.', 'Pas foto berwarna 3x4 dan 4x6.', 'Siapkan nomor WhatsApp aktif untuk komunikasi.'].map((syarat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-[10px] bg-brand-pink-start/20 text-brand-pink-start flex items-center justify-center shrink-0 mt-0.5"><CheckCircle className="w-3 h-3" /></div>
                      <p className="text-[11px] text-white/80 font-medium leading-relaxed">{syarat}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Form PPDB */}
              <div className="bg-white p-8 rounded-[1.5rem] border border-gray-100 shadow-xl">
                <span className="text-brand-pink-start font-bold uppercase tracking-widest text-[9px] mb-3 block">Formulir PPDB</span>
                <h3 className="font-serif font-bold text-xl text-brand-navy mb-6">Daftar Sekarang</h3>

                {/* Success Message */}
                {showSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-[10px] text-green-700 text-sm font-medium flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    {state.message}
                  </div>
                )}

                {/* Error Message */}
                {state.message && !state.success && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[10px] text-red-700 text-sm font-medium">
                    {state.message}
                  </div>
                )}

                <form key={formKey} id="ppdb-form" action={action} className="space-y-5">
                  
                  {/* Nama Lengkap & NISN */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Nama Lengkap <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="namaLengkap"
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:border-brand-pink-start transition-colors" 
                        placeholder="Nama lengkap sesuai ijazah"
                      />
                      {state.errors?.namaLengkap && <p className="text-red-500 text-xs mt-1">{state.errors.namaLengkap}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">NISN <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="nisn"
                        required
                        maxLength={10}
                        className="w-full bg-gray-50 border border-gray-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:border-brand-pink-start transition-colors" 
                        placeholder="10 digit angka"
                      />
                      {state.errors?.nisn && <p className="text-red-500 text-xs mt-1">{state.errors.nisn}</p>}
                    </div>
                  </div>

                  {/* Asal Sekolah */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Asal Sekolah <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="asalSekolah"
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:border-brand-pink-start transition-colors" 
                      placeholder="SMP/MTs negri atau swasta"
                    />
                    {state.errors?.asalSekolah && <p className="text-red-500 text-xs mt-1">{state.errors.asalSekolah}</p>}
                  </div>

                  {/* Jenis Kelamin */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Jenis Kelamin <span className="text-red-500">*</span></label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="jenisKelamin" value="Laki-laki" required className="w-4 h-4 text-brand-pink-start accent-brand-pink-start" />
                        <span className="text-sm text-gray-700">Laki-laki</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="jenisKelamin" value="Perempuan" required className="w-4 h-4 text-brand-pink-start accent-brand-pink-start" />
                        <span className="text-sm text-gray-700">Perempuan</span>
                      </label>
                    </div>
                    {state.errors?.jenisKelamin && <p className="text-red-500 text-xs mt-1">{state.errors.jenisKelamin}</p>}
                  </div>

                  {/* No WA & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">No. WhatsApp <span className="text-red-500">*</span></label>
                      <input 
                        type="tel" 
                        name="noWA"
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:border-brand-pink-start transition-colors" 
                        placeholder="08xxxxxxxxxx"
                      />
                      {state.errors?.noWA && <p className="text-red-500 text-xs mt-1">{state.errors.noWA}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Email <span className="text-gray-400">(opsional)</span></label>
                      <input 
                        type="email" 
                        name="email"
                        className="w-full bg-gray-50 border border-gray-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:border-brand-pink-start transition-colors" 
                        placeholder="email@example.com"
                      />
                      {state.errors?.email && <p className="text-red-500 text-xs mt-1">{state.errors.email}</p>}
                    </div>
                  </div>

                  {/* Alamat */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Alamat <span className="text-gray-400">(opsional)</span></label>
                    <textarea 
                      name="alamat"
                      rows={2}
                      className="w-full bg-gray-50 border border-gray-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:border-brand-pink-start transition-colors resize-none" 
                      placeholder="Alamat lengkap"
                    />
                  </div>

                  {/* Referensi Pengajak */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Siapa yang mengajak Anda sekolah di sini? <span className="text-gray-400">(Opsional)</span></label>
                    <input 
                      type="text" 
                      name="referensi"
                      className="w-full bg-gray-50 border border-gray-200 rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:border-brand-pink-start transition-colors" 
                      placeholder="Nama orang yang mengajak"
                    />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full bg-brand-navy hover:bg-brand-pink-start disabled:bg-gray-400 text-white px-6 py-4 rounded-[10px] font-bold transition-all flex items-center justify-center gap-2 text-sm shadow-md mt-6"
                  >
                    {isPending ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        Mengirim Data...
                      </>
                    ) : (
                      <>Daftar Sekarang <Send className="w-4 h-4" /></>
                    )}
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