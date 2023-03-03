import { describe, expect, it } from "vitest";
import { IDeleteTaskRepository } from "../../../src/server/controller/task/protocols";
import { ITasks } from "../../../src/server/models/protocols";

export class MockDeleteTaskRepositpry implements IDeleteTaskRepository {
  async delete(id: string): Promise<ITasks> {
    return {
      boardConnect: id,
      description: "test",
      id,
      status: "concluded",
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

describe("delete-task repository/delete-task", () => {
  it("should return a task", async () => {
    const repository = await new MockDeleteTaskRepositpry().delete("123");

    expect(repository.status).toBe("concluded");
    expect(repository.subTasks.length).toBe(1);
    expect(repository.id).toBe("123");
    expect(repository.text).toBe("test");
    expect(repository.boardConnect).toBe("123");
    expect(repository.description).toBe("test");
  });
});
