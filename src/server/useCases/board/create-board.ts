import { RequestHandler } from "express";
import { CreateBoardControllers } from "../../controller/board/create-board";
import { ICreateBoardParams } from "../../controller/board/protocols";
import { MongoCreateBoardeRepository } from "../../repositories/board/create-board";

export const createBoardRouter: RequestHandler<
  {},
  {},
  ICreateBoardParams
> = async (req, res) => {
  const mongoCreateBoardRepository = await new MongoCreateBoardeRepository();

  const createBoardController = await new CreateBoardControllers(
    mongoCreateBoardRepository
  );

  const { body, statusCode } = await createBoardController.handle(req);

  res.status(statusCode).json(body);
};
