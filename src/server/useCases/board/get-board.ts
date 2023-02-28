import { RequestHandler } from "express";
import { GetBoardController } from "../../controller/task/get-board";
import { MongoGetBoardRepository } from "../../repositories/board/get-task";

export const getBoardRouter: RequestHandler = async (req, res) => {
  const mongoGetBoardRepository = await new MongoGetBoardRepository();

  const getBoardController = await new GetBoardController(
    mongoGetBoardRepository
  );

  const { body, statusCode } = await getBoardController.handle(req);

  res.status(statusCode).json(body);
};
