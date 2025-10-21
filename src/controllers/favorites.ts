import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { AppError } from "../errors/appError";
import {
  addNewFavorite,
  CheckFavorite,
  countFavorites,
  deleteFavorite,
  getFavorites,
} from "../services/favorites";
import {
  AddNewFavoriteSchema,
  IsFavoriteSchema,
  RemoveFavoriteSchema,
} from "../types/favortite";
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

export const DeleteFavorite = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.id) throw new AppError("Não autorizado", 401);

    const body = RemoveFavoriteSchema.parse(req.body);

    //Busca qual o id do favorito usando a taskid
    const isFavorite = await CheckFavorite(body.taskId);
    console.log("task solicitada: ", isFavorite);

    if (!isFavorite)
      res.status(404).json({
        success: false,
        message: "Não e possivel deletar, não é um favorito",
      });

    //deleta pelo id do favorito buscada
    const deletedFavorite = await deleteFavorite(isFavorite?.id as number);

    console.log("TaskDeletada: ", deletedFavorite);

    res.json({ success: true, deletedFavorite });
  } catch (err) {
    next(err);
  }
};

export const isFavorite = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.id) throw new AppError("Não autorizado", 401);

    const query = IsFavoriteSchema.parse(req.query);

    const favorite = await CheckFavorite(query.taskId);

    if (!favorite) {
      res.json({ Favorite: false });
    }

    res.status(200).json({ favorite: true });
  } catch (err) {
    next(err);
  }
};
