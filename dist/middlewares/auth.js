"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateRoute = void 0;
const auth_1 = require("../services/auth");
const privateRoute = async (req, res, next) => {
    try {
        const user = await (0, auth_1.verifyRequest)(req);
        req.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.privateRoute = privateRoute;
