import { randomUUID } from "node:crypto";

export type Task = {
  id: string;
  titulo: string;
  descricao?: string;
  dataCriacao: number;
};

const globalForTaskStore = globalThis as typeof globalThis & {
  taskStore?: Task[];
};
const tasks = (globalForTaskStore.taskStore ??= []);

export function listTasks() {
  return [...tasks].sort((first, second) => second.dataCriacao - first.dataCriacao);
}

export function getTaskById(id: string) {
  return tasks.find((task) => task.id === id);
}

export function createTask(input: Pick<Task, "titulo" | "descricao">) {
  const task: Task = {
    id: randomUUID(),
    titulo: input.titulo,
    descricao: input.descricao || undefined,
    dataCriacao: Date.now(),
  };

  tasks.push(task);
  return task;
}

export function updateTask(
  id: string,
  input: Pick<Task, "titulo" | "descricao">,
) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return undefined;
  }

  const updatedTask: Task = {
    ...tasks[index],
    titulo: input.titulo,
    descricao: input.descricao || undefined,
  };

  tasks[index] = updatedTask;
  return updatedTask;
}

export function removeTask(id: string) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);
  return true;
}
