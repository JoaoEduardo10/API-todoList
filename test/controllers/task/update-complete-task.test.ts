import { describe, expect, it } from "vitest";
import { UpdateCompleteTaskController } from "../../../src/server/controller/task/update-complete-task";
import {
  MockUpdateCompleteRepository,
  mockUpdateCompltetask,
} from "../../repositories/task/update-complete-task.test";

const mockReq = {
  params: {
    taskId: "123",
  },
  headres: {},
  body: mockUpdateCompltetask,
};

describe("update-complete-tasl controller/update-complete-task", () => {
  it("should returns status codes 200 with a task", async () => {
    const repository = new MockUpdateCompleteRepository();

    const controller = new UpdateCompleteTaskController(repository);

    const { body, statusCode } = await controller.handle(mockReq);

    expect(statusCode).toBe(200);
    expect(body.subTasks).toEqual(mockReq.body.subTasks);
    expect(body.id).toBe("123");
    expect(body.boardConnect).toBe("123");
    expect(body.description).toBe("test");
    expect(body.text).toBe("test");
    expect(body.status).toBe("concluded");
  });
});
