"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, Building2, User, Calendar } from "lucide-react";

type Penempatan = {
  id: number;
  namaAlumni: string;
  tahunLulus: number;
  perusahaanTempatKerja: string;
  createdAt: Date;
};

export default function PenempatanTable({ penempatanList }: { penempatanList: Penempatan[] }) {
  const [data, setData] = useState(penempatanList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Penempatan | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setEditingItem(null);
  };

  const openModal = (item?: Penempatan) => {
    if (item) {
      setEditingItem(item);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const payload = {
        namaAlumni: formData.get("namaAlumni"),
        tahunLulus: formData.get("tahunLulus"),
        perusahaanTempatKerja: formData.get("perusahaanTempatKerja"),
      };

      let res;
      if (editingItem) {
        res = await fetch(`/api/bkk/penempatan/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/bkk/penempatan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Gagal menyimpan data");
        setIsSubmitting(false);
        return;
      }

      closeModal();
      const updatedData = await fetch("/api/bkk/penempatan").then((r) => r.json());
      setData(updatedData);
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    try {
      const res = await fetch(`/api/bkk/penempatan/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Gagal menghapus");
        return;
      }
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan");
    }
  };

  return (
    <>
      <div className="bg-[#141414] border border-[#262626]">
        <div className="p-4 border-b border-[#262626] flex justify-between items-center">
          <p className="text-sm text-[#999]">
            Total: <span className="font-medium text-white">{data.length}</span> alumni
          </p>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-brand-pink-start hover:bg-brand-pink-end text-white px-4 py-2 text-xs font-bold rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Data
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a1a1a] border-b border-[#262626]">
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">No</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Nama Alumni</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Tahun Lulus</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Perusahaan</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[#999] uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f1f]">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                    <User className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Belum ada data penempatan</p>
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-[#1a1a1a]">
                    <td className="px-6 py-4 text-sm text-[#666]">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-zinc-500" />
                        <span className="text-sm font-medium text-[#c0c0c0]">{item.namaAlumni}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-zinc-500" />
                        <span className="text-sm text-[#999]">{item.tahunLulus}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-zinc-500" />
                        <span className="text-sm text-[#999]">{item.perusahaanTempatKerja}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(item)}
                          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80" onClick={closeModal} />
          <div className="relative bg-[#1a1a1a] border border-[#262626] rounded-lg w-full max-w-md mx-4 p-6">
            <h2 className="text-lg font-bold text-white mb-4">
              {editingItem ? "Edit Data" : "Tambah Data Alumni"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Nama Alumni *
                </label>
                <input
                  type="text"
                  name="namaAlumni"
                  defaultValue={editingItem?.namaAlumni}
                  required
                  className="w-full bg-zinc-900 border border-[#262626] rounded-md px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-pink-start"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Tahun Lulus *
                </label>
                <input
                  type="number"
                  name="tahunLulus"
                  defaultValue={editingItem?.tahunLulus}
                  required
                  min={2000}
                  max={2100}
                  className="w-full bg-zinc-900 border border-[#262626] rounded-md px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-pink-start"
                  placeholder="2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Perusahaan Tempat Kerja *
                </label>
                <input
                  type="text"
                  name="perusahaanTempatKerja"
                  defaultValue={editingItem?.perusahaanTempatKerja}
                  required
                  className="w-full bg-zinc-900 border border-[#262626] rounded-md px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-pink-start"
                  placeholder="PT Maju Jaya"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 text-sm font-medium text-zinc-400 bg-zinc-900 hover:bg-zinc-800 rounded-md transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 text-sm font-bold text-white bg-brand-pink-start hover:bg-brand-pink-end rounded-md transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
