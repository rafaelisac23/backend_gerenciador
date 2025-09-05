import { Request } from "express";
import { User } from "../generated/prisma";
import { createJWT, readJWT } from "../libs/jwt";
import { AppError } from "../errors/appError";
import { TokenPayload } from "../types/token-payload";
import { getUserById } from "../services/user";

export const createToken = (data: User) => {
  return createJWT({ id: data.id, email: data.email });
};

export const verifyRequest = async (req: Request) => {
  const { authorization } = req.headers;

  if (authorization) {
    const authsplit = authorization.split("Bearer ");
    if (authsplit[1]) {
      const payload = readJWT(authsplit[1]);
      if (payload) {
        const userId = (payload as TokenPayload).id;
        const user = await getUserById(userId);
        if (!user) throw new AppError("Acesso negado", 401);
        return user;
      }
    }
  }

  if (!authorization) throw new AppError("Acesso negado", 401);
};
