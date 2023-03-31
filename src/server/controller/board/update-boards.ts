import { IBoard } from "../../models/protocols";
import { IControllers, IHttReponse, IHttRequest } from "../protocols";
import { IUpdateBoardRepository } from "./protocols";

export class UpdateBoardController implements IControllers {
  constructor(private readonly updateBoardRepository: IUpdateBoardRepository) {}

  async handle(
    req: IHttRequest<{ boardName: string }>
  ): Promise<IHttReponse<IBoard>> {
    const boardName = req.body?.boardName as string;
    const boardId = req.params.boardId as string;

    const board = await this.updateBoardRepository.update(boardId, boardName);

    return {
      body: board,
      statusCode: 200,
    };
  }
}
