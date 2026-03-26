import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, Pencil, Users } from "lucide-react";
import HapusGuruButton from "@/components/admin/HapusGuruButton";
import GuruTableClient from "./GuruTableClient";

async function getGuru() {
  try {
    const guru = await prisma.guru.findMany({
      orderBy: { createdAt: "desc" },
    });
    return guru;
  } catch (error) {
    console.error("Error fetching guru:", error);
    return [];
  }
}

export default async function GuruManagementPage() {
  const guruList = await getGuru();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Manajemen Guru</h1>
          <p className="text-sm text-[#808080] mt-1">
            Kelola data guru dan tenaga pendidik
          </p>
        </div>
        <Link
          href="/admin/guru/tambah"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c0c0c0] hover:bg-[#e5e5e5] text-black font-semibold text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Guru
        </Link>
      </div>

      {guruList.length === 0 ? (
        <div className="bg-[#141414] border border-[#2a2a2a] p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[#1a1a1a] flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-[#808080]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Belum Ada Data Guru
            </h3>
            <p className="text-sm text-[#808080] max-w-md mb-6">
              Tambahkan data guru baru untuk mulai mengelola tenaga pendidik.
            </p>
            <Link
              href="/admin/guru/tambah"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c0c0c0] hover:bg-[#e5e5e5] text-black font-semibold text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              Tambah Guru Pertama
            </Link>
          </div>
        </div>
      ) : (
        <GuruTableClient guruList={guruList} />
      )}
    </div>
  );
}
