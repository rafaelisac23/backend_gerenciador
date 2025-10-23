import { Request } from "express";
import { User } from "@prisma/client";

type OmitPasswordUser = Omit<
  User,
  "password" | "name" | "createdAt" | "updatedAt"
>;

export type ExtendedRequest = Request & {
  user?: OmitPasswordUser;
};
