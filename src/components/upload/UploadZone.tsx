"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileText, AlertCircle, Zap } from "lucide-react";
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

  const handleSample = async () => {
    setError(null);
    setLoading(true);
    setFilename("Sample_Conversation.txt");

    const sampleText = `Customer: Hello, I've been trying to log into my account for the last two days and it keeps saying "Invalid Password", but I know my password is correct. This is incredibly frustrating because I need to access my billing statements for my taxes!
Agent: Hello! I'm so sorry you're experiencing this issue. I completely understand how stressful that must be, especially during tax season. Let's get this sorted out right away. Can I have your account email?
Customer: Yes, it's testuser@example.com.
Agent: Thank you. I see the account here. It looks like our automated security system temporarily locked the account due to multiple login attempts from a new IP address. Have you been traveling recently or using a VPN?
Customer: Oh... yes, actually. I've been using a new VPN for work. Does that cause it to lock?
Agent: Yes, that can occasionally trigger our security protocols to protect your data. I have gone ahead and cleared the lock. I'm sending a secure password reset link to your email now. Once you reset it, you should be able to log in while using your VPN without any further issues.
Customer: Okay, I just got the email. Let me reset it now... Okay, I'm in! I see my billing statements. Thank you so much for the quick help.
Agent: You're very welcome! Is there anything else I can assist you with today?
Customer: No, that's everything. Have a great day!
Agent: You too! Thank you for contacting support.`;

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: sampleText }),
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-4">
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-solid border-blue-200 bg-blue-50/50 p-12 transition-all">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-6">
            <svg className="h-10 w-10 animate-pulse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a2 2 0 0 1 2 2c-.11.83.33 1.58 1.13 2.2a4 4 0 0 0 2.22 1.09c.81.16 1.45.75 1.57 1.56a2 2 0 0 1-1.08 2.22 4 4 0 0 0-2.09 2.24c-.16.82.42 1.59 1.25 1.76a2 2 0 0 1 1 3.51 4 4 0 0 0-1.87 2.45c-.17.81.42 1.58 1.25 1.75a2 2 0 0 1 1 3.51" />
              <path d="M12 22a2 2 0 0 1-2-2c.11-.83-.33-1.58-1.13-2.2a4 4 0 0 0-2.22-1.09c-.81-.16-1.45-.75-1.57-1.56a2 2 0 0 1 1.08-2.22 4 4 0 0 0 2.09-2.24c.16-.82-.42-1.59-1.25-1.76a2 2 0 0 1-1-3.51 4 4 0 0 0 1.87-2.45c.17-.81-.42-1.58-1.25-1.75a2 2 0 0 1-1-3.51" />
              <path d="M12 12a2 2 0 0 0-2-2" />
              <path d="M12 12a2 2 0 0 0 2 2" />
            </svg>
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 animate-pulse">Analyzing Conversation</h3>
          <p className="mt-3 text-sm text-gray-500 text-center max-w-sm flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            Processing semantics, extracting KPIs, and identifying sentiment shifts with AI...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-colors relative",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white hover:bg-gray-50"
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
        
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <FileText className="h-4 w-4" />
            Select .txt File
          </button>
          
          <button 
            onClick={handleSample}
            className="flex items-center gap-2 rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Zap className="h-4 w-4 text-blue-500" />
            Try Sample Conversation
          </button>
        </div>

        {filename && !error && (
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
