import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { AppError } from "../errors/appError";
import {
  addNewFavorite,
  countFavorites,
  getFavorites,
} from "../services/favorites";
import { AddNewFavoriteSchema } from "../types/favortite";
import { success } from "zod";

export const getAllFavorites = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.id) throw new AppError("Não autorizado", 401);
    const favorites = await getFavorites(req.user.id);
    res.status(200).json({ success: true, favorites });
  } catch (err) {
    next(err);
  }
};

export const getCountFavorites = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.id) throw new AppError("Não autorizado", 401);
    const favorites = await countFavorites(req.user.id);
    res.status(200).json({ success: true, count: favorites });
  } catch (err) {
    next(err);
  }
};

export const addFavorites = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.id) throw new AppError("Não autorizado", 401);

    const body = AddNewFavoriteSchema.parse(req.body);

    const newFavorite = await addNewFavorite(body.taskId, req.user.id);

    res.status(200).json({ success: true, newFavorite });
  } catch (err) {
    next(err);
  }
};
