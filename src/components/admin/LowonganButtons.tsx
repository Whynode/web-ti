"use client";

import { Trash2, Pencil } from "lucide-react";
import { hapusLowongan } from "@/app/admin/bkk/actions";

interface HapusLowonganButtonProps {
  id: number;
  posisi: string;
  perusahaan: string;
}

export function HapusLowonganButton({ id, posisi, perusahaan }: HapusLowonganButtonProps) {
  return (
    <form
      action={async () => {
        const confirmed = window.confirm(
          `Hapus lowongan "${posisi}" di ${perusahaan}?\n\nTindakan ini tidak dapat dibatalkan.`
        );
        if (confirmed) {
          await hapusLowongan(id);
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

interface EditLowonganButtonProps {
  id: number;
}

export function EditLowonganButton({ id }: EditLowonganButtonProps) {
  return (
    <a
      href={`/admin/bkk/edit/${id}`}
      className="p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#c0c0c0] transition-colors"
      title="Edit"
    >
      <Pencil className="w-4 h-4" />
    </a>
  );
}
