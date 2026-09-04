"use client";

import { useState } from "react";
import { UploadZone } from "@/components/upload/UploadZone";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { SentimentOverview } from "@/components/dashboard/SentimentOverview";
import { ConversationSummary } from "@/components/dashboard/ConversationSummary";
import { EmotionChart } from "@/components/charts/EmotionChart";
import { SentimentTimeline } from "@/components/charts/SentimentTimeline";
import { TranscriptViewer } from "@/components/transcript/TranscriptViewer";
import { ConversationAnalysis } from "@/types/analysis";
import { AlertTriangle, Activity, Heart, RefreshCcw } from "lucide-react";

export default function DashboardPage() {
  const [analysisData, setAnalysisData] = useState<ConversationAnalysis | null>(null);

  if (!analysisData) {
    return (
      <div className="mx-auto max-w-3xl pt-12">
        <UploadZone onUploadComplete={(data) => setAnalysisData(data)} />
      </div>
    );
  }

  // Derived chart data
  const emotionData = [
    { name: "frustration", value: analysisData.customer.frustration || 0 },
    { name: "anger", value: 30 }, // In a real app, this would be grouped from sentence emotions
    { name: "relief", value: 20 },
    { name: "empathy", value: analysisData.agent.empathy || 0 },
    { name: "professionalism", value: analysisData.agent.professionalism || 0 },
  ];

  const timelineData = analysisData.sentences.map((s, idx) => ({
    index: idx + 1,
    score: s.score,
    speaker: s.speaker,
    emotion: s.emotion,
  }));

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Conversation Intelligence</h1>
        <button 
          onClick={() => setAnalysisData(null)}
          className="flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-600 shadow-sm border hover:bg-gray-50"
        >
          <RefreshCcw className="h-4 w-4" />
          Analyze New
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SentimentOverview 
          sentiment={analysisData.overall_sentiment} 
          score={analysisData.overall_score} 
        />
        <KpiCard 
          title="Resolution Status" 
          value={analysisData.resolution_status} 
          icon={<AlertTriangle className="h-5 w-5" />} 
          colorClass={analysisData.resolution_status === 'resolved' ? 'text-green-600' : 'text-orange-600'}
          description={`Escalation Risk: ${analysisData.escalation_risk}`}
        />
        <KpiCard 
          title="Conversation Quality" 
          value={`${analysisData.conversation_quality}/100`} 
          icon={<Activity className="h-5 w-5" />} 
          colorClass="text-blue-600"
        />
        <KpiCard 
          title="Agent Empathy" 
          value={`${analysisData.agent.empathy}/100`} 
          icon={<Heart className="h-5 w-5" />} 
          colorClass="text-pink-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ConversationSummary text={analysisData.summary} />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="mb-6 font-semibold text-gray-900">Sentiment Timeline</h3>
          <SentimentTimeline data={timelineData} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-1 self-start sticky top-6">
          <h3 className="mb-6 font-semibold text-gray-900">Emotion Distribution</h3>
          <EmotionChart data={emotionData} />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="mb-6 font-semibold text-gray-900">Transcript Analysis</h3>
          <TranscriptViewer sentences={analysisData.sentences} />
        </div>
      </div>
    </div>
  );
}
