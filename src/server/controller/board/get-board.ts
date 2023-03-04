/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { IControllers, IHttReponse, IHttRequest } from "../protocols";
import { IGetBoardRepository } from "./protocols";

export class GetBoardController implements IControllers {
  constructor(private readonly getBoardRepository: IGetBoardRepository) {}

  async handle(req: IHttRequest<unknown>): Promise<IHttReponse<unknown>> {
    const boardId = req.params.boardId as string;
    const userId = req.headers?.userId!;

    const board = await this.getBoardRepository.get(boardId, userId);

    return {
      body: board,
      statusCode: 200,
    };
  }
}
