import { RequestHandler } from "express";
import { UpdateBoardController } from "../../controller/board/update-boards";
import { IHttRequest } from "../../controller/protocols";
import { MongoUpdateBoardRepository } from "../../repositories/board/update-board";

export const updateBoardRouter: RequestHandler = async (req, res) => {
  const mongoUpdateBoardRepository = new MongoUpdateBoardRepository();

  const updateBoardController = new UpdateBoardController(
    mongoUpdateBoardRepository
  );

  const { body, statusCode } = await updateBoardController.handle(
    req as IHttRequest<{ boardName: string }>
  );

  res.status(statusCode).json(body);
};
