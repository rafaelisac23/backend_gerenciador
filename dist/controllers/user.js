"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterPasswordUser = exports.alterInformationUser = void 0;
const appError_1 = require("../errors/appError");
const user_1 = require("../services/user");
const user_2 = require("../types/user");
const alterInformationUser = async (req, res, next) => {
    try {
        if (!req.user)
            throw new appError_1.AppError("Não permitido", 401);
        //aqui faz toda a verificação da requisição
        const data = user_2.alterInformationUserSchema.parse(req.body);
        //atualiz o usuario
        const updatedUser = await (0, user_1.updateUser)(data, req);
        res.status(200).json({ stats: "success", user: updatedUser });
    }
    catch (err) {
        next(err);
    }
};
exports.alterInformationUser = alterInformationUser;
const alterPasswordUser = async (req, res, next) => {
    try {
        if (!req.user)
            throw new appError_1.AppError("Não permitido", 401);
        const data = user_2.alterPasswordUserSchema.parse(req.body);
        const updatedPassword = await (0, user_1.updatePassword)(data, req);
        res.json({ success: "ok", alter: updatedPassword });
        return;
    }
    catch (err) {
        next(err);
    }
};
exports.alterPasswordUser = alterPasswordUser;
