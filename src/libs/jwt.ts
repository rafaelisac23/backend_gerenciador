import JWT from "jsonwebtoken";
import { AppError } from "../errors/appError";

type createTokenProps = {
  id: number;
  email: string;
};

export const createJWT = (data: createTokenProps) => {
  const jwt = JWT.sign(
    { id: data.id, email: data.email },
    process.env.JWT_KEY as string
  );
  return jwt;
};

export const readJWT = (hash: string) => {
  try {
    return JWT.verify(hash, process.env.JWT_KEY as string);
  } catch (err) {
    throw new AppError("Acesso negado", 401);
  }
};
