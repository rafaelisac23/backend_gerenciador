import { Router } from "express";
import * as AuthController from "../controllers/auth";
import { privateRoute } from "../middlewares/auth";

export const AuthRouter = Router();

AuthRouter.post("/signin", AuthController.signin);
AuthRouter.post("/signup", AuthController.signUp);
AuthRouter.post("/validate", privateRoute, AuthController.validate);
