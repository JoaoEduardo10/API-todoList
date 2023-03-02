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

export type ISubTaskParams = [
  {
    text: string;
    uuid: string;
    concluded: boolean;
  }
];

export interface IStatusParams {
  status: "pending" | "progress" | "concluded";
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

export interface IUpdateStatusRepositopry {
  update(id: string, params: IStatusParams): Promise<ITasks>;
}
