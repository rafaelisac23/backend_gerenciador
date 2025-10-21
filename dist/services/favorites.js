"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckFavorite = exports.deleteFavorite = exports.addNewFavorite = exports.countFavorites = exports.getFavorites = void 0;
const prisma_1 = require("../libs/prisma");
const getFavorites = async (id) => {
    const tasksFavId = await prisma_1.prisma.favorite.findMany({
        where: { userId: id },
        select: { taskId: true },
    });
    const taskIds = tasksFavId.map((item) => item.taskId);
    const favorites = await prisma_1.prisma.task.findMany({
        where: {
            id: { in: taskIds },
        },
    });
    return favorites;
};
exports.getFavorites = getFavorites;
const countFavorites = async (id) => {
    return await prisma_1.prisma.favorite.count({ where: { userId: id } });
};
exports.countFavorites = countFavorites;
const addNewFavorite = async (taskId, userId) => {
    return await prisma_1.prisma.favorite.create({ data: { taskId, userId } });
};
exports.addNewFavorite = addNewFavorite;
//deleta direto pelo id do favorito
const deleteFavorite = async (id) => {
    return await prisma_1.prisma.favorite.delete({ where: { id } });
};
exports.deleteFavorite = deleteFavorite;
//retorna o campo favorito procurado pela taskid
const CheckFavorite = async (taskId) => {
    return await prisma_1.prisma.favorite.findFirst({ where: { taskId } });
};
exports.CheckFavorite = CheckFavorite;
