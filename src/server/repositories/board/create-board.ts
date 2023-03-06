import {
  ICreateBoardParams,
  ICreateBoardRepository,
} from "../../controller/board/protocols";
import { Board } from "../../models/mongo-models/Board";
import { IBoard } from "../../models/protocols";

export class MongoCreateBoardRepository implements ICreateBoardRepository {
  async create(
    params: ICreateBoardParams,
    userId: string
  ): Promise<Omit<IBoard, "userId">> {
    const board = await Board.create({ ...params, userId });

    const { _id, boardName, taskConnect } = board;

    return { boardName, taskConnect, id: _id.toHexString() };
  }
}
