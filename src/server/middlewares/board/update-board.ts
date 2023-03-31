import { RequestHandler } from "express";
import { Bad_Request, Not_Fould } from "../../helpers/api-errors";

export const updateBoardMiddleware: RequestHandler = (req, res, next) => {
  const boardId = req.params.boardId as string;
  const boardName = req.body.boardName as string;

  if (boardId.length != 24) {
    throw new Not_Fould("Id invalido!");
  }

  if (!boardName) {
    throw new Bad_Request("Adicone um BoardName!");
  }

  next();
};
