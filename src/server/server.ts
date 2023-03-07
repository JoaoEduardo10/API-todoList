import "express-async-errors";
import express from "express";
import "dotenv/config";
import { globalsErrors } from "./middlewares/globals-errors";
import { router } from "./router";
import swagger from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const server = express();

server.use(express.json());

server.use(
  "/api-todo-list/documentation",
  swagger.serve,
  swagger.setup(swaggerDocs)
);

server.use(router);

server.use(globalsErrors);

export { server };
