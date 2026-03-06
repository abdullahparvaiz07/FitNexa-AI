import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET /api/progress - Get progress entries for the logged-in user
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const progress = await prisma.progress.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
    take: 30, // Last 30 entries
  });

  return NextResponse.json(progress);
}

// POST /api/progress - Log a new progress entry
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { weight, bodyFat, notes } = body;

  if (weight === undefined) {
    return NextResponse.json({ error: "Missing required field: weight" }, { status: 400 });
  }

  const progressEntry = await prisma.progress.create({
    data: {
      weight: Number(weight),
      bodyFat: bodyFat !== undefined ? Number(bodyFat) : null,
      notes: notes || null,
      date: new Date(),
      userId: session.user.id,
    },
  });

  return NextResponse.json(progressEntry, { status: 201 });
}
