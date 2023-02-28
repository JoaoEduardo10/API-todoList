import { Schema } from "mongoose";
import { IBoard } from "../../models/protocols";

export interface ICreateBoardParams {
  boardName: string;
}

interface IGetTask {
  _id?: Schema.Types.ObjectId | string;
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

export interface ICreateBoardRepository {
  create(params: ICreateBoardParams): Promise<IBoard>;
}

export interface IGetBoardRepository {
  get(id: string): Promise<IGetBoard>;
}
