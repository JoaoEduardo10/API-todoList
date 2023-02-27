import { RequestHandler } from "express";
import { GetAllBoardController } from "../../controller/board/getAll-board";
import { MongoGetAllBoardRepository } from "../../repositories/board/getAll-board";

export const getAllBoardRouter: RequestHandler = async (req, res) => {
  const mongoGetAllBoardRepositpory = await new MongoGetAllBoardRepository();

  const getAllBoardController = await new GetAllBoardController(
    mongoGetAllBoardRepositpory
  );

  const { body, statusCode } = await getAllBoardController.handle(req);

  res.status(statusCode).json(body);
};
