import { TRPCError } from "@trpc/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { appRouter } from "@/server/api/root";
import { TaskForm } from "../../task-form";

export default function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-8 px-6 py-12">
      <header>
        <Link href="/" className="text-sm underline underline-offset-4">
          Back to tasks
        </Link>
        <h1 className="mt-4 text-3xl font-semibold">Edit task</h1>
      </header>
      <Suspense fallback={<p role="status">Carregando tarefa...</p>}>
        <TaskEditLoader params={params} />
      </Suspense>
    </main>
  );
}

async function TaskEditLoader({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let task;

  try {
    task = await appRouter.createCaller({}).tasks.byId(id);
  } catch (error) {
    if (
      error instanceof TRPCError &&
      (error.code === "NOT_FOUND" || error.code === "BAD_REQUEST")
    ) {
      notFound();
    }

    throw error;
  }

  return <TaskForm key={task.id} task={task} />;
}
