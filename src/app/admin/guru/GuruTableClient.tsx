"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Pen, Pencil, Trash2 } from "lucide-react";
import HapusGuruButton from "@/components/admin/HapusGuruButton";
import { hapusGuruBulk } from "./actions";

type Guru = {
  id: number;
  nama: string;
  posisi: string;
  mapel: string;
  fotoUrl: string | null;
};

type Props = {
  guruList: Guru[];
};

export default function GuruTableClient({ guruList }: Props) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleSelectAll = () => {
    if (selectedIds.length === guruList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(guruList.map(g => g.id));
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
    if (!confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.length} data guru yang dipilih?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await hapusGuruBulk(selectedIds);
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
    <div className="bg-[#141414] border border-[#2a2a2a] overflow-hidden">
      {selectedIds.length > 0 && (
        <div className="bg-[#1a1a1a] border-b border-[#2a2a2a] p-4 flex items-center justify-between">
          <span className="text-sm text-white font-medium">
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
            <tr className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
              <th className="px-4 py-3 text-left w-10">
                <input
                  type="checkbox"
                  checked={guruList.length > 0 && selectedIds.length === guruList.length}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-[#2a2a2a] bg-[#1a1a1a] text-brand-pink-start cursor-pointer"
                />
              </th>
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
              <tr key={guru.id} className={`hover:bg-[#1a1a1a] transition-colors ${selectedIds.includes(guru.id) ? 'bg-[#1a1a1a]/50' : ''}`}>
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(guru.id)}
                    onChange={() => toggleSelectRow(guru.id)}
                    className="w-4 h-4 rounded border-[#2a2a2a] bg-[#1a1a1a] text-brand-pink-start cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-[#808080]">
                  {index + 1}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2a2a2a] flex items-center justify-center overflow-hidden">
                      {guru.fotoUrl ? (
                        <Image src={guru.fotoUrl || ""} alt={guru.nama} width={40} height={40} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      ) : (
                        <span className="text-[#c0c0c0] font-semibold text-sm">
                          {guru.nama.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </span>
                      )}
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
  );
}
