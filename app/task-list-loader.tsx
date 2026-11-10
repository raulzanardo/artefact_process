import { connection } from "next/server";
import { appRouter } from "@/server/api/root";
import { TaskList } from "./task-list";

export async function TaskListLoader() {
  await connection();
  const initialTasks = await appRouter.createCaller({}).tasks.list();

  return <TaskList initialTasks={initialTasks} />;
}
