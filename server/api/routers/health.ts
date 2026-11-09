import { publicProcedure, router } from "@/server/api/trpc";

export const healthRouter = router({
  status: publicProcedure.query(() => ({ status: "ok" as const })),
});
