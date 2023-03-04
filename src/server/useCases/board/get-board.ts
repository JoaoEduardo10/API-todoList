import { RequestHandler } from "express";
import { GetBoardController } from "../../controller/board/get-board";
import { IHttRequest } from "../../controller/protocols";
import { MongoGetBoardRepository } from "../../repositories/board/get-task";

export const getBoardRouter: RequestHandler = async (req, res) => {
  const mongoGetBoardRepository = await new MongoGetBoardRepository();

  const getBoardController = await new GetBoardController(
    mongoGetBoardRepository
  );

  const { body, statusCode } = await getBoardController.handle(
    req as IHttRequest<any>
  );

  res.status(statusCode).json(body);
};
