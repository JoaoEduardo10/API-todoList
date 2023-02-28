import { IBoard } from "../../models/protocols";
import { IControllers, IHttReponse, IHttRequest } from "../protocols";
import { ICreateBoardParams, ICreateBoardRepository } from "./protocols";

export class CreateBoardController implements IControllers {
  constructor(private readonly createBoardRepository: ICreateBoardRepository) {}

  async handle(
    req: IHttRequest<ICreateBoardParams>
  ): Promise<IHttReponse<IBoard>> {
    const { boardName } = req.body!;

    const board = await this.createBoardRepository.create({ boardName });

    return {
      body: board,
      statusCode: 201,
    };
  }
}
