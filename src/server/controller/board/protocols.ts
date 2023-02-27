import { IBoard } from "../../models/protocols";

export interface ICreateBoardParams {
  boardName: string;
}

export interface ICreateBoardRepository {
  create(params: ICreateBoardParams): Promise<IBoard>;
}

export interface IGetAllBoardRepository {
  getAll(): Promise<IBoard[]>;
}
