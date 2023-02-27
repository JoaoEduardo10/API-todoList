import { describe, expect, it } from "vitest";
import { serverTest } from "../../globals-test";

describe("login-user middleware/login-user", () => {
  it("should return a 400 error for not embedding the correct parameters", async () => {
    const response = await serverTest.post("/login").send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: "Email e password são obrigatórios.",
    });
  });

  it("should return a 400 error for sending too many parameters", async () => {
    const response = await serverTest.post("/login").send({
      email: "test@gmail.com",
      password: "123",
      fdvd: "123",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: "So pode enviar os campos de email e passoword",
    });
  });
});
