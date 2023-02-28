import { RequestHandler } from "express";
import { CreateBoardController } from "../../controller/board/create-board";
import { MongoCreateBoardRepository } from "../../repositories/board/create-board";

export const createBoardRouter: RequestHandler = async (req, res) => {
  const mongoCreateBoardRepository = await new MongoCreateBoardRepository();

  const createBoardController = await new CreateBoardController(
    mongoCreateBoardRepository
  );

  const { body, statusCode } = await createBoardController.handle(req);

  res.status(statusCode).json(body);
};
