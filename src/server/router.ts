import { Router } from "express";
import { createBoardMiddleware } from "./middlewares/board/create-board";
import { createUserMiddleware } from "./middlewares/signUp/create-user";
import { loginUserMiddlware } from "./middlewares/singIn/login-user";
import { createTaskMiddleware } from "./middlewares/task/create-task";
import { createBoardRouter } from "./useCases/board/create-board";
import { loginUserRouter } from "./useCases/signIn/login-user";
import { createUserRouter } from "./useCases/signUp/create-user";
import { createTaskRouter } from "./useCases/task/create-task";

const router = Router();

// login e criação de usuario
router.post("/users", createUserMiddleware, createUserRouter);
router.post("/login", loginUserMiddlware, loginUserRouter);

// board
router.post("/boards", createBoardMiddleware, createBoardRouter);

// task
router.post("/tasks", createTaskMiddleware, createTaskRouter);

export { router };
