import { beforeEach, describe, expect, it } from "vitest";
import { Task } from "../../../src/server/models/mongo-models/Tasks";
import { MongoUpdateStatusTaskRepository } from "../../../src/server/repositories/task/update-status-task";
import { mockUpdateCompltetask } from "./update-complete-task.test";

const task = {
  id: "",
};

describe("update-status repository/update-status-task", () => {
  beforeEach(async () => {
    const taskCreate = await Task.create(mockUpdateCompltetask);

    task.id = taskCreate._id.toHexString();
  });

  it("shuold returns a task", async () => {
    const repository = await new MongoUpdateStatusTaskRepository().update(
      task.id,
      { status: "pending" }
    );

    expect(repository.status).toBe("pending");
    expect(repository.subTasks.length).toBe(1);
    expect(typeof repository.id).toBe("string");
    expect(repository.text).toBe("test");
    expect(repository.boardConnect).toBe("123");
    expect(repository.description).toBe("test");
  });
});
