import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import EditArtikelForm from "./EditArtikelForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getArtikel(id: number) {
  try {
    const artikel = await prisma.artikelBlog.findUnique({
      where: { id },
    });
    return artikel;
  } catch (error) {
    console.error("Error fetching artikel:", error);
    return null;
  }
}

export default async function EditArtikelPage({ params }: PageProps) {
  const { id } = await params;
  const artikel = await getArtikel(Number(id));

  if (!artikel) {
    notFound();
  }

  return <EditArtikelForm artikel={artikel} />;
}
