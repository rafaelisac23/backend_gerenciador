import { Request, Response, Router } from "express";
import { authRouter } from "../routes/auth";
import { userRouter } from "../routes/user";
import { taskRouter } from "./task";
import { favoriteRouter } from "./favorites";

export const mainRoute = Router();

mainRoute.use("/auth", authRouter);
mainRoute.use("/user", userRouter);
mainRoute.use("/task", taskRouter);
mainRoute.use("/fav", favoriteRouter);

mainRoute.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({ pong: true });
});
