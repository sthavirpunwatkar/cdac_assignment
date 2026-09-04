"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

const emotionToEmoji: Record<string, string> = {
  frustration: "😠",
  anger: "😡",
  empathy: "🤝",
  professionalism: "💼",
  relief: "😌",
  neutral: "😐",
  satisfaction: "😊",
  confusion: "😕",
  helpful: "🛠️",
  courteous: "🎩",
  informative: "ℹ️"
};

const getEmoji = (emotion: string) => {
  const key = emotion.toLowerCase();
  return emotionToEmoji[key] || "💬"; // fallback
};

const CustomizedDot = (props: any) => {
  const { cx, cy, payload } = props;
  const emoji = getEmoji(payload.emotion || "");

  return (
    <text 
      x={cx} 
      y={cy} 
      dy={4} 
      textAnchor="middle" 
      fontSize="16"
    >
      {emoji}
    </text>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-white p-4 shadow-md max-w-xs">
        <p className="font-semibold text-gray-900 mb-1">Sentence {label}</p>
        <p className="text-sm text-gray-700"><span className="font-medium">Score:</span> {data.score}</p>
        <p className="text-sm text-gray-700 capitalize"><span className="font-medium">Emotion:</span> {data.emotion}</p>
        {data.suggestion && data.suggestion !== "None" && data.suggestion !== "N/A" && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">AI Suggestion</p>
            <p className="text-sm text-gray-600">{data.suggestion}</p>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export function SentimentTimeline({ data }: { data: { index: number; score: number; speaker: string; emotion?: string; suggestion?: string }[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const chartContent = (
    <>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors z-10"
        title={isExpanded ? "Minimize" : "Expand"}
      >
        {isExpanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
      </button>
      <div className={cn("w-full transition-all duration-300", isExpanded ? "h-[80vh]" : "h-[300px]")}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
            <XAxis dataKey="index" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis domain={[-1, 1]} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <ReferenceLine y={0} stroke="#e5e7eb" />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={<CustomizedDot />}
              activeDot={{ r: 8, strokeWidth: 0, fill: "#3b82f6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );

  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm">
        <div className="relative w-full max-w-5xl rounded-xl bg-white p-6 shadow-2xl">
          <h3 className="mb-4 text-xl font-bold text-gray-900">Sentiment Timeline</h3>
          {chartContent}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {chartContent}
    </div>
  );
}
