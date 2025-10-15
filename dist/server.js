"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const main_1 = require("./routes/main");
const ErrorHandler_1 = require("./errors/ErrorHandler");
dotenv_1.default.config();
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.static("public"));
server.use("/api", main_1.mainRoute);
server.use(ErrorHandler_1.RouteError);
server.use(ErrorHandler_1.ErrorHandlerRequest);
server.listen(process.env.PORT, () => {
    console.log(`Projeto Rodando na porta http://localhost:${process.env.PORT}`);
});
