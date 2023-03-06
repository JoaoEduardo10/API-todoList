import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Task } from "../../../src/server/models/mongo-models/Tasks";
import { mockCreateTask, serverTest } from "../../globals-test";

const task = {
  id: "",
};

describe("update-complete-task middleware/upadate-complete-task", () => {
  beforeEach(async () => {
    const createTask = await Task.create(mockCreateTask);

    task.id = createTask._id.toHexString();
  });

  afterEach(async () => {
    await Task.deleteMany();
  });

  it("should returns 404 error from sending an id less than 24", async () => {
    const { statusCode, body } = await serverTest.patch("/tasks/1233").send({});

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Id imcompleto ou incorreto!" });
  });

  it("should returns 404 error from sending an id not existe", async () => {
    const { statusCode, body } = await serverTest
      .patch("/tasks/63ff9e27777e30323ed90a65")
      .send({});

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Task não existe! verifique o id." });
  });

  it("should returns status codes 200 with task updated of complete", async () => {
    const { statusCode, body } = await serverTest
      .patch(`/tasks/${task.id}`)
      .send({});

    expect(statusCode).toBe(200);
    expect(body).toBeTruthy();
  });
});
