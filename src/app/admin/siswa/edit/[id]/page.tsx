import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import EditSiswaForm from "./EditSiswaForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getSiswa(id: number) {
  try {
    const siswa = await prisma.siswa.findUnique({
      where: { id },
      include: { kelas: { include: { waliKelas: true } } },
    });
    return siswa;
  } catch (error) {
    console.error("Error fetching siswa:", error);
    return null;
  }
}

async function getKelas() {
  try {
    const kelas = await prisma.kelas.findMany({
      include: { waliKelas: true },
      orderBy: { namaKelas: "asc" },
    });
    return kelas;
  } catch (error) {
    console.error("Error fetching kelas:", error);
    return [];
  }
}

export default async function EditSiswaPage({ params }: PageProps) {
  const { id } = await params;
  const siswa = await getSiswa(Number(id));
  const kelasList = await getKelas();

  if (!siswa) {
    return (
      <div className="space-y-6">
        <div className="bg-[#141414] border border-[#2a2a2a] p-12 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Siswa Tidak Ditemukan</h2>
          <Link href="/admin/siswa" className="text-[#c0c0c0] hover:underline">
            Kembali ke daftar siswa
          </Link>
        </div>
      </div>
    );
  }

  return <EditSiswaForm siswa={siswa} kelasList={kelasList} />;
}
