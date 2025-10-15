import { prisma } from "../libs/prisma";

export const getFavorites = async (id: number) => {
  return await prisma.favorite.findMany({ where: { userId: id } });
};

export const countFavorites = async (id: number) => {
  return await prisma.favorite.count({ where: { userId: id } });
};

export const addNewFavorite = async (taskId: number, userId: number) => {
  return await prisma.favorite.create({ data: { taskId, userId } });
};
