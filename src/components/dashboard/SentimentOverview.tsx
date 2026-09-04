import { cn } from "@/lib/utils";
import { Smile, Frown, Meh } from "lucide-react";

export function SentimentOverview({ sentiment, score }: { sentiment: string; score: number }) {
  let icon = <Meh className="h-8 w-8" />;
  let color = "text-gray-500 bg-gray-100";
  
  if (sentiment === "positive") {
    icon = <Smile className="h-8 w-8" />;
    color = "text-green-600 bg-green-100";
  } else if (sentiment === "negative") {
    icon = <Frown className="h-8 w-8" />;
    color = "text-red-600 bg-red-100";
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-sm font-medium text-gray-500">Overall Sentiment</h3>
      <div className={cn("mt-4 flex h-16 w-16 items-center justify-center rounded-full", color)}>
        {icon}
      </div>
      <p className="mt-4 text-xl font-bold capitalize text-gray-900">{sentiment}</p>
      <p className="mt-1 text-sm text-gray-500">Score: {score}</p>
    </div>
  );
}
