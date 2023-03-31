import { IUpdateBoardRepository } from "../../controller/board/protocols";
import { Internal_Server_Error } from "../../helpers/api-errors";
import { Board } from "../../models/mongo-models/Board";
import { IBoard } from "../../models/protocols";

export class MongoUpdateBoardRepository implements IUpdateBoardRepository {
  async update(boardId: string, boardName: string): Promise<IBoard> {
    await Board.findByIdAndUpdate(boardId, { $set: { boardName } });

    const board = await Board.findById(boardId);

    if (!board) {
      throw new Internal_Server_Error("Board not existe");
    }

    return {
      id: board._id.toHexString(),
      boardName: board.boardName,
      taskConnect: board.taskConnect,
      userId: board.userId,
    };
  }
}
