import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/server";
import { lowonganSchema, formatZodError } from "@/lib/validations/api";

export async function GET() {
  try {
    const lowongan = await prisma.lowonganKerja.findMany({
      include: { mitra: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ vacancies: lowongan });
  } catch (error) {
    console.error("Error fetching lowongan:", error);
    return NextResponse.json({ error: "Failed to fetch lowongan" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Authenticate admin
    await requireAdmin();

    // Parse and validate body
    const body = await request.json();
    const validated = lowonganSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: formatZodError(validated.error) },
        { status: 400 }
      );
    }

    const lowongan = await prisma.lowonganKerja.create({
      data: validated.data,
    });

    return NextResponse.json(lowongan, { status: 201 });
  } catch (error) {
    // Handle auth errors
    if (error instanceof NextResponse) {
      return error;
    }
    console.error("Error creating lowongan:", error);
    return NextResponse.json({ error: "Failed to create lowongan" }, { status: 500 });
  }
}