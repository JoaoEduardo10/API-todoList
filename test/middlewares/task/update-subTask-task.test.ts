import { describe, expect, it } from "vitest";
import { serverTest } from "../../globals-test";

describe("update-subTask middleware/update-subtask-task", () => {
  it("should retun an error for sending an in less than 24 characters with status code 404", async () => {
    const { statusCode, body } = await serverTest.patch(
      "/tasks/40028922/subtask"
    );

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Id invalido" });
  });

  it("should retun an error for sending at least on subTask with status code 404", async () => {
    const { statusCode, body } = await serverTest
      .patch("/tasks/63ff9e27777e30323ed90a65/subtask")
      .send([]);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Adicone uma subtask" });
  });

  it("should retun an error for sending a uuid with status code 404", async () => {
    const { statusCode, body } = await serverTest
      .patch("/tasks/63ff9e27777e30323ed90a65/subtask")
      .send([{ concluded: false }]);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Adicione um uuid" });
  });

  it("should retun an error for sending a concluded with status code 404", async () => {
    const { statusCode, body } = await serverTest
      .patch("/tasks/63ff9e27777e30323ed90a65/subtask")
      .send([{ uuid: "123" }]);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Adicione um concluded" });
  });

  it("should retun an error for sending the same uuid with status code 404", async () => {
    const { statusCode, body } = await serverTest
      .patch("/tasks/63ff9e27777e30323ed90a65/subtask")
      .send([
        { uuid: "123", concluded: false },
        { uuid: "123", concluded: false },
      ]);

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Id já usado ou esta com um campo a mais" });
  });
});
