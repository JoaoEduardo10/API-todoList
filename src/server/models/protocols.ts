import { Schema } from "mongoose";
import { Tparams } from "../types/types";

export type ISubTasks = {
  text: string;
  concluded: boolean;
};

export interface IUser {
  id: Tparams;
  name: string;
  email: string;
  password: string;
}

export interface ITasks {
  id: Tparams;
  text: string;
  description: string;
  subTasks: ISubTasks[];
  status: "pending" | "progress" | "concluded";
  boardId: Schema.Types.ObjectId | Tparams;
}

export interface IBoard {
  id: Tparams;
  boardName: string;
  taks: [
    {
      task: Schema.Types.ObjectId | Tparams;
    }
  ];
}
