import { IDeleteTaskRepository } from "../../controller/task/protocols";
import { Task } from "../../models/mongo-models/Tasks";
import { ISubTasks, ITasks } from "../../models/protocols";

export class MongoDeleteTaskRepository implements IDeleteTaskRepository {
  async delete(id: string): Promise<ITasks> {
    const task = await Task.findByIdAndDelete(id);

    return {
      id: task?._id.toHexString() as string,
      boardConnect: task?.boardConnect as string,
      description: task?.description as string,
      subTasks: task?.subTasks as ISubTasks[],
      text: task?.text as string,
      status: task?.status as "pending" | "progress" | "concluded",
    };
  }
}
