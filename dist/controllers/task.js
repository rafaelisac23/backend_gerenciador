"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countNotConcludeTasks = exports.countConcludeTasks = exports.countAllTasks = exports.deleteTask = exports.alterStatTask = exports.alterTask = exports.addTask = exports.getAllTasks = void 0;
const appError_1 = require("../errors/appError");
const task_1 = require("../types/task");
const user_1 = require("../services/user");
const task_2 = require("../services/task");
const favorites_1 = require("../services/favorites");
const getAllTasks = async (req, res, next) => {
    try {
        if (!req.user)
            throw new appError_1.AppError("Não autorizado", 401);
        const user = (0, user_1.getUserById)(req.user.id);
        let page = 1;
        if (req.query.page) {
            page = parseInt(req.query.page);
            if (page <= 0) {
                throw new appError_1.AppError("Page not found", 404);
            }
        }
        const tasks = await (0, task_2.getTasks)(page, req.user.id);
        res.status(200).json({ tasks });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllTasks = getAllTasks;
const addTask = async (req, res, next) => {
    try {
        if (!req.user)
            throw new appError_1.AppError("Não autorizado", 401);
        //Validação do zod
        const data = task_1.createTaskSchema.parse(req.body);
        const user = await (0, user_1.getUserById)(req.user.id);
        if (!user)
            throw new appError_1.AppError("Usuario não encontrado", 404);
        const newTask = await (0, task_2.createTask)(data, user.id);
        res.status(201).json({ task: newTask });
    }
    catch (err) {
        next(err);
    }
};
exports.addTask = addTask;
const alterTask = async (req, res, next) => {
    try {
        if (!req.user)
            throw new appError_1.AppError("Não autorizado", 401);
        const { id } = req.params;
        const taskId = parseInt(id);
        console.log(id);
        const data = task_1.alterTaskSchema.parse(req.body);
        const task = await (0, task_2.getTaskById)(taskId);
        if (!task)
            throw new appError_1.AppError("Task não encontrada", 404);
        const updatedTask = await (0, task_2.updateTask)(data, taskId);
        res.json({ task: updatedTask });
    }
    catch (err) {
        next(err);
    }
};
exports.alterTask = alterTask;
const alterStatTask = async (req, res, next) => {
    try {
        if (!req.user)
            throw new appError_1.AppError("Não autorizado", 401);
        const { id } = req.params;
        const taskId = parseInt(id);
        const task = await (0, task_2.getTaskById)(taskId);
        if (!task)
            throw new appError_1.AppError("Task não encontrada", 404);
        const updatedTask = await (0, task_2.taskStatus)(!task.completed, taskId);
        res.json({ task: updatedTask });
    }
    catch (err) {
        next(err);
    }
};
exports.alterStatTask = alterStatTask;
const deleteTask = async (req, res, next) => {
    try {
        if (!req.user)
            throw new appError_1.AppError("Não autorizado", 401);
        const { id } = req.params;
        const taskId = parseInt(id);
        if (isNaN(taskId))
            throw new appError_1.AppError("ID invalido", 400);
        //Primeiro verifica se a task e um favorito
        const isFavorite = await (0, favorites_1.CheckFavorite)(taskId);
        if (isFavorite) {
            //Se for favorito
            //Deleta Primeiro a task da tabela de favoritos
            const deletedFavorite = await (0, favorites_1.deleteFavorite)(isFavorite?.id);
        }
        const task = await (0, task_2.getTaskById)(taskId);
        if (!task)
            throw new appError_1.AppError("Task não encontrada", 404);
        const deletedTask = await (0, task_2.delTask)(taskId);
        res.status(200).json({ task: deletedTask });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteTask = deleteTask;
const countAllTasks = async (req, res, next) => {
    try {
        if (!req.user)
            throw new appError_1.AppError("Não autorizado", 401);
        const user = (0, user_1.getUserById)(req.user.id);
        const getcountAllTask = await (0, task_2.getCountTask)(req.user.id);
        res.status(200).json({ success: true, count: getcountAllTask });
    }
    catch (err) {
        next(err);
    }
};
exports.countAllTasks = countAllTasks;
const countConcludeTasks = async (req, res, next) => {
    try {
        if (!req.user)
            throw new appError_1.AppError("Não autorizado", 401);
        const user = (0, user_1.getUserById)(req.user.id);
        const getcountConcludeTask = await (0, task_2.getCountConcludeTask)(req.user.id);
        res.status(200).json({ success: true, count: getcountConcludeTask });
    }
    catch (err) {
        next(err);
    }
};
exports.countConcludeTasks = countConcludeTasks;
const countNotConcludeTasks = async (req, res, next) => {
    try {
        if (!req.user)
            throw new appError_1.AppError("Não autorizado", 401);
        const user = (0, user_1.getUserById)(req.user.id);
        const getcountConcludeTask = await (0, task_2.getCountNotConcludeTask)(req.user.id);
        res.status(200).json({ success: true, count: getcountConcludeTask });
    }
    catch (err) {
        next(err);
    }
};
exports.countNotConcludeTasks = countNotConcludeTasks;
