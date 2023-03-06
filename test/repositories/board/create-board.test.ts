import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { MongoCreateBoardRepository } from "../../../src/server/repositories/board/create-board";
import { User } from "../../../src/server/models/mongo-models/User";

const board: any = {};

describe("create-board repository/create-board", () => {
  beforeEach(async () => {
    const user = await User.create({
      email: "tes@gmail.com",
      name: "test",
      password: "123",
    });

    board.userId = user._id;
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it("shuold returns Board", async () => {
    const repository = await new MongoCreateBoardRepository().create(
      {
        boardName: "test",
      },
      board.userId
    );

    expect(repository.boardName).toBe("test");
    expect(repository.boardName).toBeTruthy();
    expect(repository.taskConnect).toBeTruthy();
    expect(typeof repository.taskConnect).toBe("string");
    expect(typeof repository.id).toBe("string");
  });
});
