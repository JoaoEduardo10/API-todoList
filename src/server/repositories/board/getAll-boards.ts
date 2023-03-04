import {
  IGetAllBoardsRepository,
  IGetBoard,
} from "../../controller/board/protocols";
import { Board } from "../../models/mongo-models/Board";

export class MongoGetAllBoardsRepository implements IGetAllBoardsRepository {
  async get(userId: string): Promise<Omit<IGetBoard, "tasks">[]> {
    const board = await Board.find().where("userId").equals(userId);

    return board.map(({ _id, boardName, taskConnect }) => ({
      id: _id.toHexString(),
      boardName,
      taskConnect,
    }));
  }
}
