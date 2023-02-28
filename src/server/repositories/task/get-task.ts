import { IGetTaskRepository } from "../../controller/task/protocols";
import { Internal_Server_Error } from "../../helpers/api-errors";
import { Task } from "../../models/mongo-models/Tasks";
import { ITasks } from "../../models/protocols";

export class MongoGetTaskRepository implements IGetTaskRepository {
  async get(id: string): Promise<ITasks> {
    const task = await Task.findById(id);

    if (!task) {
      throw new Internal_Server_Error("error no servidor ao buscar a tesk");
    }

    const { _id, boardConnect, description, status, subTasks, text } = task;

    return {
      id: _id.toHexString(),
      boardConnect,
      description,
      status,
      subTasks,
      text,
    };
  }
}
