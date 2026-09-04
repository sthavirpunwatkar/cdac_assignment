"use client";

import { useState } from "react";
import { UploadZone } from "@/components/upload/UploadZone";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { SentimentOverview } from "@/components/dashboard/SentimentOverview";
import { ConversationSummary } from "@/components/dashboard/ConversationSummary";
import { EmotionChart } from "@/components/charts/EmotionChart";
import { SentimentTimeline } from "@/components/charts/SentimentTimeline";
import { TranscriptViewer } from "@/components/transcript/TranscriptViewer";
import { mockAnalysis } from "@/lib/mockData";
import { AlertTriangle, CheckCircle, Activity, Heart, RefreshCcw } from "lucide-react";

export default function DashboardPage() {
  const [hasData, setHasData] = useState(false);

  if (!hasData) {
    return (
      <div className="mx-auto max-w-3xl">
        <UploadZone onUploadComplete={() => setHasData(true)} />
      </div>
    );
  }

  // Derived mock chart data
  const emotionData = [
    { name: "frustration", value: mockAnalysis.customer.frustration || 0 },
    { name: "anger", value: 30 },
    { name: "relief", value: 20 },
    { name: "empathy", value: mockAnalysis.agent.empathy || 0 },
    { name: "professionalism", value: mockAnalysis.agent.professionalism || 0 },
  ];

  const timelineData = mockAnalysis.sentences.map((s, idx) => ({
    index: idx + 1,
    score: s.score,
    speaker: s.speaker,
  }));

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Conversation Intelligence</h1>
        <button 
          onClick={() => setHasData(false)}
          className="flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-600 shadow-sm border hover:bg-gray-50"
        >
          <RefreshCcw className="h-4 w-4" />
          Analyze New
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SentimentOverview 
          sentiment={mockAnalysis.overall_sentiment} 
          score={mockAnalysis.overall_score} 
        />
        <KpiCard 
          title="Resolution Status" 
          value="Escalated" 
          icon={<AlertTriangle className="h-5 w-5" />} 
          colorClass="text-orange-600"
          description="Requires manager attention"
        />
        <KpiCard 
          title="Conversation Quality" 
          value={`${mockAnalysis.conversation_quality}/100`} 
          icon={<Activity className="h-5 w-5" />} 
          colorClass="text-blue-600"
        />
        <KpiCard 
          title="Agent Empathy" 
          value={`${mockAnalysis.agent.empathy}/100`} 
          icon={<Heart className="h-5 w-5" />} 
          colorClass="text-pink-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ConversationSummary text={mockAnalysis.summary} />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="mb-6 font-semibold text-gray-900">Sentiment Timeline</h3>
          <SentimentTimeline data={timelineData} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-1">
          <h3 className="mb-6 font-semibold text-gray-900">Emotion Distribution</h3>
          <EmotionChart data={emotionData} />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="mb-6 font-semibold text-gray-900">Transcript Analysis</h3>
          <TranscriptViewer sentences={mockAnalysis.sentences} />
        </div>
      </div>
    </div>
  );
}
