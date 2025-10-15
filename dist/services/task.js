"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delTask = exports.taskStatus = exports.updateTask = exports.createTask = exports.getTaskById = exports.getCountNotConcludeTask = exports.getCountConcludeTask = exports.getCountTask = exports.getTasks = void 0;
const prisma_1 = require("../libs/prisma");
const getTasks = async (page, id) => {
    const perPage = 10;
    if (page <= 0)
        return [];
    return await prisma_1.prisma.task.findMany({
        where: { userId: id },
        take: perPage,
        skip: (page - 1) * perPage,
    });
};
exports.getTasks = getTasks;
const getCountTask = async (id) => {
    return await prisma_1.prisma.task.count({
        where: { userId: id },
    });
};
exports.getCountTask = getCountTask;
const getCountConcludeTask = async (id) => {
    return await prisma_1.prisma.task.count({
        where: { userId: id, completed: true },
    });
};
exports.getCountConcludeTask = getCountConcludeTask;
const getCountNotConcludeTask = async (id) => {
    return await prisma_1.prisma.task.count({
        where: { userId: id, completed: false },
    });
};
exports.getCountNotConcludeTask = getCountNotConcludeTask;
const getTaskById = async (id) => {
    return await prisma_1.prisma.task.findUnique({ where: { id } });
};
exports.getTaskById = getTaskById;
const createTask = async (data, id) => {
    return await prisma_1.prisma.task.create({
        data: {
            title: data.title,
            content: data.content,
            completed: data.completed ?? false,
            userId: id,
        },
    });
};
exports.createTask = createTask;
const updateTask = async (data, taskId) => {
    return await prisma_1.prisma.task.update({ where: { id: taskId }, data });
};
exports.updateTask = updateTask;
const taskStatus = async (data, taskId) => {
    return await prisma_1.prisma.task.update({
        where: { id: taskId },
        data: { completed: data },
    });
};
exports.taskStatus = taskStatus;
const delTask = async (id) => {
    return await prisma_1.prisma.task.delete({ where: { id } });
};
exports.delTask = delTask;
