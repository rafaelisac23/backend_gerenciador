import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { AppError } from "../errors/appError";
import { createTaskSchema } from "../types/task";
import { getUserById } from "../services/user";
import { createTask } from "../services/task";

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

    if (!newTask) throw new AppError("Não foi possivel criar a task", 400);

    res.status(201).json({ task: newTask });
  } catch (err) {
    next(err);
  }
};

export const getAllTasks = () => {};
