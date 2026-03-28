import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import { tambahKelas } from "@/app/admin/kelas/actions";

async function getGuru() {
  try {
    const guru = await prisma.guru.findMany({
      orderBy: { nama: "asc" },
    });
    return guru;
  } catch (error) {
    console.error("Error fetching guru:", error);
    return [];
  }
}

export default async function TambahKelasPage() {
  const guruList = await getGuru();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/kelas"
          className="p-2 bg-[#141414] border border-[#262626] hover:bg-[#1a1a1a]"
        >
          <ArrowLeft className="w-5 h-5 text-[#999]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#c0c0c0]">Tambah Kelas Baru</h1>
          <p className="text-sm text-[#666] mt-1">
            Tambahkan kelas baru ke sistem
          </p>
        </div>
      </div>

      <div className="bg-[#141414] border border-[#262626] p-6 lg:p-8">
        <form action={tambahKelas} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="namaKelas" className="block text-sm font-medium text-[#999]">
                Nama Kelas <span className="text-[#ff6b6b]">*</span>
              </label>
              <input
                type="text"
                id="namaKelas"
                name="namaKelas"
                placeholder="Contoh: X D, XI TKJ 1, XII RPL"
                required
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0] placeholder:text-[#555]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="waliKelasId" className="block text-sm font-medium text-[#999]">
                Wali Kelas <span className="text-[#ff6b6b]">*</span>
              </label>
              <select
                id="waliKelasId"
                name="waliKelasId"
                required
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0]"
              >
                <option value="">Pilih Wali Kelas</option>
                {guruList.map((guru) => (
                  <option key={guru.id} value={guru.id}>
                    {guru.nama}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="deskripsi" className="block text-sm font-medium text-[#999]">
              Deskripsi (Opsional)
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              rows={3}
              placeholder="Deskripsi singkat tentang kelas ini..."
              className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0] resize-none placeholder:text-[#555]"
            />
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-[#262626]">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c0c0c0] text-[#0a0a0a] font-medium text-sm"
            >
              Simpan
            </button>
            <Link
              href="/admin/kelas"
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
