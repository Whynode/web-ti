import prisma from "@/lib/prisma";
import TambahSiswaForm from "./TambahSiswaForm";

export const dynamic = 'force-dynamic';

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

export default async function TambahSiswaPage() {
  const kelasList = await getKelas();
  return <TambahSiswaForm kelasList={kelasList} />;
}
