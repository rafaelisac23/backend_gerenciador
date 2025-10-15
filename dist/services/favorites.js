"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewFavorite = exports.countFavorites = exports.getFavorites = void 0;
const prisma_1 = require("../libs/prisma");
const getFavorites = async (id) => {
    return await prisma_1.prisma.favorite.findMany({ where: { userId: id } });
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
