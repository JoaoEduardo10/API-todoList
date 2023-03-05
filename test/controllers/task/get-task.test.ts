import { describe, expect, it } from "vitest";
import { GetTaskController } from "../../../src/server/controller/task/get-task";
import { ITasks } from "../../../src/server/models/protocols";
import { IGetTaskRepository } from "../../../src/server/controller/task/protocols";

const mockBody: ITasks = {
  boardConnect: "123",
  description: "test",
  id: "123",
  status: "pending",
  subTasks: [
    {
      concluded: false,
      text: "test",
      uuid: "123",
    },
  ],
  text: "test",
};

export class MockGetTaskRepository implements IGetTaskRepository {
  async get(id: string): Promise<ITasks> {
    return {
      boardConnect: id,
      description: "test",
      id: id,
      status: "pending",
      subTasks: [
        {
          concluded: false,
          text: "test",
          uuid: "123",
        },
      ],
      text: "test",
    };
  }
}

const mockReq = {
  params: {
    taskId: "123",
  },
  headers: {},
  body: mockBody,
};

describe("get-task controller/get-task", () => {
  it("should returns status codes 200 with a task", async () => {
    const repository = new MockGetTaskRepository();

    const controller = new GetTaskController(repository);

    const { body, statusCode } = await controller.handle(mockReq);

    expect(statusCode).toBe(200);
    expect(body).toEqual(mockBody);
  });
});
