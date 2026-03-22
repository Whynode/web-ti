import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, BookOpen, Video, FileText } from "lucide-react";
import { HapusMateriButton, EditMateriButton } from "@/components/admin/MateriButtons";

async function getMateri() {
  try {
    const materi = await prisma.materiElearning.findMany({
      orderBy: { createdAt: "desc" },
    });
    return materi;
  } catch (error) {
    console.error("Error fetching materi:", error);
    return [];
  }
}

export default async function ElearningManagementPage() {
  const materiList = await getMateri();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#c0c0c0]">E-Learning</h1>
          <p className="text-sm text-[#666] mt-1">
            Kelola materi video dan e-book untuk pembelajaran
          </p>
        </div>
        <Link
          href="/admin/elearning/tambah"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c0c0c0] text-[#0a0a0a] font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Tambah Materi
        </Link>
      </div>

      {materiList.length === 0 ? (
        <div className="bg-[#141414] border border-[#262626] p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[#1a1a1a] flex items-center justify-center mb-4 border border-[#262626]">
              <BookOpen className="w-8 h-8 text-[#555]" />
            </div>
            <h3 className="text-lg font-semibold text-[#c0c0c0] mb-2">
              Belum Ada Materi E-Learning
            </h3>
            <p className="text-sm text-[#666] max-w-md mb-6">
              Tambahkan materi video atau e-book untuk mendukung proses pembelajaran
              siswa.
            </p>
            <Link
              href="/admin/elearning/tambah"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c0c0c0] text-[#0a0a0a] font-medium text-sm"
            >
              <Plus className="w-4 h-4" />
              Tambah Materi Pertama
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Judul Materi</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Tipe</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Kelas Target</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-[#999] uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f1f1f]">
                {materiList.map((materi, index) => (
                  <tr key={materi.id} className="hover:bg-[#1a1a1a]">
                    <td className="px-6 py-4 text-sm text-[#666]">{index + 1}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-[#c0c0c0]">{materi.judul}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {materi.tipeMedia === "VIDEO" ? (
                          <Video className="w-4 h-4 text-[#a78bfa]" />
                        ) : (
                          <FileText className="w-4 h-4 text-[#fb923c]" />
                        )}
                        <span className="inline-flex px-2.5 py-1 text-xs font-medium bg-[#1a1a1a] text-[#999] border border-[#262626]">
                          {materi.tipeMedia}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#666]">{materi.kelasTarget}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#666]">
                      {new Date(materi.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <EditMateriButton id={materi.id} />
                        <HapusMateriButton id={materi.id} judul={materi.judul} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-[#262626] bg-[#1a1a1a]">
            <p className="text-sm text-[#666]">
              Total: <span className="font-medium text-[#999]">{materiList.length}</span> materi
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
