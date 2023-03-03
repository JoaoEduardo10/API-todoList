import { RequestHandler } from "express";
import { DeleteTaskController } from "../../controller/task/delete-task";
import { MongoDeleteTaskRepository } from "../../repositories/task/delete-task";

export const deleteTaskRouter: RequestHandler = async (req, res) => {
  const mongoDeleteTaskRepository = await new MongoDeleteTaskRepository();

  const deleteTaskController = await new DeleteTaskController(
    mongoDeleteTaskRepository
  );

  const { body, statusCode } = await deleteTaskController.handle(req);

  res.status(statusCode).json(body);
};
