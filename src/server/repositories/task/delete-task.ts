import { IDeleteTaskRepository } from "../../controller/task/protocols";
import { Task } from "../../models/mongo-models/Tasks";
import { ITasks } from "../../models/protocols";

export class MongoDeleteTaskRepository implements IDeleteTaskRepository {
  async delete(id: string): Promise<ITasks> {
    const task = await Task.findByIdAndDelete(id);

    const { boardConnect, description, subTasks, text, status } = task!;

    return {
      id: task?._id.toHexString() as string,
      boardConnect,
      description,
      subTasks,
      text,
      status,
    };
  }
}
