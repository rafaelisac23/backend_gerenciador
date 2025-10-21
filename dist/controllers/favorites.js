"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFavorite = exports.DeleteFavorite = exports.addFavorites = exports.getCountFavorites = exports.getAllFavorites = void 0;
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
const DeleteFavorite = async (req, res, next) => {
    try {
        if (!req.user?.id)
            throw new appError_1.AppError("Não autorizado", 401);
        const body = favortite_1.RemoveFavoriteSchema.parse(req.body);
        //Busca qual o id do favorito usando a taskid
        const isFavorite = await (0, favorites_1.CheckFavorite)(body.taskId);
        console.log("task solicitada: ", isFavorite);
        if (!isFavorite)
            res.status(404).json({
                success: false,
                message: "Não e possivel deletar, não é um favorito",
            });
        //deleta pelo id do favorito buscada
        const deletedFavorite = await (0, favorites_1.deleteFavorite)(isFavorite?.id);
        console.log("TaskDeletada: ", deletedFavorite);
        res.json({ success: true, deletedFavorite });
    }
    catch (err) {
        next(err);
    }
};
exports.DeleteFavorite = DeleteFavorite;
const isFavorite = async (req, res, next) => {
    try {
        if (!req.user?.id)
            throw new appError_1.AppError("Não autorizado", 401);
        const query = favortite_1.IsFavoriteSchema.parse(req.query);
        const favorite = await (0, favorites_1.CheckFavorite)(query.taskId);
        if (!favorite) {
            res.json({ Favorite: false });
        }
        res.status(200).json({ favorite: true });
    }
    catch (err) {
        next(err);
    }
};
exports.isFavorite = isFavorite;
