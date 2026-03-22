import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, Users, GraduationCap, Crown, User } from "lucide-react";
import { EditSiswaButton, HapusSiswaButton } from "@/components/admin/KelasSiswaButtons";

interface PageProps {
  searchParams: Promise<{ kelas?: string }>;
}

async function getSiswa(kelasId?: number) {
  try {
    const siswa = await prisma.siswa.findMany({
      where: kelasId ? { kelasId } : undefined,
      include: {
        kelas: {
          include: {
            waliKelas: true,
          },
        },
      },
      orderBy: [
        { kelas: { namaKelas: "asc" } },
        { peran: "asc" },
        { nama: "asc" },
      ],
    });
    return siswa;
  } catch (error) {
    console.error("Error fetching siswa:", error);
    return [];
  }
}

async function getKelas() {
  try {
    const kelas = await prisma.kelas.findMany({
      include: { waliKelas: true },
      orderBy: { namaKelas: "asc" },
    });
    return kelas;
  } catch (error) {
    console.error("Error fetching kelas:", error);
    return [];
  }
}

function getPeranBadge(peran: string) {
  const badges: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
    KETUA_KELAS: {
      bg: "bg-[#2a1a0a] text-[#fbbf24] border border-[#3a2a1a]",
      text: "Ketua Kelas",
      icon: <Crown className="w-3 h-3" />,
    },
    WAKIL_KETUA: {
      bg: "bg-[#0a1a2a] text-[#60a5fa] border border-[#1a2a3a]",
      text: "Wakil Ketua",
      icon: <Users className="w-3 h-3" />,
    },
    SEKRETARIS: {
      bg: "bg-[#1a0a2a] text-[#a78bfa] border border-[#2a1a3a]",
      text: "Sekretaris",
      icon: <User className="w-3 h-3" />,
    },
    BENDAHARA: {
      bg: "bg-[#0a2a1a] text-[#4ade80] border border-[#1a3a2a]",
      text: "Bendahara",
      icon: <User className="w-3 h-3" />,
    },
    SISWA: {
      bg: "bg-[#1a1a1a] text-[#999] border border-[#262626]",
      text: "Siswa",
      icon: <User className="w-3 h-3" />,
    },
  };
  return badges[peran] || badges.SISWA;
}

export default async function SiswaManagementPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const kelasId = params.kelas ? parseInt(params.kelas) : undefined;
  const siswaList = await getSiswa(kelasId);
  const kelasList = await getKelas();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#c0c0c0]">Manajemen Siswa</h1>
          <p className="text-sm text-[#666] mt-1">
            Kelola data siswa dan atur peran mereka
          </p>
        </div>
        <Link
          href="/admin/siswa/tambah"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c0c0c0] text-[#0a0a0a] font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Tambah Siswa
        </Link>
      </div>

      <div className="bg-[#141414] border border-[#262626] p-4">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/siswa"
            className={`px-4 py-2 text-sm font-medium ${
              !kelasId
                ? "bg-[#c0c0c0] text-[#0a0a0a]"
                : "bg-[#1a1a1a] text-[#999] border border-[#262626] hover:bg-[#222]"
            }`}
          >
            Semua Kelas
          </Link>
          {kelasList.map((kelas) => (
            <Link
              key={kelas.id}
              href={`/admin/siswa?kelas=${kelas.id}`}
              className={`px-4 py-2 text-sm font-medium ${
                kelasId === kelas.id
                  ? "bg-[#c0c0c0] text-[#0a0a0a]"
                  : "bg-[#1a1a1a] text-[#999] border border-[#262626] hover:bg-[#222]"
              }`}
            >
              {kelas.namaKelas}
            </Link>
          ))}
        </div>
      </div>

      {siswaList.length === 0 ? (
        <div className="bg-[#141414] border border-[#262626] p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[#1a1a1a] flex items-center justify-center mb-4 border border-[#262626]">
              <Users className="w-8 h-8 text-[#555]" />
            </div>
            <h3 className="text-lg font-semibold text-[#c0c0c0] mb-2">
              {kelasId ? "Belum Ada Siswa di Kelas Ini" : "Belum Ada Data Siswa"}
            </h3>
            <p className="text-sm text-[#666] max-w-md mb-6">
              {kelasId
                ? "Tambahkan siswa baru ke kelas ini."
                : "Tambahkan siswa baru untuk mulai mengelompokkan mereka ke kelas."}
            </p>
            <Link
              href="/admin/siswa/tambah"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c0c0c0] text-[#0a0a0a] font-medium text-sm"
            >
              <Plus className="w-4 h-4" />
              Tambah Siswa Pertama
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-[#141414] border border-[#262626] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1a1a1a] border-b border-[#262626]">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">No</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Nama Siswa</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Kelas</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Peran</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-[#999] uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f1f1f]">
                {siswaList.map((siswa, index) => {
                  const badge = getPeranBadge(siswa.peran);
                  return (
                    <tr key={siswa.id} className="hover:bg-[#1a1a1a]">
                      <td className="px-6 py-4 text-sm text-[#666]">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#1a1a1a] border border-[#262626] flex items-center justify-center text-[#c0c0c0] font-semibold text-sm">
                            {siswa.nama.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </div>
                          <span className="text-sm font-medium text-[#c0c0c0]">{siswa.nama}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-[#c0c0c0]">{siswa.kelas.namaKelas}</span>
                          <span className="text-xs text-[#666]">{siswa.kelas.waliKelas.nama}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium ${badge.bg}`}>
                          {badge.icon}
                          {badge.text}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <EditSiswaButton id={siswa.id} />
                          <HapusSiswaButton id={siswa.id} nama={siswa.nama} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-[#262626] bg-[#1a1a1a]">
            <p className="text-sm text-[#666]">
              Total: <span className="font-medium text-[#999]">{siswaList.length}</span> siswa
            </p>
          </div>
        </div>
      )}

      <div className="bg-[#141414] border border-[#262626] p-6">
        <h3 className="font-semibold text-[#c0c0c0] mb-4">Distribusi Peran</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {["KETUA_KELAS", "WAKIL_KETUA", "SEKRETARIS", "BENDAHARA", "SISWA"].map((peran) => {
            const count = siswaList.filter((s) => s.peran === peran).length;
            const badge = getPeranBadge(peran);
            return (
              <div key={peran} className="text-center p-3 bg-[#1a1a1a] border border-[#262626]">
                <p className="text-2xl font-bold text-[#c0c0c0]">{count}</p>
                <p className="text-xs font-medium text-[#666]">
                  {badge.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
