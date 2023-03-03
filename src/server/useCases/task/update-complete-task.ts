import { RequestHandler } from "express";
import { UpdateCompleteTaskController } from "../../controller/task/update-complete-task";
import { MongoUpdateCompleteTaskRepository } from "../../repositories/task/update-complete-task";

export const updateCompleteTaskRouter: RequestHandler = async (req, res) => {
  const mongoUpdateCompleteTaskRepository =
    new MongoUpdateCompleteTaskRepository();

  const updateCompleteTaskController = new UpdateCompleteTaskController(
    mongoUpdateCompleteTaskRepository
  );

  const { body, statusCode } = await updateCompleteTaskController.handle(req);

  res.status(statusCode).json(body);
};
