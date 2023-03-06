import {
  IStatusParams,
  IUpdateStatusRepositopry,
} from "../../controller/task/protocols";
import { Task } from "../../models/mongo-models/Tasks";
import { ISubTasks, ITasks } from "../../models/protocols";

export class MongoUpdateStatusTaskRepository
  implements IUpdateStatusRepositopry
{
  async update(id: string, params: IStatusParams): Promise<ITasks> {
    const { status } = params;

    await Task.findByIdAndUpdate(id, { $set: { status } });

    const task = await Task.findById(id);

    return {
      id: task?._id.toHexString() as string,
      boardConnect: task?.boardConnect as string,
      description: task?.description as string,
      status: task?.status as "pending" | "progress" | "concluded",
      subTasks: task?.subTasks as ISubTasks[],
      text: task?.text as string,
    };
  }
}
