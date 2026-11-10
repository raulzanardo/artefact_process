import Link from "next/link";
import { Suspense } from "react";
import { TaskListLoader } from "./task-list-loader";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">My Tasks</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Organize your tasks in one place.
          </p>
        </div>
        <Link
          href="/tasks/new"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          New task
        </Link>
      </header>

      <Suspense fallback={<p role="status">Loading tasks...</p>}>
        <TaskListLoader />
      </Suspense>
    </main>
  );
}
