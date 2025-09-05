import { Request, Response, Router } from "express";
import { AuthRouter } from "./auth";

export const mainRoute = Router();

mainRoute.use("/auth", AuthRouter);

mainRoute.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({ pong: true });
});
