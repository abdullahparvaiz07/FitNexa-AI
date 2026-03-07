import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET /api/diet - Get diet logs for the logged-in user
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const diets = await prisma.diet.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
    take: 30, // Last 30 diet logs
  });

  return NextResponse.json(diets);
}

// POST /api/diet - Log a new diet record
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, description, calories, protein, carbs, fats, meals } = body;

  if (!name || calories === undefined || protein === undefined || carbs === undefined || fats === undefined) {
    return NextResponse.json({ error: "Missing required fields: name, calories, protein, carbs, fats" }, { status: 400 });
  }

  const diet = await prisma.diet.create({
    data: {
      name,
      description: description || "",
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fats: Number(fats),
      meals: meals || [],
      date: new Date(),
      userId: session.user.id,
    },
  });

  return NextResponse.json(diet, { status: 201 });
}
