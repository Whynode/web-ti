import React from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { tambahLowongan } from "@/app/admin/bkk/actions";

export default function TambahLowonganPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/bkk"
          className="p-2 bg-[#141414] border border-[#262626] hover:bg-[#1a1a1a]"
        >
          <ArrowLeft className="w-5 h-5 text-[#999]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#c0c0c0]">Tambah Lowongan Baru</h1>
          <p className="text-sm text-[#666] mt-1">
            Tambahkan informasi lowongan kerja baru
          </p>
        </div>
      </div>

      <div className="bg-[#141414] border border-[#262626] p-6 lg:p-8">
        <form action={tambahLowongan} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="posisi" className="block text-sm font-medium text-[#999]">
                Posisi / Jabatan <span className="text-[#ff6b6b]">*</span>
              </label>
              <input
                type="text"
                id="posisi"
                name="posisi"
                required
                placeholder="Contoh: Network Engineer"
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0] placeholder:text-[#555]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="perusahaan" className="block text-sm font-medium text-[#999]">
                Perusahaan <span className="text-[#ff6b6b]">*</span>
              </label>
              <input
                type="text"
                id="perusahaan"
                name="perusahaan"
                required
                placeholder="Contoh: PT Telekomunikasi Indonesia"
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0] placeholder:text-[#555]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lokasi" className="block text-sm font-medium text-[#999]">
                Lokasi <span className="text-[#ff6b6b]">*</span>
              </label>
              <input
                type="text"
                id="lokasi"
                name="lokasi"
                required
                placeholder="Contoh: Jakarta"
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0] placeholder:text-[#555]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tipePekerjaan" className="block text-sm font-medium text-[#999]">
                Tipe Pekerjaan <span className="text-[#ff6b6b]">*</span>
              </label>
              <select
                id="tipePekerjaan"
                name="tipePekerjaan"
                required
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0]"
              >
                <option value="">Pilih Tipe</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Freelance">Freelance</option>
                <option value="Kontrak">Kontrak</option>
                <option value="Magang">Magang</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="batasLamaran" className="block text-sm font-medium text-[#999]">
                Batas Lamaran <span className="text-[#ff6b6b]">*</span>
              </label>
              <input
                type="date"
                id="batasLamaran"
                name="batasLamaran"
                required
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="deskripsi" className="block text-sm font-medium text-[#999]">
              Deskripsi Pekerjaan <span className="text-[#ff6b6b]">*</span>
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              required
              rows={4}
              placeholder="Jelaskan deskripsi pekerjaan..."
              className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0] resize-none placeholder:text-[#555]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="persyaratan" className="block text-sm font-medium text-[#999]">
              Persyaratan <span className="text-[#ff6b6b]">*</span>
            </label>
            <textarea
              id="persyaratan"
              name="persyaratan"
              required
              rows={4}
              placeholder="Daftar persyaratan pelamar..."
              className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0] resize-none placeholder:text-[#555]"
            />
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
              href="/admin/bkk"
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
