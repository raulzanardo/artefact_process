import { healthRouter } from "@/server/api/routers/health";
import { router } from "@/server/api/trpc";

export const appRouter = router({
  health: healthRouter,
});

export type AppRouter = typeof appRouter;
