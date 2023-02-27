import { Router } from "express";
import { createUserMiddleware } from "./server/middlewares/signUp/create-user";
import { loginUserMiddlware } from "./server/middlewares/singIn/login-user";
import { loginUserRouter } from "./server/useCases/signIn/login-user";
import { createUserRouter } from "./server/useCases/signUp/create-user";

const router = Router();

router.post("/users", createUserMiddleware, createUserRouter);
router.post("/login", loginUserMiddlware, loginUserRouter);

export { router };
