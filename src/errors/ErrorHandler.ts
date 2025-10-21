import { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "./appError";
import { Prisma } from "../generated/prisma";

//ROta não encontrada
export const RouteError: RequestHandler = (req, res) => {
  res.status(500).json({ error: "Route Not Found" });
};

//rota de trataiva de errors
export const ErrorHandlerRequest: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (err instanceof ZodError) {
    const formattedErrors = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    return res.status(400).json({ errors: formattedErrors });
  }

  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Exemplos de códigos do Prisma
    if (err.code === "P2002") {
      return res.status(409).json({ message: "Registro duplicado" });
    }
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    return res.status(400).json({ message: `Erro do Prisma: ${err.code}` });
  }

  res.status(500).json({ error: "Server have a problem" });
};
