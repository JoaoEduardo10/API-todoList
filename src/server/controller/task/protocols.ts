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

export interface ISubTaskParams {
  subTask: [
    {
      text: string;
      uuid: string;
      concluded: boolean;
    }
  ];
}

export interface ICreateTaskRepository {
  create(params: ICreateTaskParams): Promise<ITasks>;
}

export interface IGetTaskRepository {
  get(id: string): Promise<ITasks>;
}

export interface IUpdateSubTaskRepository {
  update(id: string, params: ISubTaskParams): Promise<ITasks>;
}
