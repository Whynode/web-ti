"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Trash2, Edit2, ExternalLink, Building2 } from "lucide-react";

type Mitra = {
  id: string;
  namaPerusahaan: string;
  logoUrl: string | null;
  websiteUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export default function MitraTable({ mitraList }: { mitraList: Mitra[] }) {
  const [data, setData] = useState(mitraList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Mitra | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const resetForm = () => {
    setEditingItem(null);
    setLogoPreview(null);
    setLogoFile(null);
  };

  const openModal = (item?: Mitra) => {
    if (item) {
      setEditingItem(item);
      setLogoPreview(item.logoUrl);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
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
      let logoUrl = logoPreview;

      if (logoFile) {
        const uploadedUrl = await uploadImage(logoFile);
        if (!uploadedUrl) {
          setIsSubmitting(false);
          return;
        }
        logoUrl = uploadedUrl;
      }

      const payload = {
        namaPerusahaan: formData.get("namaPerusahaan"),
        logoUrl: logoUrl || null,
        websiteUrl: formData.get("websiteUrl") || null,
      };

      let res;
      if (editingItem) {
        res = await fetch(`/api/bkk/mitra/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/bkk/mitra", {
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
      const updatedData = await fetch("/api/bkk/mitra").then((r) => r.json());
      setData(updatedData);
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus mitra ini?")) return;

    try {
      const res = await fetch(`/api/bkk/mitra/${id}`, { method: "DELETE" });
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
            Total: <span className="font-medium text-white">{data.length}</span> mitra
          </p>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-brand-pink-start hover:bg-brand-pink-end text-white px-4 py-2 text-xs font-bold rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Mitra
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a1a1a] border-b border-[#262626]">
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">No</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Logo</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Nama Perusahaan</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Website</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[#999] uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f1f]">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                    <Building2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Belum ada data mitra</p>
                  </td>
                </tr>
              ) : (
                data.map((mitra, index) => (
                  <tr key={mitra.id} className="hover:bg-[#1a1a1a]">
                    <td className="px-6 py-4 text-sm text-[#666]">{index + 1}</td>
                    <td className="px-6 py-4">
                      {mitra.logoUrl ? (
                        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-zinc-800">
                          <Image
                            src={mitra.logoUrl}
                            alt={mitra.namaPerusahaan}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-zinc-600" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-[#c0c0c0]">{mitra.namaPerusahaan}</span>
                    </td>
                    <td className="px-6 py-4">
                      {mitra.websiteUrl ? (
                        <Link
                          href={mitra.websiteUrl}
                          target="_blank"
                          className="flex items-center gap-1 text-sm text-brand-pink-start hover:underline"
                        >
                          Kunjungi
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      ) : (
                        <span className="text-sm text-zinc-600">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(mitra)}
                          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(mitra.id)}
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
              {editingItem ? "Edit Mitra" : "Tambah Mitra Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Logo Perusahaan
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg bg-zinc-900 border border-[#262626] flex items-center justify-center overflow-hidden">
                    {logoPreview ? (
                      <Image
                        src={logoPreview}
                        alt="Logo preview"
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    ) : (
                      <Building2 className="w-8 h-8 text-zinc-600" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Nama Perusahaan *
                </label>
                <input
                  type="text"
                  name="namaPerusahaan"
                  defaultValue={editingItem?.namaPerusahaan}
                  required
                  className="w-full bg-zinc-900 border border-[#262626] rounded-md px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-pink-start"
                  placeholder="PT Maju Jaya"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  name="websiteUrl"
                  defaultValue={editingItem?.websiteUrl || ""}
                  className="w-full bg-zinc-900 border border-[#262626] rounded-md px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-pink-start"
                  placeholder="https://example.com"
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
