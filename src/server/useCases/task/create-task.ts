import { RequestHandler } from "express";
import { CreateTaskController } from "../../controller/task/create-task";
import { ICreateTaskParams } from "../../controller/task/protocols";
import { MongoCreateTaskRepository } from "../../repositories/task/create-task";

export const createTaskRouter: RequestHandler<
  {},
  {},
  ICreateTaskParams
> = async (req, res) => {
  const mongoCreateTaskRepository = await new MongoCreateTaskRepository();

  const createTaskController = await new CreateTaskController(
    mongoCreateTaskRepository
  );

  const { body, statusCode } = await createTaskController.handle(req);

  res.status(statusCode).json(body);
};
