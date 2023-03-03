import { ITasks } from "../../models/protocols";
import { IControllers, IHttReponse, IHttRequest } from "../protocols";
import { IDeleteTaskRepository } from "./protocols";

export class DeleteTaskController implements IControllers {
  constructor(private readonly deleteTaskRepository: IDeleteTaskRepository) {}

  async handle(req: IHttRequest<any>): Promise<IHttReponse<ITasks>> {
    const taskId = req.params.taskId as string;

    const task = await this.deleteTaskRepository.delete(taskId);

    return {
      body: task,
      statusCode: 200,
    };
  }
}
