"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerRequest = exports.RouteError = void 0;
const zod_1 = require("zod");
const appError_1 = require("./appError");
const prisma_1 = require("../generated/prisma");
//ROta não encontrada
const RouteError = (req, res) => {
    res.status(500).json({ error: "Route Not Found" });
};
exports.RouteError = RouteError;
//rota de trataiva de errors
const ErrorHandlerRequest = (err, req, res, next) => {
    if (err instanceof zod_1.ZodError) {
        const formattedErrors = err.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));
        return res.status(400).json({ errors: formattedErrors });
    }
    if (err instanceof appError_1.AppError) {
        return res.status(err.status).json({ message: err.message });
    }
    if (err instanceof prisma_1.Prisma.PrismaClientKnownRequestError) {
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
exports.ErrorHandlerRequest = ErrorHandlerRequest;
