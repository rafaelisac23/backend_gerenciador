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

server.listen(process.env.PORT, () => {
  console.log(`Projeto Rodando na porta http://localhost:${process.env.PORT}`);
});
