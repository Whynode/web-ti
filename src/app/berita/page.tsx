import prisma from "@/lib/prisma";
import BeritaClient from "./BeritaClient";

async function getArtikel() {
  try {
    return await prisma.artikelBlog.findMany({
      orderBy: { tanggalPublish: "desc" },
      take: 20,
    });
  } catch {
    return [];
  }
}

export default async function BeritaPage() {
  const artikel = await getArtikel();
  return <BeritaClient artikel={artikel} />;
}
