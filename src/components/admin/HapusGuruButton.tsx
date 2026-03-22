"use client";

import { Trash2 } from "lucide-react";
import { hapusGuru } from "@/app/admin/guru/actions";

interface HapusGuruButtonProps {
  id: number;
  nama: string;
}

export default function HapusGuruButton({ id, nama }: HapusGuruButtonProps) {
  return (
    <form
      action={async () => {
        const confirmed = window.confirm(
          `Apakah Anda yakin ingin menghapus "${nama}"?\n\nTindakan ini tidak dapat dibatalkan.`
        );
        if (confirmed) {
          await hapusGuru(id);
        }
      }}
    >
      <button
        type="submit"
        className="p-2 bg-[#2a2a2a] hover:bg-red-900/30 text-[#c0c0c0] hover:text-red-500 transition-colors"
        title="Hapus"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </form>
  );
}
