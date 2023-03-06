import { afterEach, describe, expect, it } from "vitest";
import { User } from "../../../src/server/models/mongo-models/User";
import { serverTest } from "../../globals-test";

describe("create-user middleware/signUp", () => {
  afterEach(async () => {
    await User.deleteMany();
  });

  it("should returns statusCode 400 for not sending the createParams", async () => {
    const response = await serverTest.post("/users").send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: "Campos de name, email e password é obrigatorio. Adicione email",
    });
  });

  it("should returns statusCode 400 for validate for email", async () => {
    const response = await serverTest.post("/users").send({
      name: "eduardo",
      email: "eduardo",
      password: "123",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: "Formato de email invalido. adicione um @gmail.com",
    });
  });

  it("should returns statusCode status codes 201 with a user", async () => {
    const response = await serverTest.post("/users").send({
      name: "eduardo",
      email: "eduardo@gmail.com",
      password: "123",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toBeTruthy();
  });
});
