"use client";

import { Trash2, Pencil } from "lucide-react";
import { hapusArtikel } from "@/app/admin/blog/actions";

interface HapusArtikelButtonProps {
  id: number;
  judul: string;
}

export function HapusArtikelButton({ id, judul }: HapusArtikelButtonProps) {
  return (
    <form
      action={async () => {
        const confirmed = window.confirm(
          `Hapus artikel "${judul}"?\n\nTindakan ini tidak dapat dibatalkan.`
        );
        if (confirmed) {
          await hapusArtikel(id);
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

interface EditArtikelButtonProps {
  id: number;
}

export function EditArtikelButton({ id }: EditArtikelButtonProps) {
  return (
    <a
      href={`/admin/blog/edit/${id}`}
      className="p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#c0c0c0] transition-colors"
      title="Edit"
    >
      <Pencil className="w-4 h-4" />
    </a>
  );
}
