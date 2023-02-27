import { Router } from "express";
import { createBoardMiddleware } from "./server/middlewares/board/create-board";
import { createUserMiddleware } from "./server/middlewares/signUp/create-user";
import { loginUserMiddlware } from "./server/middlewares/singIn/login-user";
import { createBoardRouter } from "./server/useCases/board/create-board";
import { loginUserRouter } from "./server/useCases/signIn/login-user";
import { createUserRouter } from "./server/useCases/signUp/create-user";

const router = Router();

// login e criação de usuario
router.post("/users", createUserMiddleware, createUserRouter);
router.post("/login", loginUserMiddlware, loginUserRouter);

// criação do board
router.post("/boards", createBoardMiddleware, createBoardRouter);

export { router };
