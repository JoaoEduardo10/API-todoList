import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Board } from "../../src/server/models/mongo-models/Board";
import { User } from "../../src/server/models/mongo-models/User";
import { serverTest } from "../globals-test";

describe("authentication", () => {
  const user = {
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

  it("shuold return an error for not sending authentication in the headers", async () => {
    const { statusCode, body } = await serverTest.get("/boards").send({});

    expect(statusCode).toBe(401);
    expect(body).toEqual({ error: "Voçê não esta altenticado.!" });
  });

  it("should return an error for sending the wrong type of token", async () => {
    const { statusCode, body } = await serverTest
      .get("/boards")
      .set({ Authorization: `Beare ${user.token}` });

    expect(statusCode).toBe(401);
    expect(body).toEqual({ error: "Tipo de token invalido!" });
  });

  it("should return an error for sending an invalid token", async () => {
    const { statusCode, body } = await serverTest
      .get("/boards")
      .set({ Authorization: `Bearer token` });

    expect(statusCode).toBe(500);
    expect(body).toEqual({ error: "jwt malformed" });
  });
});
