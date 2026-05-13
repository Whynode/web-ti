import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/server";
import { mitraSchema, formatZodError } from "@/lib/validations/api";

export async function GET() {
  try {
    const mitra = await prisma.mitraIndustri.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(mitra);
  } catch (error) {
    console.error("Error fetching mitra:", error);
    return NextResponse.json({ error: "Failed to fetch mitra" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Authenticate admin
    await requireAdmin();

    // Parse and validate body
    const body = await request.json();
    const validated = mitraSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: formatZodError(validated.error) },
        { status: 400 }
      );
    }

    const mitra = await prisma.mitraIndustri.create({
      data: validated.data,
    });

    return NextResponse.json(mitra, { status: 201 });
  } catch (error) {
    // Handle auth errors
    if (error instanceof NextResponse) {
      return error;
    }
    console.error("Error creating mitra:", error);
    return NextResponse.json({ error: "Failed to create mitra" }, { status: 500 });
  }
}