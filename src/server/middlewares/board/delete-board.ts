import { RequestHandler } from "express";
import { Not_Fould } from "../../helpers/api-errors";
import { Board } from "../../models/mongo-models/Board";

export const DeleteBoardMiddleware: RequestHandler<{
  boardId: string;
}> = async (req, _res, next) => {
  const boardId = req.params.boardId;

  if (boardId === null || boardId === undefined) {
    throw new Not_Fould("Adicione um id valido");
  }

  if (boardId.length != 24) {
    throw new Not_Fould("Id invalido!");
  }

  const board = await Board.findById(boardId);

  if (!board) {
    throw new Not_Fould("Id invalido. Board não existente!");
  }

  next();
};
