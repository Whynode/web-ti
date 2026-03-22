import React from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { tambahMateri } from "@/app/admin/elearning/actions";

export default function TambahMateriPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/elearning"
          className="p-2 bg-[#141414] border border-[#262626] hover:bg-[#1a1a1a]"
        >
          <ArrowLeft className="w-5 h-5 text-[#999]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#c0c0c0]">Tambah Materi Baru</h1>
          <p className="text-sm text-[#666] mt-1">
            Tambahkan materi video atau e-book
          </p>
        </div>
      </div>

      <div className="bg-[#141414] border border-[#262626] p-6 lg:p-8">
        <form action={tambahMateri} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2 lg:col-span-2">
              <label htmlFor="judul" className="block text-sm font-medium text-[#999]">
                Judul Materi <span className="text-[#ff6b6b]">*</span>
              </label>
              <input
                type="text"
                id="judul"
                name="judul"
                required
                placeholder="Contoh: Tutorial Konfigurasi Mikrotik Basic"
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0] placeholder:text-[#555]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tipeMedia" className="block text-sm font-medium text-[#999]">
                Tipe Media <span className="text-[#ff6b6b]">*</span>
              </label>
              <select
                id="tipeMedia"
                name="tipeMedia"
                required
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0]"
              >
                <option value="">Pilih Tipe</option>
                <option value="VIDEO">Video</option>
                <option value="PDF">PDF / E-Book</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="kelasTarget" className="block text-sm font-medium text-[#999]">
                Kelas Target <span className="text-[#ff6b6b]">*</span>
              </label>
              <select
                id="kelasTarget"
                name="kelasTarget"
                required
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0]"
              >
                <option value="">Pilih Kelas</option>
                <option value="X A">Kelas X A</option>
                <option value="XI A">Kelas XI A</option>
                <option value="XII A">Kelas XII A</option>
                <option value="Semua Kelas">Semua Kelas</option>
              </select>
            </div>

            <div className="space-y-2 lg:col-span-2">
              <label htmlFor="linkUrl" className="block text-sm font-medium text-[#999]">
                Link URL <span className="text-[#ff6b6b]">*</span>
              </label>
              <input
                type="url"
                id="linkUrl"
                name="linkUrl"
                required
                placeholder="Contoh: https://youtube.com/watch?v=xxx atau https://drive.google.com/xxx"
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0] placeholder:text-[#555]"
              />
              <p className="text-xs text-[#555]">
                Masukkan link YouTube, Google Drive, atau platform lainnya
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-[#262626]">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c0c0c0] text-[#0a0a0a] font-medium text-sm"
            >
              <Save className="w-4 h-4" />
              Simpan
            </button>
            <Link
              href="/admin/elearning"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] text-[#999] border border-[#262626] font-medium text-sm"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
