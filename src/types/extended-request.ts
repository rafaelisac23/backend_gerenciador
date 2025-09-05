import { Request } from "express";
import { User } from "../generated/prisma";

type OmitPasswordUser = Omit<
  User,
  "password" | "name" | "createdAt" | "updatedAt"
>;

export type ExtendedRequest = Request & {
  user?: OmitPasswordUser;
};
