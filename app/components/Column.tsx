"use client";
import { Status, useTaskStore } from "@/lib/store";
import Task from "./Task";
import { useEffect, useMemo, useState } from "react";
import ColumnSkeleton from "./ColumnSkeleton";

export default function Column({
  title,
  status,
}: {
  title: string;
  status: Status;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const tasks = useTaskStore((state) => state.tasks);
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => task.status === status);
  }, [tasks, status]);

  const updateTask = useTaskStore((state) => state.updateTask);
  const draggedTask = useTaskStore((state) => state.draggedTaskId);
  const dragTask = useTaskStore((state) => state.dragTask);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      useTaskStore.persist.rehydrate();
      setIsLoaded(true);
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggedTask) return;
    updateTask(draggedTask, status);
    dragTask(null);
    setIsOver(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const getColumnStyle = () => {
    switch (status) {
      case "TODO":
        return "bg-gradient-to-br from-[#1e293b] to-[#334155] border-slate-600";
      case "IN_PROGRESS":
        return "bg-gradient-to-br from-[#3b2f2f] to-[#5c4033] border-yellow-700";
      case "IN_REVIEW":
        return "bg-gradient-to-br from-[#4c1d95] to-[#6b21a8] border-purple-700";
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
      case "IN_REVIEW":
        return "bg-gradient-to-r from-[#6b21a8] to-[#9333ea] text-white";
      case "DONE":
        return "bg-gradient-to-r from-emerald-800 to-emerald-600 text-white";
      default:
        return "bg-gradient-to-r from-gray-700 to-gray-600 text-white";
    }
  };

  if (!isLoaded) {
    return <ColumnSkeleton status={status} />;
  }

  return (
    <div
      className={`flex flex-col rounded-xl p-4 w-full md:w-1/3 h-[80vh] transition-all duration-200 border-2 shadow-lg ${
        isOver ? "bg-blue-800/30 border-dashed" : `${getColumnStyle()}`
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div
        className={`flex items-center justify-between mb-4 px-3 py-2 rounded-lg shadow-sm ${getHeaderStyle()}`}
      >
        <h2 className="text-xl font-semibold tracking-wide">{title}</h2>
        <span className="bg-white text-gray-800 rounded-full px-3 py-1 text-sm font-medium shadow">
          {filteredTasks.length}
        </span>
      </div>

      <div className="overflow-y-auto flex-grow space-y-3 p-1">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <Task key={task.id} {...task} />)
        ) : (
          <div className="bg-white/10 p-4 rounded-lg border border-dashed border-gray-400 text-gray-300 text-center mt-2">
            No tasks yet
          </div>
        )}
      </div>
    </div>
  );
}
