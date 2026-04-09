"use client";

import { Download } from "lucide-react";

type PPDB = {
  id: string;
  namaLengkap: string;
  nisn: string;
  asalSekolah: string;
  jenisKelamin: string;
  noWA: string;
  email: string | null;
  alamat: string | null;
  nilaiRata: number | null;
  JurusanPilihan: string;
  status: "PENDING" | "DITERIMA" | "DITOLAK";
  tanggalDaftar: Date;
};

type Props = {
  data: PPDB[];
};

export default function ExportPPDBButton({ data }: Props) {
  const handleExport = () => {
    const headers = [
      "No",
      "Nama Lengkap",
      "NISN",
      "Asal Sekolah",
      "Jenis Kelamin",
      "No WA",
      "Email",
      "Alamat",
      "Referensi Pengajak",
      "Status",
      "Tanggal Daftar",
    ];

    const rows = data.map((ppdb, index) => [
      index + 1,
      ppdb.namaLengkap,
      "'" + ppdb.nisn,
      ppdb.asalSekolah,
      ppdb.jenisKelamin,
      "'" + ppdb.noWA,
      ppdb.email || "-",
      ppdb.alamat || "-",
      // @ts-ignore
      ppdb.referensi || '-',
      ppdb.status === "PENDING" ? "Pending" : ppdb.status === "DITERIMA" ? "Diterima" : "Ditolak",
      new Date(ppdb.tanggalDaftar).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    ]);

    const csvContent = [
      headers.join(";"),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(";")),
    ].join("\n");

    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `data-ppdb-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium text-sm rounded-md transition-colors"
    >
      <Download className="w-4 h-4" />
      Export CSV
    </button>
  );
}