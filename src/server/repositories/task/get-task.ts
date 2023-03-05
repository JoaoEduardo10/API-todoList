import { IGetTaskRepository } from "../../controller/task/protocols";
import { Task } from "../../models/mongo-models/Tasks";
import { ITasks } from "../../models/protocols";

export class MongoGetTaskRepository implements IGetTaskRepository {
  async get(id: string): Promise<ITasks> {
    const task = await Task.findById(id);

    const { _id, boardConnect, description, status, subTasks, text } = task!;

    return {
      id: _id.toHexString(),
      boardConnect,
      description,
      status,
      subTasks,
      text,
    };
  }
}
