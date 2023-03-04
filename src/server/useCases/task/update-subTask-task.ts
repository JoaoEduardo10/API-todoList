import { RequestHandler } from "express";
import { IHttRequest } from "../../controller/protocols";
import { ISubTaskParams } from "../../controller/task/protocols";
import { UpdateSubTaskController } from "../../controller/task/update-subTask-task";
import { MongoUpdateSubTaskRepository } from "../../repositories/task/update-subTask-task";

export const UpdateSubTaskRouter: RequestHandler = async (req, res) => {
  const mongoUpdateSubTaskRepository = await new MongoUpdateSubTaskRepository();

  const updateSubTaskController = await new UpdateSubTaskController(
    mongoUpdateSubTaskRepository
  );

  const { body, statusCode } = await updateSubTaskController.handle(
    req as IHttRequest<ISubTaskParams>
  );

  res.status(statusCode).json(body);
};
