import prisma from "@/lib/prisma";
import GaleriContent from "./GaleriContent";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getGaleri() {
  try {
    const galeri = await prisma.galeri.findMany({
      orderBy: { createdAt: "desc" },
    });
    return galeri;
  } catch (error) {
    console.error("Error fetching galeri:", error);
    return [];
  }
}

export default async function GaleriPage() {
  const galeriList = await getGaleri();

  return <GaleriContent galeriList={galeriList} />;
}
