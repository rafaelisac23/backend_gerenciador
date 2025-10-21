"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFavoriteSchema = exports.RemoveFavoriteSchema = exports.AddNewFavoriteSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.AddNewFavoriteSchema = zod_1.default.object({
    taskId: zod_1.default.number(),
});
exports.RemoveFavoriteSchema = zod_1.default.object({
    taskId: zod_1.default.number(),
});
exports.IsFavoriteSchema = zod_1.default
    .object({
    taskId: zod_1.default
        .string()
        .transform((item) => parseInt(item, 10))
        .refine((val) => !isNaN(val), {
        message: "O valor inserido não é um numero valido",
    }),
})
    .strict();
