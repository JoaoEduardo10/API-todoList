import {
  ISubTaskParams,
  IUpdateSubTaskRepository,
} from "../../controller/task/protocols";
import { Internal_Server_Error } from "../../helpers/api-errors";
import { returnsNewSubTask, TsubTask } from "../../helpers/returnNewSubTask";
import { Task } from "../../models/mongo-models/Tasks";
import { ITasks } from "../../models/protocols";

export class MongoUpdateSubTaskRepository implements IUpdateSubTaskRepository {
  async update(id: string, params: ISubTaskParams): Promise<ITasks> {
    const { subTask } = params;

    const sub = await Task.findById(id);

    const { subTasks: subTaskCompleted } = sub!;

    console.log(returnsNewSubTask(subTaskCompleted, subTask));

    // const task = await Task.findByIdAndUpdate(id, {
    //   $set: { subTasks: { text: "amigo", concluded: true } },
    // })
    //   .where("subTask[$].uuid")
    //   .equals("9612d79d-edc5-4689-8cf7-9ccbd1ee16c7");

    // if (!task) {
    //   throw new Internal_Server_Error(
    //     "Erro no servidor ao atualizar o uma subTask"
    //   );
    // }

    // const { _id, boardConnect, subTasks, text, description, status } = task;

    return {
      id: "123",
      boardConnect: "123",
      subTasks: [{ concluded: false, text: "123", uuid: "123" }],
      text: "123",
      description: "123",
      status: "pending",
    };
  }
}
