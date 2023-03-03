import { describe, expect, it } from "vitest";
import { IUpdateCompleteTaskRepository } from "../../../src/server/controller/task/protocols";
import { ITasks } from "../../../src/server/models/protocols";
import { TOmitId } from "../../../src/server/types/types";

export const mockUpdateCompltetask: TOmitId<ITasks> = {
  boardConnect: "123",
  description: "test",
  status: "concluded",
  subTasks: [
    {
      concluded: true,
      text: "test",
      uuid: "123",
    },
  ],
  text: "test",
};

export class MockUpdateCompleteRepository
  implements IUpdateCompleteTaskRepository
{
  async update(id: string, task: TOmitId<ITasks>): Promise<ITasks> {
    return {
      ...task,
      id,
    };
  }
}

describe("update-complete-Task repository/update-complte-task", () => {
  it("shuold return a task", async () => {
    const repository = await new MockUpdateCompleteRepository().update(
      "123",
      mockUpdateCompltetask
    );

    expect(repository.subTasks.length).toBe(1);
    expect(repository.id).toBe("123");
    expect(repository.description).toBe("test");
    expect(repository.status).toBe("concluded");
    expect(repository.text).toBe("test");
  });
});
