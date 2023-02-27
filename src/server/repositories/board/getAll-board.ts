import { IGetAllBoardRepository } from "../../controller/board/protocols";
import { Internal_Server_Error } from "../../helpers/api-errors";
import { Board } from "../../models/mongo-models/Board";
import { IBoard } from "../../models/protocols";

export class MongoGetAllBoardRepository implements IGetAllBoardRepository {
  async getAll(): Promise<IBoard[]> {
    const boards = await Board.find();

    if (!boards) {
      throw new Internal_Server_Error(
        "Erro no banco de dados ao buscar os boards"
      );
    }

    return boards.map(({ _id, boardName, taks }) => ({
      id: _id.toHexString(),
      boardName,
      taks,
    }));
  }
}
