import { ITasks } from "../../models/protocols";
import { TOmitId } from "../../types/types";
import { IControllers, IHttReponse, IHttRequest } from "../protocols";
import { IUpdateCompleteTaskRepository } from "./protocols";

export class UpdateCompleteTaskController implements IControllers {
  constructor(
    private readonly updateCompleteTaskRepository: IUpdateCompleteTaskRepository
  ) {}

  async handle(
    req: IHttRequest<TOmitId<ITasks>>
  ): Promise<IHttReponse<ITasks>> {
    const body = req.body!;
    const taskId = req.params.taskId as string;

    const task = await this.updateCompleteTaskRepository.update(taskId, body);

    return {
      body: task,
      statusCode: 200,
    };
  }
}
