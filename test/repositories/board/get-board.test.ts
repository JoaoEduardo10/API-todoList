import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { MongoGetBoardRepository } from "../../../src/server/repositories/board/get-task";
import { User } from "../../../src/server/models/mongo-models/User";
import { Board } from "../../../src/server/models/mongo-models/Board";

const board: any = {};

describe("get-board repository/get-board", () => {
  beforeEach(async () => {
    const user = await User.create({
      email: "test@gmail.com",
      name: "test",
      password: "123",
    });

    board.userId = user._id;

    const boardCreate = await Board.create({
      boardName: "test",
      userId: user._id,
    });

    board.id = boardCreate._id.toHexString();
  });

  afterEach(async () => {
    await User.deleteMany();
    await User.deleteMany();
  });

  it("should return a board with todos tasks", async () => {
    const repository = await new MongoGetBoardRepository().get(
      board.id,
      board.userId.toHexString()
    );

    expect(repository.boardName).toBe("test");
    expect(typeof repository.taskConnect).toBe("string");
    expect(repository.tasks.length).toBe(0);
    expect(repository._id).toBeTruthy();
  });
});
