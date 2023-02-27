import { Router } from "express";
import { createUserMiddleware } from "./middlewares/signUp/create-user";
import { loginUserMiddlware } from "./middlewares/singIn/login-user";
import { loginUserRouter } from "./useCases/signIn/login-user";
import { createUserRouter } from "./useCases/signUp/create-user";
import { createTaskRouter } from "./useCases/task/create-task";

const router = Router();

// login e criação de usuario
router.post("/users", createUserMiddleware, createUserRouter);
router.post("/login", loginUserMiddlware, loginUserRouter);

// task
router.post("/tasks", createTaskRouter);

export { router };
