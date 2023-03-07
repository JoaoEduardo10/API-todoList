import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Board } from "../../../src/server/models/mongo-models/Board";
import { Task } from "../../../src/server/models/mongo-models/Tasks";
import { User } from "../../../src/server/models/mongo-models/User";
import { serverTest } from "../../globals-test";
import { createHashPassword } from "../../../src/server/helpers/hashPassword";
import { Schema } from "mongoose";

const task = {
  id: "",
};

describe("update-subTask middleware/update-subtask-task", () => {
  type TUser = {
    userId: string | Schema.Types.ObjectId;
    token: string;
  };

  const user: TUser = {
    userId: "",
    token: "",
  };

  beforeEach(async () => {
    const password = await createHashPassword("123");

    const createUser = await User.create({
      email: "test@gmail.com",
      password,
      name: "test",
    });

    const authenticationUser = await serverTest
      .post("/login")
      .send({ email: createUser.email, password: "123" });

    user.userId = createUser._id as unknown as Schema.Types.ObjectId;
    user.token = authenticationUser.body;

    await Board.create({
      boardName: "test",
      userId: user.userId,
      taskConnect: "123",
    });

    const createTask = await Task.create({
      description: "tes",
      boardConnect: "123",
      status: "concluded",
      subTasks: [
        {
          concluded: false,
          text: "test",
          uuid: "123",
        },
      ],
      text: "123",
    });

    task.id = createTask._id.toHexString();
  });

  afterEach(async () => {
    await Task.deleteMany();
    await User.deleteMany();
    await Board.deleteMany();
  });

  it("should retun an error for sending an in less than 24 characters with status code 404", async () => {
    const { statusCode, body } = await serverTest
      .patch("/tasks/40028922/subtask")
      .set({ Authorization: `Bearer ${user.token}` });

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Id invalido" });
  });

  it("should retun an error for sending at least on subTask with status code 404", async () => {
    const { statusCode, body } = await serverTest
      .patch("/tasks/63ff9e27777e30323ed90a65/subtask")
      .set({ Authorization: `Bearer ${user.token}` })
      .send([]);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Adicone uma subtask" });
  });

  it("should retun an error for sending a uuid with status code 404", async () => {
    const { statusCode, body } = await serverTest
      .patch("/tasks/63ff9e27777e30323ed90a65/subtask")
      .set({ Authorization: `Bearer ${user.token}` })
      .send([{ concluded: false }]);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Adicione um uuid" });
  });

  it("should retun an error for sending a concluded with status code 400", async () => {
    const { statusCode, body } = await serverTest
      .patch("/tasks/63ff9e27777e30323ed90a65/subtask")
      .set({ Authorization: `Bearer ${user.token}` })
      .send([{ uuid: "123" }]);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Adicione um concluded" });
  });

  it("should retun an error for sending the same uuid with status code 404", async () => {
    const { statusCode, body } = await serverTest
      .patch(`/tasks/63ff9e27777e30323ed90a65/subtask`)
      .set({ Authorization: `Bearer ${user.token}` })
      .send([
        { uuid: "123", concluded: false },
        { uuid: "123", concluded: false },
      ]);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Id já usado ou esta com um campo a mais" });
  });

  it("should returns 404 error from sending a wue id does not exist", async () => {
    const { statusCode, body } = await serverTest
      .patch("/tasks/63ff9e27777e30323ed90a65/subtask")
      .set({ Authorization: `Bearer ${user.token}` })
      .send([
        { uuid: "175", concluded: false },
        { uuid: "134", concluded: false },
      ]);

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Id da invalido!" });
  });

  it("should returns staus codes 200 with subTask updated", async () => {
    const { statusCode, body } = await serverTest
      .patch(`/tasks/${task.id}/subtask`)
      .set({ Authorization: `Bearer ${user.token}` })
      .send([{ uuid: "123", concluded: false }]);

    expect(statusCode).toBe(200);
    expect(body).toBeTruthy();
  });
});
