import mongoose from "mongoose";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { serverTest } from "../../globals-test";

describe("update-complete-task middleware/upadate-complete-task", () => {
  it("should returns 404 error from sending an id less than 24", async () => {
    const { statusCode, body } = await serverTest.patch("/tasks/1233").send({});

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Id imcompleto ou incorreto!" });
  });

  it("should returns 404 error from sending an id not existe", async () => {
    const { statusCode, body } = await serverTest
      .patch("/tasks/63ff9e27777e30323ed90a65")
      .send({});

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Task não existe! verifique o id." });
  });
});
