"use client";

import { useState } from "react";
import { UploadCloud, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function UploadZone({ onUploadComplete }: { onUploadComplete: () => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSimulatedUpload = () => {
    setLoading(true);
    // Simulate API + AI n8n delay
    setTimeout(() => {
      setLoading(false);
      onUploadComplete();
    }, 2000);
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-colors",
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white hover:bg-gray-50",
        loading && "opacity-50 pointer-events-none"
      )}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleSimulatedUpload();
      }}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
        <UploadCloud className="h-8 w-8" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">Upload Transcript</h3>
      <p className="mt-2 text-sm text-gray-500">
        Drag and drop your .txt conversation file here, or click to browse.
      </p>
      
      <button 
        onClick={handleSimulatedUpload}
        className="mt-6 flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        <FileText className="h-4 w-4" />
        {loading ? "Analyzing via AI..." : "Select .txt File"}
      </button>
    </div>
  );
}
