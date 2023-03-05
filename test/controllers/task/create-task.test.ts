import { describe, expect, it } from "vitest";
import { CreateTaskController } from "../../../src/server/controller/task/create-task";
import { mockCreateTask } from "../../repositories/task/create-task.test";
import { MongoCreateTaskRepository } from "../../../src/server/repositories/task/create-task";

const mockReq = {
  params: {},
  headers: {},
  body: mockCreateTask,
};

describe("create-task controller/create-task", () => {
  it("shuold return status codes 201 end task created", async () => {
    const repository = new MongoCreateTaskRepository();

    const controller = new CreateTaskController(repository);

    const { body, statusCode } = await controller.handle(mockReq);

    expect(statusCode).toBe(201);
    expect(typeof body.id).toEqual("string");
    expect(body.description).toBe(mockReq.body.description);
    expect(body.boardConnect).toBe(mockReq.body.boardConnect);
    expect(body.status).toBe("pending");
    expect(body.subTasks.length).toBe(1);
    expect(body.text).toBe(mockReq.body.text);
  });
});
