import { describe, expect, it } from "vitest";
import {
  IGetBoard,
  IGetBoardRepository,
} from "../../../src/server/controller/board/protocols";

export class MockGetBoardRepository implements IGetBoardRepository {
  async get(id: string): Promise<IGetBoard> {
    return {
      boardName: "test",
      id,
      taskConnect: id,
      tasks: [
        {
          _id: id,
          boardConnect: id,
          description: "test",
          status: "pending",
          text: "test",
        },
      ],
    };
  }
}

describe("get-board repository/get-board", () => {
  it("should return a board with todos tasks", async () => {
    const repository = await new MockGetBoardRepository().get("123");

    expect(repository.id).toBe("123");
    expect(repository.tasks.length).toBe(1);
    expect(repository.taskConnect).toBe("123");
    expect(repository.boardName).toBe("test");
  });
});
