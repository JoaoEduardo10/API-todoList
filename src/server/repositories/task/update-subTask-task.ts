import {
  ISubTaskParams,
  IUpdateSubTaskRepository,
} from "../../controller/task/protocols";
import { returnsNewSubTask } from "../../helpers/returnNewSubTask";
import { Task } from "../../models/mongo-models/Tasks";
import { ITasks } from "../../models/protocols";

export class MongoUpdateSubTaskRepository implements IUpdateSubTaskRepository {
  async update(id: string, params: ISubTaskParams): Promise<ITasks> {
    const subTaskOfId = await Task.findById(id);

    const { subTasks } = subTaskOfId!;

    const newSubTask = returnsNewSubTask(subTasks, params);

    const updateTask = await Task.findByIdAndUpdate(id, {
      $set: { subTasks: newSubTask },
    });

    const task = await Task.findById(updateTask?._id);

    const {
      boardConnect,
      subTasks: subTaskCompleted,
      text,
      description,
      status,
    } = task!;

    return {
      id: updateTask?._id.toHexString() as string,
      boardConnect,
      subTasks: subTaskCompleted,
      text,
      description,
      status,
    };
  }
}
