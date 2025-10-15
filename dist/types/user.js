"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterPasswordUserSchema = exports.alterInformationUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
//Type do update do usuario
exports.alterInformationUserSchema = zod_1.default
    .object({
    name: zod_1.default.string().min(2, "Nome tem que conter 2 caracteres").optional(),
})
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
    message: "Você precisa enviar pelo menos um campo para atualizar.",
});
// schema e type alterPasswordUser
exports.alterPasswordUserSchema = zod_1.default
    .object({
    password: zod_1.default
        .string()
        .min(2, "Senha tem que conter 2 ou caracteres")
        .optional(),
})
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
    message: "Você precisa enviar pelo menos um campo para atualizar.",
});
