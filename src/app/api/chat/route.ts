import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let prompt = body.prompt;
    let history = body.history || [];

    // Support for Next.js AI SDK or older 'messages' format
    if (!prompt && body.messages && Array.isArray(body.messages) && body.messages.length > 0) {
      const messages = body.messages;
      prompt = messages[messages.length - 1].content;
      history = messages.slice(0, -1).map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        content: m.content
      }));
    }

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Fallback to 'gemini-pro' (1.0) which is universally supported on all API keys
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    const SYSTEM_PROMPT = "SYSTEM INSTRUCTION: You are an expert 'FitNexa AI Fitness & Nutrition Coach'. Provide encouraging, safe, and highly professional fitness, health, and nutrition advice. Keep your responses concise, actionable, and engaging. Adopt a supportive, motivational coaching tone. Under no circumstances should you give medical advice; advise consulting a doctor for medical issues.\n\n--- User Message ---\n";

    // Format history from the frontend to Gemini's expected format
    let formattedHistory = history.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content || msg.parts }],
    }));

    // Gemini strictly requires the first message in history to be from the 'user'
    while (formattedHistory.length > 0 && formattedHistory[0].role === "model") {
      formattedHistory.shift();
    }

    // Inject the System Prompt into the very first message
    if (formattedHistory.length === 0) {
      prompt = SYSTEM_PROMPT + prompt;
    } else {
      formattedHistory[0].parts[0].text = SYSTEM_PROMPT + formattedHistory[0].parts[0].text;
    }

    // Start a chat session with history
    const chat = model.startChat({
      history: formattedHistory,
    });

    // Send the latest user prompt
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    // Return in both formats to heavily assure compatibility with all pages
    return NextResponse.json({ 
      text: text,
      role: "assistant",
      content: text
    });
  } catch (error) {
    console.error("FitNexa AI Coach Error:", error);
    return NextResponse.json(
      { error: "Oops! Your AI Coach encountered a problem analyzing this request." },
      { status: 500 }
    );
  }
}
