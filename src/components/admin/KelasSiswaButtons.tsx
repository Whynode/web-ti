"use client";

import { Trash2, Pencil, Users } from "lucide-react";
import { hapusKelas } from "@/app/admin/kelas/actions";

interface HapusKelasButtonProps {
  id: number;
  namaKelas: string;
}

export function HapusKelasButton({ id, namaKelas }: HapusKelasButtonProps) {
  return (
    <form
      action={async () => {
        const confirmed = window.confirm(
          `Apakah Anda yakin ingin menghapus kelas "${namaKelas}"?\n\nSemua siswa dalam kelas ini akan ikut terhapus.\n\nTindakan ini tidak dapat dibatalkan.`
        );
        if (confirmed) {
          await hapusKelas(id);
        }
      }}
    >
      <button
        type="submit"
        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
        title="Hapus"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </form>
  );
}

interface EditKelasButtonProps {
  id: number;
}

export function EditKelasButton({ id }: EditKelasButtonProps) {
  return (
    <a
      href={`/admin/kelas/edit/${id}`}
      className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
      title="Edit"
    >
      <Pencil className="w-4 h-4" />
    </a>
  );
}

interface HapusSiswaButtonProps {
  id: number;
  nama: string;
}

export function HapusSiswaButton({ id, nama }: HapusSiswaButtonProps) {
  return (
    <form
      action={async () => {
        const confirmed = window.confirm(
          `Apakah Anda yakin ingin menghapus siswa "${nama}"?\n\nTindakan ini tidak dapat dibatalkan.`
        );
        if (confirmed) {
          await hapusSiswa(id);
        }
      }}
    >
      <button
        type="submit"
        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
        title="Hapus"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </form>
  );
}

interface EditSiswaButtonProps {
  id: number;
}

export function EditSiswaButton({ id }: EditSiswaButtonProps) {
  return (
    <a
      href={`/admin/siswa/edit/${id}`}
      className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
      title="Edit"
    >
      <Pencil className="w-4 h-4" />
    </a>
  );
}

import { hapusSiswa } from "@/app/admin/siswa/actions";
