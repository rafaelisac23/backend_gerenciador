"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idSchema = exports.alterTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createTaskSchema = zod_1.default
    .object({
    title: zod_1.default.string().min(1),
    content: zod_1.default.string().optional(),
    completed: zod_1.default.boolean().default(false),
})
    .strict();
exports.alterTaskSchema = zod_1.default
    .object({
    title: zod_1.default.string().min(1).optional(),
    content: zod_1.default.string().min(1).optional(),
})
    .strict()
    .refine((data) => Object.keys(data).length > 0, "Mandar 1 campo para alteração");
exports.idSchema = zod_1.default
    .object({
    id: zod_1.default.number(),
})
    .strict();
