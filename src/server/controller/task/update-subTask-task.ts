import { ITasks } from "../../models/protocols";
import { IControllers, IHttReponse, IHttRequest } from "../protocols";
import { ISubTaskParams, IUpdateSubTaskRepository } from "./protocols";

export class UpdateSubTaskController implements IControllers {
  constructor(
    private readonly updateSubTaskRepository: IUpdateSubTaskRepository
  ) {}

  async handle(req: IHttRequest<ISubTaskParams>): Promise<IHttReponse<ITasks>> {
    const subTask = req.body!;
    const subTaskId = req.params.subTaskId as string;

    const task = await this.updateSubTaskRepository.update(subTaskId, subTask);

    return {
      body: task,
      statusCode: 200,
    };
  }
}
