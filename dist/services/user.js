"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.updateUser = exports.verifyUser = exports.createNewUser = exports.getUserById = void 0;
const prisma_1 = require("../libs/prisma");
const appError_1 = require("../errors/appError");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUserById = async (id) => {
    return await prisma_1.prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            name: true,
        },
    });
};
exports.getUserById = getUserById;
const createNewUser = async (data) => {
    const email = data.email.toLowerCase();
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (user) {
        throw new appError_1.AppError("Email já cadastrado", 409);
    }
    const newPassword = await bcryptjs_1.default.hashSync(data.password, 10);
    return await prisma_1.prisma.user.create({
        data: { name: data.name, email, password: newPassword },
    });
};
exports.createNewUser = createNewUser;
const verifyUser = async (data) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
        throw new appError_1.AppError("Acesso Negado", 401);
    }
    //Verifica se a senha do usuario bate com descriptografia
    if (!bcryptjs_1.default.compareSync(data.password, user.password)) {
        throw new appError_1.AppError("Acesso Negado", 401);
    }
    return user;
};
exports.verifyUser = verifyUser;
//Rotas Privadas para user
const updateUser = async (data, req) => {
    return await prisma_1.prisma.user.update({
        where: { id: req.user?.id },
        data,
        select: { id: true, name: true, email: true, updatedAt: true },
    });
};
exports.updateUser = updateUser;
const updatePassword = async (data, req) => {
    const newPassword = await bcryptjs_1.default.hashSync(data.password, 10);
    return await prisma_1.prisma.user.update({
        where: { id: req.user?.id },
        data: { password: newPassword },
        select: { id: true, name: true, email: true, updatedAt: true },
    });
};
exports.updatePassword = updatePassword;
