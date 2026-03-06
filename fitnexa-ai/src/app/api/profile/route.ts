import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET /api/profile - Get the logged-in user's profile
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      age: true,
      gender: true,
      weight: true,
      height: true,
      fitnessGoal: true,
      activityLevel: true,
      equipment: true,
      createdAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// PATCH /api/profile - Update the logged-in user's profile
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, age, gender, weight, height, fitnessGoal, activityLevel, equipment } = body;

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...(name !== undefined && { name }),
      ...(age !== undefined && { age: Number(age) }),
      ...(gender !== undefined && { gender }),
      ...(weight !== undefined && { weight: Number(weight) }),
      ...(height !== undefined && { height: Number(height) }),
      ...(fitnessGoal !== undefined && { fitnessGoal }),
      ...(activityLevel !== undefined && { activityLevel }),
      ...(equipment !== undefined && { equipment }),
    },
    select: {
      id: true, name: true, email: true, image: true, role: true,
      age: true, gender: true, weight: true, height: true,
      fitnessGoal: true, activityLevel: true, equipment: true,
    },
  });

  return NextResponse.json(user);
}
