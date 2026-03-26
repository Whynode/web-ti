import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, FileText, Calendar } from "lucide-react";
import { HapusArtikelButton, EditArtikelButton } from "@/components/admin/ArtikelButtons";
import BlogTableClient from "./BlogTableClient";

async function getArtikel() {
  try {
    const artikel = await prisma.artikelBlog.findMany({
      orderBy: { tanggalPublish: "desc" },
    });
    return artikel;
  } catch (error) {
    console.error("Error fetching artikel:", error);
    return [];
  }
}

export default async function BlogManagementPage() {
  const artikelList = await getArtikel();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#c0c0c0]">Artikel & Berita</h1>
          <p className="text-sm text-[#666] mt-1">
            Kelola artikel dan berita untuk website
          </p>
        </div>
        <Link
          href="/admin/blog/tambah"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c0c0c0] text-[#0a0a0a] font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Tambah Artikel
        </Link>
      </div>

      {artikelList.length === 0 ? (
        <div className="bg-[#141414] border border-[#262626] p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[#1a1a1a] flex items-center justify-center mb-4 border border-[#262626]">
              <FileText className="w-8 h-8 text-[#555]" />
            </div>
            <h3 className="text-lg font-semibold text-[#c0c0c0] mb-2">
              Belum Ada Artikel
            </h3>
            <p className="text-sm text-[#666] max-w-md mb-6">
              Tambahkan artikel atau berita untuk ditampilkan di website sekolah.
            </p>
            <Link
              href="/admin/blog/tambah"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c0c0c0] text-[#0a0a0a] font-medium text-sm"
            >
              <Plus className="w-4 h-4" />
              Tambah Artikel Pertama
            </Link>
          </div>
        </div>
      ) : (
        <BlogTableClient artikelList={artikelList} />
      )}
    </div>
  );
}
