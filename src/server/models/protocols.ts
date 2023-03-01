import { Tparams } from "../types/types";

export type ISubTasks = {
  text: string;
  concluded: boolean;
  uuid: string;
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
  boardConnect: string;
}

export interface IBoard {
  id: Tparams;
  boardName: string;
  taskConnect: string;
}
