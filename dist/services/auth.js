"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRequest = exports.createToken = void 0;
const jwt_1 = require("../libs/jwt");
const appError_1 = require("../errors/appError");
const user_1 = require("../services/user");
const createToken = (data) => {
    return (0, jwt_1.createJWT)({ id: data.id, email: data.email });
};
exports.createToken = createToken;
const verifyRequest = async (req) => {
    const { authorization } = req.headers;
    if (authorization) {
        const authsplit = authorization.split("Bearer ");
        if (authsplit[1]) {
            const payload = (0, jwt_1.readJWT)(authsplit[1]);
            if (payload) {
                const userId = payload.id;
                const user = await (0, user_1.getUserById)(userId);
                if (!user)
                    throw new appError_1.AppError("Acesso negado", 401);
                return user;
            }
        }
    }
    if (!authorization)
        throw new appError_1.AppError("Acesso negado", 401);
};
exports.verifyRequest = verifyRequest;
