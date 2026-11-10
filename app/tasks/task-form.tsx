"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { trpc } from "@/trpc/react";
import type { Task } from "@/server/api/tasks-store";

export function TaskForm({ task }: { task?: Task }) {
  const router = useRouter();
  const [titulo, setTitulo] = useState(task?.titulo ?? "");
  const [descricao, setDescricao] = useState(task?.descricao ?? "");
  const [errorMessage, setErrorMessage] = useState("");
  const createTask = trpc.tasks.create.useMutation();
  const updateTask = trpc.tasks.update.useMutation();
  const isPending = createTask.isPending || updateTask.isPending;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const normalizedTitle = titulo.trim();
    if (!normalizedTitle) {
      setErrorMessage("A task title is required.");
      return;
    }

    const input = {
      titulo: normalizedTitle,
      descricao: descricao.trim() || undefined,
    };

    try {
      if (task) {
        await updateTask.mutateAsync({ id: task.id, ...input });
      } else {
        await createTask.mutateAsync(input);
        setTitulo("");
        setDescricao("");
      }

      router.push("/");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Could not save the task.",
      );
    }
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
    >
      <label className="flex flex-col gap-2 text-sm font-medium">
        Title
        <input
          required
          maxLength={120}
          autoComplete="off"
          name="task-title"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2 font-normal"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium">
        Description{" "}
        <span className="font-normal text-zinc-500">(optional)</span>
        <textarea
          maxLength={2000}
          rows={5}
          autoComplete="off"
          name="task-description"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
          className="resize-y rounded-md border border-zinc-300 px-3 py-2 font-normal"
        />
      </label>

      {errorMessage && <p role="alert">{errorMessage}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
      >
        {isPending ? "Saving..." : task ? "Save changes" : "Create task"}
      </button>
    </form>
  );
}
