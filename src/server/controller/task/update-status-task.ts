import { ITasks } from "../../models/protocols";
import { IControllers, IHttReponse, IHttRequest } from "../protocols";
import { IStatusParams, IUpdateStatusRepositopry } from "./protocols";

export class UpdateStatusTaskController implements IControllers {
  constructor(
    private readonly updateStatusRepository: IUpdateStatusRepositopry
  ) {}

  async handle(req: IHttRequest<IStatusParams>): Promise<IHttReponse<ITasks>> {
    const status = req.body!;
    const statusId = req.params.statusId as string;

    const task = await this.updateStatusRepository.update(statusId, status);

    return {
      body: task,
      statusCode: 200,
    };
  }
}
