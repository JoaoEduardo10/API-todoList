import { beforeEach, describe, expect, it } from "vitest";
import {
  IGetAllBoardsRepository,
  IGetBoard,
} from "../../../src/server/controller/board/protocols";

export class MockGetAllBoardsRepository implements IGetAllBoardsRepository {
  async get(userId: string): Promise<Omit<IGetBoard, "tasks">[]> {
    const arrey: Omit<IGetBoard, "tasks">[] = [
      {
        boardName: "test",
        id: userId,
        taskConnect: userId,
      },
    ];

    return arrey;
  }
}

describe("getAll-boards repository/getAll-boards", () => {
  beforeEach;
  it("should returns a board not task", async () => {
    const repository = await new MockGetAllBoardsRepository().get("123");

    expect(repository.length).toBe(1);
  });
});
