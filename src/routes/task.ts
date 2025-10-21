import { Router } from "express";
import { privateRoute } from "../middlewares/auth";
import * as taskController from "../controllers/task";

export const taskRouter = Router();

taskRouter.get("/all", privateRoute, taskController.getAllTasks);
taskRouter.post("/", privateRoute, taskController.addTask);
taskRouter.put("/:id", privateRoute, taskController.alterTask);
taskRouter.put("/:id/status", privateRoute, taskController.alterStatTask);
taskRouter.delete("/:id", privateRoute, taskController.deleteTask);

//Rota para pegar conta do total de tasks
taskRouter.get("/countAllTasks", privateRoute, taskController.countAllTasks);

//Rota para pegar conta de tasks concluidas
taskRouter.get(
  "/countAllConcludeTasks",
  privateRoute,
  taskController.countConcludeTasks
);
taskRouter.get(
  "/countAllNotConcludeTasks",
  privateRoute,
  taskController.countNotConcludeTasks
);
