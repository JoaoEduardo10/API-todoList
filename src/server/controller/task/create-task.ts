import { ITasks } from "../../models/protocols";
import { IControllers, IHttReponse, IHttRequest } from "../protocols";
import { ICreateTaskParams, ICreateTaskRepository } from "./protocols";

export class CreateTaskController implements IControllers {
  constructor(private readonly createTaskRepository: ICreateTaskRepository) {}

  async handle(
    req: IHttRequest<ICreateTaskParams>
  ): Promise<IHttReponse<ITasks>> {
    const { boardConnect, subTasks, text, description } = req.body!;

    const task = await this.createTaskRepository.create({
      boardConnect,
      subTasks,
      text,
      description,
    });

    return {
      body: task,
      statusCode: 201,
    };
  }
}
