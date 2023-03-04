import { RequestHandler } from "express";
import { IHttRequest } from "../../controller/protocols";
import { IStatusParams } from "../../controller/task/protocols";
import { UpdateStatusTaskController } from "../../controller/task/update-status-task";
import { MongoUpdateStatusTaskRepository } from "../../repositories/task/update-status-task";

export const updateStatustaskRouter: RequestHandler = async (req, res) => {
  const mongoUpdateStatusTaskRepository =
    await new MongoUpdateStatusTaskRepository();

  const updateStatustaskController = await new UpdateStatusTaskController(
    mongoUpdateStatusTaskRepository
  );

  const { body, statusCode } = await updateStatustaskController.handle(
    req as IHttRequest<IStatusParams>
  );

  res.status(statusCode).json(body);
};
