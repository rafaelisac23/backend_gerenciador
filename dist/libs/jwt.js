"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJWT = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = require("../errors/appError");
const createJWT = (data) => {
    const jwt = jsonwebtoken_1.default.sign({ id: data.id, email: data.email }, process.env.JWT_KEY);
    return jwt;
};
exports.createJWT = createJWT;
const readJWT = (hash) => {
    try {
        return jsonwebtoken_1.default.verify(hash, process.env.JWT_KEY);
    }
    catch (err) {
        throw new appError_1.AppError("Acesso negado", 401);
    }
};
exports.readJWT = readJWT;
