import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  trend?: "up" | "down" | "neutral";
  colorClass?: string;
}

export function KpiCard({ title, value, icon, description, trend, colorClass }: KpiCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon && <div className={cn("text-gray-400", colorClass)}>{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <p className={cn("text-3xl font-semibold text-gray-900", colorClass)}>{value}</p>
      </div>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
