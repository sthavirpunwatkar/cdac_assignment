import { FileText } from "lucide-react";

export function ConversationSummary({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-100 text-purple-600">
          <FileText className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">AI Summary</h2>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-gray-700">
        {text}
      </p>
    </div>
  );
}
