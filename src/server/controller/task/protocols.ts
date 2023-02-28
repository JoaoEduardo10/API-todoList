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

export interface ICreateTaskRepository {
  create(params: ICreateTaskParams): Promise<ITasks>;
}
