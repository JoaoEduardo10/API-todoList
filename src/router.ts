import { Router } from "express";
import { createUserMiddleware } from "./server/middlewares/signUp/create-user";
import { createUserRouter } from "./server/useCases/signUp/create-user";

const router = Router();

router.post("/users", createUserMiddleware, createUserRouter);

export { router };
