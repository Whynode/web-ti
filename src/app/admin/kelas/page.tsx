import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, GraduationCap, Users, BookOpen } from "lucide-react";
import { EditKelasButton, HapusKelasButton } from "@/components/admin/KelasSiswaButtons";

async function getKelas() {
  try {
    const kelas = await prisma.kelas.findMany({
      include: {
        waliKelas: true,
        siswa: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return kelas;
  } catch (error) {
    console.error("Error fetching kelas:", error);
    return [];
  }
}

export default async function KelasManagementPage() {
  const kelasList = await getKelas();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#c0c0c0]">Manajemen Kelas</h1>
          <p className="text-sm text-[#666] mt-1">
            Kelola data kelas dan lihat distribusi siswa
          </p>
        </div>
        <Link
          href="/admin/kelas/tambah"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c0c0c0] text-[#0a0a0a] font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Tambah Kelas
        </Link>
      </div>

      {kelasList.length === 0 ? (
        <div className="bg-[#141414] border border-[#262626] p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[#1a1a1a] flex items-center justify-center mb-4 border border-[#262626]">
              <GraduationCap className="w-8 h-8 text-[#555]" />
            </div>
            <h3 className="text-lg font-semibold text-[#c0c0c0] mb-2">
              Belum Ada Data Kelas
            </h3>
            <p className="text-sm text-[#666] max-w-md mb-6">
              Tambahkan kelas baru untuk mulai mengelompokkan siswa.
            </p>
            <Link
              href="/admin/kelas/tambah"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c0c0c0] text-[#0a0a0a] font-medium text-sm"
            >
              <Plus className="w-4 h-4" />
              Tambah Kelas Pertama
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kelasList.map((kelas) => (
            <div
              key={kelas.id}
              className="bg-[#141414] border border-[#262626] overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#1a1a1a] border border-[#262626] flex items-center justify-center text-[#c0c0c0]">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#c0c0c0]">{kelas.namaKelas}</h3>
                      <p className="text-xs text-[#666]">
                        {kelas.siswa.length} siswa
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <EditKelasButton id={kelas.id} />
                    <HapusKelasButton id={kelas.id} namaKelas={kelas.namaKelas} />
                  </div>
                </div>

                {kelas.deskripsi && (
                  <p className="text-sm text-[#666] mb-4 line-clamp-2">
                    {kelas.deskripsi}
                  </p>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-[#555]" />
                    <span className="text-[#999]">
                      Wali Kelas:{" "}
                      <span className="font-medium text-[#c0c0c0]">
                        {kelas.waliKelas.nama}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-[#555]" />
                    <span className="text-[#999]">
                      Mapel:{" "}
                      <span className="font-medium text-[#c0c0c0]">
                        {kelas.waliKelas.mapel}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-3 bg-[#1a1a1a] border-t border-[#262626]">
                <Link
                  href={`/admin/siswa?kelas=${kelas.id}`}
                  className="text-sm font-medium text-[#c0c0c0] hover:text-white"
                >
                  Lihat Daftar Siswa &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {kelasList.length > 0 && (
        <div className="bg-[#141414] border border-[#262626] p-6">
          <h3 className="font-semibold text-[#c0c0c0] mb-4">Ringkasan</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-[#1a1a1a] border border-[#262626]">
              <p className="text-2xl font-bold text-[#c0c0c0]">{kelasList.length}</p>
              <p className="text-sm text-[#666]">Total Kelas</p>
            </div>
            <div className="text-center p-4 bg-[#1a1a1a] border border-[#262626]">
              <p className="text-2xl font-bold text-[#c0c0c0]">
                {kelasList.reduce((acc, k) => acc + k.siswa.length, 0)}
              </p>
              <p className="text-sm text-[#666]">Total Siswa</p>
            </div>
            <div className="text-center p-4 bg-[#1a1a1a] border border-[#262626]">
              <p className="text-2xl font-bold text-[#c0c0c0]">
                {kelasList.filter((k) => k.siswa.some((s) => s.peran === "KETUA_KELAS")).length}
              </p>
              <p className="text-sm text-[#666]">Kelas dengan Ketua</p>
            </div>
            <div className="text-center p-4 bg-[#1a1a1a] border border-[#262626]">
              <p className="text-2xl font-bold text-[#c0c0c0]">
                {kelasList.filter((k) => k.siswa.length === 0).length}
              </p>
              <p className="text-sm text-[#666]">Kelas Kosong</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
