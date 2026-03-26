import React from "react";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';
import { ClipboardList } from "lucide-react";
import PPDBTableClient from "./PPDBTableClient";
import ExportPPDBButton from "@/components/admin/ExportPPDBButton";

async function getPPDB() {
  try {
    const ppdb = await prisma.pPDB.findMany({
      orderBy: { tanggalDaftar: "desc" },
    });
    return ppdb;
  } catch (error) {
    console.error("Error fetching PPDB:", error);
    return [];
  }
}

export default async function PPDBManagementPage() {
  const ppdbList = await getPPDB();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#c0c0c0]">PPDB - Pendaftaran Siswa Baru</h1>
          <p className="text-sm text-[#666] mt-1">
            Kelola data pendaftaran siswa baru
          </p>
        </div>
        {ppdbList.length > 0 && <ExportPPDBButton data={ppdbList} />}
      </div>

      {ppdbList.length === 0 ? (
        <div className="bg-[#141414] border border-[#262626] p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[#1a1a1a] flex items-center justify-center mb-4 border border-[#262626]">
              <ClipboardList className="w-8 h-8 text-[#555]" />
            </div>
            <h3 className="text-lg font-semibold text-[#c0c0c0] mb-2">
              Belum Ada Pendaftaran
            </h3>
            <p className="text-sm text-[#666] max-w-md">
              PPDB belum ada yang mendaftar. Buka halaman publik di /ppdb untuk mulai menerima pendaftaran.
            </p>
          </div>
        </div>
      ) : (
        <PPDBTableClient ppdbList={ppdbList} />
      )}
    </div>
  );
}