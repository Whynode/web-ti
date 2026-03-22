import React from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { tambahArtikel } from "@/app/admin/blog/actions";

export default function TambahArtikelPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blog"
          className="p-2 bg-[#141414] border border-[#262626] hover:bg-[#1a1a1a]"
        >
          <ArrowLeft className="w-5 h-5 text-[#999]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#c0c0c0]">Tambah Artikel Baru</h1>
          <p className="text-sm text-[#666] mt-1">
            Tambahkan artikel atau berita baru
          </p>
        </div>
      </div>

      <div className="bg-[#141414] border border-[#262626] p-6 lg:p-8">
        <form action={tambahArtikel} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="judul" className="block text-sm font-medium text-[#999]">
              Judul Artikel <span className="text-[#ff6b6b]">*</span>
            </label>
            <input
              type="text"
              id="judul"
              name="judul"
              required
              placeholder="Contoh: Kegiatan Lomba Hacking Fair 2024"
              className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0] placeholder:text-[#555]"
            />
            <p className="text-xs text-[#555]">
              Slug akan dibuat otomatis dari judul
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-[#999]">
              URL Thumbnail
            </label>
            <input
              type="url"
              id="thumbnailUrl"
              name="thumbnailUrl"
              placeholder="Contoh: https://example.com/image.jpg"
              className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0] placeholder:text-[#555]"
            />
            <p className="text-xs text-[#555]">
              Opsional. Masukkan URL gambar thumbnail artikel.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="konten" className="block text-sm font-medium text-[#999]">
              Konten Artikel <span className="text-[#ff6b6b]">*</span>
            </label>
            <textarea
              id="konten"
              name="konten"
              required
              rows={12}
              placeholder="Tulis konten artikel di sini..."
              className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0] resize-none font-mono placeholder:text-[#555]"
            />
            <p className="text-xs text-[#555]">
              Wajib diisi. Tulis konten lengkap artikel dalam paragraf.
            </p>
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
              href="/admin/blog"
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
