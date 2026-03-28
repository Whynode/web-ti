"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit2, Image as ImageIcon } from "lucide-react";

type Galeri = {
  id: string;
  judul: string;
  kategori: string;
  imageUrl: string;
  createdAt: Date;
};

const KATEGORI = [
  "FASILITAS",
  "KEGIATAN SISWA",
  "PRESTASI",
  "KELULUSAN",
];

export default function GaleriTable({ galeriList }: { galeriList: Galeri[] }) {
  const [data, setData] = useState(galeriList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Galeri | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const resetForm = () => {
    setEditingItem(null);
    setImagePreview(null);
    setImageFile(null);
  };

  const openModal = (item?: Galeri) => {
    if (item) {
      setEditingItem(item);
      setImagePreview(item.imageUrl);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    const { uploadImage: serverUpload } = await import("@/app/admin/actions/upload");
    const result = await serverUpload(formData);
    
    if (!result.success) {
      alert(result.error || "Gagal upload gambar");
      return null;
    }

    return result.url || null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      let imageUrl = imagePreview;

      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (!uploadedUrl) {
          setIsSubmitting(false);
          return;
        }
        imageUrl = uploadedUrl;
      }

      const payload = {
        judul: formData.get("judul"),
        kategori: formData.get("kategori"),
        imageUrl,
      };

      let res;
      if (editingItem) {
        res = await fetch(`/api/galeri/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/galeri", {
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
      const updatedData = await fetch("/api/galeri").then((r) => r.json());
      setData(updatedData);
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus foto ini?")) return;

    try {
      const res = await fetch(`/api/galeri/${id}`, { method: "DELETE" });
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

  const getKategoriLabel = (kategori: string) => {
    const found = KATEGORI.find(k => k === kategori);
    return found || kategori;
  };

  return (
    <>
      <div className="bg-[#141414] border border-[#262626]">
        <div className="p-4 border-b border-[#262626] flex justify-between items-center">
          <p className="text-sm text-[#999]">
            Total: <span className="font-medium text-white">{data.length}</span> foto
          </p>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-brand-pink-start hover:bg-brand-pink-end text-white px-4 py-2 text-xs font-bold rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Foto
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a1a1a] border-b border-[#262626]">
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">No</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Foto</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Judul</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[#999] uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f1f]">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                    <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Belum ada foto galeri</p>
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-[#1a1a1a]">
                    <td className="px-6 py-4 text-sm text-[#666]">{index + 1}</td>
                    <td className="px-6 py-4">
                      {item.imageUrl ? (
                        <div className="w-16 h-12 relative rounded-lg overflow-hidden bg-zinc-800">
                          <Image
                            src={item.imageUrl}
                            alt={item.judul}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-12 rounded-lg bg-zinc-800 flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-zinc-600" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-[#c0c0c0]">{item.judul}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-xs font-medium bg-[#1a1a1a] text-[#999] border border-[#262626]">
                        {getKategoriLabel(item.kategori)}
                      </span>
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
              {editingItem ? "Edit Foto" : "Tambah Foto Galeri"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Foto *
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-lg bg-zinc-900 border border-[#262626] flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-zinc-600" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Judul *
                </label>
                <input
                  type="text"
                  name="judul"
                  defaultValue={editingItem?.judul}
                  required
                  className="w-full bg-zinc-900 border border-[#262626] rounded-md px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-pink-start"
                  placeholder="Contoh: MPLS 2023"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Kategori *
                </label>
                <select
                  name="kategori"
                  defaultValue={editingItem?.kategori || "KEGIATAN SISWA"}
                  required
                  className="w-full bg-zinc-900 border border-[#262626] rounded-md px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-pink-start"
                >
                  {KATEGORI.map((kategori) => (
                    <option key={kategori} value={kategori}>
                      {kategori}
                    </option>
                  ))}
                </select>
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
