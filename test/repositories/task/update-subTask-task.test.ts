import { describe, expect, it } from "vitest";
import {
  ISubTaskParams,
  IUpdateSubTaskRepository,
} from "../../../src/server/controller/task/protocols";
import { ITasks } from "../../../src/server/models/protocols";

export const mockUpdateTask: ISubTaskParams = [
  {
    concluded: true,
    text: "test",
    uuid: "123",
  },
];

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

describe("update-subTask-task repository/upadte-subTask-task", () => {
  it("Should returns a new task", async () => {
    const repository = await new MockUpdateTaskRepositoryt().update(
      "123",
      mockUpdateTask
    );

    expect(repository.subTasks.length).toBe(1);
    expect(repository.subTasks[0]).toEqual(mockUpdateTask[0]);
    expect(repository.id).toBe("123");
    expect(repository.description).toBe("test");
    expect(repository.status).toBe("pending");
    expect(repository.text).toBe("test");
    expect(repository.boardConnect).toBe("123");
  });
});
