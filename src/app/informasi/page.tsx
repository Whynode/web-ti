import prisma from "@/lib/prisma";
import InformasiClient from "./InformasiClient";

async function getGuru() {
  try {
    const guru = await prisma.guru.findMany({
      orderBy: { createdAt: "asc" },
    });
    return guru;
  } catch (error) {
    console.error("Error fetching guru:", error);
    return [];
  }
}

export default async function InformasiPage() {
  const guruList = await getGuru();
  const kepalaSekolah = guruList.find((g) => g.posisi.toLowerCase().includes("kepala sekolah")) || guruList[0];
  const guruLainnya = guruList.filter((g) => g !== kepalaSekolah);

  return (
    <InformasiClient 
      guruList={guruList}
      kepalaSekolah={kepalaSekolah}
      guruLainnya={guruLainnya}
    />
  );
}
