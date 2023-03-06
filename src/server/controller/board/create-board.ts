import { IBoard } from "../../models/protocols";
import { IControllers, IHttReponse, IHttRequest } from "../protocols";
import { ICreateBoardParams, ICreateBoardRepository } from "./protocols";

export class CreateBoardController implements IControllers {
  constructor(private readonly createBoardRepository: ICreateBoardRepository) {}

  async handle(
    req: IHttRequest<ICreateBoardParams>
  ): Promise<IHttReponse<Omit<IBoard, "userId">>> {
    const { boardName } = req.body!;
    const userId = req.headers?.userId as string;

    const board = await this.createBoardRepository.create(
      { boardName },
      userId
    );

    return {
      body: board,
      statusCode: 201,
    };
  }
}
