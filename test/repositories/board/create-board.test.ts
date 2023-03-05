import { describe, expect, it } from "vitest";

import {
  ICreateBoardParams,
  ICreateBoardRepository,
} from "../../../src/server/controller/board/protocols";
import { IBoard } from "../../../src/server/models/protocols";

export class mockCreateBoardRepository implements ICreateBoardRepository {
  async create(params: ICreateBoardParams, userId: any): Promise<IBoard> {
    const { boardName } = params;

    return { boardName, id: "123", taskConnect: "123", userId };
  }
}

const userId = "123";

describe("create-board repository/create-board", () => {
  it("shuold returns Board", async () => {
    const repository = await new mockCreateBoardRepository().create(
      {
        boardName: "test",
      },
      userId
    );

    expect(repository.boardName).toBe("test");
    expect(typeof repository.id).toBe("string");
    expect(typeof repository.taskConnect).toBe("string");
  });
});
