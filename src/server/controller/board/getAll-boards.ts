import { IControllers, IHttReponse, IHttRequest } from "../protocols";
import { IGetAllBoardsRepository, IGetBoard } from "./protocols";

export class GetAllBoardsController implements IControllers {
  constructor(
    private readonly getAllBoardsRepository: IGetAllBoardsRepository
  ) {}

  async handle(
    req: IHttRequest<any>
  ): Promise<IHttReponse<Omit<IGetBoard, "tasks">[]>> {
    const userId = req.headers?.userId as string;

    const boards = await this.getAllBoardsRepository.get(userId);

    return {
      body: boards,
      statusCode: 200,
    };
  }
}
