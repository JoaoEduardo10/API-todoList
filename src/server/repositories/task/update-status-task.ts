import {
  IStatusParams,
  IUpdateStatusRepositopry,
} from "../../controller/task/protocols";
import { Task } from "../../models/mongo-models/Tasks";
import { ITasks } from "../../models/protocols";

export class MongoUpdateStatusTaskRepository
  implements IUpdateStatusRepositopry
{
  async update(id: string, params: IStatusParams): Promise<ITasks> {
    const { status } = params;

    await Task.findByIdAndUpdate(id, { $set: { status } });

    const task = await Task.findById(id);

    const {
      boardConnect,
      description,
      status: newStatus,
      subTasks,
      text,
    } = task!;

    return {
      id: task?._id.toHexString() as string,
      boardConnect,
      description,
      status: newStatus,
      subTasks,
      text,
    };
  }
}
