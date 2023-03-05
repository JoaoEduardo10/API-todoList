import { beforeEach, describe, expect, it } from "vitest";
import { Task } from "../../../src/server/models/mongo-models/Tasks";
import { MongoGetTaskRepository } from "../../../src/server/repositories/task/get-task";
import { mockCreatetask } from "./delete-task.test";

const task = {
  id: "",
};

describe("get-task repository/get-task", () => {
  beforeEach(async () => {
    const taskCreate = await Task.create({ ...mockCreatetask });

    task.id = taskCreate._id.toHexString();
  }),
    it("should returns a task", async () => {
      const reporitory = await new MongoGetTaskRepository().get(task.id);

      expect(reporitory.id).toBe(task.id);
      expect(reporitory.status).toBe("pending");
      expect(reporitory.boardConnect).toBe("123");
      expect(reporitory.subTasks.length).toBe(1);
      expect(reporitory.text).toBe("test");
      expect(reporitory.description).toBe("test");
    });
});
