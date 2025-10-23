import { prisma } from "../libs/prisma";

export const getFavorites = async (id: number) => {
  const tasksFavId = await prisma.favorite.findMany({
    where: { userId: id },
    select: { taskId: true },
  });

  const taskIds = tasksFavId.map((item) => item.taskId);

  const favorites = await prisma.task.findMany({
    where: {
      id: { in: taskIds },
    },
  });

  return favorites;
};

export const countFavorites = async (id: number) => {
  return await prisma.favorite.count({ where: { userId: id } });
};

export const addNewFavorite = async (taskId: number, userId: number) => {
  return await prisma.favorite.create({ data: { taskId, userId } });
};

//deleta direto pelo id do favorito
export const deleteFavorite = async (id: number) => {
  return await prisma.favorite.delete({ where: { id } });
};

//retorna o campo favorito procurado pela taskid
export const CheckFavorite = async (taskId: number) => {
  return await prisma.favorite.findFirst({ where: { taskId } });
};
