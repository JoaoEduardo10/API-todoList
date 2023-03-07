import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Task } from "../../../src/server/models/mongo-models/Tasks";
import { User } from "../../../src/server/models/mongo-models/User";
import { mockCreateTask, serverTest } from "../../globals-test";

const task = {
  id: "",
};

describe("update-complete-task middleware/upadate-complete-task", () => {
  type TUser = {
    userId: string;
    token: string;
  };

  const user: TUser = {
    userId: "",
    token: "",
  };

  beforeEach(async () => {
    const createUser = {
      email: "test@gmail.com",
      password: "123",
      name: "test",
    };

    const responseUser = await serverTest
      .post("/users")
      .send({ ...createUser });

    const authenticationUser = await serverTest
      .post("/login")
      .send({ email: createUser.email, password: "123" });

    const createTask = await Task.create(mockCreateTask);

    task.id = createTask._id.toHexString();

    user.userId = responseUser.body.id;
    user.token = authenticationUser.body;
  });

  afterEach(async () => {
    await User.deleteMany();
    await Task.deleteMany();
  });

  it("should returns 404 error from sending an id less than 24", async () => {
    const { statusCode, body } = await serverTest
      .patch("/tasks/1233")
      .set({ Authorization: `Bearer ${user.token}` })
      .send({});

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Id imcompleto ou incorreto!" });
  });

  it("should returns 404 error from sending an id not existe", async () => {
    const { statusCode, body } = await serverTest
      .patch("/tasks/63ff9e27777e30323ed90a65")
      .set({ Authorization: `Bearer ${user.token}` })
      .send({});

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Task não existe! verifique o id." });
  });

  it("should returns status codes 200 with task updated of complete", async () => {
    const { statusCode, body } = await serverTest
      .patch(`/tasks/${task.id}`)
      .set({ Authorization: `Bearer ${user.token}` })
      .send({});

    expect(statusCode).toBe(200);
    expect(body).toBeTruthy();
  });
});
