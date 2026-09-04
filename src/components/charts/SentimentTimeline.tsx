"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

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

export function SentimentTimeline({ data }: { data: { index: number; score: number; speaker: string; emotion?: string }[] }) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
          <XAxis dataKey="index" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis domain={[-1, 1]} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <ReferenceLine y={0} stroke="#e5e7eb" />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelFormatter={(label) => `Sentence ${label}`}
          />
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
  );
}
