import { Router } from "express";
import { createUserRouter } from "./server/useCases/signUp/create-user";

const router = Router();

router.post("/users", createUserRouter);

export { router };
