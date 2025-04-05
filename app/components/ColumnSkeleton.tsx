"use client";
import { Status } from "@/lib/store";

export default function ColumnSkeleton({ status }: { status: Status }) {
  const getColumnStyle = () => {
    switch (status) {
      case "TODO":
        return "bg-gradient-to-br from-[#1e293b] to-[#334155] border-slate-600";
      case "IN_PROGRESS":
        return "bg-gradient-to-br from-[#3b2f2f] to-[#5c4033] border-yellow-700";
      case "DONE":
        return "bg-gradient-to-br from-[#1f4037] to-[#99f2c8] border-emerald-700";
      default:
        return "bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600";
    }
  };

  const getHeaderStyle = () => {
    switch (status) {
      case "TODO":
        return "bg-gradient-to-r from-indigo-800 to-indigo-600 text-white";
      case "IN_PROGRESS":
        return "bg-gradient-to-r from-yellow-800 to-amber-700 text-white";
      case "DONE":
        return "bg-gradient-to-r from-emerald-800 to-emerald-600 text-white";
      default:
        return "bg-gradient-to-r from-gray-700 to-gray-600 text-white";
    }
  };

  return (
    <div
      className={`flex flex-col rounded-xl p-4 w-full md:w-1/3 h-[80vh] border-2 shadow-xl ${getColumnStyle()}`}
    >
      <div className={`flex items-center justify-between mb-4 px-3 py-2 rounded-lg shadow-sm ${getHeaderStyle()}`}>
        <div className="h-6 bg-gray-400/50 rounded w-24 animate-pulse"></div>
        <div className="h-6 bg-gray-400/50 rounded-full w-8 animate-pulse"></div>
      </div>

      {/* Task Skeleton */}
      <div className="space-y-3">
        <div className="bg-gray-400/30 p-4 rounded-lg animate-pulse"></div>
        <div className="bg-gray-400/30 p-4 rounded-lg animate-pulse"></div>
        <div className="bg-gray-400/30 p-4 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}
