import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, Briefcase, MapPin, Building2 } from "lucide-react";
import { HapusLowonganButton, EditLowonganButton } from "@/components/admin/LowonganButtons";
import BkkTableClient from "./BkkTableClient";

async function getLowongan() {
  try {
    const lowongan = await prisma.lowonganBKK.findMany({
      orderBy: { createdAt: "desc" },
    });
    return lowongan;
  } catch (error) {
    console.error("Error fetching lowongan:", error);
    return [];
  }
}

export default async function BKKManagementPage() {
  const lowonganList = await getLowongan();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#c0c0c0]">Bursa Kerja Khusus (BKK)</h1>
          <p className="text-sm text-[#666] mt-1">
            Kelola lowongan kerja dan informasi magang untuk alumni
          </p>
        </div>
        <Link
          href="/admin/bkk/tambah"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c0c0c0] text-[#0a0a0a] font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Tambah Lowongan
        </Link>
      </div>

      {lowonganList.length === 0 ? (
        <div className="bg-[#141414] border border-[#262626] p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[#1a1a1a] flex items-center justify-center mb-4 border border-[#262626]">
              <Briefcase className="w-8 h-8 text-[#555]" />
            </div>
            <h3 className="text-lg font-semibold text-[#c0c0c0] mb-2">
              Belum Ada Lowongan Kerja
            </h3>
            <p className="text-sm text-[#666] max-w-md mb-6">
              Sistem belum memiliki data lowongan. Tambahkan lowongan baru untuk
              membantu alumni mendapatkan pekerjaan.
            </p>
            <Link
              href="/admin/bkk/tambah"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c0c0c0] text-[#0a0a0a] font-medium text-sm"
            >
              <Plus className="w-4 h-4" />
              Tambah Lowongan Pertama
            </Link>
          </div>
        </div>
      ) : (
        <BkkTableClient lowonganList={lowonganList} />
      )}
    </div>
  );
}
