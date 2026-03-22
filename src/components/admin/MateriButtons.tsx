"use client";

import { Trash2, Pencil } from "lucide-react";
import { hapusMateri } from "@/app/admin/elearning/actions";

interface HapusMateriButtonProps {
  id: number;
  judul: string;
}

export function HapusMateriButton({ id, judul }: HapusMateriButtonProps) {
  return (
    <form
      action={async () => {
        const confirmed = window.confirm(
          `Hapus materi "${judul}"?\n\nTindakan ini tidak dapat dibatalkan.`
        );
        if (confirmed) {
          await hapusMateri(id);
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

interface EditMateriButtonProps {
  id: number;
}

export function EditMateriButton({ id }: EditMateriButtonProps) {
  return (
    <a
      href={`/admin/elearning/edit/${id}`}
      className="p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#c0c0c0] transition-colors"
      title="Edit"
    >
      <Pencil className="w-4 h-4" />
    </a>
  );
}
