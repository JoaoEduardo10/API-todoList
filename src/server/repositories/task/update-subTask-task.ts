import {
  ISubTaskParams,
  IUpdateSubTaskRepository,
} from "../../controller/task/protocols";
import { Internal_Server_Error } from "../../helpers/api-errors";
import { returnsNewSubTask } from "../../helpers/returnNewSubTask";
import { Task } from "../../models/mongo-models/Tasks";
import { ITasks } from "../../models/protocols";

export class MongoUpdateSubTaskRepository implements IUpdateSubTaskRepository {
  async update(id: string, params: ISubTaskParams): Promise<ITasks> {
    const subTaskOfId = await Task.findById(id);

    const { subTasks: subTaskCompleted } = subTaskOfId!;

    const newSubTask = returnsNewSubTask(subTaskCompleted, params);

    const updateTask = await Task.findByIdAndUpdate(id, {
      $set: { subTasks: newSubTask },
    });

    const task = await Task.findById(updateTask?._id);

    if (!task) {
      throw new Internal_Server_Error(
        "Erro no servidor ao atualizar o uma subTask"
      );
    }

    const { _id, boardConnect, subTasks, text, description, status } = task;

    return {
      id: _id.toHexString(),
      boardConnect,
      subTasks,
      text,
      description,
      status,
    };
  }
}
