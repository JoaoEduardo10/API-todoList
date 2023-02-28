import { describe, expect, it } from "vitest";
import { MockGetTaskRepository } from "../../repositories/task/get-task.test";
import { GetTaskController } from "../../../src/server/controller/task/get-task";
import { ITasks } from "../../../src/server/models/protocols";

const mockBody: ITasks = {
  boardConnect: "123",
  description: "test",
  id: "123",
  status: "pending",
  subTasks: [
    {
      concluded: false,
      text: "test",
    },
  ],
  text: "test",
};

const mockReq = {
  params: {
    taskId: "123",
  },
  headers: {},
  body: mockBody,
};

describe("get-task controller/get-task", () => {
  it("should returns status codes 200 with a task", async () => {
    const repository = await new MockGetTaskRepository();

    const controller = await new GetTaskController(repository);

    const { body, statusCode } = await controller.handle(mockReq);

    expect(statusCode).toBe(200);
    expect(body).toEqual(mockBody);
  });
});
