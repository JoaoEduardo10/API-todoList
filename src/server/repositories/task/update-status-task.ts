import {
  IStatusParams,
  IUpdateStatusRepositopry,
} from "../../controller/task/protocols";
import { Internal_Server_Error } from "../../helpers/api-errors";
import { Task } from "../../models/mongo-models/Tasks";
import { ITasks } from "../../models/protocols";

export class MongoUpdateStatusTaskRepository
  implements IUpdateStatusRepositopry
{
  async update(id: string, params: IStatusParams): Promise<ITasks> {
    const { status } = params;

    await Task.findByIdAndUpdate(id, { $set: { status } });

    const task = await Task.findById(id);

    if (!task) {
      throw new Internal_Server_Error(
        "Error no banco de dados ao atualizar o status"
      );
    }

    const {
      _id,
      boardConnect,
      description,
      status: newStatus,
      subTasks,
      text,
    } = task;

    return {
      id: _id.toHexString(),
      boardConnect,
      description,
      status: newStatus,
      subTasks,
      text,
    };
  }
}
