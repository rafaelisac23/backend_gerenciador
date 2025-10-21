import { prisma } from "../libs/prisma";
import { alterTaskSchemaType, createTaskSchemaType } from "../types/task";

export const getTasks = async (page: number, id: number) => {
  const perPage = 10;

  if (page <= 0) return [];

  return await prisma.task.findMany({
    where: { userId: id },
    take: perPage,
    skip: (page - 1) * perPage,
  });
};

export const getCountTask = async (id: number) => {
  return await prisma.task.count({
    where: { userId: id },
  });
};

export const getCountConcludeTask = async (id: number) => {
  return await prisma.task.count({
    where: { userId: id, completed: true },
  });
};

export const getCountNotConcludeTask = async (id: number) => {
  return await prisma.task.count({
    where: { userId: id, completed: false },
  });
};

export const getTaskById = async (id: number) => {
  return await prisma.task.findUnique({ where: { id } });
};

export const createTask = async (data: createTaskSchemaType, id: number) => {
  return await prisma.task.create({
    data: {
      title: data.title,
      content: data.content,
      completed: data.completed ?? false,
      userId: id,
    },
  });
};

export const updateTask = async (data: alterTaskSchemaType, taskId: number) => {
  return await prisma.task.update({ where: { id: taskId }, data });
};

export const taskStatus = async (data: boolean, taskId: number) => {
  return await prisma.task.update({
    where: { id: taskId },
    data: { completed: data },
  });
};

export const delTask = async (id: number) => {
  return await prisma.task.delete({ where: { id } });
};
