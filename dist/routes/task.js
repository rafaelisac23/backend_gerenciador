"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const taskController = __importStar(require("../controllers/task"));
exports.taskRouter = (0, express_1.Router)();
exports.taskRouter.get("/all", auth_1.privateRoute, taskController.getAllTasks);
exports.taskRouter.post("/", auth_1.privateRoute, taskController.addTask);
exports.taskRouter.put("/:id", auth_1.privateRoute, taskController.alterTask);
exports.taskRouter.put("/:id/status", auth_1.privateRoute, taskController.alterStatTask);
exports.taskRouter.delete("/:id", auth_1.privateRoute, taskController.deleteTask);
//Rota para pegar conta do total de tasks
exports.taskRouter.get("/countAllTasks", auth_1.privateRoute, taskController.countAllTasks);
//Rota para pegar conta de tasks concluidas
exports.taskRouter.get("/countAllConcludeTasks", auth_1.privateRoute, taskController.countConcludeTasks);
exports.taskRouter.get("/countAllNotConcludeTasks", auth_1.privateRoute, taskController.countNotConcludeTasks);
