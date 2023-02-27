import "express-async-errors";
import express from "express";
import "dotenv/config";
import { globalsErrors } from "./middlewares/globals-errors";
import { router } from "./router";

const server = express();

server.use(express.json());

server.use(router);

server.use(globalsErrors);

export { server };
