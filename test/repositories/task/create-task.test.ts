import { describe, expect, it } from "vitest";
import {
  ICreateTaskParams,
  ICreateTaskRepository,
} from "../../../src/server/controller/task/protocols";
import { ITasks } from "../../../src/server/models/protocols";

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

export class MockCreateTaskRepository implements ICreateTaskRepository {
  async create(params: ICreateTaskParams): Promise<ITasks> {
    const { boardConnect, subTasks, text, description } = params;

    const newBoadConnet = boardConnect as string;
    const newDescription = description as string;

    return {
      boardConnect: newBoadConnet,
      description: newDescription,
      id: "123",
      status: "pending",
      subTasks,
      text,
    };
  }
}

describe("create-task repository/create-task", () => {
  it("should returns a task created", async () => {
    const repository = await new MockCreateTaskRepository().create(
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
