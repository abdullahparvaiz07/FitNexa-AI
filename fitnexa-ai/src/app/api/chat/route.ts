import OpenAI from "openai";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const history = await prisma.chatHistory.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "asc" },
    });

    // Map DB schema to expected frontend format
    const formattedHistory = history.map((msg: any) => ({
      id: msg.id,
      role: msg.role as 'user' | 'assistant' | 'system',
      content: msg.content
    }));

    return NextResponse.json(formattedHistory);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return NextResponse.json({ error: "Failed to fetch chat history" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const latestUserMessage = messages[messages.length - 1];

    if (latestUserMessage.role === "user") {
      // Save user message to database
      await prisma.chatHistory.create({
        data: {
          role: "user",
          content: latestUserMessage.content,
          userId: session.user.id,
        }
      });
    }

    const systemPrompt = {
      role: "system",
      content: `You are Coach Nexa, a highly knowledgeable and encouraging AI Fitness Specialist. 
Your goal is to provide evidence-based, practical, and highly personalized fitness, nutrition, and recovery advice.
Always be supportive but direct. Use simple, easily digestible formatting like bullet points when appropriate.
Tone: Energetic, professional, and slightly futuristic.

When asked about macros, exercises, or recovery, provide specific numbers and actionable steps.`
    };

    // Filter messages to only include role and content for the OpenAI API
    const formattedMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.content
    }));

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [systemPrompt, ...formattedMessages],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiContent = completion.choices[0].message.content || "";

    // Save AI response to database
    await prisma.chatHistory.create({
      data: {
        role: "assistant",
        content: aiContent,
        userId: session.user.id,
      }
    });

    return NextResponse.json({ 
      role: "assistant", 
      content: aiContent
    }, { status: 200 });

  } catch (error: any) {
    console.error("AI Coach Error (Fallback to Demomode):", error);
    
    // DEMO MODE MOCK RESPONSES:
    const mockResponses = [
      "That's an excellent point! For optimal results, ensure you're balancing your macronutrients: 30% protein, 40% complex carbs, and 30% healthy fats. Keep up the great work!",
      "Consistency is key! Make sure you are getting at least 7-8 hours of sleep for proper muscle recovery, and don't forget to stretch after your workouts.",
      "I recommend incorporating some HIIT (High-Intensity Interval Training) twice a week to boost your cardiovascular endurance while maintaining your hard-earned muscle mass.",
      "Great job staying active! Remember to stay hydrated—aim for at least 3-4 liters of water a day, especially on heavy training days.",
      "Form over weight, always! If you feel any sharp pain, stop immediately. Focus on full range of motion and core bracing to prevent injuries."
    ];
    
    const fallbackContent = "*(Demo Mode - OpenAI API Quota Exceeded)*\n\n" + mockResponses[Math.floor(Math.random() * mockResponses.length)];
    
    try {
      // Save the mock AI response to database
      await prisma.chatHistory.create({
        data: {
          role: "assistant",
          content: fallbackContent,
          userId: session.user.id,
        }
      });
      
      return NextResponse.json({ 
        role: "assistant", 
        content: fallbackContent
      }, { status: 200 });
      
    } catch (dbError) {
      console.error("Failed to save mock response:", dbError);
      return NextResponse.json({ error: "Oops! I’m having trouble thinking right now. Please try again." }, { status: 500 });
    }
  }
}

