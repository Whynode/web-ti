import prisma from "@/lib/prisma";
import ElearningClient from "./ElearningClient";

async function getMateri() {
  try {
    return await prisma.materiElearning.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function ElearningPage() {
  const materi = await getMateri();
  return <ElearningClient materi={materi} />;
}
