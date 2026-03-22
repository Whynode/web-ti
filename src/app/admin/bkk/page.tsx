import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, Briefcase, MapPin, Building2 } from "lucide-react";
import { HapusLowonganButton, EditLowonganButton } from "@/components/admin/LowonganButtons";

async function getLowongan() {
  try {
    const lowongan = await prisma.lowonganBKK.findMany({
      orderBy: { createdAt: "desc" },
    });
    return lowongan;
  } catch (error) {
    console.error("Error fetching lowongan:", error);
    return [];
  }
}

export default async function BKKManagementPage() {
  const lowonganList = await getLowongan();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#c0c0c0]">Bursa Kerja Khusus (BKK)</h1>
          <p className="text-sm text-[#666] mt-1">
            Kelola lowongan kerja dan informasi magang untuk alumni
          </p>
        </div>
        <Link
          href="/admin/bkk/tambah"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c0c0c0] text-[#0a0a0a] font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Tambah Lowongan
        </Link>
      </div>

      {lowonganList.length === 0 ? (
        <div className="bg-[#141414] border border-[#262626] p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[#1a1a1a] flex items-center justify-center mb-4 border border-[#262626]">
              <Briefcase className="w-8 h-8 text-[#555]" />
            </div>
            <h3 className="text-lg font-semibold text-[#c0c0c0] mb-2">
              Belum Ada Lowongan Kerja
            </h3>
            <p className="text-sm text-[#666] max-w-md mb-6">
              Sistem belum memiliki data lowongan. Tambahkan lowongan baru untuk
              membantu alumni mendapatkan pekerjaan.
            </p>
            <Link
              href="/admin/bkk/tambah"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c0c0c0] text-[#0a0a0a] font-medium text-sm"
            >
              <Plus className="w-4 h-4" />
              Tambah Lowongan Pertama
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Posisi</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Perusahaan</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Lokasi</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Tipe</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Batas</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-[#999] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-[#999] uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f1f1f]">
                {lowonganList.map((lowongan, index) => (
                  <tr key={lowongan.id} className="hover:bg-[#1a1a1a]">
                    <td className="px-6 py-4 text-sm text-[#666]">{index + 1}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-[#c0c0c0]">{lowongan.posisi}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#555]" />
                        <span className="text-sm text-[#999]">{lowongan.perusahaan}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#555]" />
                        <span className="text-sm text-[#666]">{lowongan.lokasi}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 text-xs font-medium bg-[#1a1a1a] text-[#999] border border-[#262626]">
                        {lowongan.tipePekerjaan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#666]">
                      {new Date(lowongan.batasLamaran).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex px-2.5 py-1 text-xs font-medium ${
                          lowongan.statusAktif
                            ? "bg-[#0a1a0a] text-[#4ade80] border border-[#1a3a1a]"
                            : "bg-[#1a1a1a] text-[#666] border border-[#262626]"
                        }`}
                      >
                        {lowongan.statusAktif ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <EditLowonganButton id={lowongan.id} />
                        <HapusLowonganButton
                          id={lowongan.id}
                          posisi={lowongan.posisi}
                          perusahaan={lowongan.perusahaan}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-[#262626] bg-[#1a1a1a]">
            <p className="text-sm text-[#666]">
              Total: <span className="font-medium text-[#999]">{lowonganList.length}</span> lowongan
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
