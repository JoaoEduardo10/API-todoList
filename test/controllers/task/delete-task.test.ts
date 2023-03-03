import { describe, expect, it } from "vitest";
import { MockDeleteTaskRepositpry } from "../../repositories/task/delete-task.test";
import { DeleteTaskController } from "../../../src/server/controller/task/delete-task";

const mockReq = {
  params: {
    taskId: "123",
  },
  headers: {},
  body: {},
};

describe("delete-task controller/delete-task", () => {
  it("should returns a task with status codes 200", async () => {
    const repository = new MockDeleteTaskRepositpry();

    const controller = new DeleteTaskController(repository);

    const { body, statusCode } = await controller.handle(mockReq);

    expect(statusCode).toBe(200);
    expect(body.subTasks.length).toBe(1);
    expect(body.id).toBe("123");
    expect(body.boardConnect).toBe("123");
    expect(body.description).toBe("test");
    expect(body.text).toBe("test");
    expect(body.status).toBe("concluded");
  });
});
