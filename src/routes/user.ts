import { Router } from "express";
import { privateRoute } from "../middlewares/auth";
import * as userController from "../controllers/user";

export const userRouter = Router();

userRouter.put("/alter", privateRoute, userController.alterInformationUser);

userRouter.put(
  "/alterPassword",
  privateRoute,
  userController.alterPasswordUser
);
