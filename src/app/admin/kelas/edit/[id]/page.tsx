import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import { updateKelas } from "@/app/admin/kelas/actions";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getKelas(id: number) {
  try {
    const kelas = await prisma.kelas.findUnique({
      where: { id },
      include: { waliKelas: true },
    });
    return kelas;
  } catch (error) {
    console.error("Error fetching kelas:", error);
    return null;
  }
}

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

export default async function EditKelasPage({ params }: PageProps) {
  const { id } = await params;
  const kelas = await getKelas(Number(id));
  const guruList = await getGuru();

  if (!kelas) {
    notFound();
  }

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
          <h1 className="text-2xl font-bold text-[#c0c0c0]">Edit Kelas</h1>
          <p className="text-sm text-[#666] mt-1">
            Edit kelas: {kelas.namaKelas}
          </p>
        </div>
      </div>

      <div className="bg-[#141414] border border-[#262626] p-6 lg:p-8">
        <form action={updateKelas.bind(null, kelas.id)} className="space-y-6">
          <input type="hidden" name="id" value={kelas.id} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="namaKelas" className="block text-sm font-medium text-[#999]">
                Nama Kelas <span className="text-[#ff6b6b]">*</span>
              </label>
              <select
                id="namaKelas"
                name="namaKelas"
                required
                defaultValue={kelas.namaKelas}
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0]"
              >
                <option value="X A">X A</option>
                <option value="X B">X B</option>
                <option value="XI A">XI A</option>
                <option value="XI B">XI B</option>
                <option value="XII A">XII A</option>
                <option value="XII B">XII B</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="waliKelasId" className="block text-sm font-medium text-[#999]">
                Wali Kelas <span className="text-[#ff6b6b]">*</span>
              </label>
              <select
                id="waliKelasId"
                name="waliKelasId"
                required
                defaultValue={kelas.waliKelasId || ""}
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0]"
              >
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
              defaultValue={kelas.deskripsi || ""}
              placeholder="Deskripsi singkat tentang kelas ini..."
              className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0] resize-none placeholder:text-[#555]"
            />
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-[#262626]">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c0c0c0] text-[#0a0a0a] font-medium text-sm"
            >
              Simpan Perubahan
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
