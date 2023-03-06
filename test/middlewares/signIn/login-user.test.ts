import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createHashPassword } from "../../../src/server/helpers/hashPassword";
import { User } from "../../../src/server/models/mongo-models/User";
import { serverTest } from "../../globals-test";

const user = {
  email: "",
  password: "",
};

describe("login-user middleware/login-user", () => {
  beforeEach(async () => {
    const password = await createHashPassword("123");

    const createUser = await User.create({
      email: "test@gmail.com",
      name: "test",
      password,
    });

    user.email = createUser.email;
    user.password = createUser.password;
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it("shuold return status 400 for not envied params", async () => {
    const { statusCode, body } = await serverTest.post("/login").send({});

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Email e password são obrigatórios." });
  });

  it("shuold return status 400 for not he has params", async () => {
    const { statusCode, body } = await serverTest.post("/login").send({
      email: "test@gmail.com",
      password: "123",
      dcdsc: "1233",
    });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error: "So pode enviar os campos de email e passoword",
    });
  });

  it("shuold return status 404 with a password", async () => {
    const { statusCode, body } = await serverTest.post("/login").send({
      email: "test@gmail.com",
      password: "1234",
    });

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Senha invalida!" });
  });

  it("shuold return status 404 with a email invalid", async () => {
    const { statusCode, body } = await serverTest.post("/login").send({
      email: "teste@gmail.com",
      password: user.password,
    });

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Email invalido!" });
  });

  it("shuold return status 200 with a jwt", async () => {
    const { statusCode, body } = await serverTest.post("/login").send({
      email: "test@gmail.com",
      password: "123",
    });

    expect(statusCode).toBe(200);
    expect(typeof body).toBe("string");
  });
});
