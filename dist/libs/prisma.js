"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const prisma_1 = require("../generated/prisma"); // aqui ele n puxa do client e sim do generated
const globalForPrisma = globalThis;
exports.prisma = globalForPrisma.prisma || new prisma_1.PrismaClient();
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = exports.prisma;
