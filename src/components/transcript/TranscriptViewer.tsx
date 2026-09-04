import { SentenceAnalysis } from "@/types/analysis";
import { cn } from "@/lib/utils";
import { User, HeadphonesIcon } from "lucide-react";

const sentimentColors = {
  positive: "bg-green-50 text-green-700 border-green-200",
  negative: "bg-red-50 text-red-700 border-red-200",
  neutral: "bg-gray-50 text-gray-700 border-gray-200",
};

export function TranscriptViewer({ sentences }: { sentences: SentenceAnalysis[] }) {
  return (
    <div className="space-y-4">
      {sentences.map((sentence, index) => (
        <div 
          key={index} 
          className={cn(
            "flex gap-4 rounded-lg border p-4",
            sentimentColors[sentence.sentiment]
          )}
        >
          <div className="flex-shrink-0">
            {sentence.speaker === 'customer' ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <User className="h-4 w-4" />
              </div>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                <HeadphonesIcon className="h-4 w-4" />
              </div>
            )}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold capitalize text-gray-900">{sentence.speaker}</span>
              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="rounded-full bg-white px-2 py-1 shadow-sm opacity-80">
                  {sentence.emotion}
                </span>
                <span className="rounded-full bg-white px-2 py-1 shadow-sm opacity-80">
                  Score: {sentence.score}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-800">{sentence.text}</p>
            {sentence.reason && (
              <p className="mt-2 text-xs italic text-gray-500">
                AI Reasoning: {sentence.reason}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
