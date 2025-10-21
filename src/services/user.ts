import { prisma } from "../libs/prisma";
import { AppError } from "../errors/appError";
import bcrypt from "bcryptjs";
import {
  alterInformationUserSchemaType,
  alterPasswordUserSchemaType,
} from "../types/user";
import { ExtendedRequest } from "../types/extended-request";

type CreateNewUserProps = {
  name: string;
  email: string;
  password: string;
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
};

export const createNewUser = async (data: CreateNewUserProps) => {
  const email = data.email.toLowerCase();

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    throw new AppError("Email já cadastrado", 409);
  }

  const newPassword = await bcrypt.hashSync(data.password, 10);

  return await prisma.user.create({
    data: { name: data.name, email, password: newPassword },
  });
};

type VerifyUserProps = {
  email: string;
  password: string;
};

export const verifyUser = async (data: VerifyUserProps) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user) {
    throw new AppError("Acesso Negado", 401);
  }

  //Verifica se a senha do usuario bate com descriptografia
  if (!bcrypt.compareSync(data.password, user.password)) {
    throw new AppError("Acesso Negado", 401);
  }

  return user;
};

//Rotas Privadas para user

export const updateUser = async (
  data: alterInformationUserSchemaType,
  req: ExtendedRequest
) => {
  return await prisma.user.update({
    where: { id: req.user?.id },
    data,
    select: { id: true, name: true, email: true, updatedAt: true },
  });
};

export const updatePassword = async (
  data: alterPasswordUserSchemaType,
  req: ExtendedRequest
) => {
  const newPassword = await bcrypt.hashSync(data.password as string, 10);

  return await prisma.user.update({
    where: { id: req.user?.id },
    data: { password: newPassword },
    select: { id: true, name: true, email: true, updatedAt: true },
  });
};
