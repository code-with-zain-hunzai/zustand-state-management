"use client";
import { useTaskStore } from "@/lib/store";

export default function Task({
  id,
  title,
  description,
  status,
}: {
  id: string;
  title: string;
  description: string;
  status: string;
}) {
  const dragTask = useTaskStore((state) => state.dragTask);
  const removeTask = useTaskStore((state) => state.removeTask);

  const getBorderColor = () => {
    switch (status) {
      case "TODO":
        return "border-blue-500";
      case "IN_PROGRESS":
        return "border-yellow-500";
      case "IN_REVIEW":
        return "border-purple-500";
      case "DONE":
        return "border-green-500";
      default:
        return "border-gray-500";
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    dragTask(id);
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-sm mb-4 border-l-4 ${getBorderColor()} hover:shadow-md transition-shadow cursor-pointer`}
      draggable
      onDragStart={handleDragStart}
    >
      <div className="flex justify-end">
        <button
          className="text-red-500 hover:text-red-700 transition-colors"
          onClick={() => removeTask(id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
      <div className="flex justify-between items-center mt-3">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            status === "TODO"
              ? "bg-blue-100 text-blue-800"
              : status === "IN_PROGRESS"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {status.replace("_", " ")}
        </span>
      </div>
    </div>
  );
}
