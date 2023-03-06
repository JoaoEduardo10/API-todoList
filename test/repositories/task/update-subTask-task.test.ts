import { beforeEach, describe, expect, it } from "vitest";
import { ISubTaskParams } from "../../../src/server/controller/task/protocols";
import { Task } from "../../../src/server/models/mongo-models/Tasks";
import { mockUpdateCompltetask } from "./update-complete-task.test";
import { MongoUpdateSubTaskRepository } from "../../../src/server/repositories/task/update-subTask-task";

export const mockUpdateTask: ISubTaskParams = [
  {
    concluded: true,
    text: "test",
    uuid: "123",
  },
];

const task = {
  id: "",
};

describe("update-subTask-task repository/upadte-subTask-task", () => {
  beforeEach(async () => {
    const taskCreate = await Task.create(mockUpdateCompltetask);

    task.id = taskCreate._id.toHexString();
  });

  it("Should returns a new task", async () => {
    const repository = await new MongoUpdateSubTaskRepository().update(
      task.id,
      mockUpdateTask
    );

    expect(repository.subTasks.length).toBe(1);
    expect(typeof repository.id).toBe("string");
    expect(repository.description).toBe("test");
    expect(repository.status).toBe("concluded");
    expect(repository.text).toBe("test");
    expect(repository.boardConnect).toBe("123");
  });
});
