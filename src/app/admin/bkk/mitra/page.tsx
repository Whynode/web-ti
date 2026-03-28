import prisma from "@/lib/prisma";
import MitraTable from "./MitraTable";

export default async function MitraPage() {
  const mitraList = await prisma.mitraIndustri.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Mitra Industri</h1>
          <p className="text-sm text-zinc-500">Kelola data mitra perusahaan合作伙伴</p>
        </div>
      </div>

      <MitraTable mitraList={mitraList} />
    </div>
  );
}
