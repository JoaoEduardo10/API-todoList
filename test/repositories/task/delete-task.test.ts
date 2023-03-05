import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Task } from "../../../src/server/models/mongo-models/Tasks";
import { ITasks } from "../../../src/server/models/protocols";
import { MongoDeleteTaskRepository } from "../../../src/server/repositories/task/delete-task";
import { TOmitId } from "../../../src/server/types/types";

export const mockCreatetask: TOmitId<ITasks> = {
  boardConnect: "123",
  description: "test",
  subTasks: [
    {
      text: "test",
      concluded: false,
      uuid: "123",
    },
  ],
  text: "test",
  status: "pending",
};

describe("delete-task repository/delete-task", () => {
  let task: any = undefined;

  beforeEach(async () => {
    task = await Task.create({ ...mockCreatetask });
  });

  afterEach(async () => {
    Task.findByIdAndDelete(task._id.toHexString());
  });

  it("should return a task", async () => {
    const repository = await new MongoDeleteTaskRepository().delete(task._id);

    expect(repository.status).toBe("pending");
    expect(repository.subTasks.length).toBe(1);
    expect(repository.id).toBe(task._id.toHexString());
    expect(repository.text).toBe("test");
    expect(repository.boardConnect).toBe("123");
    expect(repository.description).toBe("test");
  });
});
