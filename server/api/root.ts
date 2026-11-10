import { healthRouter } from "@/server/api/routers/health";
import { tasksRouter } from "@/server/api/routers/tasks";
import { router } from "@/server/api/trpc";

export const appRouter = router({
  health: healthRouter,
  tasks: tasksRouter,
});

export type AppRouter = typeof appRouter;
