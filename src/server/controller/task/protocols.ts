import { Schema } from "mongoose";
import { ITasks } from "../../models/protocols";

export interface ICreateTaskParams {
  text: string;
  description?: string;
  subTasks: [
    {
      text: string;
      concluded: boolean;
    }
  ];
  boardConnect: Schema.Types.ObjectId | string;
}

interface IGetTask {
  _id: Schema.Types.ObjectId;
  text: string;
  description: string;
  status: "pending" | "progress" | "concluded";
  boardConnect: string;
}

export interface IGetBoard {
  id: string;
  boardName: string;
  taskConnect: string;
  tasks: IGetTask[];
}

export interface ICreateTaskRepository {
  create(params: ICreateTaskParams): Promise<ITasks>;
}

export interface IGetBoardRepository {
  get(id: string): Promise<IGetBoard>;
}
