import {
  ICreateBoardParams,
  ICreateBoardRepository,
} from "../../controller/board/protocols";
import { Internal_Server_Error } from "../../helpers/api-errors";
import { Board } from "../../models/mongo-models/Board";
import { IBoard } from "../../models/protocols";

export class MongoCreateBoardRepository implements ICreateBoardRepository {
  async create(params: ICreateBoardParams): Promise<IBoard> {
    const board = await Board.create(params);

    if (!board) {
      throw new Internal_Server_Error(
        "Erro no banmco de dados ao criar o board"
      );
    }

    const { _id, boardName, taskConnect } = board;

    return { boardName, taskConnect, id: _id.toHexString() };
  }
}
