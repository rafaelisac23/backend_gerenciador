import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { AppError } from "../errors/appError";
import { alterTaskSchema, createTaskSchema } from "../types/task";
import { getUserById } from "../services/user";
import {
  createTask,
  delTask,
  getCountConcludeTask,
  getCountNotConcludeTask,
  getCountTask,
  getTaskById,
  getTasks,
  taskStatus,
  updateTask,
} from "../services/task";

export const getAllTasks = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new AppError("Não autorizado", 401);

    const user = getUserById(req.user.id);

    let page = 1;

    if (req.query.page) {
      page = parseInt(req.query.page as string);
      if (page <= 0) {
        throw new AppError("Page not found", 404);
      }
    }

    const tasks = await getTasks(page, req.user.id);

    res.status(200).json({ tasks });
  } catch (err) {
    next(err);
  }
};

export const addTask = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new AppError("Não autorizado", 401);
    //Validação do zod
    const data = createTaskSchema.parse(req.body);

    const user = await getUserById(req.user.id);

    if (!user) throw new AppError("Usuario não encontrado", 404);

    const newTask = await createTask(data, user.id);

    res.status(201).json({ task: newTask });
  } catch (err) {
    next(err);
  }
};

export const alterTask = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new AppError("Não autorizado", 401);
    const { id } = req.params;
    const taskId = parseInt(id as string);
    console.log(id);

    const data = alterTaskSchema.parse(req.body);

    const task = await getTaskById(taskId);
    if (!task) throw new AppError("Task não encontrada", 404);

    const updatedTask = await updateTask(data, taskId);

    res.json({ task: updatedTask });
  } catch (err) {
    next(err);
  }
};

export const alterStatTask = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new AppError("Não autorizado", 401);
    const { id } = req.params;
    const taskId = parseInt(id as string);

    const task = await getTaskById(taskId);
    if (!task) throw new AppError("Task não encontrada", 404);

    const updatedTask = await taskStatus(!task.completed, taskId);

    res.json({ task: updatedTask });
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new AppError("Não autorizado", 401);
    const { id } = req.params;
    const taskId = parseInt(id as string);

    const task = await getTaskById(taskId);
    if (!task) throw new AppError("Task não encontrada", 404);

    const deletedTask = await delTask(taskId);

    res.status(200).json({ task: deletedTask });
  } catch (err) {
    next(err);
  }
};

export const countAllTasks = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new AppError("Não autorizado", 401);

    const user = getUserById(req.user.id);

    const getcountAllTask = await getCountTask(req.user.id);

    res.status(200).json({ success: true, count: getcountAllTask });
  } catch (err) {
    next(err);
  }
};

export const countConcludeTasks = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new AppError("Não autorizado", 401);

    const user = getUserById(req.user.id);

    const getcountConcludeTask = await getCountConcludeTask(req.user.id);

    res.status(200).json({ success: true, count: getcountConcludeTask });
  } catch (err) {
    next(err);
  }
};

export const countNotConcludeTasks = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new AppError("Não autorizado", 401);

    const user = getUserById(req.user.id);

    const getcountConcludeTask = await getCountNotConcludeTask(req.user.id);

    res.status(200).json({ success: true, count: getcountConcludeTask });
  } catch (err) {
    next(err);
  }
};
