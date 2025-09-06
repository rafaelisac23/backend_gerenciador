import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { AppError } from "../errors/appError";
import { updatePassword, updateUser } from "../services/user";
import {
  alterInformationUserSchema,
  alterPasswordUserSchema,
} from "../types/user";

export const alterInformationUser = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new AppError("Não permitido", 401);

    //aqui faz toda a verificação da requisição
    const data = alterInformationUserSchema.parse(req.body);

    //atualiz o usuario
    const updatedUser = await updateUser(data, req);

    if (!updatedUser)
      throw new AppError("Não foi possivel atualizar o usuario", 400);

    res.status(200).json({ stats: "success", user: updatedUser });
  } catch (err) {
    next(err);
  }
};

export const alterPasswordUser = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new AppError("Não permitido", 401);

    const data = alterPasswordUserSchema.parse(req.body);

    const updatedPassword = await updatePassword(data, req);

    if (!updatedPassword)
      throw new AppError("Não foi possivel atualizar a senha", 400);

    res.json({ success: "ok", alter: updatedPassword });
    return;
  } catch (err) {
    next(err);
  }
};
