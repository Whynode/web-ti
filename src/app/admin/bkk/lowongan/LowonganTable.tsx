"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit2, Building2, MapPin, Briefcase } from "lucide-react";

type Mitra = {
  id: string;
  namaPerusahaan: string;
  logoUrl: string | null;
};

type Lowongan = {
  id: number;
  judul: string;
  tipePekerjaan: string;
  lokasi: string;
  deskripsi: string;
  posterUrl: string | null;
  status: string;
  mitraId: string;
  mitra: Mitra;
  createdAt: Date;
};

const TIPE_PEKERJAAN = [
  "Full-Time",
  "Part-Time",
  "Magang",
  "Kontrak",
  "Freelance",
];

export default function LowonganTable({ 
  lowonganList, 
  mitraList: initialMitra 
}: { 
  lowonganList: Lowongan[]; 
  mitraList: Mitra[] 
}) {
  const [data, setData] = useState(lowonganList);
  const [mitraList, setMitraList] = useState(initialMitra);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Lowongan | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);

  useEffect(() => {
    fetch("/api/bkk/mitra")
      .then((res) => res.json())
      .then((data) => setMitraList(data))
      .catch(console.error);
  }, []);

  const resetForm = () => {
    setEditingItem(null);
    setPosterPreview(null);
    setPosterFile(null);
  };

  const openModal = (item?: Lowongan) => {
    if (item) {
      setEditingItem(item);
      setPosterPreview(item.posterUrl);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPosterFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreview(reader.result as string);
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
      let posterUrl = posterPreview;

      if (posterFile) {
        const uploadedUrl = await uploadImage(posterFile);
        if (!uploadedUrl) {
          setIsSubmitting(false);
          return;
        }
        posterUrl = uploadedUrl;
      }

      const payload = {
        judul: formData.get("judul"),
        tipePekerjaan: formData.get("tipePekerjaan"),
        lokasi: formData.get("lokasi"),
        deskripsi: formData.get("deskripsi"),
        posterUrl: posterUrl || null,
        status: formData.get("status"),
        mitraId: formData.get("mitraId"),
      };

      let res;
      if (editingItem) {
        res = await fetch(`/api/bkk/lowongan/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/bkk/lowongan", {
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
      const json = await fetch("/api/bkk/lowongan").then((r) => r.json());
      setData(json.vacancies || []);
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus lowongan ini?")) return;

    try {
      const res = await fetch(`/api/bkk/lowongan/${id}`, { method: "DELETE" });
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
            Total: <span className="font-medium text-white">{data.length}</span> lowongan
          </p>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-brand-pink-start hover:bg-brand-pink-end text-white px-4 py-2 text-xs font-bold rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Lowongan
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a1a1a] border-b border-[#262626]">
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">No</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Poster</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Judul</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Mitra</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Tipe</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#999] uppercase tracking-wider">Lokasi</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-[#999] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[#999] uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f1f]">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-zinc-500">
                    <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Belum ada lowongan</p>
                  </td>
                </tr>
              ) : (
                data.map((lowongan, index) => (
                  <tr key={lowongan.id} className="hover:bg-[#1a1a1a]">
                    <td className="px-6 py-4 text-sm text-[#666]">{index + 1}</td>
                    <td className="px-6 py-4">
                      {lowongan.posterUrl ? (
                        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-zinc-800">
                          <Image
                            src={lowongan.posterUrl}
                            alt={lowongan.judul}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-zinc-600" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-[#c0c0c0]">{lowongan.judul}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {lowongan.mitra.logoUrl ? (
                          <Image
                            src={lowongan.mitra.logoUrl}
                            alt={lowongan.mitra.namaPerusahaan}
                            width={24}
                            height={24}
                            className="rounded object-contain"
                          />
                        ) : (
                          <Building2 className="w-5 h-5 text-zinc-600" />
                        )}
                        <span className="text-sm text-[#999]">{lowongan.mitra.namaPerusahaan}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 text-xs font-medium bg-[#1a1a1a] text-[#999] border border-[#262626]">
                        {lowongan.tipePekerjaan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-[#666]">
                        <MapPin className="w-3 h-3" />
                        {lowongan.lokasi || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex px-2.5 py-1 text-xs font-medium ${
                          lowongan.status === "BUKA"
                            ? "bg-[#0a1a0a] text-[#4ade80] border border-[#1a3a1a]"
                            : "bg-[#1a1a1a] text-[#666] border border-[#262626]"
                        }`}
                      >
                        {lowongan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(lowongan)}
                          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(lowongan.id)}
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
          <div className="relative bg-[#1a1a1a] border border-[#262626] rounded-lg w-full max-w-2xl mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white mb-4">
              {editingItem ? "Edit Lowongan" : "Tambah Lowongan Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">
                    Mitra Perusahaan *
                  </label>
                  <select
                    name="mitraId"
                    defaultValue={editingItem?.mitraId || ""}
                    required
                    className="w-full bg-zinc-900 border border-[#262626] rounded-md px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-pink-start"
                  >
                    <option value="">Pilih Mitra</option>
                    {mitraList.map((mitra) => (
                      <option key={mitra.id} value={mitra.id}>
                        {mitra.namaPerusahaan}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">
                    Judul Lowongan *
                  </label>
                  <input
                    type="text"
                    name="judul"
                    defaultValue={editingItem?.judul}
                    required
                    className="w-full bg-zinc-900 border border-[#262626] rounded-md px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-pink-start"
                    placeholder="Staff IT Support"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">
                    Tipe Pekerjaan
                  </label>
                  <select
                    name="tipePekerjaan"
                    defaultValue={editingItem?.tipePekerjaan || "Full-Time"}
                    className="w-full bg-zinc-900 border border-[#262626] rounded-md px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-pink-start"
                  >
                    {TIPE_PEKERJAAN.map((tipe) => (
                      <option key={tipe} value={tipe}>
                        {tipe}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    name="lokasi"
                    defaultValue={editingItem?.lokasi}
                    className="w-full bg-zinc-900 border border-[#262626] rounded-md px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-pink-start"
                    placeholder="Jakarta, Indonesia"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={editingItem?.status || "BUKA"}
                    className="w-full bg-zinc-900 border border-[#262626] rounded-md px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-pink-start"
                  >
                    <option value="BUKA">BUKA</option>
                    <option value="TUTUP">TUTUP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">
                    Poster Lowongan
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg bg-zinc-900 border border-[#262626] flex items-center justify-center overflow-hidden">
                      {posterPreview ? (
                        <Image
                          src={posterPreview}
                          alt="Poster preview"
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      ) : (
                        <Briefcase className="w-8 h-8 text-zinc-600" />
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePosterChange}
                      className="text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Deskripsi
                </label>
                <textarea
                  name="deskripsi"
                  defaultValue={editingItem?.deskripsi}
                  rows={4}
                  className="w-full bg-zinc-900 border border-[#262626] rounded-md px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-pink-start resize-none"
                  placeholder="Deskripsikan lowongan pekerjaan..."
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
