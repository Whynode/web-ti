"use client";

import { tambahArtikel } from "@/app/admin/blog/actions";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import RichEditor from "@/components/RichEditor";

export default function TambahArtikelForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [konten, setKonten] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData();
    const form = formRef.current;
    if (!form) return;

    const judul = (form.elements.namedItem("judul") as HTMLInputElement).value;
    const thumbnailInput = form.elements.namedItem("thumbnailUrl") as HTMLInputElement;
    const thumbnailFile = thumbnailInput?.files?.[0];

    formData.append("judul", judul);
    formData.append("konten", konten);
    if (thumbnailFile) {
      formData.append("thumbnailUrl", thumbnailFile);
    }

    try {
      await tambahArtikel(formData);
    } catch (error) {
      if (error instanceof Error && (error.message === 'NEXT_REDIRECT' || error.message.includes('NEXT_REDIRECT'))) {
        return;
      }
      console.error("Error submitting form:", error);
      alert(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  };

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
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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
              Thumbnail Artikel
            </label>
            <input
              type="file"
              id="thumbnailUrl"
              name="thumbnailUrl"
              accept="image/*"
              className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0] file:bg-[#1a1a1a] file:text-[#c0c0c0] file:border-0 file:px-4 file:py-1 file:mr-4 file:rounded file:hover:bg-[#262626] cursor-pointer"
            />
            <p className="text-xs text-[#555]">
              Opsional. Unggah gambar untuk thumbnail artikel. (Maks 5MB)
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#999]">
              Konten Artikel <span className="text-[#ff6b6b]">*</span>
            </label>
            <div className="bg-white rounded">
              <RichEditor value={konten} onChange={setKonten} />
            </div>
            <p className="text-xs text-[#555]">
              Wajib diisi. Gunakan toolbar di atas untuk memformat teks.
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