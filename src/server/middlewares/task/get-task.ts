import { RequestHandler } from "express";
import { Not_Fould } from "../../helpers/api-errors";
import { Task } from "../../models/mongo-models/Tasks";

export const getTaskMiddleware: RequestHandler<{ taskId: string }> = async (
  req,
  _res,
  next
) => {
  const taskId = req.params.taskId;

  if (taskId.length != 24) {
    throw new Not_Fould("Id invalido!");
  }

  const task = await Task.findById(taskId);

  if (!task) {
    throw new Not_Fould("Task não existe!");
  }

  next();
};
