import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/extended-request";

export const CreateTask = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    next(err);
  }
};
