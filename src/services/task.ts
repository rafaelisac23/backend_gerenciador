import { prisma } from "../libs/prisma";
import { createTaskSchemaType } from "../types/task";

export const createTask = async (data: createTaskSchemaType, id: number) => {
  return prisma.task.create({
    data: {
      title: data.title,
      content: data.content,
      completed: data.completed,
      userId: id,
    },
  });
};
