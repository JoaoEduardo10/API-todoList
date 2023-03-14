import { IDeleteBoardsRepository } from "../../controller/board/protocols";
import { Board } from "../../models/mongo-models/Board";
import { Task } from "../../models/mongo-models/Tasks";
import { IBoard } from "../../models/protocols";

export class MongoDeleteBoardRepository implements IDeleteBoardsRepository {
  async delete(boardId: string): Promise<IBoard> {
    const board = await Board.findById(boardId);
    await Board.findByIdAndDelete(boardId);

    await Task.deleteMany().where("boardConnect").equals(board?.taskConnect);

    const { _id, boardName, taskConnect, userId } = board!;

    return { id: _id.toHexString(), boardName, taskConnect, userId };
  }
}
