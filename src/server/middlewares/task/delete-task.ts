import { RequestHandler } from "express";
import { Not_Fould } from "../../helpers/api-errors";
import { Task } from "../../models/mongo-models/Tasks";

export const deleteTaskMiddleware: RequestHandler<{ taskId: string }> = async (
  req,
  _res,
  next
) => {
  const taskId = req.params.taskId;

  if (taskId.length != 24) {
    throw new Not_Fould("id incompleto ou invalido");
  }

  const task = await Task.findById(taskId);

  if (!task) {
    throw new Not_Fould("id da task não existe");
  }

  next();
};
