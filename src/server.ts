import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { mainRoute } from "./routes/main";
import { ErrorHandlerRequest, RouteError } from "./errors/ErrorHandler";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use("/api", mainRoute);
server.use(RouteError);
server.use(ErrorHandlerRequest);

const PORT = Number(process.env.PORT) || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Projeto Rodando na porta http://localhost:${process.env.PORT}`);
});
