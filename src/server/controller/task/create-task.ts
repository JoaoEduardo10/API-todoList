import { Board } from "../../models/mongo-models/Board";
import { ITasks } from "../../models/protocols";
import { IControllers, IHttReponse, IHttRequest } from "../protocols";
import { ICreateTaskParams, ICreateTaskRepository } from "./protocols";
import { ObjectId } from "mongoose";

export class CreateTaskController implements IControllers {
  constructor(private readonly createTaskRepository: ICreateTaskRepository) {}

  async handle(
    req: IHttRequest<ICreateTaskParams>
  ): Promise<IHttReponse<ITasks>> {
    const { boardId, subTasks, text, description } = req.body!;

    const task = await this.createTaskRepository.create({
      boardId,
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
