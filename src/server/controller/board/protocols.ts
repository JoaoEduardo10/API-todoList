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
  _id?(_id?: any): Schema.Types.ObjectId;
  id: string;
  boardName: string;
  taskConnect: string;
  tasks: IGetTask[];
}

export interface ICreateBoardRepository {
  create(
    params: ICreateBoardParams,
    userId: string | Schema.Types.ObjectId
  ): Promise<Omit<IBoard, "userId">>;
}

export interface IGetBoardRepository {
  get(id: string, userId: string): Promise<IGetBoard>;
}

export interface IGetAllBoardsRepository {
  get(userId: string): Promise<Omit<IGetBoard, "tasks">[]>;
}

export interface IUpdateBoardRepository {
  update(boardId: string, boardName: string): Promise<IBoard>;
}

export interface IDeleteBoardsRepository {
  delete(boardId: string): Promise<IBoard>;
}
