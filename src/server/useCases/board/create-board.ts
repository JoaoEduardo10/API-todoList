import { RequestHandler } from "express";
import { CreateBoardController } from "../../controller/board/create-board";
import { IHttRequest } from "../../controller/protocols";
import { MongoCreateBoardRepository } from "../../repositories/board/create-board";

export const createBoardRouter: RequestHandler = async (req, res) => {
  const mongoCreateBoardRepository = await new MongoCreateBoardRepository();

  const createBoardController = await new CreateBoardController(
    mongoCreateBoardRepository
  );

  const { body, statusCode } = await createBoardController.handle(
    req as IHttRequest<any>
  );

  res.status(statusCode).json(body);
};
