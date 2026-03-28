import prisma from "@/lib/prisma";
import PenempatanTable from "./PenempatanTable";

export default async function PenempatanPage() {
  const penempatanList = await prisma.penempatanAlumni.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Data Penempatan Alumni</h1>
          <p className="text-sm text-zinc-500">Kelola data alumni yang sudah bekerja</p>
        </div>
      </div>

      <PenempatanTable penempatanList={penempatanList} />
    </div>
  );
}
