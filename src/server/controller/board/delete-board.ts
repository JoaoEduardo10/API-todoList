import { IBoard } from "../../models/protocols";
import { IControllers, IHttReponse, IHttRequest } from "../protocols";
import { IDeleteBoardsRepository } from "./protocols";

export class DeleteBoardController implements IControllers {
  constructor(
    private readonly deleteBoardRepository: IDeleteBoardsRepository
  ) {}

  async handle(req: IHttRequest<any>): Promise<IHttReponse<IBoard>> {
    const boardId = req.params.boardId as string;

    const board = await this.deleteBoardRepository.delete(boardId);

    return {
      body: board,
      statusCode: 200,
    };
  }
}
