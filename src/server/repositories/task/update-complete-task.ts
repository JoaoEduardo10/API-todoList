import { IUpdateCompleteTaskRepository } from "../../controller/task/protocols";
import { Internal_Server_Error } from "../../helpers/api-errors";
import { Task } from "../../models/mongo-models/Tasks";
import { ITasks } from "../../models/protocols";
import { TOmitId } from "../../types/types";

export class MongoUpdateCompleteTaskRepository
  implements IUpdateCompleteTaskRepository
{
  async update(id: string, task: TOmitId<ITasks>): Promise<ITasks> {
    await Task.findByIdAndUpdate(id, { $set: task });

    const newTask = await Task.findById(id);

    if (!newTask) {
      throw new Internal_Server_Error(
        "Erro no banco de dados ao atualizar o usuario!"
      );
    }

    const { _id, boardConnect, description, subTasks, text, status } = newTask;

    return {
      id: _id.toHexString(),
      boardConnect,
      description,
      subTasks,
      text,
      status,
    };
  }
}
