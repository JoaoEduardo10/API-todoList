import { describe, expect, it } from "vitest";
import { DeleteTaskController } from "../../../src/server/controller/task/delete-task";
import { IDeleteTaskRepository } from "../../../src/server/controller/task/protocols";
import { ITasks } from "../../../src/server/models/protocols";
import { mockCreatetask } from "../../repositories/task/delete-task.test";

const mockReq = {
  params: {
    taskId: "123",
  },
  headers: {},
  body: {},
};

class MockDeleteTaskRepository implements IDeleteTaskRepository {
  async delete(id: string): Promise<ITasks> {
    return {
      ...mockCreatetask,
      id: id,
    };
  }
}

describe("delete-task controller/delete-task", () => {
  it("should returns a task with status codes 200", async () => {
    const repository = new MockDeleteTaskRepository();

    const controller = new DeleteTaskController(repository);

    const { body, statusCode } = await controller.handle(mockReq);

    expect(statusCode).toBe(200);
    expect(body.subTasks.length).toBe(1);
    expect(body.boardConnect).toBe("123");
    expect(body.description).toBe("test");
    expect(body.text).toBe("test");
    expect(body.status).toBe("pending");
  });
});
