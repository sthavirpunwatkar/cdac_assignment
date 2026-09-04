import { ReactNode } from "react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Activity } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold text-gray-900">
              AI Sentiment Analyzer
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-gray-500 sm:inline-block">
              Logged in as User
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
