import { Router } from "express";
import { authenticationMiddleware } from "./middlewares/authentication";
import { createBoardMiddleware } from "./middlewares/board/create-board";
import { getBoardMiddleware } from "./middlewares/board/get-board";
import { createUserMiddleware } from "./middlewares/signUp/create-user";
import { loginUserMiddlware } from "./middlewares/singIn/login-user";
import { createTaskMiddleware } from "./middlewares/task/create-task";
import { deleteTaskMiddleware } from "./middlewares/task/delete-task";
import { getTaskMiddleware } from "./middlewares/task/get-task";
import { updateCompleteTaskMiddleware } from "./middlewares/task/update-complete-task";
import { updateStatusTaskMiddleware } from "./middlewares/task/update-status-task";
import { updateSubTaskMiddleware } from "./middlewares/task/update-suTask-task";
import { createBoardRouter } from "./useCases/board/create-board";
import { getBoardRouter } from "./useCases/board/get-board";
import { getAllBoardsRouter } from "./useCases/board/getAll-boads";
import { loginUserRouter } from "./useCases/signIn/login-user";
import { createUserRouter } from "./useCases/signUp/create-user";
import { createTaskRouter } from "./useCases/task/create-task";
import { deleteTaskRouter } from "./useCases/task/delete-task";
import { getTaskRouter } from "./useCases/task/get-task";
import { updateCompleteTaskRouter } from "./useCases/task/update-complete-task";
import { updateStatustaskRouter } from "./useCases/task/update-status-task";
import { UpdateSubTaskRouter } from "./useCases/task/update-subTask-task";

const router = Router();

// login e criação de usuario
router.post("/users", createUserMiddleware, createUserRouter);
router.post("/login", loginUserMiddlware, loginUserRouter);

// board
router.get("/boards", authenticationMiddleware, getAllBoardsRouter);
router.get(
  "/boards/:boardId",
  authenticationMiddleware,
  getBoardMiddleware,
  getBoardRouter
);
router.post(
  "/boards",
  authenticationMiddleware,
  createBoardMiddleware,
  createBoardRouter
);

// task
router.get(
  "/tasks/:taskId",
  authenticationMiddleware,
  getTaskMiddleware,
  getTaskRouter
);
router.post(
  "/tasks",
  authenticationMiddleware,
  createTaskMiddleware,
  createTaskRouter
);
router.patch(
  "/tasks/:subTaskId/subtask",
  authenticationMiddleware,
  updateSubTaskMiddleware,
  UpdateSubTaskRouter
);
router.patch(
  "/tasks/:statusId/status",
  authenticationMiddleware,
  updateStatusTaskMiddleware,
  updateStatustaskRouter
);

router.patch(
  "/tasks/:taskId",
  authenticationMiddleware,
  updateCompleteTaskMiddleware,
  updateCompleteTaskRouter
);

router.delete(
  "/tasks/:taskId",
  authenticationMiddleware,
  deleteTaskMiddleware,
  deleteTaskRouter
);

export { router };
