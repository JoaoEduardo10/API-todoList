import { describe, expect, it } from "vitest";
import { IGetAllBoardRepository } from "../../../src/server/controller/board/protocols";
import { IBoard } from "../../../src/server/models/protocols";

export class mockGetAllBoardRepository implements IGetAllBoardRepository {
  async getAll(): Promise<IBoard[]> {
    const board: IBoard[] = [
      {
        boardName: "test",
        id: "123",
        taks: [{ task: "123" }],
      },
    ];

    return board;
  }
}

describe("getAll-board repository/getAll-board", () => {
  it("shuold returns a arrey of board", async () => {
    const repository = await new mockGetAllBoardRepository().getAll();

    expect(repository.length).toBe(1);
  });
});
