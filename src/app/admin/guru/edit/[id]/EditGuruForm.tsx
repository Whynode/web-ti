"use client";

import { useState, useTransition } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, X, ImageIcon } from "lucide-react";
import { updateGuru } from "@/app/admin/guru/actions";

interface Guru {
  id: number;
  nama: string;
  posisi: string;
  mapel: string;
  fotoUrl: string | null;
}

interface PageProps {
  guru: Guru;
}

export default function EditGuruForm({ guru }: PageProps) {
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string | null>(guru.fotoUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function removeFile() {
    setSelectedFile(null);
    if (guru.fotoUrl) {
      setPreview(guru.fotoUrl);
    } else {
      setPreview(null);
    }
  }

  async function handleSubmit(formData: FormData) {
    setError(null);
    
    if (selectedFile) {
      formData.set("foto", selectedFile);
    }

    startTransition(async () => {
      const result = await updateGuru(guru.id, formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/guru"
          className="p-2 bg-[#141414] border border-[#262626] hover:bg-[#1a1a1a]"
        >
          <ArrowLeft className="w-5 h-5 text-[#999]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#c0c0c0]">Edit Guru</h1>
          <p className="text-sm text-[#666] mt-1">
            Edit data guru: {guru.nama}
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-[#1a0a0a] border border-[#662626]">
          <p className="text-sm text-[#ff6b6b]">{error}</p>
        </div>
      )}

      <div className="bg-[#141414] border border-[#262626] p-6 lg:p-8">
        <form action={handleSubmit} className="space-y-6">
          <input type="hidden" name="id" value={guru.id} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="nama" className="block text-sm font-medium text-[#999]">
                Nama Lengkap <span className="text-[#ff6b6b]">*</span>
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                required
                defaultValue={guru.nama}
                placeholder="Masukkan nama lengkap guru"
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0] placeholder:text-[#555]"
              />
              <p className="text-xs text-[#555]">
                Wajib diisi. Contoh: Denny Umar Setiana, S.E., M.M.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="posisi" className="block text-sm font-medium text-[#999]">
                Posisi / Jabatan <span className="text-[#ff6b6b]">*</span>
              </label>
              <input
                type="text"
                id="posisi"
                name="posisi"
                required
                defaultValue={guru.posisi}
                placeholder="Contoh: Guru Produktif, Kepala Sekolah"
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0] placeholder:text-[#555]"
              />
              <p className="text-xs text-[#555]">
                Wajib diisi. Contoh: Guru Mata Pelajaran, Kepala Sekolah
              </p>
            </div>
          </div>

          <div className="space-y-2 lg:max-w-md">
            <label htmlFor="mapel" className="block text-sm font-medium text-[#999]">
              Mata Pelajaran
            </label>
            <input
              type="text"
              id="mapel"
              name="mapel"
              defaultValue={guru.mapel === "-" ? "" : guru.mapel}
              placeholder="Contoh: Jaringan Komputer, Matematika"
              className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0] placeholder:text-[#555]"
            />
            <p className="text-xs text-[#555]">
              Opsional. Kosongkan jika tidak ada atau isi dengan tanda &quot;-&quot;
            </p>
          </div>

          <div className="space-y-2 lg:max-w-md">
            <label className="block text-sm font-medium text-[#999]">
              Foto Guru
            </label>
            
            {preview ? (
              <div className="relative w-40 h-40 overflow-hidden border border-[#262626]">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeFile}
                  className="absolute top-2 right-2 p-1.5 bg-[#ff6b6b] hover:bg-[#ff5555] text-white"
                >
                  <X className="w-4 h-4" />
                </button>
                {isPending && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-40 h-40 border border-[#262626] cursor-pointer hover:bg-[#1a1a1a]">
                <ImageIcon className="w-10 h-10 text-[#555] mb-2" />
                <span className="text-xs text-[#666] text-center px-2">
                  Klik untuk upload foto
                </span>
                <input
                  type="file"
                  name="foto"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
            
            <p className="text-xs text-[#555]">
              Opsional. Format: JPG, PNG, GIF, WebP. Maksimal 5MB.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-[#262626]">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c0c0c0] hover:bg-[#d0d0d0] disabled:opacity-50 text-[#0a0a0a] font-medium text-sm"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Mengunggah...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Simpan Perubahan
                </>
              )}
            </button>
            <Link
              href="/admin/guru"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] text-[#999] border border-[#262626] font-medium text-sm hover:bg-[#222]"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
