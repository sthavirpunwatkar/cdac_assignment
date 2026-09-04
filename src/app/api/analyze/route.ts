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

    // Connect to n8n if the webhook URL is provided in the environment
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (n8nWebhookUrl) {
      const response = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Optional: Add authentication header for n8n if configured
          // "Authorization": `Bearer ${process.env.N8N_WEBHOOK_SECRET}`
        },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) {
        throw new Error(`n8n responded with status: ${response.status}`);
      }

      const aiData = await response.json();
      
      return NextResponse.json({
        success: true,
        data: aiData
      });
    }

    // Fallback for development if n8n is not yet configured
    console.warn("N8N_WEBHOOK_URL is not set. Falling back to mock data.");
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
