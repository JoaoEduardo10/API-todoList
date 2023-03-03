import { describe, expect, it } from "vitest";
import {
  IStatusParams,
  IUpdateStatusRepositopry,
} from "../../../src/server/controller/task/protocols";
import { ITasks } from "../../../src/server/models/protocols";

export class MockUpdateStatusTaskRepository
  implements IUpdateStatusRepositopry
{
  async update(id: string, params: IStatusParams): Promise<ITasks> {
    return {
      boardConnect: id,
      description: "test",
      id: id,
      status: params.status,
      subTasks: [
        {
          concluded: false,
          text: "test",
          uuid: id,
        },
      ],
      text: "test",
    };
  }
}

describe("update-status repository/update-status-task", () => {
  it("shuold returns a task", async () => {
    const repository = await new MockUpdateStatusTaskRepository().update(
      "123",
      { status: "concluded" }
    );

    expect(repository.status).toBe("concluded");
    expect(repository.subTasks.length).toBe(1);
    expect(repository.id).toBe("123");
    expect(repository.text).toBe("test");
    expect(repository.boardConnect).toBe("123");
    expect(repository.description).toBe("test");
  });
});
