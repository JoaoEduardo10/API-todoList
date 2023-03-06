import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Board } from "../../../src/server/models/mongo-models/Board";
import { Task } from "../../../src/server/models/mongo-models/Tasks";
import { User } from "../../../src/server/models/mongo-models/User";
import { serverTest } from "../../globals-test";

const task = {
  id: "",
};

describe("update-subTask middleware/update-subtask-task", () => {
  beforeEach(async () => {
    const user = await User.create({
      email: "test@gmail.com",
      name: "test",
      password: "123",
    });

    await Board.create({
      boardName: "test",
      userId: user._id,
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
    const { statusCode, body } = await serverTest.patch(
      "/tasks/40028922/subtask"
    );

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Id invalido" });
  });

  it("should retun an error for sending at least on subTask with status code 404", async () => {
    const { statusCode, body } = await serverTest
      .patch("/tasks/63ff9e27777e30323ed90a65/subtask")
      .send([]);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Adicone uma subtask" });
  });

  it("should retun an error for sending a uuid with status code 404", async () => {
    const { statusCode, body } = await serverTest
      .patch("/tasks/63ff9e27777e30323ed90a65/subtask")
      .send([{ concluded: false }]);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Adicione um uuid" });
  });

  it("should retun an error for sending a concluded with status code 400", async () => {
    const { statusCode, body } = await serverTest
      .patch("/tasks/63ff9e27777e30323ed90a65/subtask")
      .send([{ uuid: "123" }]);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Adicione um concluded" });
  });

  it("should retun an error for sending the same uuid with status code 404", async () => {
    const { statusCode, body } = await serverTest
      .patch(`/tasks/63ff9e27777e30323ed90a65/subtask`)
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
      .send([{ uuid: "123", concluded: false }]);

    expect(statusCode).toBe(200);
    expect(body).toBeTruthy();
  });
});
