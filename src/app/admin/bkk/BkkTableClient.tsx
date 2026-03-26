"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, MapPin, Trash2 } from "lucide-react";
import { HapusLowonganButton, EditLowonganButton } from "@/components/admin/LowonganButtons";
import { hapusLowonganBulk } from "./actions";

type Lowongan = {
  id: number;
  posisi: string;
  perusahaan: string;
  lokasi: string;
  tipePekerjaan: string;
  batasLamaran: Date;
  statusAktif: boolean;
};

type Props = {
  lowonganList: Lowongan[];
};

export default function BkkTableClient({ lowonganList }: Props) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleSelectAll = () => {
    if (selectedIds.length === lowonganList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(lowonganList.map(item => item.id));
    }
  };

  const toggleSelectRow = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(itemId => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.length} lowongan yang dipilih?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await hapusLowonganBulk(selectedIds);
      setSelectedIds([]);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data secara massal.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-[#141414] border border-[#262626] overflow-hidden">
      {selectedIds.length > 0 && (
        <div className="bg-[#1a1a1a] border-b border-[#262626] p-4 flex items-center justify-between">
          <span className="text-sm text-[#c0c0c0] font-medium">
            {selectedIds.length} baris terpilih
          </span>
          <button
            onClick={handleBulkDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-xs font-bold rounded-md transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            {isDeleting ? "Menghapus..." : "Hapus Data Terpilih"}
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1a1a1a] border-b border-[#262626]">
              <th className="px-6 py-4 text-left w-10">
                <input
                  type="checkbox"
                  checked={lowonganList.length > 0 && selectedIds.length === lowonganList.length}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-[#262626] bg-[#1a1a1a] text-brand-pink-start cursor-pointer"
                />
              </th>
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
              <tr key={lowongan.id} className={`hover:bg-[#1a1a1a] ${selectedIds.includes(lowongan.id) ? 'bg-[#1a1a1a]/50' : ''}`}>
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(lowongan.id)}
                    onChange={() => toggleSelectRow(lowongan.id)}
                    className="w-4 h-4 rounded border-[#262626] bg-[#1a1a1a] text-brand-pink-start cursor-pointer"
                  />
                </td>
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
  );
}
