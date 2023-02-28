import { RequestHandler } from "express";
import { ICreateBoardParams } from "../../controller/board/protocols";
import { Bad_Request } from "../../helpers/api-errors";

export const createBoardMiddleware: RequestHandler<
  {},
  {},
  ICreateBoardParams
> = (req, res, next) => {
  const { boardName } = req.body;

  if (!boardName) {
    throw new Bad_Request("Adicone o titulo ao board");
  }

  if (boardName === "" || boardName.length === 0) {
    throw new Bad_Request("digite algo para o Board");
  }

  next();
};
