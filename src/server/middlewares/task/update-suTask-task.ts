/* eslint-disable for-direction */
import { RequestHandler } from "express";
import { ISubTaskParams } from "../../controller/task/protocols";
import { Bad_Request, Not_Fould } from "../../helpers/api-errors";
import { Task } from "../../models/mongo-models/Tasks";

export const updateSubTaskMiddleware: RequestHandler<
  { subTaskId: string },
  {},
  ISubTaskParams
> = async (req, res, next) => {
  const subTaskId = req.params.subTaskId;
  const subTasks = req.body;

  if (req.body == null || undefined) {
    throw new Bad_Request("adicione um body");
  }

  if (subTaskId.length != 24) {
    throw new Not_Fould("Id invalido");
  }

  if (subTasks.length <= 0) {
    throw new Bad_Request("Adicone uma subtask");
  }

  subTasks.map((task) => {
    if (!task.uuid) {
      throw new Bad_Request("Adicione um uuid");
    }

    if (task.concluded == null) {
      throw new Bad_Request("Adicione um concluded");
    }
  });

  const task = await Task.findById(subTaskId);

  if (!task) {
    throw new Not_Fould("Id da invalido!");
  }

  next();
};
