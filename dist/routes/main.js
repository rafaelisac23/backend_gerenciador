"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRoute = void 0;
const express_1 = require("express");
const auth_1 = require("./auth");
const user_1 = require("../routes/user");
const task_1 = require("./task");
const favorites_1 = require("./favorites");
exports.mainRoute = (0, express_1.Router)();
exports.mainRoute.use("/auth", auth_1.authRouter);
exports.mainRoute.use("/user", user_1.userRouter);
exports.mainRoute.use("/task", task_1.taskRouter);
exports.mainRoute.use("/fav", favorites_1.favoriteRouter);
exports.mainRoute.get("/ping", (req, res) => {
    res.status(200).json({ pong: true });
});
