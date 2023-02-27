import {
  ICreateBoardParams,
  ICreateBoardRepository,
} from "../../controller/board/protocols";
import { Internal_Server_Error } from "../../helpers/api-errors";
import { Board } from "../../models/mongo-models/Board";
import { IBoard } from "../../models/protocols";

export class MongoCreateBoardeRepository implements ICreateBoardRepository {
  async create(params: ICreateBoardParams): Promise<IBoard> {
    const { boardName } = params;

    const board = await Board.create({
      boardName,
    });

    if (!board) {
      throw new Internal_Server_Error(
        "Erro no banco de dados ao criar o board"
      );
    }

    const { _id, boardName: newBoardName, taks } = board;

    return { id: _id.toHexString(), boardName: newBoardName, taks };
  }
}
