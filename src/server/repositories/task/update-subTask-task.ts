import {
  ISubTaskParams,
  IUpdateSubTaskRepository,
} from "../../controller/task/protocols";
import { returnsNewSubTask } from "../../helpers/returnNewSubTask";
import { Task } from "../../models/mongo-models/Tasks";
import { ISubTasks, ITasks } from "../../models/protocols";

export class MongoUpdateSubTaskRepository implements IUpdateSubTaskRepository {
  async update(id: string, params: ISubTaskParams): Promise<ITasks> {
    const subTaskOfId = await Task.findById(id);

    const { subTasks: subTaskCompleted } = subTaskOfId!;

    const newSubTask = returnsNewSubTask(subTaskCompleted, params);

    const updateTask = await Task.findByIdAndUpdate(id, {
      $set: { subTasks: newSubTask },
    });

    const task = await Task.findById(updateTask?._id);

    return {
      id: task?._id.toHexString() as string,
      boardConnect: task?.boardConnect as string,
      subTasks: task?.subTasks as ISubTasks[],
      text: task?.text as string,
      description: task?.description as string,
      status: task?.status as "pending" | "progress" | "concluded",
    };
  }
}
