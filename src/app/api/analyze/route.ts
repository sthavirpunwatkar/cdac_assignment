import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { mockAnalysis } from "@/lib/mockData";

export const maxDuration = 60; // Allow function to run up to 60 seconds on Vercel

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY || '',
});

const analysisSchema = z.object({
  overall_sentiment: z.enum(["positive", "negative", "neutral"]),
  overall_score: z.number().describe("Score between -1.0 and 1.0"),
  summary: z.string().describe("A concise 2-3 sentence summary of the conversation"),
  dominant_emotion: z.string().describe("The primary emotion expressed in the conversation, e.g. frustration, relief, anger, empathy"),
  resolution_status: z.enum(["resolved", "partially_resolved", "unresolved", "escalated"]),
  escalation_risk: z.enum(["low", "medium", "high"]),
  conversation_quality: z.number().describe("Score from 0 to 100 representing overall interaction quality"),
  customer: z.object({
    sentiment: z.enum(["positive", "negative", "neutral"]),
    frustration: z.number().describe("0 to 100"),
    satisfaction: z.number().describe("0 to 100"),
  }),
  agent: z.object({
    sentiment: z.enum(["positive", "negative", "neutral"]),
    empathy: z.number().describe("0 to 100"),
    professionalism: z.number().describe("0 to 100"),
  }),
  sentences: z.array(z.object({
    speaker: z.enum(["customer", "agent"]),
    text: z.string(),
    sentiment: z.enum(["positive", "negative", "neutral"]),
    score: z.number().describe("-1.0 to 1.0"),
    emotion: z.string(),
    reason: z.string().describe("AI reasoning for this classification")
  }))
});

export async function POST(request: Request) {
  try {
    const { transcript } = await request.json();

    if (!transcript || typeof transcript !== "string" || transcript.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Valid transcript text is required." },
        { status: 400 }
      );
    }

    // Check if API key is present
    if (!process.env.GROQ_API_KEY) {
      console.warn("GROQ_API_KEY is not set. Falling back to mock data for UI testing.");
      await new Promise(resolve => setTimeout(resolve, 2000));
      return NextResponse.json({ success: true, data: mockAnalysis });
    }

    const { object } = await generateObject({
      model: groq('openai/gpt-oss-120b'),
      schema: analysisSchema,
      prompt: `You are an expert Conversation Intelligence AI. Analyze the following customer service transcript and extract the requested KPIs, sentiments, and summary.
      
Transcript:
"""
${transcript}
"""`,
    });

    return NextResponse.json({
      success: true,
      data: object
    });

  } catch (error: any) {
    console.error("API Analyze Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "An unexpected error occurred during AI analysis." },
      { status: 500 }
    );
  }
}
