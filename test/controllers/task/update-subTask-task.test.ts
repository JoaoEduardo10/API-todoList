/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from "vitest";
import { mockUpdateTask } from "../../repositories/task/update-subTask-task.test";
import { UpdateSubTaskController } from "../../../src/server/controller/task/update-subTask-task";
import {
  ISubTaskParams,
  IUpdateSubTaskRepository,
} from "../../../src/server/controller/task/protocols";
import { ITasks } from "../../../src/server/models/protocols";

const mockReq = {
  params: {
    subTaskId: "123",
  },
  headers: {},
  body: mockUpdateTask,
};

export class MockUpdateTaskRepositoryt implements IUpdateSubTaskRepository {
  async update(id: string, params: ISubTaskParams): Promise<ITasks> {
    return {
      id: id,
      boardConnect: id,
      description: "test",
      status: "pending",
      subTasks: params,
      text: "test",
    };
  }
}

describe("update-subTask controller/update-subTask-task", () => {
  it("should return a new task with status codes 200", async () => {
    const repository = new MockUpdateTaskRepositoryt();

    const controller = new UpdateSubTaskController(repository);

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
