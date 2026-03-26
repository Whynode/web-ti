"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Trash2 } from "lucide-react";
import { updateStatusPPDB, deletePPDB } from "@/actions/ppdb";

type PPDB = {
  id: string;
  namaLengkap: string;
  nisn: string;
  asalSekolah: string;
  jenisKelamin: string;
  noWA: string;
  email: string | null;
  alamat: string | null;
  nilaiRata: number | null;
  JurusanPilihan: string;
  status: "PENDING" | "DITERIMA" | "DITOLAK";
  tanggalDaftar: Date;
};

type Props = {
  ppdbList: PPDB[];
};

export default function PPDBTableClient({ ppdbList }: Props) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusUpdate = async (id: string, newStatus: "DITERIMA" | "DITOLAK") => {
    if (!confirm(`Yakin ingin mengubah status menjadi "${newStatus}"?`)) return;

    setUpdatingId(id);
    try {
      const result = await updateStatusPPDB(id, newStatus);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.message || "Gagal memperbarui status");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string, nama: string) => {
    if (!confirm(`Yakin ingin menghapus data "${nama}"? Data tidak bisa dikembalikan.`)) return;

    setUpdatingId(id);
    try {
      const result = await deletePPDB(id);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.message || "Gagal menghapus data");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DITERIMA":
        return <span className="px-2 py-1 text-xs font-medium bg-green-900/50 text-green-400 border border-green-800">Diterima</span>;
      case "DITOLAK":
        return <span className="px-2 py-1 text-xs font-medium bg-red-900/50 text-red-400 border border-red-800">Ditolak</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-900/50 text-yellow-400 border border-yellow-800">Pending</span>;
    }
  };

  return (
    <div className="bg-[#141414] border border-[#262626] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1a1a1a] border-b border-[#262626]">
              <th className="px-4 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">No</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Nama Lengkap</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">NISN</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Asal Sekolah</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Jurusan</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Status</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Tanggal Daftar</th>
              <th className="px-4 py-4 text-right text-xs font-semibold text-[#999] uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1f1f1f]">
            {ppdbList.map((ppdb, index) => (
              <tr key={ppdb.id} className="hover:bg-[#1a1a1a]">
                <td className="px-4 py-4 text-sm text-[#666]">{index + 1}</td>
                <td className="px-4 py-4">
                  <span className="text-sm font-medium text-[#c0c0c0]">{ppdb.namaLengkap}</span>
                  <div className="text-xs text-[#666] mt-0.5">{ppdb.jenisKelamin}</div>
                </td>
                <td className="px-4 py-4 text-sm text-[#999] font-mono">{ppdb.nisn}</td>
                <td className="px-4 py-4 text-sm text-[#999]">{ppdb.asalSekolah}</td>
                <td className="px-4 py-4 text-sm text-[#999]">{ppdb.JurusanPilihan}</td>
                <td className="px-4 py-4">{getStatusBadge(ppdb.status)}</td>
                <td className="px-4 py-4 text-sm text-[#666]">
                  {new Date(ppdb.tanggalDaftar).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {ppdb.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(ppdb.id, "DITERIMA")}
                          disabled={updatingId === ppdb.id}
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded transition-colors disabled:opacity-50"
                        >
                          <Check className="w-3.5 h-3.5" />
                          {updatingId === ppdb.id ? "..." : "Terima"}
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(ppdb.id, "DITOLAK")}
                          disabled={updatingId === ppdb.id}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded transition-colors disabled:opacity-50"
                        >
                          <X className="w-3.5 h-3.5" />
                          {updatingId === ppdb.id ? "..." : "Tolak"}
                        </button>
                      </>
                    )}
                    {ppdb.status !== "PENDING" && (
                      <span className="text-xs text-[#666]">Selesai</span>
                    )}
                    <button
                      onClick={() => handleDelete(ppdb.id, ppdb.namaLengkap)}
                      disabled={updatingId === ppdb.id}
                      className="flex items-center gap-1 px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-medium rounded transition-colors disabled:opacity-50"
                      title="Hapus data"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-4 border-t border-[#262626] bg-[#1a1a1a]">
        <p className="text-sm text-[#666]">
          Total: <span className="font-medium text-[#999]">{ppdbList.length}</span> pendaftar
        </p>
      </div>
    </div>
  );
}