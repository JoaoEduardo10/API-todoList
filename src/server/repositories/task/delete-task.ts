import { IDeleteTaskRepository } from "../../controller/task/protocols";
import { Internal_Server_Error } from "../../helpers/api-errors";
import { Task } from "../../models/mongo-models/Tasks";
import { ITasks } from "../../models/protocols";

export class MongoDeleteTaskRepository implements IDeleteTaskRepository {
  async delete(id: string): Promise<ITasks> {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      throw new Internal_Server_Error(
        "Eerro no banco de dados ao deletar a task"
      );
    }

    const { _id, boardConnect, description, subTasks, text, status } = task;

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
