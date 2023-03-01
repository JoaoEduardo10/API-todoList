import { RequestHandler } from "express";
import { UpdateSubTaskController } from "../../controller/task/update-subTask-task";
import { MongoUpdateSubTaskRepository } from "../../repositories/task/update-subTask-task";

export const UpdateSubTaskRouter: RequestHandler = async (req, res) => {
  const mongoUpdateSubTaskRepository = await new MongoUpdateSubTaskRepository();

  const updateSubTaskController = await new UpdateSubTaskController(
    mongoUpdateSubTaskRepository
  );

  const { body, statusCode } = await updateSubTaskController.handle(req);

  res.status(statusCode).json("ok");
};
