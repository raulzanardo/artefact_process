import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTask,
  getTaskById,
  listTasks,
  removeTask,
  updateTask,
} from "@/server/api/tasks-store";
import { publicProcedure, router } from "@/server/api/trpc";

const taskFields = z.object({
  titulo: z
    .string()
    .trim()
    .min(1, "A task title is required.")
    .max(120, "The title must be 120 characters or fewer."),
  descricao: z
    .string()
    .trim()
    .max(2000, "The description must be 2000 characters or fewer.")
    .optional(),
});

const notFoundError = () =>
  new TRPCError({
    code: "NOT_FOUND",
    message: "Task not found.",
  });

export const tasksRouter = router({
  list: publicProcedure.query(() => listTasks()),

  byId: publicProcedure
    .input(z.string().uuid("Invalid task ID."))
    .query(({ input }) => {
      const task = getTaskById(input);

      if (!task) {
        throw notFoundError();
      }

      return task;
    }),

  create: publicProcedure.input(taskFields).mutation(({ input }) =>
    createTask({
      titulo: input.titulo,
      descricao: input.descricao,
    }),
  ),

  update: publicProcedure
    .input(taskFields.extend({ id: z.string().uuid() }))
    .mutation(({ input }) => {
      const task = updateTask(input.id, {
        titulo: input.titulo,
        descricao: input.descricao,
      });

      if (!task) {
        throw notFoundError();
      }

      return task;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(({ input }) => {
      if (!removeTask(input.id)) {
        throw notFoundError();
      }

      return { id: input.id };
    }),
});
