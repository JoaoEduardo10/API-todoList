import { describe, expect, it, afterEach, beforeEach } from "vitest";
import { Task } from "../../../src/server/models/mongo-models/Tasks";
import { User } from "../../../src/server/models/mongo-models/User";
import { mockCreateTask, serverTest } from "../../globals-test";

describe("create-task middlewre/create-task", () => {
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
    await User.deleteMany();
    await Task.deleteMany();
  });

  it("shuold returns error for not seting text with status code 400", async () => {
    const { statusCode, body } = await serverTest
      .post("/tasks")
      .set({ Authorization: `Bearer ${user.token}` })
      .send({});

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Adicione uma texto" });
  });

  it("shuold returns error for not seting desription.length greantest wur four with status code 400", async () => {
    const { statusCode, body } = await serverTest
      .post("/tasks")
      .set({ Authorization: `Bearer ${user.token}` })
      .send({
        text: "test",
        description: "123",
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Descrição deve conter no minimo 4 letras" });
  });

  it("shuold returns error for not seting desription.length greantest wur four with status code 400", async () => {
    const { statusCode, body } = await serverTest
      .post("/tasks")
      .set({ Authorization: `Bearer ${user.token}` })
      .send({
        description: "123",
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Adicione uma texto" });
  });

  it("shuold returns error for not seting boardConnect with status code 400", async () => {
    const { statusCode, body } = await serverTest
      .post("/tasks")
      .set({ Authorization: `Bearer ${user.token}` })
      .send({
        text: "test",
        description: "1234",
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error: "adicone o BoardConnect que vem do taskConnect da board",
    });
  });

  it("shuold returns error for not seting subTasks with status code 400", async () => {
    const { statusCode, body } = await serverTest
      .post("/tasks")
      .set({ Authorization: `Bearer ${user.token}` })
      .send({
        text: "test",
        description: "1234",
        boardConnect: "123",
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error: "Adicione pelo menos uma subTask",
    });
  });

  it("shuold returns error for not seting subTasks with status code 400", async () => {
    const { statusCode, body } = await serverTest
      .post("/tasks")
      .set({ Authorization: `Bearer ${user.token}` })
      .send({
        text: "test",
        description: "1234",
        boardConnect: "123",
        subTasks: [{ text: "" }],
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error: "Adicione uma texto a subTask",
    });
  });

  it("shuold returns statuscode 201 with task created", async () => {
    const { statusCode, body } = await serverTest
      .post("/tasks")
      .set({ Authorization: `Bearer ${user.token}` })
      .send(mockCreateTask);

    expect(statusCode).toBe(201);
    expect(body).toBeTruthy();
  });
});
