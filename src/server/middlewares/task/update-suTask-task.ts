/* eslint-disable for-direction */
import { RequestHandler } from "express";
import { ISubTaskParams } from "../../controller/task/protocols";
import { Bad_Request, Not_Fould } from "../../helpers/api-errors";
import { Task } from "../../models/mongo-models/Tasks";
import { ISubTasks } from "../../models/protocols";

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

  for (let i = 0; i < req.body.length - 1; i++) {
    for (let j = req.body.length - 1; j > 0; j--) {
      if (subTasks[i].uuid == req.body[j as number].uuid) {
        throw new Bad_Request("Id já usado ou esta com um campo a mais");
      }
    }
  }

  const task = await Task.findById(subTaskId);

  if (!task) {
    throw new Not_Fould("Id da invalido!");
  }

  next();
};
