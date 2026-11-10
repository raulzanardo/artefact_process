import Link from "next/link";
import { TaskForm } from "../task-form";

export default function NewTaskPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-8 px-6 py-12">
      <header>
        <Link href="/" className="text-sm underline underline-offset-4">
          Back to tasks
        </Link>
        <h1 className="mt-4 text-3xl font-semibold">New task</h1>
      </header>
      <TaskForm />
    </main>
  );
}
