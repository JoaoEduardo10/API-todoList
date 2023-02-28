import { describe, expect, it } from "vitest";
import { IGetTaskRepository } from "../../../src/server/controller/task/protocols";
import { ITasks } from "../../../src/server/models/protocols";

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
        },
      ],
      text: "test",
    };
  }
}

const test = "123";

describe("get-task repository/get-task", () => {
  it("should returns a task", async () => {
    const reporitory = await new MockGetTaskRepository().get("123");

    expect(reporitory.id).toBe(test);
    expect(reporitory.status).toBe("pending");
    expect(reporitory.boardConnect).toBe(test);
    expect(reporitory.subTasks.length).toBe(1);
    expect(reporitory.text).toBe("test");
    expect(reporitory.description).toBe("test");
  });
});
