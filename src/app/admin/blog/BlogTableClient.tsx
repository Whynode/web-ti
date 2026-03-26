"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Trash2 } from "lucide-react";
import { HapusArtikelButton, EditArtikelButton } from "@/components/admin/ArtikelButtons";
import { hapusArtikelBulk } from "./actions";

type Artikel = {
  id: number;
  judul: string;
  slug: string;
  tanggalPublish: Date;
};

type Props = {
  artikelList: Artikel[];
};

export default function BlogTableClient({ artikelList }: Props) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleSelectAll = () => {
    if (selectedIds.length === artikelList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(artikelList.map(a => a.id));
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
    if (!confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.length} artikel yang dipilih?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await hapusArtikelBulk(selectedIds);
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
                  checked={artikelList.length > 0 && selectedIds.length === artikelList.length}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-[#262626] bg-[#1a1a1a] text-brand-pink-start cursor-pointer"
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">No</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Judul</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Slug</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Tanggal</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-[#999] uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1f1f1f]">
            {artikelList.map((artikel, index) => (
              <tr key={artikel.id} className={`hover:bg-[#1a1a1a] ${selectedIds.includes(artikel.id) ? 'bg-[#1a1a1a]/50' : ''}`}>
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(artikel.id)}
                    onChange={() => toggleSelectRow(artikel.id)}
                    className="w-4 h-4 rounded border-[#262626] bg-[#1a1a1a] text-brand-pink-start cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-[#666]">{index + 1}</td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-[#c0c0c0]">{artikel.judul}</span>
                </td>
                <td className="px-6 py-4">
                  <code className="text-xs bg-[#1a1a1a] text-[#999] px-2 py-1 border border-[#262626]">
                    /{artikel.slug}
                  </code>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-[#666]">
                    <Calendar className="w-4 h-4 text-[#555]" />
                    {new Date(artikel.tanggalPublish).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <EditArtikelButton id={artikel.id} />
                    <HapusArtikelButton id={artikel.id} judul={artikel.judul} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-[#262626] bg-[#1a1a1a]">
        <p className="text-sm text-[#666]">
          Total: <span className="font-medium text-[#999]">{artikelList.length}</span> artikel
        </p>
      </div>
    </div>
  );
}
