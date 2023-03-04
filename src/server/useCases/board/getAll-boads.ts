import { Request, Response } from "express";
import { GetAllBoardsController } from "../../controller/board/getAll-boards";
import { IHttRequest } from "../../controller/protocols";
import { MongoGetAllBoardsRepository } from "../../repositories/board/getAll-boards";

export const getAllBoardsRouter = async (req: Request, res: Response) => {
  const mongoGetAllBoardsRepository = new MongoGetAllBoardsRepository();

  const getAllBoardsController = new GetAllBoardsController(
    mongoGetAllBoardsRepository
  );

  const { body, statusCode } = await getAllBoardsController.handle(
    req as IHttRequest<any>
  );

  res.status(statusCode).json(body);
};
