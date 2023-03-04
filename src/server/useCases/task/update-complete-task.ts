import { RequestHandler } from "express";
import { IHttRequest } from "../../controller/protocols";
import { UpdateCompleteTaskController } from "../../controller/task/update-complete-task";
import { ITasks } from "../../models/protocols";
import { MongoUpdateCompleteTaskRepository } from "../../repositories/task/update-complete-task";
import { TOmitId } from "../../types/types";

export const updateCompleteTaskRouter: RequestHandler = async (req, res) => {
  const mongoUpdateCompleteTaskRepository =
    new MongoUpdateCompleteTaskRepository();

  const updateCompleteTaskController = new UpdateCompleteTaskController(
    mongoUpdateCompleteTaskRepository
  );

  const { body, statusCode } = await updateCompleteTaskController.handle(
    req as IHttRequest<TOmitId<ITasks>>
  );

  res.status(statusCode).json(body);
};
