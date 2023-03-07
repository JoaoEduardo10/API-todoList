import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Board } from "../../../src/server/models/mongo-models/Board";
import { User } from "../../../src/server/models/mongo-models/User";
import { serverTest } from "../../globals-test";

describe("create-board  middleware/create-board", () => {
  type TUser = {
    userId: string;
    token: string;
  };

  const user: TUser = {
    userId: "",
    token: "",
  };

  beforeEach(async () => {
    const createUser = {
      email: "test@gmail.com",
      password: "123",
      name: "test",
    };

    const responseUser = await serverTest
      .post("/users")
      .send({ ...createUser });

    const authenticationUser = await serverTest
      .post("/login")
      .send({ email: createUser.email, password: "123" });

    user.userId = responseUser.body.id;
    user.token = authenticationUser.body;
  });

  afterEach(async () => {
    await Board.deleteMany();
    await User.deleteMany();
  });

  it("should returns status code 400 for not sending params boardName", async () => {
    const { statusCode, body } = await serverTest
      .post("/boards")
      .set({ Authorization: `Bearer ${user.token}` })
      .send();

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Adicone o titulo ao board" });
  });

  it("should returns status code 200 with board", async () => {
    const { statusCode, body } = await serverTest
      .post("/boards")
      .set({ Authorization: `Bearer ${user.token}` })
      .send({ boardName: "test" });

    expect(statusCode).toBe(201);
    expect(body).toBeTruthy();
  });
});
