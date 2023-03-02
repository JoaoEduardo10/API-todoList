/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from "vitest";
import {
  mockUpdateTask,
  MockUpdateTaskRepositoryt,
} from "../../repositories/task/update-subTask-task.test";
import { UpdateSubTaskController } from "../../../src/server/controller/task/update-subTask-task";

const mockReq = {
  params: {
    subTaskId: "123",
  },
  headers: {},
  body: mockUpdateTask,
};

describe("update-subTask controller/update-subTask-task", () => {
  it("should return a new task with status codes 200", async () => {
    const repository = await new MockUpdateTaskRepositoryt();

    const controller = await new UpdateSubTaskController(repository);

    const { body, statusCode } = await controller.handle(mockReq);
    const { subTasks, ...rest } = body;

    expect(statusCode).toBe(200);
    expect(body.subTasks).toEqual(mockReq.body);
    expect(rest).toEqual({
      boardConnect: "123",
      description: "test",
      id: "123",
      status: "pending",
      text: "test",
    });
  });
});
