import prisma from "@/lib/prisma";
import LowonganTable from "./LowonganTable";

export default async function LowonganPage() {
  const lowonganList = await prisma.lowonganKerja.findMany({
    include: { mitra: true },
    orderBy: { createdAt: "desc" },
  });

  const mitraList = await prisma.mitraIndustri.findMany({
    orderBy: { namaPerusahaan: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Lowongan Kerja</h1>
          <p className="text-sm text-zinc-500">Kelola lowongan pekerjaan dari mitra industri</p>
        </div>
      </div>

      <LowonganTable lowonganList={lowonganList} mitraList={mitraList} />
    </div>
  );
}
