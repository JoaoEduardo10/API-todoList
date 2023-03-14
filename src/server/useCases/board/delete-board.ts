import { RequestHandler } from "express";
import { DeleteBoardController } from "../../controller/board/delete-board";
import { IHttRequest } from "../../controller/protocols";
import { MongoDeleteBoardRepository } from "../../repositories/board/delete-board";

export const deleteBoardRouter: RequestHandler = async (req, res) => {
  const mongoDeleteBoardRepository = new MongoDeleteBoardRepository();

  const deleteBoardController = new DeleteBoardController(
    mongoDeleteBoardRepository
  );

  const { body, statusCode } = await deleteBoardController.handle(
    req as IHttRequest<any>
  );

  res.status(statusCode).json(body);
};
