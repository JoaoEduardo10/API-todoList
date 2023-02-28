import { describe, expect, it } from "vitest";
import { serverTest } from "../../globals-test";

describe("login-user middleware/login-user", () => {
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
});
