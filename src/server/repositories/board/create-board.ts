import {
  ICreateBoardParams,
  ICreateBoardRepository,
} from "../../controller/board/protocols";
import { Internal_Server_Error } from "../../helpers/api-errors";
import { Board } from "../../models/mongo-models/Board";
import { IBoard } from "../../models/protocols";

export class MongoCreateBoardRepository implements ICreateBoardRepository {
  async create(
    params: ICreateBoardParams,
    userId: string
  ): Promise<Omit<IBoard, "userId">> {
    const allParams = {
      ...params,
      userId,
    };

    const board = await Board.create(allParams);

    /* c8 ignore start */
    if (!board) {
      throw new Internal_Server_Error(
        "Erro no banmco de dados ao criar o board"
      );
    }
    /* c8 ignore stop */

    const { _id, boardName, taskConnect } = board;

    return { boardName, taskConnect, id: _id.toHexString() };
  }
}
