import {
  IGetBoard,
  IGetBoardRepository,
} from "../../controller/board/protocols";
import { Board } from "../../models/mongo-models/Board";

export class MongoGetBoardRepository implements IGetBoardRepository {
  async get(id: string, userId: string): Promise<IGetBoard> {
    const boards = await Board.aggregate([
      {
        $lookup: {
          from: "tasks",
          localField: "taskConnect",
          foreignField: "boardConnect",
          as: "tasks",
        },
      },
    ]);
    const [board] = boards.filter(
      (key) => key.userId == userId && key._id == id
    );

    return board as IGetBoard;
  }
}
