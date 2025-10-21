import { Router } from "express";
import * as AuthController from "../controllers/auth";
import { privateRoute } from "../middlewares/auth";

export const authRouter = Router();

authRouter.post("/signin", AuthController.signin);
authRouter.post("/signup", AuthController.signUp);
authRouter.post("/validate", privateRoute, AuthController.validate);
