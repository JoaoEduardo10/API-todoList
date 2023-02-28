import { RequestHandler } from "express";
import { Not_Fould } from "../../helpers/api-errors";

export const getTaskMiddleware: RequestHandler<{ taskId: string }> = (
  req,
  _res,
  next
) => {
  const taskId = req.params.taskId;

  if (taskId.length != 24) {
    throw new Not_Fould("Id invalido!");
  }

  next();
};
