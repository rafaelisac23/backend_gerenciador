import { NextFunction, Request, Response } from "express";
import { verifyRequest } from "../services/auth";
import { ExtendedRequest } from "../types/extended-request";

export const privateRoute = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await verifyRequest(req);

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
