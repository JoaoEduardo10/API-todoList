import { RequestHandler } from "express";
import { Not_Fould } from "../../helpers/api-errors";
import { Task } from "../../models/mongo-models/Tasks";
import { ITasks } from "../../models/protocols";
import { TOmitId } from "../../types/types";

export const updateCompleteTaskMiddleware: RequestHandler<
  { taskId: string },
  {},
  TOmitId<ITasks>
> = async (req, _res, next) => {
  const taskId = req.params.taskId;

  if (taskId.length != 24) {
    throw new Not_Fould("Id imcompleto ou incorreto!");
  }

  const task = await Task.findById(taskId);

  if (!task) {
    throw new Not_Fould("Task não existe! verifique o id.");
  }

  next();
};
