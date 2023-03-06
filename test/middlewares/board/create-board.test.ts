import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Board } from "../../../src/server/models/mongo-models/Board";
import { User } from "../../../src/server/models/mongo-models/User";
import { serverTest } from "../../globals-test";

type TUser = {
  userId: string;
};

const user: TUser = {
  userId: "",
};

describe("create-board  middleware/create-board", () => {
  beforeEach(async () => {
    const createUser = await User.create({
      email: "test@gmail.com",
      password: "123",
      name: "test",
    });

    user.userId = createUser._id.toHexString();
  });

  afterEach(async () => {
    await Board.deleteMany();
    await User.deleteMany();
  });

  it("should returns status code 400 for not sending params boardName", async () => {
    const { statusCode, body } = await serverTest.post("/boards").send();

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Adicone o titulo ao board" });
  });
});
