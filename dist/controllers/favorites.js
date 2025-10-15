"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFavorites = exports.getCountFavorites = exports.getAllFavorites = void 0;
const appError_1 = require("../errors/appError");
const favorites_1 = require("../services/favorites");
const favortite_1 = require("../types/favortite");
const getAllFavorites = async (req, res, next) => {
    try {
        if (!req.user?.id)
            throw new appError_1.AppError("Não autorizado", 401);
        const favorites = await (0, favorites_1.getFavorites)(req.user.id);
        res.status(200).json({ success: true, favorites });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllFavorites = getAllFavorites;
const getCountFavorites = async (req, res, next) => {
    try {
        if (!req.user?.id)
            throw new appError_1.AppError("Não autorizado", 401);
        const favorites = await (0, favorites_1.countFavorites)(req.user.id);
        res.status(200).json({ success: true, count: favorites });
    }
    catch (err) {
        next(err);
    }
};
exports.getCountFavorites = getCountFavorites;
const addFavorites = async (req, res, next) => {
    try {
        if (!req.user?.id)
            throw new appError_1.AppError("Não autorizado", 401);
        const body = favortite_1.AddNewFavoriteSchema.parse(req.body);
        const newFavorite = await (0, favorites_1.addNewFavorite)(body.taskId, req.user.id);
        res.status(200).json({ success: true, newFavorite });
    }
    catch (err) {
        next(err);
    }
};
exports.addFavorites = addFavorites;
