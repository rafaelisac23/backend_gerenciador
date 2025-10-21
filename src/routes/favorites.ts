import { Request, Response, Router } from "express";
import { privateRoute } from "../middlewares/auth";
import * as FavoriteController from "../controllers/favorites";

export const favoriteRouter = Router();

favoriteRouter.get("/", privateRoute, FavoriteController.getAllFavorites);
favoriteRouter.get(
  "/countFavorites",
  privateRoute,
  FavoriteController.getCountFavorites
);
favoriteRouter.get("/isFavorite/", privateRoute, FavoriteController.isFavorite);
favoriteRouter.post("/", privateRoute, FavoriteController.addFavorites);
favoriteRouter.delete("/", privateRoute, FavoriteController.DeleteFavorite);
