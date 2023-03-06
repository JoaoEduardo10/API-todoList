import { IUpdateCompleteTaskRepository } from "../../controller/task/protocols";
import { Task } from "../../models/mongo-models/Tasks";
import { ISubTasks, ITasks } from "../../models/protocols";
import { TOmitId } from "../../types/types";

export class MongoUpdateCompleteTaskRepository
  implements IUpdateCompleteTaskRepository
{
  async update(id: string, task: TOmitId<ITasks>): Promise<ITasks> {
    await Task.findByIdAndUpdate(id, { $set: task });

    const newTask = await Task.findById(id);

    return {
      id: newTask?._id.toHexString() as string,
      boardConnect: newTask?.boardConnect as string,
      description: newTask?.description as string,
      subTasks: newTask?.subTasks as ISubTasks[],
      text: newTask?.text as string,
      status: newTask?.status as "pending" | "progress" | "concluded",
    };
  }
}
