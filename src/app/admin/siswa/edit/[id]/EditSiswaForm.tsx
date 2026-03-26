"use client";

import React, { useState, useTransition, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, X, ImageIcon } from "lucide-react";
import { updateSiswa } from "@/app/admin/siswa/actions";

interface Kelas {
  id: number;
  namaKelas: string;
  waliKelas: {
    nama: string;
  } | null;
}

interface Siswa {
  id: number;
  nama: string;
  peran: string;
  fotoUrl: string | null;
  kelasId: number;
  kelas: Kelas;
}

interface EditSiswaFormProps {
  siswa: Siswa;
  kelasList: Kelas[];
}

export default function EditSiswaForm({ siswa, kelasList }: EditSiswaFormProps) {
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string | null>(siswa.fotoUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (siswa.fotoUrl) {
      setPreview(siswa.fotoUrl);
    } else {
      setPreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(formData: FormData) {
    setError(null);

    let finalFormData = formData;
    
    if (selectedFile) {
      const fotoFile = formData.get("foto");
      if (!fotoFile || !(fotoFile instanceof File)) {
        finalFormData = new FormData();
        finalFormData.append("nama", formData.get("nama") as string);
        finalFormData.append("peran", formData.get("peran") as string);
        finalFormData.append("kelasId", formData.get("kelasId") as string);
        finalFormData.append("foto", selectedFile);
      }
    }
    
    startTransition(async () => {
      const result = await updateSiswa(siswa.id, finalFormData);
      if (result?.error) {
        setError(result.error);
        if (result.uploadFailed) {
          alert("Gagal mengunggah gambar: " + result.error);
        }
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/siswa"
          className="p-2 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#c0c0c0] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#c0c0c0]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Siswa</h1>
          <p className="text-sm text-[#808080] mt-1">
            Edit data siswa: {siswa.nama}
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-900/30 border border-red-800">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      <div className="bg-[#141414] border border-[#2a2a2a] p-6 lg:p-8">
        <form action={handleSubmit} className="space-y-6">
          <input type="hidden" name="id" value={siswa.id} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="nama" className="block text-sm font-medium text-[#c0c0c0]">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                required
                defaultValue={siswa.nama}
                placeholder="Masukkan nama lengkap siswa"
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#2a2a2a] text-white text-sm focus:outline-none focus:border-[#c0c0c0] transition-colors placeholder:text-[#808080]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="kelasId" className="block text-sm font-medium text-[#c0c0c0]">
                Kelas <span className="text-red-500">*</span>
              </label>
              <select
                id="kelasId"
                name="kelasId"
                required
                defaultValue={siswa.kelasId}
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#2a2a2a] text-white text-sm focus:outline-none focus:border-[#c0c0c0] transition-colors rounded-[10px]"
              >
                <option value="">Pilih Kelas</option>
                {kelasList.map((kelas) => (
                  <option key={kelas.id} value={kelas.id}>
                    {kelas.namaKelas} - {kelas.waliKelas?.nama || "Belum ada Wali Kelas"}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="peran" className="block text-sm font-medium text-[#c0c0c0]">
                Peran dalam Kelas
              </label>
              <select
                id="peran"
                name="peran"
                defaultValue={siswa.peran}
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#2a2a2a] text-white text-sm focus:outline-none focus:border-[#c0c0c0] transition-colors rounded-[10px]"
              >
                <option value="SISWA">Siswa</option>
                <option value="KETUA_KELAS">Ketua Kelas</option>
                <option value="WAKIL_KETUA">Wakil Ketua</option>
                <option value="SEKRETARIS">Sekretaris</option>
                <option value="BENDAHARA">Bendahara</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 lg:max-w-md">
            <label className="block text-sm font-medium text-[#c0c0c0]">
              Foto Siswa
            </label>
            
            {preview ? (
              <div className="relative w-40 h-40 border border-[#2a2a2a] rounded-[10px] overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeFile}
                  className="absolute top-2 right-2 p-1.5 bg-red-900 hover:bg-red-800 text-white rounded-[10px] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                {isPending && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-[#2a2a2a] cursor-pointer hover:border-[#c0c0c0] transition-colors rounded-[10px]">
                <ImageIcon className="w-10 h-10 text-[#808080] mb-2" />
                <span className="text-xs text-[#808080] text-center px-2">
                  Klik untuk upload foto
                </span>
                <input
                  type="file"
                  name="foto"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
              </label>
            )}
            
            <p className="text-xs text-[#808080]">
              Opsional. Format: JPG, PNG, GIF, WebP. Maksimal 5MB.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-[#2a2a2a]">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c0c0c0] hover:bg-[#e5e5e5] disabled:bg-[#3a3a3a] disabled:text-[#808080] text-black font-semibold text-sm transition-colors rounded-[10px]"
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
              href="/admin/siswa"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#c0c0c0] font-medium text-sm transition-colors border border-[#2a2a2a] rounded-[10px]"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
