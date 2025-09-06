import { Router } from "express";
import { privateRoute } from "../middlewares/auth";
import * as taskController from "../controllers/task";

export const taskRouter = Router();

taskRouter.post("/task", privateRoute, taskController.CreateTask);
