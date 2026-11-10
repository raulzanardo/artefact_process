"use client";

import Link from "next/link";
import { useState } from "react";
import { trpc } from "@/trpc/react";
import type { Task } from "@/server/api/tasks-store";

export function TaskList({ initialTasks }: { initialTasks: Task[] }) {
  const [successMessage, setSuccessMessage] = useState("");
  const utils = trpc.useUtils();
  const tasksQuery = trpc.tasks.list.useQuery(undefined, {
    initialData: initialTasks,
  });
  const deleteTask = trpc.tasks.delete.useMutation({
    onSuccess: async () => {
      setSuccessMessage("Task deleted.");
      await utils.tasks.list.invalidate();
    },
  });

  if (tasksQuery.isPending) {
    return <p role="status">Loading tasks...</p>;
  }

  if (tasksQuery.error && !tasksQuery.data) {
    return (
      <p role="alert">
        Could not load tasks: {tasksQuery.error.message}
      </p>
    );
  }

  return (
    <section aria-label="Task list" className="flex flex-col gap-4">
      {deleteTask.error && (
        <p role="alert">Could not delete task: {deleteTask.error.message}</p>
      )}
      {successMessage && <p role="status">{successMessage}</p>}

      {tasksQuery.data.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-600">
          You have no tasks yet. Create one to get started.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {tasksQuery.data.map((task) => (
            <li
              key={task.id}
              className="flex flex-wrap items-start justify-between gap-4 rounded-lg border border-zinc-200 p-4"
            >
              <div className="min-w-0 flex-1">
                <h2 className="break-words font-medium">{task.titulo}</h2>
                {task.descricao && (
                  <p className="mt-1 whitespace-pre-wrap break-words text-sm text-zinc-600">
                    {task.descricao}
                  </p>
                )}
                <time
                  className="mt-2 block text-xs text-zinc-500"
                  dateTime={new Date(task.dataCriacao).toISOString()}
                >
                  Created{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "short",
                    timeStyle: "short",
                    timeZone: "UTC",
                  }).format(task.dataCriacao)}
                </time>
              </div>
              <div className="flex shrink-0 gap-3">
                <Link
                  href={`/tasks/${task.id}/edit`}
                  className="text-sm font-medium underline underline-offset-4"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  disabled={deleteTask.isPending}
                  onClick={() => {
                    setSuccessMessage("");
                    deleteTask.mutate({ id: task.id });
                  }}
                  className="text-sm font-medium text-red-700 underline underline-offset-4 disabled:opacity-50"
                >
                  {deleteTask.isPending && deleteTask.variables?.id === task.id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
