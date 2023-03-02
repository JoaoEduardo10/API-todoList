import { RequestHandler } from "express";
import { IStatusParams } from "../../controller/task/protocols";
import { Bad_Request, Not_Fould } from "../../helpers/api-errors";
import { Task } from "../../models/mongo-models/Tasks";

export const updateStatusTaskMiddleware: RequestHandler<
  { statusId: string },
  {},
  IStatusParams
> = async (req, _res, next) => {
  const statusId = req.params.statusId;
  const status = req.body.status;

  if (statusId.length != 24) {
    throw new Not_Fould("Id invalido!");
  }

  if (!status) {
    throw new Bad_Request("Adicione um status");
  }

  if (!["concluded", "pending", "progress"].includes(status)) {
    throw new Bad_Request(
      "So pode enviar os parametros: progress, pending, concluded"
    );
  }

  const task = await Task.findById(statusId);

  if (!task) {
    throw new Bad_Request("task não existe!");
  }

  next();
};
