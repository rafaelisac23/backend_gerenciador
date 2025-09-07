import { Router } from "express";
import { privateRoute } from "../middlewares/auth";
import * as taskController from "../controllers/task";

export const taskRouter = Router();

taskRouter.get("/all", privateRoute, taskController.getAllTasks);
taskRouter.post("/", privateRoute, taskController.addTask);
taskRouter.put("/:id", privateRoute, taskController.alterTask);
taskRouter.put("/:id/status", privateRoute, taskController.alterStatTask);
taskRouter.delete("/:id", privateRoute, taskController.deleteTask);
