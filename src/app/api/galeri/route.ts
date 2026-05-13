import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/server";
import { galeriSchema, formatZodError } from "@/lib/validations/api";

export async function GET() {
  try {
    const galeri = await prisma.galeri.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ images: galeri });
  } catch (error) {
    console.error("Error fetching galeri:", error);
    return NextResponse.json({ error: "Failed to fetch galeri" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Authenticate admin
    await requireAdmin();

    // Parse and validate body
    const body = await request.json();
    const validated = galeriSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: formatZodError(validated.error) },
        { status: 400 }
      );
    }

    const galeri = await prisma.galeri.create({
      data: validated.data,
    });

    return NextResponse.json(galeri, { status: 201 });
  } catch (error) {
    // Handle auth errors
    if (error instanceof NextResponse) {
      return error;
    }
    console.error("Error creating galeri:", error);
    return NextResponse.json({ error: "Failed to create galeri" }, { status: 500 });
  }
}