import prisma from "@/lib/prisma";
import GaleriTable from "./GaleriTable";

export default async function GaleriPage() {
  const galeriList = await prisma.galeri.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Galeri</h1>
          <p className="text-sm text-zinc-500">Kelola foto galeri sekolah</p>
        </div>
      </div>

      <GaleriTable galeriList={galeriList} />
    </div>
  );
}
