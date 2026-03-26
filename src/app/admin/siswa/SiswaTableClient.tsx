"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Users, User, Crown, Trash2 } from "lucide-react";
import { EditSiswaButton, HapusSiswaButton } from "@/components/admin/KelasSiswaButtons";
import { hapusSiswaBulk } from "./actions";

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

type SiswaType = {
  id: number;
  nama: string;
  peran: string;
  fotoUrl: string | null;
  kelas: {
    namaKelas: string;
    waliKelas: {
      nama: string;
    };
  };
};

type Props = {
  siswaList: SiswaType[];
};

export default function SiswaTableClient({ siswaList }: Props) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleSelectAll = () => {
    if (selectedIds.length === siswaList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(siswaList.map(s => s.id));
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
    if (!confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.length} data siswa yang dipilih?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await hapusSiswaBulk(selectedIds);
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
                  checked={siswaList.length > 0 && selectedIds.length === siswaList.length}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-[#262626] bg-[#1a1a1a] text-brand-pink-start cursor-pointer"
                />
              </th>
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
                <tr key={siswa.id} className={`hover:bg-[#1a1a1a] ${selectedIds.includes(siswa.id) ? 'bg-[#1a1a1a]/50' : ''}`}>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(siswa.id)}
                      onChange={() => toggleSelectRow(siswa.id)}
                      className="w-4 h-4 rounded border-[#262626] bg-[#1a1a1a] text-brand-pink-start cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-[#666]">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1a1a1a] border border-[#262626] flex items-center justify-center overflow-hidden">
                        {siswa.fotoUrl ? (
                          <Image src={siswa.fotoUrl || ""} alt={siswa.nama} width={40} height={40} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        ) : (
                          <span className="text-[#c0c0c0] font-semibold text-sm">
                            {siswa.nama.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-medium text-[#c0c0c0]">{siswa.nama}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#c0c0c0]">{siswa.kelas.namaKelas}</span>
                      <span className="text-xs text-[#666]">{siswa.kelas.waliKelas?.nama || "Belum ada Wali Kelas"}</span>
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
  );
}
