"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileText, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConversationAnalysis } from "@/types/analysis";

interface UploadZoneProps {
  onUploadComplete: (data: ConversationAnalysis) => void;
}

export function UploadZone({ onUploadComplete }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setError(null);
    setFilename(file.name);

    if (file.type !== "text/plain" && !file.name.endsWith(".txt")) {
      setError("Only .txt files are supported.");
      return;
    }

    if (file.size === 0) {
      setError("The selected file is empty.");
      return;
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      return;
    }

    setLoading(true);

    try {
      const text = await file.text();
      
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: text }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to analyze transcript.");
      }

      onUploadComplete(result.data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-colors relative",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white hover:bg-gray-50",
          loading && "opacity-75 pointer-events-none"
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <UploadCloud className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">Upload Transcript</h3>
        <p className="mt-2 text-sm text-gray-500 text-center max-w-sm">
          Drag and drop your .txt conversation file here, or click to browse. Max size 5MB.
        </p>
        
        <input 
          type="file" 
          accept=".txt,text/plain" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleChange}
        />
        
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="mt-6 flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400"
        >
          <FileText className="h-4 w-4" />
          {loading ? "Analyzing via AI..." : "Select .txt File"}
        </button>

        {filename && !error && !loading && (
          <p className="mt-4 text-xs font-medium text-gray-500">Selected: {filename}</p>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-md bg-red-50 p-4 text-sm text-red-700 border border-red-200">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
