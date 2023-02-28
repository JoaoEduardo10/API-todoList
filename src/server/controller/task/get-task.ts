import { ITasks } from "../../models/protocols";
import { IControllers, IHttReponse, IHttRequest } from "../protocols";
import { IGetTaskRepository } from "./protocols";

export class GetTaskController implements IControllers {
  constructor(private readonly getTasksRepository: IGetTaskRepository) {}

  async handle(req: IHttRequest<any>): Promise<IHttReponse<ITasks>> {
    const taskId = req.params.taskId as string;

    const task = await this.getTasksRepository.get(taskId);

    return {
      body: task,
      statusCode: 200,
    };
  }
}
