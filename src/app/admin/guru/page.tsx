import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, Pencil, Users } from "lucide-react";
import HapusGuruButton from "@/components/admin/HapusGuruButton";

async function getGuru() {
  try {
    const guru = await prisma.guru.findMany({
      orderBy: { createdAt: "desc" },
    });
    return guru;
  } catch (error) {
    console.error("Error fetching guru:", error);
    return [];
  }
}

export default async function GuruManagementPage() {
  const guruList = await getGuru();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Manajemen Guru</h1>
          <p className="text-sm text-[#808080] mt-1">
            Kelola data guru dan tenaga pendidik
          </p>
        </div>
        <Link
          href="/admin/guru/tambah"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c0c0c0] hover:bg-[#e5e5e5] text-black font-semibold text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Guru
        </Link>
      </div>

      {guruList.length === 0 ? (
        <div className="bg-[#141414] border border-[#2a2a2a] p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[#1a1a1a] flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-[#808080]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Belum Ada Data Guru
            </h3>
            <p className="text-sm text-[#808080] max-w-md mb-6">
              Tambahkan data guru baru untuk mulai mengelola tenaga pendidik.
            </p>
            <Link
              href="/admin/guru/tambah"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c0c0c0] hover:bg-[#e5e5e5] text-black font-semibold text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              Tambah Guru Pertama
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-[#141414] border border-[#2a2a2a] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#808080] uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#808080] uppercase tracking-wider">
                    Nama Guru
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#808080] uppercase tracking-wider">
                    Posisi
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#808080] uppercase tracking-wider">
                    Mata Pelajaran
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-[#808080] uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2a]">
                {guruList.map((guru, index) => (
                  <tr key={guru.id} className="hover:bg-[#1a1a1a] transition-colors">
                    <td className="px-4 py-3 text-sm text-[#808080]">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#2a2a2a] flex items-center justify-center text-[#c0c0c0] font-semibold text-sm">
                          {guru.nama
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <span className="text-sm font-medium text-white">
                          {guru.nama}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2.5 py-1 text-xs font-medium bg-[#2a2a2a] text-[#c0c0c0]">
                        {guru.posisi}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#808080]">
                      {guru.mapel || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/guru/edit/${guru.id}`}
                          className="p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#c0c0c0] transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <HapusGuruButton id={guru.id} nama={guru.nama} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-[#2a2a2a] bg-[#1a1a1a]">
            <p className="text-sm text-[#808080]">
              Total: <span className="font-semibold text-white">{guruList.length}</span> guru
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
