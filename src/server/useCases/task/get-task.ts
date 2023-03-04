import { RequestHandler } from "express";
import { IHttRequest } from "../../controller/protocols";
import { GetTaskController } from "../../controller/task/get-task";
import { MongoGetTaskRepository } from "../../repositories/task/get-task";

export const getTaskRouter: RequestHandler = async (req, res) => {
  const mongoGetTaskRepository = await new MongoGetTaskRepository();

  const getTaskConytroller = await new GetTaskController(
    mongoGetTaskRepository
  );

  const { body, statusCode } = await getTaskConytroller.handle(
    req as IHttRequest<any>
  );

  res.status(statusCode).json(body);
};
