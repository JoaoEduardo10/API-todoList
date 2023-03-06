import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Task } from "../../../src/server/models/mongo-models/Tasks";
import { mockCreateTask, serverTest } from "../../globals-test";

const task = {
  id: "",
};

describe("get-task middleware/get-task", () => {
  beforeEach(async () => {
    const createTask = await Task.create(mockCreateTask);

    task.id = createTask._id.toHexString();
  });

  afterEach(async () => {
    await Task.deleteMany();
  });

  it("shuold returns error for not seting id.length greantest wur 24 with status code 404", async () => {
    const { statusCode, body } = await serverTest.get(
      "/tasks/63ff9e27777e30323ed90a655"
    );

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Id invalido!" });
  });

  it("should returns 404 error from sending an id not existe", async () => {
    const { statusCode, body } = await serverTest
      .get("/tasks/63ff9e27777e30323ed90a66")
      .send({});

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Task não existe!" });
  });

  it("should returns status codes 200 wiht a task", async () => {
    const { statusCode, body } = await serverTest
      .get(`/tasks/${task.id}`)
      .send({});

    expect(statusCode).toBe(200);
    expect(body).toBeTruthy();
  });
});
