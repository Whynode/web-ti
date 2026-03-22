import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import EditGuruForm from "./EditGuruForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getGuru(id: number) {
  try {
    const guru = await prisma.guru.findUnique({
      where: { id },
    });
    return guru;
  } catch (error) {
    console.error("Error fetching guru:", error);
    return null;
  }
}

export default async function EditGuruPage({ params }: PageProps) {
  const { id } = await params;
  const guru = await getGuru(Number(id));

  if (!guru) {
    notFound();
  }

  return <EditGuruForm guru={guru} />;
}
