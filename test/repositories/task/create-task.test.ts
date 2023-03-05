import { afterEach, describe, expect, it } from "vitest";
import { ICreateTaskParams } from "../../../src/server/controller/task/protocols";
import { Task } from "../../../src/server/models/mongo-models/Tasks";
import { MongoCreateTaskRepository } from "../../../src/server/repositories/task/create-task";

export const mockCreateTask: ICreateTaskParams = {
  boardConnect: "123",
  subTasks: [
    {
      concluded: false,
      text: "test",
    },
  ],
  text: "test",
  description: "um teste",
};

describe("create-task repository/create-task", () => {
  afterEach(async () => {
    await Task.deleteMany();
  });

  it("should returns a task created", async () => {
    const repository = await new MongoCreateTaskRepository().create(
      mockCreateTask
    );

    expect(typeof repository.id).toBe("string");
    expect(repository.boardConnect).toBe("123");
    expect(repository.status).toBe("pending");
    expect(repository.subTasks.length).toBe(1);
    expect(repository.text).toBe(mockCreateTask.text);
    expect(repository.description).toBe(mockCreateTask.description);
  });
});
