import {
  ICreateTaskParams,
  ICreateTaskRepository,
} from "../../controller/task/protocols";
import { Internal_Server_Error } from "../../helpers/api-errors";
import { Task } from "../../models/mongo-models/Tasks";
import { ITasks } from "../../models/protocols";

export class MongoCreateTaskRepository implements ICreateTaskRepository {
  async create(params: ICreateTaskParams): Promise<ITasks> {
    const task = await Task.create(params);

    if (!task) {
      throw new Internal_Server_Error(
        "Erro no banco de dados ao criar a task!"
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
