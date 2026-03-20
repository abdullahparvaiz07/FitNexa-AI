import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { prompt, history } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Initialize the model with the 'FitNexa AI Coach' persona
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are an expert 'FitNexa AI Fitness & Nutrition Coach'. Provide encouraging, safe, and highly professional fitness, health, and nutrition advice. Keep your responses concise, actionable, and engaging. Adopt a supportive, motivational coaching tone. Under no circumstances should you give medical advice; advise consulting a doctor for medical issues.",
    });

    // Format history from the frontend to Gemini's expected format
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Start a chat session with history
    const chat = model.startChat({
      history: formattedHistory,
    });

    // Send the latest user prompt
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("FitNexa AI Coach Error:", error);
    return NextResponse.json(
      { error: "Oops! Your AI Coach encountered a problem analyzing this request." },
      { status: 500 }
    );
  }
}
