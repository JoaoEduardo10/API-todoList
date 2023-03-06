import { describe, expect, it, beforeEach } from "vitest";
import { ITasks } from "../../../src/server/models/protocols";
import { TOmitId } from "../../../src/server/types/types";
import { MongoUpdateCompleteTaskRepository } from "../../../src/server/repositories/task/update-complete-task";
import { Task } from "../../../src/server/models/mongo-models/Tasks";

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

const task = {
  id: "",
};

describe("update-complete-Task repository/update-complte-task", () => {
  beforeEach(async () => {
    const taskCreate = await Task.create(mockUpdateCompltetask);

    task.id = taskCreate._id.toHexString();
  });

  it("shuold return a task", async () => {
    const repository = await new MongoUpdateCompleteTaskRepository().update(
      task.id,
      mockUpdateCompltetask
    );

    expect(repository.subTasks.length).toBe(1);
    expect(typeof repository.id).toBe("string");
    expect(repository.description).toBe("test");
    expect(repository.status).toBe("concluded");
    expect(repository.text).toBe("test");
  });
});
