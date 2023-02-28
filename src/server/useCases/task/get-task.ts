import { RequestHandler } from "express";
import { GetTaskController } from "../../controller/task/get-task";
import { MongoGetTaskRepository } from "../../repositories/task/get-task";

export const getTaskRouter: RequestHandler = async (req, res) => {
  const mongoGetTaskRepository = await new MongoGetTaskRepository();

  const getTaskConytroller = await new GetTaskController(
    mongoGetTaskRepository
  );

  const { body, statusCode } = await getTaskConytroller.handle(req);

  res.status(statusCode).json(body);
};
