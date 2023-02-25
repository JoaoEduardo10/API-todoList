import "express-async-errors";
import express from "express";
import "dotenv/config";
import { globalsErrors } from "./middlewares/globals-errors";
import { Bad_Request } from "./helpers/api-errors";

const server = express();

server.use(express.json());

server.post("/users", async (req, res) => {
  throw new Bad_Request("caio no error");
});

server.use(globalsErrors);

export { server };
