import { describe, expect, it } from "vitest";
import { CreateTaskController } from "../../../src/server/controller/task/create-task";
import { MongoCreateTaskRepository } from "../../../src/server/repositories/task/create-task";
import {
  mockCreateTask,
  MockCreateTaskRepository,
} from "../../repositories/task/create-task.test";

const mockReq = {
  params: {},
  headers: {},
  body: mockCreateTask,
};

const bodyparms = {
  ...mockCreateTask,
  id: "123",
  status: "pending",
};

describe("create-task controller/create-task", () => {
  it("shuold return status codes 201 end task created", async () => {
    const repository = await new MockCreateTaskRepository();

    const controller = await new CreateTaskController(repository);

    const { body, statusCode } = await controller.handle(mockReq);

    expect(statusCode).toBe(201);
    expect(body).toEqual(bodyparms);
  });
});
