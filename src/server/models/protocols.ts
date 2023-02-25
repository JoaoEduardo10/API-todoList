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
  description: string;
  subTasks: ISubTasks[];
  boardId: Schema.Types.ObjectId | Tparams;
}

export interface IBoard {
  id: Tparams;
  boardName: string;
  taks: Schema.Types.ObjectId | Tparams;
}
