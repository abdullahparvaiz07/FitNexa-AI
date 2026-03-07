import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET /api/workouts - Get all workouts for the logged-in user
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const workouts = await prisma.workout.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(workouts);
}

// POST /api/workouts - Create a new workout (Log a completed workout)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, description, duration, type, exercises } = body;

  if (!name || !duration || !type) {
    return NextResponse.json({ error: "Missing required fields: name, duration, type" }, { status: 400 });
  }

  const workout = await prisma.workout.create({
    data: {
      name,
      description: description || "",
      duration: Number(duration),
      type,
      exercises: exercises || [],
      isCompleted: true,
      completedAt: new Date(),
      userId: session.user.id,
    },
  });

  return NextResponse.json(workout, { status: 201 });
}
