import { NextResponse } from "next/server";
import { mockAnalysis } from "@/lib/mockData";

export async function POST(request: Request) {
  try {
    const { transcript } = await request.json();

    if (!transcript || typeof transcript !== "string") {
      return NextResponse.json(
        { success: false, error: "Valid transcript text is required." },
        { status: 400 }
      );
    }

    if (transcript.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Transcript cannot be empty." },
        { status: 400 }
      );
    }

    // Phase 6 will replace this delay and mock return with an actual call to n8n
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json({
      success: true,
      data: mockAnalysis
    });
  } catch (error) {
    console.error("API Analyze Error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during analysis." },
      { status: 500 }
    );
  }
}
